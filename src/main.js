if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
import { loadAll, meta, getDueAll, updateStreak, migrateLegacyStores } from './storage.js';
import { speak, renderSoundBars } from './tts.js';
import { renderSkills } from './views/skills.js';
import { startReviewSession, renderReview } from './views/review.js';
import { renderShadow } from './views/shadow.js';
import { renderConversationList } from './views/conversation.js';
import { renderReading } from './views/reading.js';
import { renderGrammar } from './views/grammar.js';
import { renderKana } from './views/kana.js';
import { renderToday } from './views/today.js';
import { renderListening } from './views/listening.js';
import { renderJlpt } from './views/jlpt.js';
import { updateImportBanner, renderTagChips, renderList, renderStats, initManage, importFromURL } from './views/manage.js';
import { initCloudSync, initCloudSyncUI } from './cloudsync.js';

// ---------- tabs ----------
document.querySelectorAll('nav.tabs button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('section.view').forEach(s=>s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-'+btn.dataset.view).classList.add('active');
    if(btn.dataset.view === 'today') renderToday();
    if(btn.dataset.view === 'skills') renderSkills();
    if(btn.dataset.view === 'review'){ renderSoundBars(); startReviewSession(); }
    if(btn.dataset.view === 'shadow'){ renderSoundBars(); renderShadow(); }
    if(btn.dataset.view === 'conversation'){ renderSoundBars(); renderConversationList(); }
    if(btn.dataset.view === 'listening') renderListening();
    if(btn.dataset.view === 'reading') renderReading();
    if(btn.dataset.view === 'kana') renderKana();
    if(btn.dataset.view === 'grammar') renderGrammar();
    if(btn.dataset.view === 'jlpt') renderJlpt();
    // « Mes phrases » n'a pas de fonction renderXxx dédiée : sans ceci, un archivage ou un
    // ajout fait ailleurs (Réviser, Prononcer, Lire, JLPT) n'apparaissait qu'après une action
    // qui redéclenchait un render() complet — la liste pouvait donc rester périmée.
    if(btn.dataset.view === 'add') refreshCounters();
  });
});

// delegate audio clicks inside conversation bubbles & grammar reference
document.addEventListener('click', (e)=>{
  if(e.target && e.target.classList && e.target.classList.contains('bubble-audio')){
    speak(e.target.dataset.jp, 0.85);
  }
  if(e.target && e.target.classList && e.target.classList.contains('jp-say')){
    speak(e.target.dataset.jp, 0.85);
  }
});

export function renderHeader(){ document.getElementById('dueCount').textContent = getDueAll().length; }

// Rafraîchit le badge « à revoir », les stats et la liste de « Mes phrases », SANS toucher
// à la vue actuellement affichée. render() ci-dessous fait ça + re-rend la vue active — mais
// quand l'appelant EST la vue active en train de gérer son propre re-rendu (ex: un bouton
// « + Ajouter » dans Lire), appeler render() détruirait la confirmation visuelle qu'il vient
// d'afficher avant qu'elle soit visible. refreshCounters() est le bon choix dans ce cas.
export function refreshCounters(){
  renderHeader(); renderStats(); renderTagChips(); renderList(); renderSoundBars();
}

export function render(){
  refreshCounters();
  const activeView = document.querySelector('section.view.active');
  if(activeView && activeView.id === 'view-today') renderToday();
  if(activeView && activeView.id === 'view-skills') renderSkills();
  if(activeView && activeView.id === 'view-review') startReviewSession();
  if(activeView && activeView.id === 'view-shadow') renderShadow();
  if(activeView && activeView.id === 'view-conversation') renderConversationList();
  if(activeView && activeView.id === 'view-listening') renderListening();
  if(activeView && activeView.id === 'view-reading') renderReading();
  if(activeView && activeView.id === 'view-kana') renderKana();
  if(activeView && activeView.id === 'view-grammar') renderGrammar();
}

async function init(){
  initManage();
  initCloudSyncUI();
  const synced = await importFromURL();
  if(!synced) await loadAll();
  await initCloudSync(); // fusionne avec le cloud (si un code personnel est configuré) avant le premier rendu
  migrateLegacyStores(); // rapatrie parcours kana + historique d'examens dans meta (donc dans la sauvegarde et la synchro)
  document.getElementById('dailyLimit').value = meta.dailyLimit || 40;
  updateImportBanner(); updateStreak(); render();
  if(synced){
    alert('✅ Progression importée depuis le lien ! Tes révisions, archives et stats sont à jour.');
  }
}
init();
