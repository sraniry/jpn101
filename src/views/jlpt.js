import { N5_KANJI, N5_KANJI_ALL, N5_VOCAB, N5_VOCAB_ALL, N5_GRAMMAR, N5_GRAMMAR_QUIZ } from '../../data/jlpt-n5.js';
import { phrases, newCard, savePhrases, existingKeySet } from '../storage.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';

// ---------- JLPT N5 : kanji, vocabulaire, grammaire, quiz, planning ----------

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

let quizState = null;

export function renderJlpt(){
  const area = document.getElementById('jlptArea');
  quizState = null;
  area.innerHTML = `
    <div class="skills-intro">Préparation <b>JLPT N5</b> : les ${N5_KANJI_ALL.length} kanji officiels, ~${N5_VOCAB_ALL.length} mots essentiels, les ${N5_GRAMMAR.length} structures testées, un quiz type examen et ton planning jusqu'à l'épreuve de décembre.</div>
    <div class="kana-tabs">
      <button class="kana-tab active" data-tab="kanji">漢字 Kanji</button>
      <button class="kana-tab" data-tab="vocab">📖 Vocabulaire</button>
      <button class="kana-tab" data-tab="grammar">📐 Grammaire</button>
      <button class="kana-tab" data-tab="quiz">🎯 Quiz</button>
      <button class="kana-tab" data-tab="plan">🗓️ Planning</button>
    </div>
    <div id="jlpt-panel"></div>
  `;
  area.querySelectorAll('.kana-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      area.querySelectorAll('.kana-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      quizState = null;
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
        const key = (card.jp+'|'+card.romaji).toLowerCase();
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
  let html = `<div class="kana-rule-note"><b>${N5_KANJI_ALL.length} kanji officiels N5.</b> Lecture <b>on'yomi</b> (katakana, d'origine chinoise — dans les mots composés) et <b>kun'yomi</b> (hiragana, japonaise — mot seul). Touche un kanji pour l'entendre.</div>`;
  N5_KANJI.forEach((g, gi)=>{
    html += `<div class="rg-head" style="margin-top:14px;"><h4 class="kana-table-title" style="margin:0;">${g.theme} (${g.items.length})</h4><button class="rg-add jlpt-add" data-group="${gi}">+ Ajouter à mes révisions</button></div><div class="kanji-grid">`;
    g.items.forEach(it=>{
      html += `<div class="kanji-card" data-jp="${it.k}">
        <span class="kj-k">${it.k}</span>
        <span class="kj-rom">音 ${escapeHtml(it.on)} · 訓 ${escapeHtml(it.kun)}</span>
        <span class="kj-fr">${escapeHtml(it.fr)}</span>
        <span class="kj-ex">${escapeHtml(it.ex)}</span>
      </div>`;
    });
    html += `</div>`;
  });
  panel.innerHTML = html;
  panel.querySelectorAll('.kanji-card').forEach(c=> c.addEventListener('click', ()=> speak(c.dataset.jp, 0.8)));
  wireAddButtons(panel, N5_KANJI, it => newCard(it.k, it.on+' / '+it.kun, it.fr, it.ex, 'kanji', 'N5'));
}

// ---------- 6b. Vocabulaire ----------
function renderVocabPanel(panel){
  let html = `<div class="kana-rule-note"><b>~${N5_VOCAB_ALL.length} mots N5 essentiels</b> qui ne sont pas déjà dans le pack de phrases. Touche un mot pour l'entendre, ajoute un thème entier à tes révisions.</div>`;
  N5_VOCAB.forEach((g, gi)=>{
    html += `<div class="rg-head" style="margin-top:14px;"><h4 class="kana-table-title" style="margin:0;">${g.icon} ${g.theme} (${g.items.length})</h4><button class="rg-add jlpt-add" data-group="${gi}">+ Ajouter à mes révisions</button></div><div class="kana-vocab-grid">`;
    g.items.forEach(it=>{
      html += `<div class="kana-vocab-card" data-jp="${escapeHtml(it.jp)}">
        <span class="kvc-jp">${escapeHtml(it.jp)}</span>
        <span class="kvc-rom">${escapeHtml(it.romaji)}</span>
        <span class="kvc-fr">${escapeHtml(it.fr)}</span>
      </div>`;
    });
    html += `</div>`;
  });
  panel.innerHTML = html;
  panel.querySelectorAll('.kana-vocab-card').forEach(c=> c.addEventListener('click', ()=> speak(c.dataset.jp, 0.85)));
  wireAddButtons(panel, N5_VOCAB, it => newCard(it.jp, it.romaji, it.fr, '', 'N5', 'N5'));
}

// ---------- 6c. Grammaire ----------
function renderGrammarPanel(panel){
  let html = `<div class="kana-rule-note">Les <b>${N5_GRAMMAR.length} structures testées au N5</b>. Celles marquées ✓ sont déjà expliquées en détail dans l'onglet Grammaire. Touche un exemple pour l'entendre.</div>`;
  N5_GRAMMAR.forEach(g=>{
    html += `<div class="jlpt-gram">
      <div class="jg-head"><span class="jg-s">${escapeHtml(g.s)}</span>${g.covered?'<span class="jg-covered">✓ dans Grammaire</span>':'<span class="jg-new">nouveau</span>'}</div>
      <div class="jg-fr">${escapeHtml(g.fr)}</div>
      ${g.ex.map(e=>`<div class="jg-ex" data-jp="${escapeHtml(e.jp)}">🔊 <b>${escapeHtml(e.jp)}</b><span class="jg-rom">${escapeHtml(e.romaji)}</span><span class="jg-tr">${escapeHtml(e.fr)}</span></div>`).join('')}
    </div>`;
  });
  panel.innerHTML = html;
  panel.querySelectorAll('.jg-ex').forEach(e=> e.addEventListener('click', ()=> speak(e.dataset.jp, 0.85)));
}

// ---------- 6d. Quiz ----------
// 60 questions : 20 vocabulaire + 20 kanji (générées depuis les données) + 20 grammaire (rédigées)
function buildQuizDeck(){
  const vocabQs = shuffle(N5_VOCAB_ALL).slice(0,20).map(v=>{
    const others = shuffle(N5_VOCAB_ALL.filter(x=>x.fr!==v.fr)).slice(0,3).map(x=>x.fr);
    return { type:'Vocabulaire', q:`Que signifie « ${v.jp} » (${v.romaji}) ?`, jp:v.jp, choices:shuffle([v.fr,...others]), ok:v.fr };
  });
  const kanjiQs = shuffle(N5_KANJI_ALL).slice(0,20).map(k=>{
    const reading = k.kun !== '—' ? k.kun : k.on;
    const pool = N5_KANJI_ALL.filter(x=>x.k!==k.k).map(x=> x.kun!=='—' ? x.kun : x.on);
    return { type:'Kanji', q:`Quelle est la lecture de « ${k.k} » (${k.fr}) ?`, jp:k.k, choices:shuffle([reading,...shuffle([...new Set(pool)]).slice(0,3)]), ok:reading };
  });
  const gramQs = shuffle(N5_GRAMMAR_QUIZ).slice(0,20).map(g=>(
    { type:'Grammaire', q:`Complète : ${g.q}`, jp:g.q.replace('＿', g.ok), choices:shuffle([...g.choices]), ok:g.ok, hint:g.hint }
  ));
  return shuffle([...vocabQs, ...kanjiQs, ...gramQs]);
}

function renderQuizSetup(panel){
  panel.innerHTML = `<div class="kana-rule-note">QCM type examen : <b>60 questions</b> (20 vocabulaire + 20 kanji + 20 grammaire), mélangées à chaque session. Compte ~15 min. Au vrai N5 il faut ~55 % de bonnes réponses pour être reçu — vise 80 %.</div>
    <button class="continue-btn" id="jlptQuizStart">🎯 Commencer le quiz (60 questions)</button>`;
  panel.querySelector('#jlptQuizStart').addEventListener('click', ()=>{
    quizState = { deck: buildQuizDeck(), idx:0, correct:0, byType:{Vocabulaire:[0,0],Kanji:[0,0],Grammaire:[0,0]} };
    renderQuizCard(panel);
  });
}

function renderQuizCard(panel){
  const q = quizState;
  if(q.idx >= q.deck.length){
    const pct = Math.round((q.correct/q.deck.length)*100);
    const line = t => `${t} : ${q.byType[t][0]}/${q.byType[t][1]}`;
    panel.innerHTML = `<div class="kana-quiz-done">
      <div class="kqd-score">${q.correct}/${q.deck.length} — ${pct}%</div>
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
    <div class="kqc-choices listen-choices">
      ${card.choices.map(c=>`<button class="kqc-btn" data-ok="${c===card.ok}">${escapeHtml(c)}</button>`).join('')}
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
      const hint = card.hint ? `<div class="listen-reveal">${escapeHtml(card.hint)}</div>` : '';
      panel.querySelector('#jqReveal').innerHTML = hint + `<button class="continue-btn" id="jqNext" style="margin-top:12px;">Continuer</button>`;
      panel.querySelector('#jqNext').addEventListener('click', ()=>{ q.idx++; renderQuizCard(panel); });
    });
  });
}

// ---------- 6e. Planning ----------
// Semaines dynamiques : de maintenant jusqu'à fin novembre de l'année de l'examen
// (le JLPT N5 a lieu le premier dimanche de décembre).
const PLAN_PHASES = [
  { theme:'Hiragana + Katakana complets', goal:'12 leçons kana validées', use:'Alphabet → Parcours (1-2 leçons/j) + Quiz', min:25 },
  { theme:'Phrases ⭐ essentielles + premiers kanji', goal:'50 phrases ⭐ vues, kanji Nombres+Temps', use:'Réviser + Mes phrases (⭐) + JLPT N5 → Kanji', min:30 },
  { theme:'Vocabulaire N5 : la moitié', goal:'~75 mots N5 dans le SRS', use:'JLPT N5 → Vocabulaire + Réviser + Écoute', min:30 },
  { theme:'Vocabulaire N5 : le reste + kanji Verbes', goal:'~150 mots N5, 60 kanji vus', use:'JLPT N5 → Vocabulaire/Kanji + Réviser', min:30 },
  { theme:'Grammaire N5 (structures 1-12)', goal:'12 structures comprises', use:'JLPT N5 → Grammaire + Grammaire + Conversation', min:30 },
  { theme:'Grammaire N5 (structures 13-25)', goal:'25 structures comprises', use:'JLPT N5 → Grammaire + dialogues quotidiens', min:30 },
  { theme:'Kanji : les 103 complets', goal:'Tous les kanji reconnus (quiz ≥ 80 %)', use:'JLPT N5 → Kanji + Quiz kanji', min:30 },
  { theme:'Compréhension orale intensive', goal:'Écoute : ≥ 80 % aux deux modes', use:'Écoute (phrases + prix) + 🎧 dialogues', min:30 },
  { theme:'Quiz complets + révision des faibles', goal:'Quiz 60 questions ≥ 70 %', use:'JLPT N5 → Quiz + Réviser (cartes ratées)', min:30 },
  { theme:'Consolidation : SRS + quiz quotidiens', goal:'File de révision à zéro chaque jour', use:'Aujourd\'hui (programme complet) + Quiz', min:30 },
  { theme:'Simulation examen + repos actif', goal:'2 quiz complets ≥ 80 %, dormir !', use:'JLPT N5 → Quiz + Écoute légère', min:25 },
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
