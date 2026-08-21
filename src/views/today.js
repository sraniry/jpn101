import { phrases, meta, saveMeta, todayStr, getDueAll, planToday, getConvDone } from '../storage.js';
import { CONVERSATIONS } from '../../data/phrases.js';
import { KANA_LESSONS, kanaPathState } from './kana.js';
import { openConversation } from './conversation.js';
import { escapeHtml } from '../util.js';
import { celebrate } from '../encouragement.js';

// ---------- Onglet Aujourd'hui : parcours guidé quotidien ----------
// Trois étapes fixes (~30-45 min) : kana → révisions SRS → un dialogue.
// L'ordre compte : décodage d'abord, puis rappel, puis production.

function gotoTab(view){ document.querySelector(`nav.tabs button[data-view="${view}"]`).click(); }

const dayNumber = () => Math.floor(Date.now() / 86400000);

// Dialogues suggérés du jour : rotation déterministe sur la date pour varier sans hasard.
// Les dialogues déjà terminés passent en fin de file : on propose du neuf en priorité,
// sans jamais bloquer si tout a été fait. n suggestions distinctes (décalage +i).
function suggestedConversations(n){
  const valid = CONVERSATIONS.filter(c=>c.id && Array.isArray(c.turns));
  if(valid.length === 0) return [];
  const done = getConvDone();
  const fresh = valid.filter(c=>!done.includes(c.id));
  const pool = fresh.length ? fresh : valid;
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
];
function bonusOfTheDay(){ return BONUS_ROTATION[dayNumber() % BONUS_ROTATION.length]; }

// Objectifs quotidiens dimensionnés pour ~30 min réelles (et non ~10) : le plafond de
// révisions était le vrai goulot (10 cartes ≈ 5 min). Remonté à 30 (≈ 15 min), et un
// deuxième dialogue ajouté pour combler le temps libéré les jours où le kana est déjà acquis.
const REVIEW_GOAL_CAP = 30;
const CONV_GOAL = 2;

export function renderToday(){
  const area = document.getElementById('todayArea');
  const plan = planToday();
  const kana = kanaPathState();
  const due = getDueAll().length;
  const reviewGoal = Math.min(REVIEW_GOAL_CAP, Math.max(due, phrases.length ? 5 : 0));
  const convs = suggestedConversations(CONV_GOAL);

  const kanaDone = plan.kana || kana.done >= kana.total;
  const reviewDone = phrases.length > 0 && plan.reviews >= reviewGoal;
  // plan.conv était un booléen avant cette mise à jour ; s'il traîne encore tel quel
  // aujourd'hui, on le compte comme un dialogue déjà fait plutôt que de perdre sa progression.
  const convRaw = typeof plan.conv === 'number' ? plan.conv : (plan.conv ? 1 : 0);
  const convProgress = Math.min(convRaw, CONV_GOAL);
  const convDone = convProgress >= CONV_GOAL;
  const doneCount = [kanaDone, reviewDone, convDone].filter(Boolean).length;

  // Un seul toast par jour à l'instant précis où les 3 étapes se complètent — pas à chaque
  // re-rendu de l'onglet une fois qu'elles le sont déjà (sinon il réapparaîtrait à chaque clic).
  if(doneCount === 3 && meta.dailyProgramCelebrated !== todayStr()){
    meta.dailyProgramCelebrated = todayStr(); saveMeta();
    celebrate('dailyProgram', { emoji:'🎉', title: 'Programme du jour terminé' });
  }

  const kanaLabel = kana.done >= kana.total
    ? 'Tous les kana sont validés — entretien libre via le quiz'
    : `Prochaine leçon : <b>${escapeHtml(kana.next.row)}</b> (${kana.done}/${kana.total} leçons validées)`;

  let html = `<div class="today-head">
    <h3>${doneCount === 3 ? '🎉 Programme du jour terminé !' : `Programme du jour — ${doneCount}/3 étapes`}</h3>
    <p>~30 minutes, dans l'ordre. La régularité bat l'intensité : mieux vaut 30 min chaque jour que 3 h le dimanche.</p>
    <div class="today-track"><div class="today-track-fill" style="width:${(doneCount/3)*100}%"></div></div>
  </div><div class="today-steps">`;

  // Étape 1 — Kana
  html += `<div class="today-step ${kanaDone?'is-done':''}" data-view="kana">
    <div class="ts-check">${kanaDone ? '✓' : '1'}</div>
    <div class="ts-body">
      <div class="ts-title"><span class="ts-icon">あ</span>Kana du jour<span class="ts-time">~10 min</span></div>
      <div class="ts-desc">${kanaLabel}</div>
      <div class="ts-why">Le décodage des kana doit devenir automatique — c'est la fondation de tout le reste.</div>
    </div>
    <span class="ts-go">${kanaDone ? 'Revoir' : 'Commencer'} →</span>
  </div>`;

  // Étape 2 — Révisions SRS
  html += `<div class="today-step ${reviewDone?'is-done':''}" data-view="review">
    <div class="ts-check">${reviewDone ? '✓' : '2'}</div>
    <div class="ts-body">
      <div class="ts-title"><span class="ts-icon">🔁</span>Révisions SRS<span class="ts-time">~15 min</span></div>
      <div class="ts-desc">${phrases.length === 0
        ? 'Importe d\'abord le pack A0 → A2 dans « Mes phrases »'
        : `${plan.reviews||0}/${reviewGoal} cartes revues aujourd'hui${due>0?` · ${due} en attente`:''}`}</div>
      <div class="ts-why">SRS = « Spaced Repetition System », répétition espacée : chaque carte revient pile au moment où tu commences à l'oublier. Rappel actif : tape ta réponse avant de révéler.</div>
    </div>
    <span class="ts-go">${reviewDone ? 'Revoir' : 'Commencer'} →</span>
  </div>`;

  // Étape 3 — Dialogues (2 suggestions distinctes, chacune cliquable indépendamment)
  html += `<div class="today-step today-step-conv ${convDone?'is-done':''}">
    <div class="ts-check">${convDone ? '✓' : '3'}</div>
    <div class="ts-body">
      <div class="ts-title"><span class="ts-icon">💬</span>Dialogues<span class="ts-time">~15 min</span></div>
      <div class="ts-desc">${convs.length ? `${convProgress}/${CONV_GOAL} terminés aujourd'hui — produire des phrases en contexte, deux fois plus efficace qu'un seul.` : 'Aucun dialogue disponible'}</div>
      <div class="today-conv-picks">
        ${convs.map(c=>`<button class="today-conv-pick" data-conv="${c.id}">${c.icon} ${escapeHtml(c.title)} →</button>`).join('')}
      </div>
      <div class="ts-why">Produire des phrases en contexte consolide bien plus que relire — et prépare les vraies situations.</div>
    </div>
  </div>`;
  html += `</div>`;

  const bonus = bonusOfTheDay();
  html += `<div class="today-bonus-step" data-view="${bonus.view}">
    <div class="tbs-tag">Bonus du jour${doneCount === 3 ? ' — les 3 étapes sont faites, offre-toi ça' : ' (optionnel)'}</div>
    <div class="ts-title"><span class="ts-icon">${bonus.icon}</span>${bonus.title}<span class="ts-time">${bonus.time}</span></div>
    <div class="ts-desc">${bonus.desc}</div>
    <div class="ts-why">${bonus.why}</div>
    <span class="ts-go">Y aller →</span>
  </div>`;
  area.innerHTML = html;
  const bonusEl = area.querySelector('.today-bonus-step');
  if(bonusEl) bonusEl.addEventListener('click', ()=> gotoTab(bonusEl.dataset.view));
  // Étapes 1 et 2 : toute la carte est cliquable, un seul view cible.
  area.querySelectorAll('.today-step[data-view]').forEach(el=> el.addEventListener('click', ()=> gotoTab(el.dataset.view)));
  // Étape 3 : deux cibles distinctes (une par dialogue suggéré), chacune ouvre directement ce dialogue.
  area.querySelectorAll('.today-conv-pick').forEach(btn=> btn.addEventListener('click', e=>{
    e.stopPropagation();
    gotoTab('conversation');
    openConversation(btn.dataset.conv);
  }));
}
