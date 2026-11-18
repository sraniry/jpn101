if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
import { loadAll, meta, getDueAll, updateStreak, migrateLegacyStores } from './storage.js';
import { speak, renderSoundBars } from './tts.js';
import { renderSkills } from './views/skills.js';
import { startReviewSession, renderReview } from './views/review.js';
import { renderConversationList } from './views/conversation.js';
import { renderReading } from './views/reading.js';
import { renderGrammar } from './views/grammar.js';
import { renderKana } from './views/kana.js';
import { renderToday } from './views/today.js';
import { renderKanji, kanjiTodayStatus, openKanjiHome } from './views/kanji.js';
import { renderMenus } from './views/menus.js';
import { renderListening } from './views/listening.js';
import { renderJlpt } from './views/jlpt.js';
import { updateImportBanner, renderTagChips, renderList, renderStats, initManage, importFromURL } from './views/manage.js';
import { initCloudSync, initCloudSyncUI } from './cloudsync.js';
import { initRomajiToggle } from './romajiToggle.js';
import { initReminderLoop } from './reminder.js';
import { showView, registerView, currentView } from './nav.js';
import { renderLearnHub, renderSpeakHub, renderMeHub } from './views/hubs.js';
import { renderPath } from './views/path.js';
import { renderProgress, renderMistakes } from './views/progress.js';
import { renderTips, renderHelp } from './views/tips.js';
import { renderLessons, renderTexts } from './views/lessons.js';
import { maybeShowOnboarding } from './views/onboarding.js';

// ---------- navigation : 5 entrées, écrans enfants ouverts depuis les hubs ----------
document.querySelectorAll('nav.tabs button').forEach(btn=> btn.addEventListener('click', ()=> showView(btn.dataset.view)));
registerView('today', ()=> renderToday());
registerView('skills', ()=> renderSkills());
registerView('review', ()=>{ renderSoundBars(); startReviewSession(); });
registerView('conversation', ()=>{ renderSoundBars(); renderConversationList(); });
registerView('listening', ()=> renderListening());
registerView('reading', ()=> renderReading());
registerView('kana', ()=> renderKana());
registerView('kanji', (o)=>{ if(!o || !o.keep) openKanjiHome(); renderKanji(); });
registerView('menus', ()=> renderMenus());
registerView('grammar', ()=> renderGrammar());
registerView('jlpt', ()=> renderJlpt());
registerView('add', ()=> refreshCounters());
registerView('path', ()=> renderPath());
registerView('learn', ()=> renderLearnHub());
registerView('speak', ()=> renderSpeakHub());
registerView('me', ()=> renderMeHub());
registerView('progress', ()=> renderProgress());
registerView('mistakes', (o)=> renderMistakes(o));
registerView('tips', (o)=> renderTips(o));
registerView('lessons', (o)=> renderLessons(o));
registerView('texts', ()=> renderTexts());
registerView('help', ()=> renderHelp());

let hdrT = null; const hdrRefresh = ()=>{ clearTimeout(hdrT); hdrT = setTimeout(renderHeader, 250); };
window.addEventListener('nihongo:badge', hdrRefresh); window.addEventListener('nihongo:changed', hdrRefresh);

// delegate audio clicks inside conversation bubbles & grammar reference
document.addEventListener('click', (e)=>{
  if(e.target && e.target.classList && e.target.classList.contains('bubble-audio')){
    speak(e.target.dataset.jp, 0.85);
  }
  if(e.target && e.target.classList && e.target.classList.contains('jp-say')){
    speak(e.target.dataset.jp, 0.85);
  }
});

export function renderHeader(){
  const nd = getDueAll().length, dc = document.getElementById('dueCount');
  if(dc){ dc.textContent = nd; dc.style.display = nd ? '' : 'none'; }
  const kd = document.getElementById('kanjiDue'), n = kanjiTodayStatus().due;
  if(kd){ kd.textContent = n; kd.style.display = n ? '' : 'none'; }
}

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
  const v = currentView();
  if(v === 'today') renderToday();
  else if(v === 'skills') renderSkills();
  else if(v === 'review') startReviewSession();
  else if(v === 'conversation') renderConversationList();
  else if(v === 'listening') renderListening();
  else if(v === 'reading') renderReading();
  else if(v === 'kana') renderKana();
  else if(v === 'grammar') renderGrammar();
  else if(v === 'path') renderPath();
  else if(v === 'me') renderMeHub();
}

async function init(){
  initManage();
  initCloudSyncUI();
  const synced = await importFromURL();
  if(!synced) await loadAll();
  migrateLegacyStores(); // rapatrie parcours kana + historique d'examens dans meta (donc dans la sauvegarde et la synchro)
  document.getElementById('dailyLimit').value = meta.dailyLimit || 10;
  updateImportBanner(); updateStreak();
  const start = (location.hash || '').slice(1);
  showView(document.getElementById('view-' + start) ? start : 'today', { push: false, scroll: false });
  render();
  try{ navigator.storage?.persist?.(); }catch(e){}   // demande au navigateur de ne pas effacer la progression
  // Synchro cloud en arrière-plan : le premier rendu n'attend plus le réseau, puis on re-rend si la fusion a changé quelque chose.
  initCloudSync().then(changed => { if(changed){ updateImportBanner(); updateStreak(); render(); } }).catch(()=>{});
  maybeShowOnboarding();
  initReminderLoop();
  initRomajiToggle(); // après render() : meta est chargé (préférences romaji) et le DOM initial existe
  if(synced){
    alert('✅ Progression importée depuis le lien ! Tes révisions, archives et stats sont à jour.');
  }
}
init();
