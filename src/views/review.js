import { phrases, meta, buildQueue, rate, archiveCard, savePhrases, registerStudyActivity, planMark, saveMeta } from '../storage.js';
import { CORE_SET } from '../../data/phrases.js';
import { speak } from '../tts.js';
import { escapeHtml, emptyState, formatExplain, grammarChipsHtml, colorizeJp, renderPitch } from '../util.js';
import { renderHeader, refreshCounters } from '../main.js';
import { celebrate } from '../encouragement.js';
import { celebrateNewBadges } from '../badges.js';

// Objectif de révisions du jour (doit rester aligné avec REVIEW_GOAL_CAP dans today.js) —
// dupliqué en constante locale plutôt qu'importé pour ne pas créer de dépendance croisée
// entre les deux vues pour une seule valeur.
const REVIEW_GOAL_CAP = 30;
let reviewGoalCelebrated = false; // évite de répéter le toast à chaque carte une fois l'objectif atteint
let caughtUpCelebrated = false;   // idem pour "file vidée" : un seul toast par vidage, pas à chaque re-rendu

let reviewQueue = [], currentReview = null, revealed = false;
let drillMode = false, drillInfo = null, drillAnswered = false;
let reviewedSinceBreak = 0, listenMode = false, dicteMode = false;
let interleaveActive = false, interleaveCard = null, interleaveReps = 0;
let lastTyped = '';

// Stats de LA session en cours (remises à zéro à chaque startReviewSession) : elles seules
// permettent de choisir un message qui décrit ce qui vient vraiment de se passer, plutôt
// qu'un texte générique déconnecté de la réalité de la séance.
let sessionTotal = 0, sessionGoodOrEasy = 0, sessionParticleWrong = 0;

// Appelé après chaque carte notée : vérifie l'objectif du jour et les badges (cartes ancrées,
// pareto bouclé…) sans jamais répéter le même toast deux fois dans la même session. Le
// message choisi reflète les vraies stats de la séance (particules ratées, bonnes notes
// majoritaires, ou simple décompte), jamais un texte générique.
function afterRate(){
  celebrateNewBadges();
  if(!reviewGoalCelebrated && meta.plan && meta.plan.reviews >= REVIEW_GOAL_CAP){
    reviewGoalCelebrated = true;
    if(sessionParticleWrong >= 3){
      celebrate('reviewParticleMistakes', { emoji:'🔁', title:'Objectif du jour atteint' });
    } else if(sessionTotal > 0 && sessionGoodOrEasy / sessionTotal >= 0.75){
      celebrate('reviewGoodGrades', { emoji:'🔁', title:'Objectif du jour atteint' });
    } else {
      celebrate('reviewCount', { emoji:'🎯', title:'Objectif du jour atteint', params:{ n: sessionTotal } });
    }
  }
}

const PARTICLE_SET = ['は','が','を','に','で','の'];
function findParticleForDrill(jp){
  for(const p of PARTICLE_SET){
    const idx = jp.indexOf(p);
    if(idx > 0) return {particle:p, idx};
  }
  return null;
}

// Le drill doit rester lisible sans savoir lire les kanji : on affiche le romaji, mais en
// masquant la particule cherchée (sinon la réponse est donnée). は se lit « wa » quand c'est
// la particule thème, を se transcrit « wo » ou « o » selon les packs : on couvre les deux.
const PARTICLE_ROMAJI = { 'は':['wa'], 'が':['ga'], 'を':['wo','o'], 'に':['ni'], 'で':['de'], 'の':['no'] };
function maskParticleInRomaji(romaji, particle){
  if(!romaji) return '';
  let out = romaji;
  (PARTICLE_ROMAJI[particle] || []).forEach(r=>{
    // \b évite de trouer « watashi » en cherchant « wa »
    out = out.replace(new RegExp('\\b' + r + '\\b', 'gi'), '＿');
  });
  return out;
}

// ---------- Filtre par compétence (clic sur une carte de l'onglet Compétences) ----------
let reviewFilterTag = null;
export function setReviewFilterTag(tag){ reviewFilterTag = (tag && tag !== 'all') ? tag : null; }
export function getReviewFilterTag(){ return reviewFilterTag; }

// ---------- answer checking ----------
function normalize(s){
  return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
}
// Synonymes français acceptés comme équivalents (ex: désolé = pardon = excusez-moi)
const SYN_CANON = [
  ['desole','pardon','excusez moi','excuse moi','excuses moi'],
  ['veux','voudrais','aimerais','souhaite','souhaiterais'],
  ['comprends','saisis','pige','vois'],
  ['petit ami','copain'],
  ['petite amie','copine'],
  ['travail','boulot','job','taf'],
  ['content','heureux','ravi','enchante','content e'],
  ['vite','rapide','rapidement'],
  ['bonjour','salut','coucou'],
  ['au revoir','a plus','a bientot','salut'],
  ['tres','vraiment','trop'],
  ['bon marche','pas cher','abordable'],
  ['fatigue','epuise','crève']
];
function canonicalize(s){
  let out = ' ' + s + ' ';
  SYN_CANON.forEach(group=>{
    const canon = ' ' + group[0] + ' ';
    for(let i=1;i<group.length;i++){ out = out.split(' '+group[i]+' ').join(canon); }
  });
  return out.trim();
}
// Mode « lecture » : le japonais est au recto, on tape sa lecture en romaji. On ignore la
// casse, la ponctuation et la longueur des voyelles (ou/oo/o, uu/u) : l'objectif est de
// vérifier qu'on sait LIRE les kana/kanji, pas de sanctionner une convention d'écriture.
function romajiKey(s){
  return (s||'').toLowerCase().replace(/ō/g,'oo').replace(/ū/g,'uu').replace(/[^a-z]/g,'')
    .replace(/ou/g,'o').replace(/oo/g,'o').replace(/uu/g,'u');
}
function editDistance(a,b){
  const d = Array.from({length:a.length+1},(_,i)=>[i]);
  for(let j=1;j<=b.length;j++) d[0][j]=j;
  for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++)
    d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return d[a.length][b.length];
}
function checkRomaji(typed, correct){
  const a = romajiKey(typed), b = romajiKey(correct);
  if(!a) return null;
  if(a === b) return 'good';
  return editDistance(a,b) <= Math.max(1, Math.round(b.length*0.15)) ? 'close' : 'off';
}
function readMode(){ return meta.reviewReadMode !== false; } // défaut : on tape la lecture
function checkAnswer(typed, correct){
  const a = canonicalize(normalize(typed)), b = canonicalize(normalize(correct));
  if(!a) return null;
  if(a === b) return 'good';
  const at = a.split(' ').filter(w=>w.length>2);
  const bt = b.split(' ').filter(w=>w.length>2);
  if(bt.length){
    const overlap = at.filter(w=>bt.includes(w)).length;
    if(overlap / bt.length >= 0.5) return 'good';
  }
  if(b.includes(a) || a.includes(b)) return 'close';
  const someShared = at.some(w=>bt.includes(w));
  return someShared ? 'close' : 'off';
}

// ---------- review ----------
let hadCardsThisSession = false; // pour ne fêter "file vidée" que si elle vient d'être vidée, pas si elle est née vide

export function startReviewSession(){
  reviewQueue = buildQueue();
  if(reviewFilterTag){
    const filtered = reviewQueue.filter(c => c.tag === reviewFilterTag);
    // Un filtre qui ne laisse aucune carte due serait un cul-de-sac : on le relâche plutôt que
    // d'afficher « rien à revoir » alors qu'il reste des cartes dans les autres thèmes.
    if(filtered.length) reviewQueue = filtered; else reviewFilterTag = null;
  }
  reviewQueue._startCount = reviewQueue.length;
  if(reviewQueue.length > 0) hadCardsThisSession = true;
  sessionTotal = 0; sessionGoodOrEasy = 0; sessionParticleWrong = 0;
  reviewedSinceBreak = 0; interleaveActive = false; nextReviewCard();
}
function nextReviewCard(){
  revealed = false; listenMode = false; lastTyped = ''; drillMode = false; drillAnswered = false;
  if(reviewQueue.length === 0){
    currentReview = null; renderReview();
    if(hadCardsThisSession && !caughtUpCelebrated){
      caughtUpCelebrated = true;
      celebrate('reviewCaughtUp', { emoji:'✅', title: 'File vidée' });
    }
    return;
  }
  currentReview = reviewQueue[0];
  if(currentReview.reps === 0) meta.newIntroducedCount = (meta.newIntroducedCount||0)+1;
  const candidate = currentReview.reps > 0 ? findParticleForDrill(currentReview.jp) : null;
  if(candidate && Math.random() < 0.5){ drillMode = true; drillInfo = candidate; }
  renderReview();
}
export function renderReview(){
  const area = document.getElementById('reviewArea');
  if(phrases.length === 0){ area.innerHTML = emptyState('まだ何もない', 'Va dans « Mes phrases » et importe le pack A0 → A2, ou ajoute tes propres phrases.'); return; }
  if(interleaveActive){ renderInterleaveBreak(area); return; }
  if(!currentReview){ area.innerHTML = emptyState('Tout est à jour !', "Aucune carte à revoir (ou limite de nouvelles cartes atteinte aujourd'hui). Reviens plus tard."); return; }
  if(drillMode){ renderParticleDrill(area); return; }
  const total = reviewQueue._startCount || 1;
  const doneToday = Math.max(0, total - reviewQueue.length);

  let html = '<div class="review-wrap">';
  if(reviewFilterTag) html += `<div class="review-filter-chip">Filtré sur <b>${escapeHtml(reviewFilterTag)}</b><button id="clearReviewFilter" title="Revoir toutes les catégories">✕</button></div>`;
  html += `<div class="progress-row"><span>${doneToday} fait${doneToday===1?'':'s'}</span><div class="progress-bar"><i style="width:${Math.min(100,(doneToday/total)*100)}%"></i></div><span>${reviewQueue.length} restante${reviewQueue.length===1?'':'s'}</span></div>`;
  const reading = readMode() && !listenMode && !dicteMode;
  html += `<div class="mode-row">
    <button class="mode-chip ${readMode()?'active':''}" id="toggleRead" title="Bascule entre : taper la lecture en romaji / donner le sens en français">${readMode()?'🇯🇵 Je tape le romaji':'🇫🇷 Je donne le sens'}</button>
    <button class="mode-chip ${listenMode?'active':''}" id="toggleListen">🎧 Écoute</button>
    <button class="mode-chip ${dicteMode?'active':''}" id="toggleDicte">✏️ Dictée romaji</button>
  </div>`;

  html += `<div class="flashcard" id="flashcardEl">`;
  html += `<div class="tag-pill">${escapeHtml(currentReview.tag)}${CORE_SET.has(currentReview.jp)?' ⭐':''}</div>`;
  if(currentReview.level) html += `<div class="level-pill">${escapeHtml(currentReview.level)}</div>`;

  if(dicteMode && !revealed){
    // Mode dictée : on entend, on tape le romaji
    html += `<button class="listen-btn" id="listenPlayBtn">▶ Écouter</button>`;
    html += `<div class="hint" style="margin-top:14px;">Écoute et tape ce que tu entends en romaji</div>`;
  } else if(listenMode && !revealed){
    html += `<button class="listen-btn" id="listenPlayBtn">▶</button><div class="hint" style="margin-top:14px;">Écoute, devine le sens, puis touche pour révéler</div>`;
  } else {
    html += `<div class="jp-text">${colorizeJp(currentReview.jp)}</div>`;
    // Mode lecture : pas de romaji au recto, sinon on recopierait au lieu de lire
    if(!reading){
      html += `<div class="romaji">${escapeHtml(currentReview.romaji||'')}</div>`;
      if(currentReview.pitch) html += renderPitch(currentReview.pitch);
    }
    if(!revealed) html += `<div class="hint">${reading?'Lis cette phrase à voix haute et tape-la en romaji':'Dis le sens à voix haute, écris ta réponse, puis touche la carte'}</div>`;
  }
  if(revealed){
    html += `<div class="jp-text">${colorizeJp(currentReview.jp)}</div>`;
    html += `<div class="romaji">${escapeHtml(currentReview.romaji||'')}</div>`;
    html += `<div class="fr-text">${escapeHtml(currentReview.fr||'')}</div>`;
    if(currentReview.pitch) html += renderPitch(currentReview.pitch);
    html += `<button class="audio-mini" id="audioMini">▶</button>`;
  }
  html += `</div>`;

  if(!revealed){
    const placeholder = (dicteMode||reading) ? 'Tape le romaji… ex: Konnichiwa' : 'Ça veut dire…';
    const label = dicteMode ? 'Tape ce que tu entends en romaji (orthographe approximative OK)' : reading ? 'Comment ça se lit ? Tape en romaji (casse, espaces, ou/oo : sans importance)' : 'Ta réponse (effort de rappel, même incertain — la casse n\'a aucune importance)';
    html += `<div class="recall-input"><label>${label}</label><textarea id="recallBox" rows="1" placeholder="${placeholder}" autocapitalize="off" autocorrect="off" spellcheck="false">${escapeHtml(lastTyped)}</textarea></div>`;
    html += `<button class="reveal-btn" id="revealBtn">Vérifier / Révéler</button>`;
  } else {
    if(dicteMode){
      // En mode dictée, on compare au romaji
      const romajiCorrect = currentReview.romaji||'';
      const verdict = checkAnswer(lastTyped, romajiCorrect);
      if(verdict){
        const map = { good:['good','✓ Bonne prononciation !'], close:['close','≈ Presque — regarde la diff'], off:['off','✗ Écoute encore'] };
        const v = map[verdict];
        html += `<div class="verdict ${v[0]}">${v[1]}<span class="ans">Romaji attendu : ${escapeHtml(romajiCorrect)}</span><span class="ans">Ta réponse : ${escapeHtml(lastTyped)}</span></div>`;
      }
    } else if(readMode() && !listenMode){
      const romajiCorrect = currentReview.romaji||'';
      const verdict = checkRomaji(lastTyped, romajiCorrect);
      if(verdict){
        const map = { good:['good','✓ Bien lu !'], close:['close','≈ Presque — compare avec la lecture'], off:['off','✗ Relis les kana'] };
        const v = map[verdict];
        html += `<div class="verdict ${v[0]}">${v[1]}<span class="ans">Lecture attendue : ${escapeHtml(romajiCorrect)}</span><span class="ans">Ta réponse : ${escapeHtml(lastTyped)}</span></div>`;
      }
    } else {
      const verdict = checkAnswer(lastTyped, currentReview.fr);
      if(verdict){
        const map = { good:['good','✓ Bonne réponse'], close:['close','≈ Tu y es presque'], off:['off','✗ Pas tout à fait'] };
        const v = map[verdict];
        html += `<div class="verdict ${v[0]}">${v[1]}<span class="ans">Réponse attendue : ${escapeHtml(currentReview.fr)}</span><span class="ans">Ta réponse : ${escapeHtml(lastTyped)}</span></div>`;
      }
    }
    if(currentReview.tag === 'verbes'){
      const m = currentReview.jp.match(/^(.+?)（(.+?)）/);
      if(m){
        html += `<div class="explain-box verb-conj-box">
          <span class="eb-label">Conjugaison</span>
          <div class="verb-conj-row"><span class="vcr-form">辞書形</span><span class="vcr-name">Forme dictionnaire</span><span class="vcr-jp">${escapeHtml(m[1])}</span><span class="vcr-hint">Forme de base — registre familier, chercher dans le dictionnaire</span></div>
          <div class="verb-conj-row"><span class="vcr-form">ます形</span><span class="vcr-name">Forme polie</span><span class="vcr-jp">${escapeHtml(m[2])}</span><span class="vcr-hint">À utiliser en conversation avec des inconnus ou en situation formelle</span></div>
        </div>`;
      }
    }
    // Le champ "ex" du pack est stocké dans note à l'import ; certaines cartes ont un ex distinct
    const usage = currentReview.ex || currentReview.note;
    if(usage){ html += `<div class="explain-box"><span class="eb-label">Exemple d'usage & grammaire</span>${formatExplain(usage)}${grammarChipsHtml(currentReview.jp)}</div>`; }
    html += `<div class="rate-row">
      <button class="rate-again" data-grade="0">Galère</button>
      <button class="rate-hard" data-grade="1">Difficile</button>
      <button class="rate-good" data-grade="2">Bien</button>
      <button class="rate-easy" data-grade="3">Facile</button></div>`;
    html += `<button class="archive-btn" id="archiveBtn">🎓 Je connais déjà — ne plus revoir</button>`;
  }
  html += '</div>';
  area.innerHTML = html;

  const cf = document.getElementById('clearReviewFilter');
  if(cf) cf.addEventListener('click', ()=>{ reviewFilterTag = null; startReviewSession(); });
  const tr = document.getElementById('toggleRead'); if(tr) tr.addEventListener('click', ()=>{ captureTyped(); meta.reviewReadMode = !readMode(); saveMeta(); listenMode=false; dicteMode=false; revealed=false; lastTyped=''; renderReview(); });
  const tl = document.getElementById('toggleListen'); if(tl) tl.addEventListener('click', ()=>{ captureTyped(); listenMode=!listenMode; dicteMode=false; renderReview(); });
  const td = document.getElementById('toggleDicte'); if(td) td.addEventListener('click', ()=>{ captureTyped(); dicteMode=!dicteMode; listenMode=false; revealed=false; lastTyped=''; renderReview(); if(dicteMode) speak(currentReview.jp, 0.85); });
  const lpb = document.getElementById('listenPlayBtn'); if(lpb) lpb.addEventListener('click', e=>{ e.stopPropagation(); speak(currentReview.jp, 0.85); });
  const am = document.getElementById('audioMini'); if(am) am.addEventListener('click', e=>{ e.stopPropagation(); speak(currentReview.jp, 0.85); });

  const card = document.getElementById('flashcardEl');
  if(card) card.addEventListener('click', ()=>{ if(!listenMode && !dicteMode) speak(currentReview.jp, 0.85); if(!revealed && !dicteMode){ captureTyped(); revealed=true; renderReview(); } });
  const rb = document.getElementById('revealBtn'); if(rb) rb.addEventListener('click', e=>{ e.stopPropagation(); captureTyped(); revealed=true; renderReview(); });
  const ab = document.getElementById('archiveBtn');
  if(ab) ab.addEventListener('click', ()=>{
    archiveCard(currentReview, true); savePhrases(); refreshCounters(); celebrateNewBadges();
    reviewQueue.shift(); nextReviewCard();
  });

  area.querySelectorAll('.rate-row button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const grade = parseInt(b.dataset.grade,10);
      rate(currentReview, grade); savePhrases(); registerStudyActivity(); planMark('reviews', 1);
      sessionTotal++; if(grade>=2) sessionGoodOrEasy++;
      const justStudied = currentReview;
      reviewQueue.shift(); reviewedSinceBreak++; renderHeader(); afterRate();
      if(reviewedSinceBreak >= 5 && reviewQueue.length > 0){
        reviewedSinceBreak = 0; interleaveActive = true; interleaveCard = justStudied; interleaveReps = 0; renderReview();
      } else nextReviewCard();
    });
  });
}
function captureTyped(){ const box = document.getElementById('recallBox'); if(box) lastTyped = box.value.trim(); }

function renderParticleDrill(area){
  const card = currentReview;
  const info = drillInfo;
  const before = card.jp.slice(0, info.idx);
  const after = card.jp.slice(info.idx + info.particle.length);
  const distractors = PARTICLE_SET.filter(p=>p!==info.particle);
  for(let i=distractors.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [distractors[i],distractors[j]]=[distractors[j],distractors[i]]; }
  const choices = [info.particle, ...distractors.slice(0,2)];
  for(let i=choices.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [choices[i],choices[j]]=[choices[j],choices[i]]; }

  const romajiLine = drillAnswered
    ? (card.romaji||'')
    : maskParticleInRomaji(card.romaji, info.particle);
  let html = `<div class="review-wrap"><div class="drill-box">
    <span class="drill-label">🎯 Production guidée — complète la particule</span>
    <div class="drill-jp">${escapeHtml(before)}<span class="blank">${drillAnswered ? escapeHtml(info.particle) : '＿'}</span>${escapeHtml(after)}</div>
    <div class="drill-romaji">${escapeHtml(romajiLine)}</div>
    <div class="drill-fr">${escapeHtml(card.fr||'')}</div>
    <div class="drill-choices" id="drillChoices">`;
  choices.forEach(c=> html += `<button data-p="${c}">${c}</button>`);
  html += `</div>`;
  if(drillAnswered){
    html += `<div class="explain-box" style="text-align:left;"><span class="eb-label">Structure & grammaire</span>${formatExplain(card.note||'')}</div>`;
    html += `<div class="rate-row" style="margin-top:14px;">
      <button class="rate-again" data-grade="0">Galère</button>
      <button class="rate-hard" data-grade="1">Difficile</button>
      <button class="rate-good" data-grade="2">Bien</button>
      <button class="rate-easy" data-grade="3">Facile</button></div>`;
    // Sans ce bouton, une carte contenant une particule pouvait ne jamais sortir des révisions :
    // à chaque passage elle a une chance de tomber sur ce drill (findParticleForDrill), qui
    // n'offrait que la notation — jamais l'archivage. Elle revenait donc indéfiniment.
    html += `<button class="archive-btn" id="archiveBtnDrill">🎓 Je connais déjà — ne plus revoir</button>`;
  }
  html += `</div></div>`;
  area.innerHTML = html;

  if(!drillAnswered){
    area.querySelectorAll('#drillChoices button').forEach(b=>{
      b.addEventListener('click', ()=>{
        drillAnswered = true;
        const ok = b.dataset.p === info.particle;
        if(!ok) sessionParticleWrong++;
        area.querySelectorAll('#drillChoices button').forEach(x=>{ if(x.dataset.p === info.particle) x.classList.add('correct'); });
        if(!ok) b.classList.add('wrong');
        speak(card.jp, 0.85);
        renderReview();
      });
    });
  } else {
    area.querySelectorAll('.rate-row button').forEach(b=>{
      b.addEventListener('click', ()=>{
        const grade = parseInt(b.dataset.grade,10);
        rate(currentReview, grade); savePhrases(); registerStudyActivity(); planMark('reviews', 1);
        sessionTotal++; if(grade>=2) sessionGoodOrEasy++;
        const justStudied = currentReview;
        reviewQueue.shift(); reviewedSinceBreak++; renderHeader(); afterRate();
        if(reviewedSinceBreak >= 5 && reviewQueue.length > 0){
          reviewedSinceBreak = 0; interleaveActive = true; interleaveCard = justStudied; interleaveReps = 0; renderReview();
        } else nextReviewCard();
      });
    });
    const adb = document.getElementById('archiveBtnDrill');
    if(adb) adb.addEventListener('click', ()=>{
      archiveCard(currentReview, true); savePhrases(); celebrateNewBadges();
      reviewQueue.shift(); renderHeader(); nextReviewCard();
    });
  }
}

function renderInterleaveBreak(area){
  let dots = ''; for(let i=0;i<3;i++) dots += `<div class="rep-dot ${i<interleaveReps?'filled':''}"></div>`;
  area.innerHTML = `<div class="interleave-card">
    <p class="section-label" style="text-align:center;">Pause ombrage (répétition mêlée)</p>
    <p>Répète cette phrase à voix haute 3 fois. Mélanger révision et prononciation ancre la mémoire bien plus que des blocs séparés.</p>
    <div class="jp-big">${escapeHtml(interleaveCard.jp)}</div>
    <div class="jp-big-romaji">${escapeHtml(interleaveCard.romaji||'')}</div>
    <div class="jp-big-fr">${escapeHtml(interleaveCard.fr||'')}</div>
    <button class="play-mini" id="interleavePlay">▶</button>
    <div class="rep-track">${dots}</div>
    <button class="continue-btn" id="interleaveContinue" ${interleaveReps<3?'style="opacity:.5;pointer-events:none;"':''}>Continuer la révision</button>
  </div>`;
  document.getElementById('interleavePlay').addEventListener('click', ()=>{ speak(interleaveCard.jp, 0.8); interleaveReps = Math.min(3, interleaveReps+1); renderReview(); });
  const cont = document.getElementById('interleaveContinue'); if(cont) cont.addEventListener('click', ()=>{ if(interleaveReps>=3){ interleaveActive=false; nextReviewCard(); } });
}
