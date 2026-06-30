if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
import { loadAll, meta, getDueAll, updateStreak } from './storage.js';
import { speak, renderSoundBars } from './tts.js';
import { renderSkills } from './views/skills.js';
import { startReviewSession, renderReview } from './views/review.js';
import { renderConversationList } from './views/conversation.js';
import { renderReading } from './views/reading.js';
import { renderGrammar } from './views/grammar.js';
import { updateImportBanner, renderTagChips, renderList, renderStats, initManage, importFromURL } from './views/manage.js';

// ---------- tabs ----------
document.querySelectorAll('nav.tabs button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('section.view').forEach(s=>s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('view-'+btn.dataset.view).classList.add('active');
    if(btn.dataset.view === 'skills') renderSkills();
    if(btn.dataset.view === 'review'){ renderSoundBars(); startReviewSession(); }
    if(btn.dataset.view === 'conversation'){ renderSoundBars(); renderConversationList(); }
    if(btn.dataset.view === 'reading') renderReading();
    if(btn.dataset.view === 'grammar') renderGrammar();
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

export function render(){
  renderHeader(); renderStats(); renderTagChips(); renderList(); renderSoundBars();
  const activeView = document.querySelector('section.view.active');
  if(activeView && activeView.id === 'view-skills') renderSkills();
  if(activeView && activeView.id === 'view-review') startReviewSession();
  if(activeView && activeView.id === 'view-conversation') renderConversationList();
  if(activeView && activeView.id === 'view-reading') renderReading();
  if(activeView && activeView.id === 'view-grammar') renderGrammar();
}

async function init(){
  initManage();
  const synced = await importFromURL();
  if(!synced) await loadAll();
  document.getElementById('dailyLimit').value = meta.dailyLimit || 8;
  updateImportBanner(); updateStreak(); render();
  if(synced){
    alert('✅ Progression importée depuis le lien ! Tes révisions, archives et stats sont à jour.');
  }
}
init();
