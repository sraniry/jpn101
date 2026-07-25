import { phrases, getDueAll, planToday } from '../storage.js';
import { CONVERSATIONS } from '../../data/phrases.js';
import { KANA_LESSONS, kanaPathState } from './kana.js';
import { openConversation } from './conversation.js';
import { escapeHtml } from '../util.js';

// ---------- Onglet Aujourd'hui : parcours guidé quotidien ----------
// Trois étapes fixes (~30-45 min) : kana → révisions SRS → un dialogue.
// L'ordre compte : décodage d'abord, puis rappel, puis production.

function gotoTab(view){ document.querySelector(`nav.tabs button[data-view="${view}"]`).click(); }

// Dialogue suggéré du jour : rotation déterministe sur la date pour varier sans hasard
function suggestedConversation(){
  const valid = CONVERSATIONS.filter(c=>c.id && Array.isArray(c.turns));
  if(valid.length === 0) return null;
  const dayIdx = Math.floor(Date.now() / 86400000) % valid.length;
  return valid[dayIdx];
}

export function renderToday(){
  const area = document.getElementById('todayArea');
  const plan = planToday();
  const kana = kanaPathState();
  const due = getDueAll().length;
  const reviewGoal = Math.min(10, Math.max(due, phrases.length ? 5 : 0));
  const conv = suggestedConversation();

  const kanaDone = plan.kana || kana.done >= kana.total;
  const reviewDone = phrases.length > 0 && plan.reviews >= reviewGoal;
  const convDone = plan.conv;
  const doneCount = [kanaDone, reviewDone, convDone].filter(Boolean).length;

  const kanaLabel = kana.done >= kana.total
    ? 'Tous les kana sont validés — entretien libre via le quiz'
    : `Prochaine leçon : <b>${escapeHtml(kana.next.row)}</b> (${kana.done}/${kana.total} leçons validées)`;

  const steps = [
    {
      icon:'あ', title:'Kana du jour', time:'~10 min', done:kanaDone, view:'kana',
      desc: kanaLabel,
      why:'Le décodage des kana doit devenir automatique — c\'est la fondation de tout le reste.'
    },
    {
      icon:'🔁', title:'Révisions SRS', time:'~15 min', done:reviewDone, view:'review',
      desc: phrases.length === 0
        ? 'Importe d\'abord le pack A0 → A2 dans « Mes phrases »'
        : `${plan.reviews}/${reviewGoal} cartes revues aujourd'hui${due>0?` · ${due} en attente`:''}`,
      why:'La répétition espacée au moment optimal, avec rappel actif : tape ta réponse avant de révéler.'
    },
    {
      icon:'💬', title:'Un dialogue', time:'~10 min', done:convDone, view:'conversation', convId: conv ? conv.id : null,
      desc: conv ? `Suggestion du jour : <b>${conv.icon} ${escapeHtml(conv.title)}</b> — clique pour le lancer directement` : 'Aucun dialogue disponible',
      why:'Produire des phrases en contexte consolide bien plus que relire — et prépare les vraies situations.'
    },
  ];

  let html = `<div class="today-head">
    <h3>${doneCount === 3 ? '🎉 Programme du jour terminé !' : `Programme du jour — ${doneCount}/3 étapes`}</h3>
    <p>30-45 minutes, dans l'ordre. La régularité bat l'intensité : mieux vaut 30 min chaque jour que 3 h le dimanche.</p>
    <div class="today-track"><div class="today-track-fill" style="width:${(doneCount/3)*100}%"></div></div>
  </div><div class="today-steps">`;

  steps.forEach((s, i)=>{
    html += `<div class="today-step ${s.done?'is-done':''}" data-view="${s.view}"${s.convId?` data-conv="${s.convId}"`:''}>
      <div class="ts-check">${s.done ? '✓' : i+1}</div>
      <div class="ts-body">
        <div class="ts-title"><span class="ts-icon">${s.icon}</span>${s.title}<span class="ts-time">${s.time}</span></div>
        <div class="ts-desc">${s.desc}</div>
        <div class="ts-why">${s.why}</div>
      </div>
      <span class="ts-go">${s.done ? 'Revoir' : 'Commencer'} →</span>
    </div>`;
  });
  html += `</div>`;

  if(doneCount === 3){
    html += `<div class="today-bonus">Envie d'aller plus loin ? <b>Bonus :</b> les kanji du quotidien (onglet Alphabet → 漢字) ou les panneaux dans « Lire ».</div>`;
  }
  area.innerHTML = html;
  area.querySelectorAll('.today-step').forEach(el=> el.addEventListener('click', ()=>{
    gotoTab(el.dataset.view);
    // routing direct : lance le dialogue suggéré au lieu de la liste générale
    if(el.dataset.conv) openConversation(el.dataset.conv);
  }));
}
