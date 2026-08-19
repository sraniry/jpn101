import { N5_KANJI, N5_KANJI_ALL, N5_VOCAB, N5_VOCAB_ALL, N5_GRAMMAR, N5_GRAMMAR_QUIZ } from '../../data/jlpt-n5.js';
import { CONVERSATIONS } from '../../data/phrases.js';
import { phrases, newCard, savePhrases, existingKeySet, cardKey, registerStudyActivity,
         getExamHistory, addExamRecord, addQuizStat, bestQuizScore } from '../storage.js';
import { speak } from '../tts.js';
import { escapeHtml, kanaToRomaji, annotateFurigana } from '../util.js';

// ---------- JLPT N5 : kanji, vocabulaire, grammaire, quiz, conseils, examen blanc, historique, planning ----------
// Règle globale : aucun caractère japonais affiché seul sans sa lecture romaji juste en dessous —
// sauf le kanji/particule dont la lecture EST la réponse cherchée (sinon le quiz n'a plus de sens),
// révélée après la réponse comme partout ailleurs dans l'app.

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// Mélange choices et choicesRomaji ensemble (même permutation) — les données de grammaire
// listent toujours la bonne réponse en premier, il ne faut jamais l'afficher telle quelle.
function shuffleChoicePair(choices, choicesRomaji){
  const idx = shuffle(choices.map((_,i)=>i));
  return { choices: idx.map(i=>choices[i]), choicesRomaji: choicesRomaji ? idx.map(i=>choicesRomaji[i]) : null };
}

let quizState = null;
let examState = null;

// ---------- Historique des examens blancs ----------
// Stocké dans meta (via storage.js) : il suit ainsi l'export JSON et la synchro cloud,
// contrairement à l'ancienne clé localStorage isolée.
function loadHistory(){ return getExamHistory(); }
function saveHistoryRecord(record){ addExamRecord(record); }
// Catégorie la plus faible sur l'ensemble de l'historique (pour Conseils + Historique)
function weakCategory(){
  const h = loadHistory();
  if(h.length === 0) return null;
  const totals = {};
  h.forEach(r=>{
    Object.entries(r.scores).forEach(([cat, s])=>{
      totals[cat] = totals[cat] || { correct:0, total:0 };
      totals[cat].correct += s.correct; totals[cat].total += s.total;
    });
  });
  let worst = null;
  Object.entries(totals).forEach(([cat, s])=>{
    if(s.total === 0) return;
    const ratio = s.correct / s.total;
    if(!worst || ratio < worst.ratio) worst = { cat, ratio, ...s };
  });
  return worst;
}

export function renderJlpt(){
  const area = document.getElementById('jlptArea');
  quizState = null; examState = null;
  area.innerHTML = `
    <div class="skills-intro">Préparation <b>JLPT N5</b> : les ${N5_KANJI_ALL.length} kanji officiels, ~${N5_VOCAB_ALL.length} mots essentiels, les ${N5_GRAMMAR.length} structures testées, un quiz rapide, un examen blanc complet et ton planning jusqu'à l'épreuve de décembre.</div>
    <div class="kana-tabs">
      <button class="kana-tab active" data-tab="kanji">漢字 Kanji</button>
      <button class="kana-tab" data-tab="vocab">📖 Vocabulaire</button>
      <button class="kana-tab" data-tab="grammar">📐 Grammaire</button>
      <button class="kana-tab" data-tab="quiz">🎯 Quiz rapide</button>
      <button class="kana-tab" data-tab="exam">📝 Examen blanc</button>
      <button class="kana-tab" data-tab="tips">💡 Conseils</button>
      <button class="kana-tab" data-tab="history">📊 Historique</button>
      <button class="kana-tab" data-tab="plan">🗓️ Planning</button>
    </div>
    <div id="jlpt-panel"></div>
  `;
  area.querySelectorAll('.kana-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      area.querySelectorAll('.kana-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      quizState = null;
      if(examState && examState.timerId) clearInterval(examState.timerId);
      examState = null;
      renderPanel(tab.dataset.tab);
    });
  });
  renderPanel('kanji');
}

function renderPanel(tab){
  const panel = document.getElementById('jlpt-panel');
  if(tab==='kanji') renderKanjiPanel(panel);
  else if(tab==='vocab') renderVocabPanel(panel);
  else if(tab==='grammar') renderGrammarPanel(panel);
  else if(tab==='quiz') renderQuizSetup(panel);
  else if(tab==='exam') renderExamSetup(panel);
  else if(tab==='tips') renderTipsPanel(panel);
  else if(tab==='history') renderHistoryPanel(panel);
  else if(tab==='plan') renderPlanPanel(panel);
}

// Branche les boutons « + Ajouter à mes révisions » d'un panneau (kanji ou vocab)
function wireAddButtons(panel, groups, makeCard){
  panel.querySelectorAll('.jlpt-add').forEach(b=>{
    b.addEventListener('click', async e=>{
      e.stopPropagation();
      const g = groups[parseInt(b.dataset.group,10)];
      const existing = existingKeySet(); let added = 0;
      g.items.forEach(it=>{
        const card = makeCard(it);
        const key = cardKey(card.jp, card.romaji);
        if(existing.has(key)) return;
        phrases.push(card); existing.add(key); added++;
      });
      if(added>0) await savePhrases();
      b.textContent = added>0 ? added+' ajouté'+(added===1?'':'s')+' ✓' : 'Déjà dans tes révisions';
      setTimeout(()=>{ b.textContent = '+ Ajouter à mes révisions'; }, 2000);
    });
  });
}

// ---------- 6a. Kanji ----------
function renderKanjiPanel(panel){
  let html = `<div class="kana-rule-note"><b>${N5_KANJI_ALL.length} kanji officiels N5.</b> Lecture <b>on'yomi</b> (katakana, d'origine chinoise — dans les mots composés) et <b>kun'yomi</b> (hiragana, japonaise — mot seul), romaji entre parenthèses. Touche un kanji pour l'entendre. 💡 = astuce mnémotechnique, 🧩 = décomposition en radicaux (les briques qui composent le kanji).</div>`;
  N5_KANJI.forEach((g, gi)=>{
    html += `<div class="rg-head" style="margin-top:14px;"><h4 class="kana-table-title" style="margin:0;">${g.theme} (${g.items.length})</h4><button class="rg-add jlpt-add" data-group="${gi}">+ Ajouter à mes révisions</button></div><div class="kanji-grid">`;
    g.items.forEach(it=>{
      const onR = it.on === '—' ? '—' : `${it.on} (${kanaToRomaji(it.on)})`;
      const kunR = it.kun === '—' ? '—' : `${it.kun} (${kanaToRomaji(it.kun)})`;
      html += `<div class="kanji-card" data-jp="${it.k}">
        <span class="kj-k">${it.k}</span>
        <span class="kj-rom">音 ${escapeHtml(onR)}<br>訓 ${escapeHtml(kunR)}</span>
        <span class="kj-fr">${escapeHtml(it.fr)}</span>
        <span class="kj-ex">${escapeHtml(annotateFurigana(it.ex))}</span>
        ${it.mnemo ? `<span class="kj-mnemo">💡 ${escapeHtml(it.mnemo)}</span>` : ''}
        ${it.radicals ? `<span class="kj-radicals">🧩 ${escapeHtml(it.radicals)}</span>` : ''}
      </div>`;
    });
    html += `</div>`;
  });
  panel.innerHTML = html;
  panel.querySelectorAll('.kanji-card').forEach(c=> c.addEventListener('click', ()=> speak(c.dataset.jp, 0.8)));
  // La lecture stockée dans la carte doit être du romaji latin : c'est la béquille de lecture.
  // Y mettre les kana bruts (イチ / ひと(つ)) remplaçait l'aide par du japonais supplémentaire.
  wireAddButtons(panel, N5_KANJI, it => {
    const parts = [it.on, it.kun].filter(r => r && r !== '—').map(kanaToRomaji);
    return newCard(it.k, parts.join(' / '), it.fr, it.ex + (it.mnemo ? ' · 💡 '+it.mnemo : ''), 'kanji', 'N5');
  });
}

// ---------- 6b. Vocabulaire ----------
function renderVocabPanel(panel){
  let html = `<div class="kana-rule-note"><b>~${N5_VOCAB_ALL.length} mots N5 essentiels</b> qui ne sont pas déjà dans le pack de phrases. Touche un mot pour l'entendre ; s'il a un 💡, retouche-le pour voir l'astuce. Ajoute un thème entier à tes révisions.</div>`;
  N5_VOCAB.forEach((g, gi)=>{
    html += `<div class="rg-head" style="margin-top:14px;"><h4 class="kana-table-title" style="margin:0;">${g.icon} ${g.theme} (${g.items.length})</h4><button class="rg-add jlpt-add" data-group="${gi}">+ Ajouter à mes révisions</button></div><div class="kana-vocab-grid">`;
    g.items.forEach(it=>{
      html += `<div class="kana-vocab-card${it.note?' has-note':''}" data-jp="${escapeHtml(it.jp)}">
        <span class="kvc-jp">${escapeHtml(it.jp)}</span>
        <span class="kvc-rom">${escapeHtml(it.romaji)}</span>
        <span class="kvc-fr">${escapeHtml(it.fr)}</span>
        ${it.note ? `<span class="kvc-note">💡 ${escapeHtml(it.note)}</span>` : ''}
      </div>`;
    });
    html += `</div>`;
  });
  panel.innerHTML = html;
  panel.querySelectorAll('.kana-vocab-card').forEach(c=> c.addEventListener('click', ()=>{
    speak(c.dataset.jp, 0.85);
    if(c.classList.contains('has-note')) c.classList.toggle('expanded');
  }));
  wireAddButtons(panel, N5_VOCAB, it => newCard(it.jp, it.romaji, it.fr, it.note||'', 'N5', 'N5'));
}

// ---------- 6c. Grammaire ----------
function renderGrammarPanel(panel){
  let html = `<div class="kana-rule-note">Les <b>${N5_GRAMMAR.length} structures testées au N5</b>. Celles marquées ✓ sont déjà expliquées en détail dans l'onglet Grammaire. Touche un exemple pour l'entendre.</div>`;
  N5_GRAMMAR.forEach(g=>{
    html += `<div class="jlpt-gram">
      <div class="jg-head"><span class="jg-s">${escapeHtml(g.s)}</span>${g.covered?'<span class="jg-covered">✓ dans Grammaire</span>':'<span class="jg-new">nouveau</span>'}</div>
      <div class="jg-s-romaji">${escapeHtml(g.sRomaji)}</div>
      <div class="jg-fr">${escapeHtml(g.fr)}</div>
      ${g.ex.map(e=>`<div class="jg-ex" data-jp="${escapeHtml(e.jp)}">🔊 <b>${escapeHtml(e.jp)}</b><span class="jg-rom">${escapeHtml(e.romaji)}</span><span class="jg-tr">${escapeHtml(e.fr)}</span></div>`).join('')}
    </div>`;
  });
  panel.innerHTML = html;
  panel.querySelectorAll('.jg-ex').forEach(e=> e.addEventListener('click', ()=> speak(e.dataset.jp, 0.85)));
}

// ---------- 6d. Quiz rapide (mode A) ----------
// 60 questions : 20 vocabulaire + 20 kanji + 20 grammaire, mélangées. Romaji + explication après chaque réponse.
function buildQuizDeck(){
  const vocabQs = shuffle(N5_VOCAB_ALL).slice(0,20).map(v=>{
    const others = shuffle(N5_VOCAB_ALL.filter(x=>x.fr!==v.fr)).slice(0,3).map(x=>x.fr);
    return { type:'Vocabulaire', q:`Que signifie « ${v.jp} » (${v.romaji}) ?`, jp:v.jp, choices:shuffle([v.fr,...others]), ok:v.fr,
      explanation:`${v.jp} (${v.romaji}) = ${v.fr}.` };
  });
  const kanjiQs = shuffle(N5_KANJI_ALL).slice(0,20).map(k=>{
    const reading = k.kun !== '—' ? k.kun : k.on;
    const pool = N5_KANJI_ALL.filter(x=>x.k!==k.k).map(x=> x.kun!=='—' ? x.kun : x.on);
    const choices = shuffle([reading,...shuffle([...new Set(pool)]).slice(0,3)]);
    return { type:'Kanji', q:`Quelle est la lecture de « ${k.k} » (${k.fr}) ?`, jp:k.k, choices, choicesRomaji:choices.map(kanaToRomaji), ok:reading,
      explanation:`${k.k} se lit ${reading} (${kanaToRomaji(reading)}) — « ${k.fr} ». Exemple : ${annotateFurigana(k.ex)}` };
  });
  const gramQs = shuffle(N5_GRAMMAR_QUIZ).slice(0,20).map(g=>{
    const sc = shuffleChoicePair(g.choices, g.choicesRomaji);
    return { type:'Grammaire', q:g.q, qRomaji:g.qRomaji, jp:g.q.replace('＿', g.ok), choices:sc.choices, choicesRomaji:sc.choicesRomaji, ok:g.ok,
      explanation:g.explanation };
  });
  return shuffle([...vocabQs, ...kanjiQs, ...gramQs]);
}

function renderQuizSetup(panel){
  panel.innerHTML = `<div class="kana-rule-note">QCM d'entraînement : <b>60 questions</b> (20 vocabulaire + 20 kanji + 20 grammaire), mélangées à chaque session, romaji + explication après chaque réponse. Compte ~15 min. Pas de chronomètre — pour l'entraînement chronométré, utilise l'Examen blanc.</div>
    <button class="continue-btn" id="jlptQuizStart">🎯 Commencer le quiz (60 questions)</button>`;
  panel.querySelector('#jlptQuizStart').addEventListener('click', ()=>{
    quizState = { deck: buildQuizDeck(), idx:0, correct:0, byType:{Vocabulaire:[0,0],Kanji:[0,0],Grammaire:[0,0]} };
    renderQuizCard(panel);
  });
}

// Affiche une ligne de choix avec romaji en sous-titre (sauf pour les traductions françaises)
function choiceButtonsHtml(choices, choicesRomaji, ok){
  return choices.map((c,i)=>`<button class="kqc-btn" data-ok="${c===ok}" data-choice="${escapeHtml(c)}">${escapeHtml(c)}${choicesRomaji?`<span class="kqc-btn-rom">${escapeHtml(choicesRomaji[i])}</span>`:''}</button>`).join('');
}

function renderQuizCard(panel){
  const q = quizState;
  if(q.idx >= q.deck.length){
    const pct = Math.round((q.correct/q.deck.length)*100);
    const line = t => `${t} : ${q.byType[t][0]}/${q.byType[t][1]}`;
    if(!q.recorded){ q.recorded = true; addQuizStat('jlpt', q.correct, q.deck.length); registerStudyActivity(); }
    const best = bestQuizScore('jlpt');
    panel.innerHTML = `<div class="kana-quiz-done">
      <div class="kqd-score">${q.correct}/${q.deck.length} — ${pct}%</div>
      ${best ? `<div class="kqd-best">Ton record : ${best.correct}/${best.total} (${Math.round(best.pct*100)} %)</div>` : ''}
      <div class="kqd-msg">${pct>=80?'🎉 Niveau examen atteint !':pct>=55?'👍 Tu serais reçue — continue pour la marge.':'💪 Revois les sections faibles ci-dessous.'}</div>
      <p style="font-size:13px;color:#7a7268;">${line('Vocabulaire')} · ${line('Kanji')} · ${line('Grammaire')}</p>
      <button class="kana-quiz-restart" id="jlptQuizRestart">🔄 Nouvelle session</button>
    </div>`;
    panel.querySelector('#jlptQuizRestart').addEventListener('click', ()=> renderQuizSetup(panel));
    return;
  }
  const card = q.deck[q.idx];
  panel.innerHTML = `<div class="kana-quiz-card">
    <div class="kqc-progress">${q.idx+1} / ${q.deck.length} · <span class="jq-type">${card.type}</span></div>
    <div class="jq-question">${escapeHtml(card.q)}</div>
    ${card.qRomaji ? `<div class="jq-q-romaji">${escapeHtml(card.qRomaji)}</div>` : ''}
    <div class="kqc-choices listen-choices">
      ${choiceButtonsHtml(card.choices, card.choicesRomaji, card.ok)}
    </div>
    <div id="jqReveal"></div>
  </div>`;
  panel.querySelectorAll('.kqc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const ok = btn.dataset.ok === 'true';
      q.byType[card.type][1]++;
      if(ok){ btn.classList.add('correct'); q.correct++; q.byType[card.type][0]++; }
      else { btn.classList.add('wrong'); panel.querySelector('[data-ok="true"]').classList.add('correct'); }
      panel.querySelectorAll('.kqc-btn').forEach(b=>b.disabled=true);
      speak(card.jp, 0.85);
      panel.querySelector('#jqReveal').innerHTML = `<div class="listen-reveal">${escapeHtml(card.explanation)}</div><button class="continue-btn" id="jqNext" style="margin-top:12px;">Continuer</button>`;
      panel.querySelector('#jqNext').addEventListener('click', ()=>{ q.idx++; renderQuizCard(panel); });
    });
  });
}

// ---------- 6e. Conseils examen ----------
function renderTipsPanel(panel){
  const weak = weakCategory();
  const weakHtml = weak
    ? `<div class="weak-point-banner">📌 <b>Ton point faible actuel :</b> ${escapeHtml(weak.cat)} (${weak.correct}/${weak.total} soit ${Math.round(weak.ratio*100)}% de réussite sur tes examens blancs). Concentre tes prochaines sessions sur cette section.</div>`
    : `<div class="weak-point-banner weak-point-empty">📌 Passe un <b>Examen blanc</b> et sauvegarde le résultat pour voir apparaître ton point faible ici.</div>`;

  panel.innerHTML = `
    <h4 class="kana-table-title">📋 Format officiel de l'examen (source : JEES)</h4>
    <div class="kana-table-wrap"><table class="gram jlpt-plan">
      <tr><th>Section</th><th>Durée</th><th>Questions</th><th>Score max</th></tr>
      <tr><td>1 — Vocabulaire (文字・語彙)</td><td>25 min</td><td>~35</td><td>60 pts</td></tr>
      <tr><td>2 — Grammaire + lecture (文法・読解)</td><td>50 min</td><td>~35</td><td>60 pts</td></tr>
      <tr><td>3 — Compréhension orale (聴解)</td><td>30 min</td><td>~30</td><td>60 pts</td></tr>
    </table></div>
    <div class="kana-rule-note" style="margin-top:12px;">Score total : <b>180 points</b>. Il existe un <b>score minimum par section</b> — on peut être éliminé sur une seule section, même avec un excellent score global. Seuil couramment cité : <b>≥ 19/60 par section</b> ET <b>≥ 80/180 au total</b> (à reconfirmer auprès du JEES pour la session exacte).</div>

    <h4 class="kana-table-title" style="margin-top:20px;">🎯 Conseils stratégiques</h4>
    <ul class="tips-list">
      <li>Ne laisse <b>jamais</b> une question sans réponse — il n'y a aucune pénalité pour une mauvaise réponse.</li>
      <li><b>Section vocabulaire :</b> commence par ce que tu connais, reviens sur les autres à la fin.</li>
      <li><b>Section grammaire :</b> lis toute la phrase avant de répondre — le sens général aide souvent plus que la règle isolée.</li>
      <li><b>Section orale :</b> le texte n'est lu qu'une seule fois — concentre-toi sur les mots-clés (qui, quoi, quand, où), pas sur chaque mot.</li>
      <li>Arrive <b>20 minutes avant</b> le début de l'épreuve.</li>
      <li>Apporte ta <b>convocation</b> + une <b>pièce d'identité</b> valide.</li>
    </ul>

    <h4 class="kana-table-title" style="margin-top:20px;">🇫🇷 Inscription en France</h4>
    <ul class="tips-list">
      <li>Inscription à l'<b>INALCO Paris</b>, généralement en septembre/octobre.</li>
      <li>Examen en <b>décembre</b>.</li>
      <li>Frais d'inscription : <b>65 €</b>.</li>
      <li>Résultats communiqués par courrier <b>courant mars</b>.</li>
    </ul>

    <h4 class="kana-table-title" style="margin-top:20px;">🔍 Ton point faible</h4>
    ${weakHtml}
  `;
}

// ---------- 6f. Examen blanc (mode B) ----------
const SECTION_META = {
  Vocabulaire: { minutes:25, label:'Section 1 — Vocabulaire (文字・語彙)' },
  Grammaire:   { minutes:50, label:'Section 2 — Grammaire + lecture (文法・読解)' },
  Oral:        { minutes:30, label:'Section 3 — Compréhension orale (聴解)' },
};
const SECTION_ORDER = ['Vocabulaire','Grammaire','Oral'];
const PASS_TOTAL = 80, PASS_SECTION = 19;

function buildExamSection1(){
  // 20 vocabulaire (sens) + 15 lecture de kanji = 35, comme la vraie section 文字・語彙
  const vocabQs = shuffle(N5_VOCAB_ALL).slice(0,20).map(v=>{
    const others = shuffle(N5_VOCAB_ALL.filter(x=>x.fr!==v.fr)).slice(0,3).map(x=>x.fr);
    return { kind:'vocab', q:`Que signifie « ${v.jp} » (${v.romaji}) ?`, jp:v.jp, choices:shuffle([v.fr,...others]), ok:v.fr, tag:v.jp };
  });
  const kanjiQs = shuffle(N5_KANJI_ALL).slice(0,15).map(k=>{
    const reading = k.kun !== '—' ? k.kun : k.on;
    const pool = N5_KANJI_ALL.filter(x=>x.k!==k.k).map(x=> x.kun!=='—' ? x.kun : x.on);
    const choices = shuffle([reading,...shuffle([...new Set(pool)]).slice(0,3)]);
    return { kind:'kanji', q:`Quelle est la lecture de « ${k.k} » (${k.fr}) ?`, jp:k.k, choices, choicesRomaji:choices.map(kanaToRomaji), ok:reading, tag:k.k };
  });
  return shuffle([...vocabQs, ...kanjiQs]);
}
function buildExamSection2(){
  // 35 questions de grammaire à trous — les 24 structures existantes sont cyclées (mélangées deux fois) pour atteindre 35
  const pool = shuffle([...N5_GRAMMAR_QUIZ, ...shuffle(N5_GRAMMAR_QUIZ)]).slice(0,35);
  return pool.map(g => {
    const sc = shuffleChoicePair(g.choices, g.choicesRomaji);
    return { kind:'grammar', q:g.q, qRomaji:g.qRomaji, jp:g.q.replace('＿', g.ok), choices:sc.choices, choicesRomaji:sc.choicesRomaji, ok:g.ok, tag:g.ok, explanation:g.explanation };
  });
}
function buildExamSection3(){
  // Compréhension orale : dialogue affiché (jp + romaji) + lu par le TTS, puis question sur le sens
  const npcTurns = CONVERSATIONS.filter(c=>Array.isArray(c.turns)).flatMap(c=>c.turns.filter(t=>t.speaker==='npc' && t.jp && t.fr));
  const picked = shuffle(npcTurns).slice(0,20);
  return picked.map(t=>{
    const others = shuffle(npcTurns.filter(x=>x.fr!==t.fr)).slice(0,3).map(x=>x.fr);
    return { kind:'listening', q:'Qu\'est-ce que la personne vient de dire ?', jp:t.jp, romaji:t.romaji, choices:shuffle([t.fr,...others]), ok:t.fr, tag:'Compréhension orale' };
  });
}

function renderExamSetup(panel){
  const weak = weakCategory();
  panel.innerHTML = `
    <div class="kana-rule-note"><b>Examen blanc complet</b>, fidèle au format réel : 3 sections chronométrées (25 + 50 + 30 min), 90 questions au total. Pendant l'examen, pas de correction immédiate — comme le vrai jour J. Le rapport final arrive à la fin. La section passe automatiquement soit quand le temps est écoulé, soit dès que tu as répondu à toutes les questions.</div>
    ${weak ? `<div class="weak-point-banner">📌 Point à surveiller : <b>${escapeHtml(weak.cat)}</b> (${Math.round(weak.ratio*100)}% de réussite jusqu'ici).</div>` : ''}
    <button class="continue-btn" id="jlptExamStart">📝 Commencer l'examen blanc</button>
  `;
  panel.querySelector('#jlptExamStart').addEventListener('click', ()=>{
    examState = {
      sections: { Vocabulaire: buildExamSection1(), Grammaire: buildExamSection2(), Oral: buildExamSection3() },
      sectionIdx: 0, idx: 0, timerId:null, secondsLeft:0,
      results: { Vocabulaire:{correct:0,total:0}, Grammaire:{correct:0,total:0}, Oral:{correct:0,total:0} },
      errors: [],
    };
    startExamSection(panel);
  });
}

function startExamSection(panel){
  const sectionName = SECTION_ORDER[examState.sectionIdx];
  examState.idx = 0;
  examState.secondsLeft = SECTION_META[sectionName].minutes * 60;
  if(examState.timerId) clearInterval(examState.timerId);
  examState.timerId = setInterval(()=>{
    examState.secondsLeft--;
    const t = document.getElementById('examTimer');
    if(t) t.textContent = fmtTime(examState.secondsLeft);
    if(examState.secondsLeft <= 0){ advanceExamSection(panel); }
  }, 1000);
  renderExamQuestion(panel);
}
function fmtTime(s){
  s = Math.max(0, s);
  const m = Math.floor(s/60), sec = s%60;
  return `${m}:${sec.toString().padStart(2,'0')}`;
}

function advanceExamSection(panel){
  if(examState.timerId){ clearInterval(examState.timerId); examState.timerId = null; }
  examState.sectionIdx++;
  if(examState.sectionIdx >= SECTION_ORDER.length){ renderExamReport(panel); return; }
  startExamSection(panel);
}

function renderExamQuestion(panel){
  const sectionName = SECTION_ORDER[examState.sectionIdx];
  const deck = examState.sections[sectionName];
  if(examState.idx >= deck.length){ advanceExamSection(panel); return; }
  const card = deck[examState.idx];
  const meta = SECTION_META[sectionName];

  let bodyHtml = '';
  if(card.kind === 'listening'){
    bodyHtml = `<div class="exam-listen-box">
      <div class="jp-text" data-jp="${escapeHtml(card.jp)}">${escapeHtml(card.jp)}</div>
      <div class="romaji">${escapeHtml(card.romaji||'')}</div>
      <button class="listen-btn" id="examReplay">▶ Réécouter</button>
    </div>`;
  } else if(card.kind === 'grammar'){
    bodyHtml = `<div class="jq-question">${escapeHtml(card.q)}</div><div class="jq-q-romaji">${escapeHtml(card.qRomaji)}</div>`;
  } else {
    bodyHtml = `<div class="jq-question">${escapeHtml(card.q)}</div>`;
  }

  panel.innerHTML = `
    <div class="exam-section-head">
      <span>${meta.label}</span>
      <span class="exam-timer" id="examTimer">${fmtTime(examState.secondsLeft)}</span>
    </div>
    <div class="kqc-progress">${examState.idx+1} / ${deck.length}</div>
    <div class="kana-quiz-card">
      ${bodyHtml}
      <div class="kqc-choices listen-choices">
        ${choiceButtonsHtml(card.choices, card.choicesRomaji, card.ok)}
      </div>
    </div>
  `;
  if(card.kind === 'listening'){
    speak(card.jp, 0.85);
    panel.querySelector('#examReplay').addEventListener('click', ()=> speak(card.jp, 0.85));
  }
  panel.querySelectorAll('.kqc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const ok = btn.dataset.ok === 'true';
      const sec = examState.results[sectionName];
      sec.total++;
      if(ok) sec.correct++;
      else examState.errors.push({ section:sectionName, kind:card.kind, tag:card.tag, chosen:btn.dataset.choice, correct:card.ok });
      examState.idx++;
      renderExamQuestion(panel);
    });
  });
}

// Regroupe les erreurs par type et retourne les 3 plus fréquentes, avec un libellé lisible
function topErrorTypes(errors){
  const counts = {};
  errors.forEach(e=>{
    let key;
    if(e.kind === 'grammar'){
      const pair = [e.chosen, e.correct].sort().join(' / ');
      key = `Tu confonds souvent ${pair}`;
    } else if(e.kind === 'kanji'){
      key = `Lecture de kanji à revoir : ${e.tag}`;
    } else if(e.kind === 'vocab'){
      key = `Vocabulaire à revoir : ${e.tag}`;
    } else {
      key = 'Compréhension orale — mots-clés manqués';
    }
    counts[key] = (counts[key]||0) + 1;
  });
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k);
}

function renderExamReport(panel){
  const scores = {};
  SECTION_ORDER.forEach(s=>{
    const r = examState.results[s];
    scores[s] = { correct:r.correct, total:r.total, score60: r.total ? Math.round((r.correct/r.total)*60) : 0 };
  });
  const total = SECTION_ORDER.reduce((sum,s)=> sum + scores[s].score60, 0);
  const failedSections = SECTION_ORDER.filter(s => scores[s].score60 < PASS_SECTION);
  const passed = total >= PASS_TOTAL && failedSections.length === 0;
  const topErrors = topErrorTypes(examState.errors);

  const record = { date: new Date().toISOString(), scores, total, passed, failedSections, topErrors };
  // Un examen blanc complet est une vraie session de travail : il doit compter dans la série.
  registerStudyActivity();

  panel.innerHTML = `
    <div class="exam-report">
      <div class="exam-verdict ${passed?'pass':'fail'}">${passed ? '🎉 Réussi' : '💪 Échoué'}</div>
      <div class="exam-total">${total} / 180</div>
      <div class="exam-score-grid">
        ${SECTION_ORDER.map(s=>`<div class="exam-score-cell ${scores[s].score60<PASS_SECTION?'weak':''}"><b>${s}</b><span>${scores[s].correct}/${scores[s].total} · ${scores[s].score60}/60</span></div>`).join('')}
      </div>
      ${failedSections.length ? `<div class="listen-reveal">Section${failedSections.length>1?'s':''} sous le seuil (< 19/60) : <b>${failedSections.join(', ')}</b>${!passed && failedSections.length===0 ? ' — c\'est le score total qui manque.' : ''}</div>` : (!passed ? `<div class="listen-reveal">Toutes les sections sont au-dessus du seuil, mais le total (${total}/180) reste sous 80.</div>` : '')}
      ${topErrors.length ? `<div class="exam-errors"><b>Top erreurs à retravailler :</b><ul class="tips-list">${topErrors.map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ul></div>` : ''}
      <button class="continue-btn" id="examSave">💾 Sauvegarder ce résultat</button>
      <button class="kana-quiz-restart" id="examRestart" style="margin-top:10px;">🔄 Nouvel examen blanc</button>
    </div>
  `;
  panel.querySelector('#examSave').addEventListener('click', (e)=>{
    saveHistoryRecord(record);
    e.target.textContent = '✓ Sauvegardé';
    e.target.disabled = true;
  });
  panel.querySelector('#examRestart').addEventListener('click', ()=> renderExamSetup(panel));
}

// ---------- 6g. Historique ----------
function renderHistoryPanel(panel){
  const history = loadHistory();
  if(history.length === 0){
    panel.innerHTML = `<div class="kana-rule-note">Aucun examen blanc sauvegardé pour l'instant. Passe un <b>Examen blanc</b> et clique « 💾 Sauvegarder ce résultat » pour commencer ton historique.</div>`;
    return;
  }
  const maxTotal = 180;
  const fmt = iso => new Date(iso).toLocaleDateString('fr-FR', { day:'numeric', month:'short', year:'numeric' });
  const weak = weakCategory();

  let html = `<div class="kana-rule-note"><b>${history.length} examen${history.length>1?'s':''} blanc${history.length>1?'s':''} sauvegardé${history.length>1?'s':''}.</b> ${weak ? `Catégorie à retravailler en priorité : <b>${escapeHtml(weak.cat)}</b> (${Math.round(weak.ratio*100)}% de réussite cumulée).` : ''}</div>`;

  html += `<h4 class="kana-table-title">Progression du score total</h4><div class="history-chart">`;
  history.forEach((r,i)=>{
    const h = Math.max(4, Math.round((r.total/maxTotal)*100));
    html += `<div class="history-bar" title="${fmt(r.date)} : ${r.total}/180">
      <div class="history-bar-fill ${r.passed?'pass':'fail'}" style="height:${h}%"></div>
      <span class="history-bar-label">${r.total}</span>
    </div>`;
  });
  html += `</div>`;

  html += `<h4 class="kana-table-title" style="margin-top:20px;">Détail des examens</h4>
  <div class="kana-table-wrap"><table class="gram jlpt-plan">
    <tr><th>Date</th><th>Total</th><th>Verdict</th><th>Vocabulaire</th><th>Grammaire</th><th>Oral</th></tr>
    ${history.slice().reverse().map(r=>`<tr>
      <td>${fmt(r.date)}</td>
      <td><b>${r.total}/180</b></td>
      <td>${r.passed?'✅ Réussi':'❌ Échoué'}</td>
      <td>${r.scores.Vocabulaire.score60}/60</td>
      <td>${r.scores.Grammaire.score60}/60</td>
      <td>${r.scores.Oral.score60}/60</td>
    </tr>`).join('')}
  </table></div>`;

  panel.innerHTML = html;
}

// ---------- 6h. Planning ----------
// Semaines dynamiques : de maintenant jusqu'à fin novembre de l'année de l'examen
// (le JLPT N5 a lieu le premier dimanche de décembre).
const PLAN_PHASES = [
  { theme:'Hiragana + Katakana complets', goal:'12 leçons kana validées', use:'Alphabet → Parcours (1-2 leçons/j) + Quiz', min:25 },
  { theme:'Phrases ⭐ essentielles + premiers kanji', goal:'50 phrases ⭐ vues, kanji Nombres+Temps', use:'Réviser + Mes phrases (⭐) + JLPT N5 → Kanji', min:30 },
  { theme:'Vocabulaire N5 : la moitié', goal:'~75 mots N5 dans le SRS', use:'JLPT N5 → Vocabulaire + Réviser + Écoute', min:30 },
  { theme:'Vocabulaire N5 : le reste + kanji Verbes', goal:'~150 mots N5, 60 kanji vus', use:'JLPT N5 → Vocabulaire/Kanji + Réviser', min:30 },
  { theme:'Grammaire N5 (structures 1-12)', goal:'12 structures comprises', use:'JLPT N5 → Grammaire + Grammaire + Conversation', min:30 },
  { theme:'Grammaire N5 (structures 13-25)', goal:'25 structures comprises', use:'JLPT N5 → Grammaire + dialogues quotidiens', min:30 },
  { theme:'Kanji : les 103 complets', goal:'Tous les kanji reconnus (quiz ≥ 80 %)', use:'JLPT N5 → Kanji + Quiz rapide', min:30 },
  { theme:'Compréhension orale intensive', goal:'Écoute : ≥ 80 % aux deux modes', use:'Écoute (phrases + prix) + 🎧 dialogues', min:30 },
  { theme:'Premier examen blanc', goal:'Identifier les sections faibles', use:'JLPT N5 → Examen blanc + Conseils', min:30 },
  { theme:'Consolidation ciblée', goal:'Combler les lacunes du 1er examen blanc', use:'Aujourd\'hui + section faible identifiée', min:30 },
  { theme:'Examen blanc + repos actif', goal:'2e examen blanc ≥ 80/180, dormir !', use:'JLPT N5 → Examen blanc + Écoute légère', min:25 },
];

function renderPlanPanel(panel){
  const now = new Date();
  const examYear = now.getMonth() >= 11 ? now.getFullYear()+1 : now.getFullYear();
  const end = new Date(examYear, 10, 30); // 30 novembre
  const weeks = [];
  let cursor = new Date(now);
  cursor.setHours(0,0,0,0);
  // aligner sur le lundi de la semaine courante
  cursor.setDate(cursor.getDate() - ((cursor.getDay()+6)%7));
  while(cursor <= end){
    const wEnd = new Date(cursor); wEnd.setDate(wEnd.getDate()+6);
    weeks.push({ start:new Date(cursor), end:wEnd });
    cursor.setDate(cursor.getDate()+7);
  }
  // répartir les phases sur les semaines disponibles (les dernières = consolidation)
  const fmt = d => d.toLocaleDateString('fr-FR', { day:'numeric', month:'short' });
  let html = `<div class="kana-rule-note"><b>${weeks.length} semaines</b> jusqu'à fin novembre ${examYear} (examen N5 début décembre ${examYear}). Max 30 min/jour — la régularité fait tout. Semaine en cours en surbrillance.</div>
  <div class="kana-table-wrap"><table class="gram jlpt-plan"><tr><th>Semaine</th><th>Thème</th><th>Objectif</th><th>Sections de l'app</th><th>Temps/j</th></tr>`;
  weeks.forEach((w, i)=>{
    const phaseIdx = Math.min(Math.floor(i * PLAN_PHASES.length / weeks.length), PLAN_PHASES.length-1);
    const p = PLAN_PHASES[phaseIdx];
    const isNow = now >= w.start && now <= new Date(w.end.getTime()+86399000);
    html += `<tr class="${isNow?'plan-now':''}"><td><b>S${i+1}</b><br><span class="plan-dates">${fmt(w.start)} – ${fmt(w.end)}</span></td><td>${escapeHtml(p.theme)}</td><td>${escapeHtml(p.goal)}</td><td>${escapeHtml(p.use)}</td><td>~${p.min} min</td></tr>`;
  });
  html += `</table></div>`;
  panel.innerHTML = html;
}
