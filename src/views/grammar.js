import { GRAMMAR_HTML } from '../../data/grammar.js';
import { GRAMMAR_DRILLS } from '../../data/grammar-drills.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';
import { registerStudyActivity, addQuizStat, getGrammarDrills, markGrammarDrill } from '../storage.js';
import { celebrate, quizLine } from '../encouragement.js';
import { celebrateNewBadges } from '../badges.js';

// ---------- Grammaire : référence + mini-drill par section ----------
// La référence reste du HTML statique (data/grammar.js). On l'injecte, puis on rattache
// un exercice à chaque section en se basant sur son titre <h3> : les drills restent ainsi
// alignés même si l'ordre des sections change, et une section sans drill est simplement ignorée.

const PASS_THRESHOLD = 0.8;
let drillState = null; // { key, questions, idx, correct, answered }

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
// Mélange choices et choicesRomaji ensemble : la bonne réponse est toujours écrite en premier
// dans les données, il ne faut jamais l'afficher en première position.
function shuffleChoices(q){
  const idx = shuffle(q.choices.map((_,i)=>i));
  return {
    ...q,
    choices: idx.map(i=>q.choices[i]),
    choicesRomaji: q.choicesRomaji ? idx.map(i=>q.choicesRomaji[i] || '') : null,
  };
}

export function renderGrammar(){
  const area = document.getElementById('grammarArea');
  const done = getGrammarDrills();
  area.innerHTML = `<div class="skills-intro">Ta référence de grammaire — et, sous chaque règle, un <b>mini-drill</b> pour la mettre en pratique tout de suite. Lire une règle ne l'ancre pas ; répondre à six questions dessus, si.</div>
    <div class="gram-progress">
      <div class="conv-progress-head"><span><b>${done.length}</b> / ${GRAMMAR_DRILLS.length} règles validées</span><span>${Math.round((done.length/GRAMMAR_DRILLS.length)*100)} %</span></div>
      <div class="today-track"><div class="today-track-fill" style="width:${(done.length/GRAMMAR_DRILLS.length)*100}%"></div></div>
    </div>` + GRAMMAR_HTML;

  // Rattache chaque drill à sa section par le titre
  area.querySelectorAll('.gram-section').forEach(section=>{
    const title = section.querySelector('h3');
    if(!title) return;
    const label = title.textContent.trim();
    const drill = GRAMMAR_DRILLS.find(d => label.startsWith(d.section));
    if(!drill) return;
    const isDone = done.includes(drill.section);
    if(isDone) title.insertAdjacentHTML('beforeend', ' <span class="gram-done-pill">✓ validée</span>');
    const host = document.createElement('div');
    host.className = 'gram-drill';
    host.dataset.key = drill.section;
    host.innerHTML = drillLauncherHtml(drill, isDone);
    section.appendChild(host);
  });

  area.addEventListener('click', onGrammarClick);
}

function drillLauncherHtml(drill, isDone){
  return `<button class="gram-drill-start" data-key="${escapeHtml(drill.section)}">
    🎯 ${isDone ? 'Refaire le drill' : 'S\'entraîner'} — ${drill.questions.length} questions
  </button>
  <p class="gram-drill-intro">${escapeHtml(drill.intro)}</p>`;
}

function onGrammarClick(e){
  const start = e.target.closest('.gram-drill-start');
  if(start){
    const drill = GRAMMAR_DRILLS.find(d => d.section === start.dataset.key);
    if(!drill) return;
    drillState = { key: drill.section, questions: shuffle(drill.questions).map(shuffleChoices), idx:0, correct:0, answered:false };
    renderDrill(start.closest('.gram-drill'));
    return;
  }
  const choice = e.target.closest('.gd-choice');
  if(choice && drillState && !drillState.answered){
    answerDrill(choice);
    return;
  }
  const next = e.target.closest('.gd-next');
  if(next && drillState){
    drillState.idx++; drillState.answered = false;
    renderDrill(next.closest('.gram-drill'));
    return;
  }
  const close = e.target.closest('.gd-close');
  if(close){
    const host = close.closest('.gram-drill');
    const drill = GRAMMAR_DRILLS.find(d => d.section === host.dataset.key);
    drillState = null;
    host.innerHTML = drillLauncherHtml(drill, getGrammarDrills().includes(drill.section));
  }
}

function renderDrill(host){
  const s = drillState;
  if(s.idx >= s.questions.length){
    const pct = s.correct / s.questions.length;
    const passed = pct >= PASS_THRESHOLD;
    if(!s.recorded){
      s.recorded = true;
      addQuizStat('grammar', s.correct, s.questions.length);
      registerStudyActivity();
      if(passed){ markGrammarDrill(s.key); celebrate('grammarDrill', { emoji:'📐', title: 'Règle validée' }); }
      celebrateNewBadges();
    }
    host.innerHTML = `<div class="gd-done">
      <div class="kqd-score">${s.correct}/${s.questions.length} — ${Math.round(pct*100)} %</div>
      <div class="kqd-msg">${passed ? '🎉 Règle validée !' : '💪 Il faut 80 % — relis la règle juste au-dessus et retente.'}</div>
      ${!passed ? `<div class="kqd-teacher">${quizLine(pct*100)}</div>` : ''}
      <button class="gram-drill-start" data-key="${escapeHtml(s.key)}">🔄 Refaire</button>
      <button class="gd-close">Fermer</button>
    </div>`;
    if(passed) refreshGrammarProgress();
    return;
  }
  const q = s.questions[s.idx];
  host.innerHTML = `<div class="gd-card">
    <div class="gd-progress">${s.idx+1} / ${s.questions.length}</div>
    <div class="gd-q">${escapeHtml(q.q)}</div>
    <div class="gd-choices">
      ${q.choices.map((c,i)=>`<button class="gd-choice" data-ok="${c===q.ok}">${escapeHtml(c)}${
        q.choicesRomaji && q.choicesRomaji[i] ? `<span class="gd-choice-rom">${escapeHtml(q.choicesRomaji[i])}</span>` : ''
      }</button>`).join('')}
    </div>
    <div class="gd-reveal"></div>
  </div>`;
}

function answerDrill(btn){
  const s = drillState;
  const q = s.questions[s.idx];
  s.answered = true;
  const ok = btn.dataset.ok === 'true';
  if(ok){ btn.classList.add('correct'); s.correct++; }
  else {
    btn.classList.add('wrong');
    const good = btn.closest('.gd-choices').querySelector('[data-ok="true"]');
    if(good) good.classList.add('correct');
  }
  btn.closest('.gd-choices').querySelectorAll('.gd-choice').forEach(b=>b.disabled = true);
  if(q.say) speak(q.say, 0.85);
  const reveal = btn.closest('.gd-card').querySelector('.gd-reveal');
  reveal.innerHTML = `<div class="listen-reveal">${escapeHtml(q.explanation)}</div>
    <button class="continue-btn gd-next" style="margin-top:12px;">${s.idx+1 >= s.questions.length ? 'Voir mon score' : 'Continuer'}</button>`;
}

// Met à jour la barre de progression en tête d'onglet sans re-rendre toute la référence
function refreshGrammarProgress(){
  const done = getGrammarDrills();
  const wrap = document.querySelector('.gram-progress');
  if(!wrap) return;
  const pct = (done.length / GRAMMAR_DRILLS.length) * 100;
  wrap.querySelector('.conv-progress-head').innerHTML =
    `<span><b>${done.length}</b> / ${GRAMMAR_DRILLS.length} règles validées</span><span>${Math.round(pct)} %</span>`;
  wrap.querySelector('.today-track-fill').style.width = pct + '%';
}
