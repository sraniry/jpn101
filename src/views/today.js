import { phrases, meta, saveMeta, todayStr, planToday, getConvDone, openMistakes, getQuizStats } from '../storage.js';
import { LESSONS } from '../../data/lessons.js';
import { CONVERSATIONS } from '../../data/phrases.js';
import { KANA_LESSONS, kanaPathState } from './kana.js';
import { openConversation } from './conversation.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';
import { celebrate } from '../encouragement.js';
import { kanjiTodayStatus, kanjiStepDone, dueCounts, DUE_PAUSE } from './kanji.js';
import { todayChallenge } from './menus.js';
import { reminderHtml, wireReminder } from '../reminder.js';
import { tipOfTheDay } from './tips.js';

// ---------- Onglet Aujourd'hui : parcours guidé quotidien ----------
// Trois étapes fixes (~30-45 min) : kana → révisions SRS → un dialogue.
// L'ordre compte : décodage d'abord, puis rappel, puis production.

import { showView } from '../nav.js';
function gotoTab(view){ showView(view); }

const dayNumber = () => Math.floor(Date.now() / 86400000);

// Dialogues suggérés du jour : rotation déterministe sur la date pour varier sans hasard.
// Les dialogues déjà terminés passent en fin de file : on propose du neuf en priorité,
// sans jamais bloquer si tout a été fait. n suggestions distinctes (décalage +i).
function suggestedConversations(n){
  const valid = CONVERSATIONS.filter(c=>c.id && Array.isArray(c.turns));
  if(valid.length === 0) return [];
  const done = getConvDone();
  const fresh = valid.filter(c=>!done.includes(c.id));
  // Les dialogues « débutant » (id b-…) passent en premier : ils sont à la portée d'un tout début.
  const freshBeg = fresh.filter(c=>c.id.startsWith('b-'));
  const pool = freshBeg.length ? freshBeg : (fresh.length ? fresh : valid);
  const out = [];
  for(let i=0; i<n && i<pool.length; i++) out.push(pool[(dayNumber()+i) % pool.length]);
  return out;
}

// 4e palier « bonus », en rotation quotidienne : il donne un point d'entrée quotidien aux
// sections qui n'en avaient aucun (Écoute, Lire, JLPT) sans allonger le programme — une
// seule d'entre elles est proposée chaque jour.
const BONUS_ROTATION = [
  { icon:'🎧', title:'Compréhension orale', time:'~5 min', view:'listening',
    desc:'Une série de 10 : phrases sans texte, ou prix au konbini',
    why:'À Kyoto, on te parlera sans sous-titres. S\'entraîner sans texte est le seul moyen d\'y préparer l\'oreille.' },
  { icon:'🪧', title:'Panneaux & formulaires', time:'~5 min', view:'reading',
    desc:'Reconnaître 出口, 入口, トイレ, 禁止 sans hésiter',
    why:'Ces mots-là ne se devinent pas : les reconnaître d\'un coup d\'œil évite les vrais ennuis sur place.' },
  { icon:'🎓', title:'Entraînement JLPT N5', time:'~10 min', view:'jlpt',
    desc:'Quiz rapide, kanji officiels ou examen blanc',
    why:'L\'examen a lieu en décembre : quelques minutes régulières valent mieux qu\'un bachotage de dernière minute.' },
  { icon:'📖', title:'Kanji N4', time:'~10 min', view:'jlpt', level:'N4',
    desc:'80 kanji supplémentaires pour franchir le palier N4',
    why:'Les kanji N4 reviennent dans les panneaux, les menus et les formulaires universitaires à Kyoto — un investissement direct pour ton séjour.' },
];
function bonusOfTheDay(){
  // Pas de JLPT ni de « Kanji N4 » à une débutante : ils n'apparaissent qu'une fois les kana validés et 100 kanji appris.
  let learned = 0, kanaOk = false;
  try{ learned = kanjiTodayStatus().learnedTotal; const k = kanaPathState(); kanaOk = k.done >= k.total; }catch(e){}
  const pool = (kanaOk && learned >= 100) ? BONUS_ROTATION : BONUS_ROTATION.filter(b => b.view === 'listening' || b.view === 'reading');
  return pool[dayNumber() % pool.length];
}

// Objectifs quotidiens dimensionnés pour ~30 min réelles (et non ~10) : le plafond de
// révisions était le vrai goulot (10 cartes ≈ 5 min). Remonté à 30 (≈ 15 min), et un
// deuxième dialogue ajouté pour combler le temps libéré les jours où le kana est déjà acquis.
const REVIEW_GOAL_CAP = 30;
const CONV_GOAL = 2;

export function renderToday(){
  const area = document.getElementById('todayArea');
  const plan = planToday();
  const kana = kanaPathState();
  const dc = dueCounts();
  const due = dc.phrases;   // seulement les cartes déjà vues : les nouvelles ne sont pas « en retard »
  const reviewGoal = Math.min(REVIEW_GOAL_CAP, Math.max(due, phrases.length ? 5 : 0));
  const convs = suggestedConversations(CONV_GOAL);

  const kanaDone = plan.kana || kana.done >= kana.total;
  const kj = kanjiTodayStatus();
  const kanjiDone = kanjiStepDone();   // figée une fois atteinte : ne se décoche pas si des cartes redeviennent dues
  const reviewDone = phrases.length > 0 && plan.reviews >= reviewGoal;
  // plan.conv était un booléen avant cette mise à jour ; s'il traîne encore tel quel
  // aujourd'hui, on le compte comme un dialogue déjà fait plutôt que de perdre sa progression.
  const convRaw = typeof plan.conv === 'number' ? plan.conv : (plan.conv ? 1 : 0);
  const convProgress = Math.min(convRaw, CONV_GOAL);
  const convDone = convProgress >= CONV_GOAL;
  const ch = todayChallenge();
  // Le défi ne compte que s'il est réussi à 60 % au moins (un défi raté à 20 % ne coche pas l'étape).
  const challengeDone = (plan.challenge || 0) >= 1 && getQuizStats('menus').some(e => e.date === todayStr() && e.total && e.correct / e.total >= 0.6);
  // Leçon de grammaire du jour : la première non faite, dans l'ordre.
  const lessonsDoneIds = meta.lessonsDone || [];
  const nextLesson = LESSONS.find(l => !lessonsDoneIds.includes(l.id));
  const lessonDone = !nextLesson || (plan.lesson || 0) >= 1;
  // Erreurs à retravailler : 3 questions par jour tant qu'il en reste.
  const openErr = openMistakes().length;
  const errGoal = Math.min(3, openErr + (plan.rework || 0));
  const errDone = !!plan.errOk || openErr === 0 || (plan.rework || 0) >= errGoal;
  if(errDone && !plan.errOk){ plan.errOk = true; saveMeta(false); }   // une étape cochée le reste, même si une nouvelle faute arrive ensuite

  const mins = Number(meta.minutes) || 20;
  // Le plan garde toujours la même forme dans la journée : une étape terminée reste affichée, cochée (jamais retirée).
  const ids = mins <= 10 ? ['kana', 'kanji', 'challenge']
    : (mins <= 20 ? ['kana', 'kanji', 'review', 'lesson', 'errors', 'challenge'] : ['kana', 'kanji', 'review', 'lesson', 'errors', 'conv', 'challenge']);
  const planIds = ids;   // même liste toute la journée : l'étape « erreurs » est toujours là (cochée s'il n'y a rien à reprendre)
  const flagOf = { kana: kanaDone, kanji: kanjiDone, review: reviewDone, lesson: lessonDone, errors: errDone, conv: convDone, challenge: challengeDone };
  const doneCount = planIds.filter(id => flagOf[id]).length, total = planIds.length;

  // Un seul toast par jour à l'instant précis où toutes les étapes se complètent — pas à chaque
  // re-rendu de l'onglet une fois qu'elles le sont déjà (sinon il réapparaîtrait à chaque clic).
  if(doneCount === total && meta.dailyProgramCelebrated !== todayStr()){
    meta.dailyProgramCelebrated = todayStr(); saveMeta();
    celebrate('dailyProgram', { emoji:'🎉', title: 'Programme du jour terminé' });
  }

  const kanaLabel = kana.done >= kana.total
    ? 'Tous les kana sont validés — entretien libre via le quiz'
    : `Prochaine leçon : <b>${escapeHtml(kana.next.row)}</b> (${kana.done}/${kana.total} leçons validées)`;

  const gap = meta.lastStudyDate ? Math.round((new Date(todayStr()) - new Date(meta.lastStudyDate)) / 86400000) : 0;
  const dueDetail = [dc.kanji ? `${dc.kanji} kanji` : '', dc.phrases ? `${dc.phrases} phrase${dc.phrases > 1 ? 's' : ''}` : ''].filter(Boolean).join(' + ');
  let html = gap >= 2 ? `<div class="resume-banner" role="status">👋 <b>Content de te revoir !</b> Dernière séance il y a ${gap} jours : ce n'est pas grave. ${dc.total ? `${dueDetail} à revoir : commence par là, doucement.` : 'Reprends avec une petite séance de 10 minutes.'}</div>` : '';
  html += `<div class="today-head">
    <h3>${doneCount === total ? '🎉 Programme du jour terminé !' : `Programme du jour — ${doneCount}/${total} étapes`}</h3>
    <p>~${mins} minutes, dans l'ordre. La régularité bat l'intensité : mieux vaut un peu chaque jour que 3 h le dimanche.</p>
    <div class="today-track"><div class="today-track-fill" style="width:${(doneCount/total)*100}%"></div></div>
  </div>`;
  const tip = tipOfTheDay();
  html += `<div class="tip-today"><span class="kj-slabel">💡 Astuce de prof du jour</span>${escapeHtml(tip.text)} <button type="button" class="kj-link" id="tipMore">Plus d'astuces</button></div><div class="today-steps">`;

  const STEP = {};
  STEP.kana = { view: 'kana', icon: 'あ', title: 'Kana du jour', time: '~10 min', desc: kanaLabel,
    why: 'Le décodage des kana doit devenir automatique — c\'est la fondation de tout le reste.', go: kanaDone ? 'Revoir' : 'Commencer' };
  const kjWhat = kj.phase === 'radicals' ? 'radicaux' : 'kanji';
  STEP.kanji = { view: 'kanji', icon: '漢', title: 'Kanji du jour', time: '~10 min',
    desc: kj.paused ? `⏸️ On rattrape d'abord : ${kj.due} cartes à revoir (plus de ${DUE_PAUSE}), les nouveaux kanji reprennent après.`
      : (!kj.started ? 'Commence par les <b>radicaux</b> : les briques qui composent tous les kanji. 8 par jour.'
        : `${kj.introduced}/${kj.goal} ${kjWhat} nouveaux aujourd'hui · ${kj.due} carte${kj.due>1?'s':''} à réviser · ${kj.learnedTotal} kanji vus sur 2136`),
    why: '2136 kanji = 6 par jour pendant un an. Chaque kanji est découpé en briques, avec une petite histoire, et revient en révision au moment où tu allais l\'oublier.', go: kanjiDone ? 'Revoir' : 'Commencer' };
  STEP.review = { view: 'review', icon: '🔁', title: 'Révisions des phrases', time: '~10 min',
    desc: phrases.length === 0 ? 'Importe d\'abord le pack A0 → A2 dans « Mes phrases »'
      : (reviewDone ? `${Number(plan.reviews)||0} carte${(Number(plan.reviews)||0) > 1 ? 's' : ''} revue${(Number(plan.reviews)||0) > 1 ? 's' : ''} aujourd'hui ✓` : `${Number(plan.reviews)||0}/${reviewGoal} cartes revues aujourd'hui`) + (due>0 ? ` · ${due} à revoir` : ''),
    why: 'Répétition espacée : chaque carte revient pile au moment où tu commences à l\'oublier. Rappel actif : tape ta réponse avant de révéler.', go: reviewDone ? 'Revoir' : 'Commencer' };
  STEP.lesson = { view: 'lessons', icon: '📘', title: nextLesson ? `Leçon : ${nextLesson.title}` : 'Leçons de grammaire', time: '~5 min',
    desc: nextLesson ? `Leçon ${LESSONS.indexOf(nextLesson) + 1} sur ${LESSONS.length} : la règle, des exemples, puis 6 questions. Il faut 5 bonnes réponses.` : 'Les 12 leçons sont faites. Bravo ! Tu peux les relire quand tu veux.',
    why: 'Une petite règle de grammaire par jour : c\'est elle qui te permet de construire tes propres phrases, pas seulement de les répéter.', go: lessonDone ? 'Revoir' : 'Commencer' };
  STEP.errors = { view: 'mistakes', icon: '❗', title: 'Retravailler 3 erreurs', time: '~3 min',
    desc: openErr === 0 ? 'Aucune erreur en attente : bravo ! Ce qui te fait trébucher apparaîtra ici.' : (errDone ? 'Fait pour aujourd\'hui. Les erreurs réussies 3 fois disparaissent de la liste.' : `${openErr} erreur${openErr > 1 ? 's' : ''} en attente : on en reprend ${errGoal} aujourd'hui.`),
    why: 'Ce qui t\'a fait trébucher est ce qui te fait le plus progresser. 3 minutes suffisent.', go: errDone ? 'Revoir' : 'Commencer' };
  STEP.challenge = { view: 'menus', icon: ch.icon, title: `Défi du jour : ${escapeHtml(ch.title)}`, time: '~5 min', desc: escapeHtml(ch.goal), why: escapeHtml(ch.tip), go: challengeDone ? 'Refaire' : 'Relever le défi' };

  planIds.forEach((id, n) => {
    const isDone = flagOf[id], num = isDone ? '✓' : n + 1;
    if(id === 'conv'){
      html += `<div class="today-step today-step-conv ${convDone?'is-done':''}">
    <div class="ts-check">${num}</div>
    <div class="ts-body">
      <div class="ts-title"><span class="ts-icon">💬</span>Dialogues<span class="ts-time">~10 min</span></div>
      <div class="ts-desc">${convs.length ? `${convProgress}/${CONV_GOAL} terminés aujourd'hui — de très courts dialogues pour commander, demander, remercier.` : 'Aucun dialogue disponible'}</div>
      <div class="today-conv-picks">
        ${convs.map(c=>`<button class="today-conv-pick" data-conv="${c.id}">${c.icon} ${escapeHtml(c.title)} →</button>`).join('')}
      </div>
      <div class="ts-why">Produire des phrases en contexte consolide bien plus que relire — et prépare les vraies situations.</div>
    </div>
  </div>`;
      return;
    }
    const st = STEP[id];
    const title = id === 'challenge' ? st.title : escapeHtml(st.title);
    html += `<div class="today-step ${isDone?'is-done':''}" data-view="${st.view}" data-step="${id}">
    <div class="ts-check">${num}</div>
    <div class="ts-body">
      <div class="ts-title"><span class="ts-icon">${st.icon}</span>${title}<span class="ts-time">${st.time}</span></div>
      <div class="ts-desc">${st.desc}</div>
      <div class="ts-why">${st.why}</div>
    </div>
    <span class="ts-go">${st.go} →</span>
  </div>`;
  });
  html += `</div>`;

  const bonus = bonusOfTheDay();
  html += `<div class="today-bonus-step" data-view="${bonus.view}">
    <div class="tbs-tag">Bonus du jour${doneCount === total ? ' — tout est fait, offre-toi ça' : ' (optionnel)'}</div>
    <div class="ts-title"><span class="ts-icon">${bonus.icon}</span>${bonus.title}<span class="ts-time">${bonus.time}</span></div>
    <div class="ts-desc">${bonus.desc}</div>
    <div class="ts-why">${bonus.why}</div>
    <span class="ts-go">Y aller →</span>
  </div>`;
  html += reminderHtml();
  area.innerHTML = html;
  const tm = area.querySelector('#tipMore'); if(tm) tm.addEventListener('click', () => showView('tips'));
  wireReminder(area);
  const bonusEl = area.querySelector('.today-bonus-step');
  if(bonusEl) bonusEl.addEventListener('click', ()=>{ if(bonus.view==='jlpt') import('./jlpt.js').then(m=>{ m.setJlptLevel(bonus.level || 'N5'); gotoTab('jlpt'); }); else gotoTab(bonusEl.dataset.view); });
  // Étapes à une seule cible : toute la carte est cliquable (touche Entrée / Espace gérée par main.js).
  area.querySelectorAll('.today-step[data-view]').forEach(el=> el.addEventListener('click', ()=>{
    const step = el.dataset.step, v = el.dataset.view;
    if(step === 'lesson' && nextLesson){ showView('lessons', { id: nextLesson.id }); return; }
    if(step === 'errors' && openErr > 0){ showView('mistakes', { rework: true, n: 3 }); return; }
    gotoTab(v);
    if(v === 'menus') import('./menus.js').then(m=>m.openMenuChallenge(ch.id));
  }));
  // Dialogues : une cible par dialogue suggéré, chacune ouvre directement ce dialogue.
  area.querySelectorAll('.today-conv-pick').forEach(btn=> btn.addEventListener('click', e=>{
    e.stopPropagation();
    gotoTab('conversation');
    openConversation(btn.dataset.conv);
    const c0 = CONVERSATIONS.find(x => x.id === btn.dataset.conv), t0 = c0 && c0.turns && c0.turns[0];
    if(t0 && t0.speaker === 'npc') speak(t0.jp, 0.85);   // dans le geste : sinon muet sur iPhone
  }));
}
