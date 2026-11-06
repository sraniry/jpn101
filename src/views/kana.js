import { HIRAGANA, KATAKANA, KANA_BASE, KANA_DAKUTEN, KANA_HANDAKUTEN, KANA_YOON, KATAKANA_ONLY } from '../../data/kana.js';
import { speak } from '../tts.js';
import { planMark, phrases, newCard, savePhrases, existingKeySet, cardKey,
         registerStudyActivity, getKanaPath, markKanaLesson, addQuizStat, bestQuizScore } from '../storage.js';
import { celebrate, quizLine } from '../encouragement.js';
import { celebrateNewBadges } from '../badges.js';

// État du quiz
let quizState = null;

// ---------- Mots et phrases courantes utilisant les dérivés (゛゜ et combinaisons) ----------
// Demandé explicitement : voir les dérivés dans du vocabulaire réel plutôt que dans un tableau
// abstrait aide à les retenir. Trois groupes alignés sur les tableaux ci-dessus.
const DERIVED_WORDS = {
  dakuten: [
    { jp:'頑張って', romaji:'Ganbatte', fr:'Courage ! / Fais de ton mieux !' },
    { jp:'大丈夫です', romaji:'Daijoubu desu', fr:'Ça va, pas de problème.' },
    { jp:'ご飯', romaji:'Gohan', fr:'Riz / repas' },
    { jp:'鞄', romaji:'Kaban', fr:'Sac' },
    { jp:'番号', romaji:'Bangou', fr:'Numéro' },
    { jp:'残念です', romaji:'Zannen desu', fr:'C\'est dommage.' },
    { jp:'全部でいくらですか', romaji:'Zenbu de ikura desu ka', fr:'Combien ça fait au total ?' },
  ],
  handakuten: [
    { jp:'乾杯', romaji:'Kanpai', fr:'Santé ! (en trinquant)' },
    { jp:'立派です', romaji:'Rippa desu', fr:'C\'est magnifique / splendide.' },
    { jp:'出発します', romaji:'Shuppatsu shimasu', fr:'Je pars / le départ a lieu.' },
    { jp:'元気いっぱい', romaji:'Genki ippai', fr:'Plein d\'énergie.' },
    { jp:'ぴったりです', romaji:'Pittari desu', fr:'C\'est parfaitement adapté.' },
    { jp:'鉛筆', romaji:'Enpitsu', fr:'Crayon' },
  ],
  yoon: [
    { jp:'今日は何曜日ですか', romaji:'Kyou wa nan youbi desu ka', fr:'Quel jour sommes-nous aujourd\'hui ?' },
    { jp:'写真を撮ってもいいですか', romaji:'Shashin wo tottemo ii desu ka', fr:'Puis-je prendre une photo ?' },
    { jp:'電車に乗ります', romaji:'Densha ni norimasu', fr:'Je monte dans le train.' },
    { jp:'お茶をください', romaji:'Ocha wo kudasai', fr:'Du thé, s\'il vous plaît.' },
    { jp:'病院はどこですか', romaji:'Byouin wa doko desu ka', fr:'Où est l\'hôpital ?' },
    { jp:'旅行が好きです', romaji:'Ryokou ga suki desu', fr:'J\'aime voyager.' },
    { jp:'じゃあね', romaji:'Jaa ne', fr:'À plus ! (familier)' },
    { jp:'三百円です', romaji:'Sanbyaku en desu', fr:'Ça fait 300 yens.' },
  ],
};
function derivedWordsHtml(list){
  return `<div class="kana-vocab-grid">${list.map(w=>
    `<div class="kana-vocab-card derived-word" data-jp="${escapeHtmlAttr(w.jp)}">
      <span class="kvc-jp">${w.jp}</span>
      <span class="kvc-rom">${w.romaji}</span>
      <span class="kvc-fr">${w.fr}</span>
    </div>`
  ).join('')}</div>`;
}
function escapeHtmlAttr(s){ return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;'); }

// ---------- Parcours kana : leçons ordonnées, validées par quiz (≥ 80 %) ----------
// Une leçon par ligne de base, puis les formes dérivées regroupées.
const flatItems = groups => groups.flatMap(g => g.items);
export const KANA_LESSONS = [
  ...KANA_BASE.map(g => ({ row:g.row, items:g.items })),
  { row:'Sonores ゛ (g/z/d/b)', items: flatItems(KANA_DAKUTEN) },
  { row:'P ゜ + combinaisons', items: [...flatItems(KANA_HANDAKUTEN), ...flatItems(KANA_YOON)] },
];

// Le parcours vit dans meta (storage.js) : il est donc inclus dans l'export JSON et la synchro
// cloud, au lieu de rester dans une clé localStorage isolée perdue au changement d'appareil.
function loadKanaPath(){ return getKanaPath(); }

export function kanaPathState(){
  const p = loadKanaPath();
  const nextIdx = KANA_LESSONS.findIndex((_, i) => !p.done.includes(i));
  return {
    done: p.done.length,
    total: KANA_LESSONS.length,
    next: nextIdx === -1 ? KANA_LESSONS[KANA_LESSONS.length-1] : KANA_LESSONS[nextIdx],
    nextIdx: nextIdx === -1 ? KANA_LESSONS.length-1 : nextIdx,
  };
}

// État de la leçon en cours dans l'onglet Parcours
let lessonState = null; // {lessonIdx, quiz:null | {deck, idx, correct}}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(correct, pool, n = 4) {
  const others = shuffleArray(pool.filter(x => x.kana !== correct.kana)).slice(0, n - 1);
  return shuffleArray([correct, ...others]);
}

// Tableau principal : hiragana et katakana appariés côte à côte (même son)
function renderPairedTable(groups, withMnemo) {
  let html = `<div class="kana-table-wrap"><div class="kana-pair-table">`;
  groups.forEach(g => {
    html += `<div class="kana-pair-row"><span class="kana-row-label">${g.row}</span><div class="kana-pair-cells">`;
    g.items.forEach(it => {
      html += `<div class="kana-pair-cell">
        <div class="kpc-jp"><span class="kpc-h" data-jp="${it.h}">${it.h}</span><span class="kpc-sep">/</span><span class="kpc-k" data-jp="${it.k}">${it.k}</span></div>
        <span class="kpc-rom">${it.romaji}</span>
        ${withMnemo && it.mnemo ? `<span class="kpc-mnemo">${it.mnemo}</span>` : ''}
      </div>`;
    });
    html += `</div></div>`;
  });
  html += `</div></div>`;
  return html;
}

// Tableau dense pour les formes dérivées/combinaisons (compact, plusieurs par ligne, pas une ligne par caractère)
function renderCompactTable(groups) {
  let html = `<div class="kana-compact-table">`;
  groups.forEach(g => {
    html += `<div class="kana-compact-group"><span class="kcg-label">${g.row}</span><div class="kcg-cells">`;
    g.items.forEach(it => {
      html += `<div class="kana-compact-cell" data-jp="${it.h}">
        <span class="kcc-h" data-jp="${it.h}">${it.h}</span><span class="kcc-k" data-jp="${it.k}">${it.k}</span><span class="kcc-rom">${it.romaji}</span>
      </div>`;
    });
    html += `</div></div>`;
  });
  html += `</div>`;
  return html;
}

function startQuiz(pool, mode) {
  const deck = shuffleArray(pool.filter(c => c.kana.length <= 2)); // basic + some combos
  quizState = { pool, mode, deck, idx: 0, correct: 0, total: deck.length };
  renderQuizCard();
}

function renderQuizCard() {
  const area = document.getElementById('kanaArea');
  if (!quizState || quizState.idx >= quizState.deck.length) {
    const pct = Math.round((quizState.correct / quizState.total) * 100);
    if(!quizState.recorded){ quizState.recorded = true; addQuizStat('kana', quizState.correct, quizState.total); registerStudyActivity(); celebrateNewBadges(); }
    const best = bestQuizScore('kana');
    area.querySelector('#kana-quiz-zone').innerHTML = `
      <div class="kana-quiz-done">
        <div class="kqd-score">${quizState.correct}/${quizState.total} — ${pct}%</div>
        ${best ? `<div class="kqd-best">Ton record : ${best.correct}/${best.total} (${Math.round(best.pct*100)} %)</div>` : ''}
        <div class="kqd-msg">${pct >= 90 ? '🎉 Excellent !' : pct >= 70 ? '👍 Bien !' : '💪 Continue !'}</div>
        <div class="kqd-teacher">${quizLine(pct)}</div>
        <button class="kana-quiz-restart">🔄 Recommencer</button>
      </div>`;
    area.querySelector('.kana-quiz-restart').addEventListener('click', () => startQuiz(quizState.pool, quizState.mode));
    return;
  }
  const card = quizState.deck[quizState.idx];
  const choices = buildChoices(card, quizState.pool);
  const isKanaToRomaji = quizState.mode === 'k2r';
  const question = isKanaToRomaji ? card.kana : card.romaji;
  const choiceDisplay = (c) => isKanaToRomaji ? c.romaji : c.kana;

  area.querySelector('#kana-quiz-zone').innerHTML = `
    <div class="kana-quiz-card">
      <div class="kqc-progress">${quizState.idx + 1} / ${quizState.total}</div>
      <div class="kqc-question ${isKanaToRomaji ? 'is-kana' : 'is-romaji'}" data-jp="${card.kana}">${question}</div>
      <div class="kqc-choices">
        ${choices.map(c => `<button class="kqc-btn" data-kana="${c.kana}" data-correct="${c.kana === card.kana}">${choiceDisplay(c)}</button>`).join('')}
      </div>
    </div>`;

  // Click to pronounce
  const qEl = area.querySelector('.kqc-question');
  if (isKanaToRomaji) qEl.addEventListener('click', () => speak(card.kana, 0.8));

  area.querySelectorAll('.kqc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.correct === 'true';
      if (isCorrect) {
        btn.classList.add('correct');
        quizState.correct++;
      } else {
        btn.classList.add('wrong');
        area.querySelector(`[data-correct="true"]`).classList.add('correct');
      }
      area.querySelectorAll('.kqc-btn').forEach(b => b.disabled = true);
      if (!isKanaToRomaji) speak(card.kana, 0.8);
      setTimeout(() => { quizState.idx++; renderQuizCard(); }, 900);
    });
  });
}

// ---------- Onglet Parcours ----------
function renderPath(){
  const panel = document.getElementById('kana-tab-path');
  if(!panel) return;
  if(lessonState){ renderLesson(panel); return; }
  const p = loadKanaPath();
  const state = kanaPathState();
  let html = `<div class="kana-path-head">
    <p>Une leçon par jour (~10 min) : découvre la ligne, écoute chaque son, puis valide avec le quiz (80 % minimum). Chaque leçon débloque la suivante.</p>
    <div class="today-track"><div class="today-track-fill" style="width:${(state.done/state.total)*100}%"></div></div>
    <p class="kana-path-count">${state.done}/${state.total} leçons validées</p>
  </div><div class="kana-path-list">`;
  KANA_LESSONS.forEach((lesson, i)=>{
    const done = p.done.includes(i);
    const unlocked = done || i === state.nextIdx;
    const preview = lesson.items.slice(0,5).map(it=>it.h).join(' ');
    html += `<div class="kana-path-item ${done?'is-done':unlocked?'is-next':'is-locked'}" data-idx="${i}">
      <span class="kpi-status">${done?'✓':unlocked?'▶':'🔒'}</span>
      <div class="kpi-body"><b>Leçon ${i+1} — ${lesson.row}</b><span class="kpi-preview">${preview}${lesson.items.length>5?' …':''}</span></div>
      ${unlocked?`<span class="kpi-go">${done?'Revoir':'Commencer'}</span>`:''}
    </div>`;
  });
  html += `</div>`;
  panel.innerHTML = html;
  panel.querySelectorAll('.kana-path-item.is-done, .kana-path-item.is-next').forEach(el=>{
    el.addEventListener('click', ()=>{ lessonState = { lessonIdx: parseInt(el.dataset.idx,10), quiz:null }; renderPath(); });
  });
}

function renderLesson(panel){
  const lesson = KANA_LESSONS[lessonState.lessonIdx];
  if(lessonState.quiz){ renderLessonQuiz(panel, lesson); return; }
  let html = `<button class="conv-back" id="lessonBack">← Parcours</button>
    <h4 class="kana-table-title">Leçon ${lessonState.lessonIdx+1} — ${lesson.row}</h4>
    <p class="kana-vocab-note">Touche chaque caractère pour l'entendre. Répète à voix haute, puis lance le quiz.</p>
    <div class="kana-lesson-grid">`;
  lesson.items.forEach(it=>{
    html += `<div class="kana-lesson-cell" data-jp="${it.h}">
      <span class="klc-pair"><span class="kpc-h" data-jp="${it.h}">${it.h}</span><span class="kpc-sep">/</span><span class="kpc-k" data-jp="${it.k}">${it.k}</span></span>
      <span class="kcc-rom">${it.romaji}</span>
      ${it.mnemo?`<span class="klc-mnemo">${it.mnemo}</span>`:''}
    </div>`;
  });
  html += `</div><button class="continue-btn" id="lessonQuizBtn" style="margin-top:16px;">🎯 Quiz de validation (${Math.min(10, lesson.items.length*2)} questions)</button>`;
  panel.innerHTML = html;
  document.getElementById('lessonBack').addEventListener('click', ()=>{ lessonState = null; renderPath(); });
  document.getElementById('lessonQuizBtn').addEventListener('click', ()=>{
    // moitié hiragana → romaji, moitié katakana → romaji, mélangés
    const qs = shuffleArray([
      ...lesson.items.map(it=>({ jp:it.h, romaji:it.romaji })),
      ...lesson.items.map(it=>({ jp:it.k, romaji:it.romaji })),
    ]).slice(0, Math.min(10, lesson.items.length*2));
    lessonState.quiz = { deck: qs, idx:0, correct:0 };
    renderPath();
  });
}

function renderLessonQuiz(panel, lesson){
  const q = lessonState.quiz;
  if(q.idx >= q.deck.length){
    const pct = Math.round((q.correct / q.deck.length) * 100);
    const passed = pct >= 80;
    if(passed){
      markKanaLesson(lessonState.lessonIdx);
      planMark('kana');
      celebrate('kanaLesson', { emoji:'あ', title: 'Leçon validée' });
      celebrateNewBadges();
    }
    if(!q.recorded){ q.recorded = true; addQuizStat('kana', q.correct, q.deck.length); registerStudyActivity(); }
    panel.innerHTML = `<div class="kana-quiz-done">
      <div class="kqd-score">${q.correct}/${q.deck.length} — ${pct}%</div>
      <div class="kqd-msg">${passed ? '🎉 Leçon validée ! La suivante est débloquée.' : '💪 Il faut 80 % — relis la ligne et retente.'}</div>
      <button class="kana-quiz-restart" id="lessonQuizEnd">${passed ? '→ Retour au parcours' : '🔄 Retenter'}</button>
    </div>`;
    document.getElementById('lessonQuizEnd').addEventListener('click', ()=>{
      if(passed) lessonState = null; else lessonState.quiz = null;
      renderPath();
    });
    return;
  }
  const card = q.deck[q.idx];
  const pool = lesson.items.map(it=>it.romaji);
  const others = shuffleArray([...new Set(pool.filter(r=>r!==card.romaji))]).slice(0,3);
  const choices = shuffleArray([card.romaji, ...others]);
  panel.innerHTML = `<div class="kana-quiz-card">
    <div class="kqc-progress">${q.idx+1} / ${q.deck.length}</div>
    <div class="kqc-question is-kana">${card.jp}</div>
    <div class="kqc-choices">${choices.map(c=>`<button class="kqc-btn" data-correct="${c===card.romaji}">${c}</button>`).join('')}</div>
  </div>`;
  panel.querySelectorAll('.kqc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const ok = btn.dataset.correct === 'true';
      if(ok){ btn.classList.add('correct'); q.correct++; }
      else { btn.classList.add('wrong'); panel.querySelector('[data-correct="true"]').classList.add('correct'); }
      panel.querySelectorAll('.kqc-btn').forEach(b=>b.disabled=true);
      speak(card.jp, 0.8);
      setTimeout(()=>{ q.idx++; renderPath(); }, 900);
    });
  });
}

export function renderKana() {
  const area = document.getElementById('kanaArea');

  area.innerHTML = `
    <div class="kana-intro">
      <b>Hiragana</b> (gauche) : mots japonais natifs, particules, conjugaisons.<br>
      <b>Katakana</b> (droite) : mots étrangers (コーヒー = café, バス = bus).<br>
      Clique sur un caractère pour l'entendre et voir son moyen mnémotechnique. Entraîne-toi avec le quiz.<br>
      <span class="xref-note">漢字 Les kanji ont leur propre section : <b>JLPT N5 → 漢字</b> réunit les 103 caractères officiels avec lectures on/kun, mnémotechniques, radicaux et deux quiz (sens et lecture).</span>
    </div>

    <div class="kana-tabs">
      <button class="kana-tab active" data-tab="path">📅 Parcours</button>
      <button class="kana-tab" data-tab="hiragana">あ Hiragana</button>
      <button class="kana-tab" data-tab="katakana">ア Katakana</button>
      <button class="kana-tab" data-tab="base">あ/ア Tableau</button>
      <button class="kana-tab" data-tab="derived">゛゜ Dérivés</button>
      <button class="kana-tab" data-tab="quiz">🎯 Quiz</button>
    </div>

    <div id="kana-tab-path" class="kana-tab-panel active"></div>

    <div id="kana-tab-hiragana" class="kana-tab-panel" style="display:none">
      <h4 class="kana-table-title">ひらがな — les 46 sons de base</h4>
      <p class="kana-vocab-note">Clique sur un caractère pour l'entendre. Chaque caractère a un moyen mnémotechnique visuel pour t'aider à le mémoriser.</p>
      <div class="kana-solo-grid">
        ${KANA_BASE.flatMap(g=>g.items).map(it=>`
          <div class="kana-solo-cell" data-jp="${it.h}">
            <span class="ksc-kana" data-jp="${it.h}">${it.h}</span>
            <span class="ksc-rom">${it.romaji}</span>
            ${it.hmnemo ? `<span class="ksc-mnemo">${it.hmnemo.replace(/^[^\s]+ : /,'')}</span>` : ''}
          </div>`).join('')}
      </div>
    </div>

    <div id="kana-tab-katakana" class="kana-tab-panel" style="display:none">
      <h4 class="kana-table-title">カタカナ — les 46 sons de base</h4>
      <p class="kana-vocab-note">Le katakana sert pour les mots étrangers et les onomatopées. Les formes plus anguleuses sont souvent plus difficiles à mémoriser — les tips visuels aident !</p>
      <div class="kana-solo-grid">
        ${KANA_BASE.flatMap(g=>g.items).map(it=>`
          <div class="kana-solo-cell" data-jp="${it.k}">
            <span class="ksc-kana" data-jp="${it.k}">${it.k}</span>
            <span class="ksc-rom">${it.romaji}</span>
            ${it.mnemo ? `<span class="ksc-mnemo">${it.mnemo.replace(/^[ァ-ン]+ : /,'')}</span>` : ''}
          </div>`).join('')}
      </div>
    </div>

    <div id="kana-tab-base" class="kana-tab-panel" style="display:none">
      <h4 class="kana-table-title">46 sons de base — hiragana / katakana côte à côte</h4>
      <label class="kana-mnemo-toggle"><input type="checkbox" id="mnemoToggle"> Afficher les moyens mnémotechniques (katakana)</label>
      ${renderPairedTable(KANA_BASE, true)}

      <div class="kana-vocab-section">
        <h4 class="kana-table-title">カタカナ — mots étrangers que tu verras partout</h4>
        <p class="kana-vocab-note">Le katakana sert à écrire les mots d'emprunt (anglais, français…). Si tu reconnais le katakana, tu comprends souvent le mot en le prononçant à voix haute.</p>
        <div class="kana-vocab-grid">
          ${[
            ['コーヒー','kōhī','café ☕'],['ビール','bīru','bière 🍺'],['ジュース','jūsu','jus 🥤'],
            ['ミルク','miruku','lait 🥛'],['アイス','aisu','glace 🍦'],['ケーキ','kēki','gâteau 🎂'],
            ['パン','pan','pain 🍞'],['ラーメン','rāmen','ramen 🍜'],['カレー','karē','curry 🍛'],
            ['ピザ','piza','pizza 🍕'],['バス','basu','bus 🚌'],['タクシー','takushī','taxi 🚕'],
            ['ホテル','hoteru','hôtel 🏨'],['コンビニ','konbini','konbini 🏪'],['スーパー','sūpā','supermarché'],
            ['デパート','depāto','grand magasin'],['トイレ','toire','toilettes 🚻'],['エレベーター','erebētā','ascenseur'],
            ['エスカレーター','esukarētā','escalator'],['スマホ','sumaho','smartphone 📱'],
            ['パスポート','pasupōto','passeport 🛂'],['カード','kādo','carte bancaire 💳'],
            ['メニュー','menyū','menu 📋'],['レストラン','resutoran','restaurant'],
            ['チェックイン','chekkuin','check-in'],['テイクアウト','teiku auto','à emporter'],
            ['アレルギー','arerugī','allergie ⚠️'],['フリー','furī','gratuit (free)'],
            ['ポイント','pointo','points fidélité'],['サービス','sābisu','service / offert'],
          ].map(([jp,rom,fr]) =>
            `<div class="kana-vocab-card" data-jp="${jp}">
              <span class="kvc-jp">${jp}</span>
              <span class="kvc-rom">${rom}</span>
              <span class="kvc-fr">${fr}</span>
            </div>`
          ).join('')}
        </div>

        <h4 class="kana-table-title" style="margin-top:20px">ひらがな — particules et mots courants</h4>
        <p class="kana-vocab-note">Le hiragana sert pour les particules grammaticales (invisibles en français mais omniprésentes), et pour des mots courants écrits sans kanji.</p>
        <div class="kana-vocab-grid">
          ${[
            ['は','wa','particule thème'],['が','ga','particule sujet'],['を','wo','particule objet'],
            ['に','ni','à / vers / dans'],['で','de','lieu / moyen'],['の','no','de / possession'],
            ['と','to','avec / et'],['も','mo','aussi'],['から','kara','depuis / de'],
            ['まで','made','jusqu\'à'],['ここ','koko','ici'],['そこ','soko','là'],
            ['どこ','doko','où ?'],['これ','kore','ceci'],['それ','sore','cela'],
            ['いくら','ikura','combien ?'],['なに','nani','quoi ?'],['いつ','itsu','quand ?'],
            ['だれ','dare','qui ?'],['おいしい','oishii','délicieux 😋'],
            ['ください','kudasai','s\'il vous plaît'],['ありがとう','arigatō','merci'],
            ['すみません','sumimasen','excusez-moi'],['ごめん','gomen','désolé'],
          ].map(([jp,rom,fr]) =>
            `<div class="kana-vocab-card" data-jp="${jp}">
              <span class="kvc-jp">${jp}</span>
              <span class="kvc-rom">${rom}</span>
              <span class="kvc-fr">${fr}</span>
            </div>`
          ).join('')}
        </div>
      </div>
    </div>

    <div id="kana-tab-derived" class="kana-tab-panel" style="display:none">
      <div class="kana-rule-note">
        <b>゛ (dakuten)</b> : les deux petits traits ajoutent de la « voix » à la consonne — k→g, s→z, t→d, h→b. Comme des guillemets qui font vibrer le son.
      </div>
      <h4 class="kana-table-title">Sonores ゛ — が・ざ・だ・ば</h4>
      ${renderCompactTable(KANA_DAKUTEN)}
      <p class="kana-vocab-note">Ces sons dans des mots et phrases que tu vas vraiment utiliser — touche pour écouter :</p>
      ${derivedWordsHtml(DERIVED_WORDS.dakuten)}

      <div class="kana-rule-note">
        <b>゜ (handakuten)</b> : uniquement sur la ligne H, fait « péter » un son P — comme une bulle qui pop.
      </div>
      <h4 class="kana-table-title">P ゜ — ぱ行</h4>
      ${renderCompactTable(KANA_HANDAKUTEN)}
      <p class="kana-vocab-note">Plus rare, mais dans des mots très courants :</p>
      ${derivedWordsHtml(DERIVED_WORDS.handakuten)}

      <div class="kana-rule-note">
        <b>Combinaisons yōon</b> : un petit や/ゆ/よ collé à une consonne en -i fusionne en une seule syllabe (きゃ = "kya", jamais "ki-ya").
      </div>
      <h4 class="kana-table-title">Combinaisons — きゃ・しゃ・ちゃ…</h4>
      ${renderCompactTable(KANA_YOON)}
      <p class="kana-vocab-note">Les combinaisons yōon sont partout dans les mots du quotidien — voici les plus fréquentes, en mots et en phrases :</p>
      ${derivedWordsHtml(DERIVED_WORDS.yoon)}

      <div class="kana-rule-note">
        <b>Sons étrangers</b> : katakana seul, sans équivalent hiragana, utilisés pour transcrire des sons absents du japonais natif (ex. ファ pour "fa").
      </div>
      <h4 class="kana-table-title">Sons spéciaux katakana — ファ・ヴァ…</h4>
      <div class="kana-compact-table">
        <div class="kana-compact-group"><span class="kcg-label">Étrangers</span><div class="kcg-cells">
          ${KATAKANA_ONLY.map(it => `<div class="kana-compact-cell" data-jp="${it.k}"><span class="kcc-k" data-jp="${it.k}">${it.k}</span><span class="kcc-rom">${it.romaji}</span></div>`).join('')}
        </div></div>
      </div>
    </div>


    <div id="kana-tab-quiz" class="kana-tab-panel" style="display:none">
      <div class="kana-quiz-setup">
        <p class="kqs-label">Choisir le quiz :</p>
        <div class="kqs-row">
          <button class="kqs-btn" data-set="hiragana" data-mode="k2r">あ → romaji</button>
          <button class="kqs-btn" data-set="hiragana" data-mode="r2k">romaji → あ</button>
          <button class="kqs-btn" data-set="katakana" data-mode="k2r">ア → romaji</button>
          <button class="kqs-btn" data-set="katakana" data-mode="r2k">romaji → ア</button>
          <button class="kqs-btn" data-set="both" data-mode="k2r">あ+ア → romaji</button>
        </div>
      </div>
      <div id="kana-quiz-zone"></div>
    </div>
  `;

  // Tab switching
  area.querySelectorAll('.kana-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      area.querySelectorAll('.kana-tab').forEach(t => t.classList.remove('active'));
      area.querySelectorAll('.kana-tab-panel').forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const panel = area.querySelector(`#kana-tab-${tab.dataset.tab}`);
      if (panel) panel.style.display = '';
      if (tab.dataset.tab === 'path') renderPath();
    });
  });

  // Onglet parcours affiché par défaut
  renderPath();

  // Mnemonics toggle (base table only)
  const mnemoToggle = area.querySelector('#mnemoToggle');
  if (mnemoToggle) {
    mnemoToggle.addEventListener('change', () => {
      area.querySelector('#kana-tab-base').classList.toggle('show-mnemo', mnemoToggle.checked);
    });
  }

  // Click kana char → speak + toggle mnemonic on the cell
  area.addEventListener('click', e => {
    const el = e.target.closest('[data-jp]');
    if (!el || !el.dataset.jp) return;
    speak(el.dataset.jp, 0.8);
    const cell = e.target.closest('.kana-pair-cell, .kana-solo-cell');
    if (cell) cell.classList.toggle('is-open');
  });

  // Quiz start buttons
  area.querySelectorAll('.kqs-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const set = btn.dataset.set;
      const mode = btn.dataset.mode;
      const pool = set === 'hiragana' ? HIRAGANA : set === 'katakana' ? KATAKANA : [...HIRAGANA, ...KATAKANA];
      startQuiz(pool, mode);
    });
  });
}
