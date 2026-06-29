import { phrases, existingKeySet, newCard, savePhrases } from '../storage.js';
import { READING_GROUPS } from '../../data/phrases.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';
import { render } from '../main.js';

// ---------- reading / signs ----------
export function renderReading(){
  const area = document.getElementById('readingArea');
  let html = `<div class="read-intro">Tu as dit « parler avant lire » — mais certains mots, tu dois les <b>reconnaître</b> sans hésiter pour survivre : toilettes, gauche/droite, entrée/sortie, interdit. Touche un panneau pour l'entendre, ou ajoute un groupe à tes révisions pour les ancrer.</div>`;
  READING_GROUPS.forEach((g, gi)=>{
    html += `<div class="read-group">
      <div class="rg-head"><h3>${g.icon} ${g.title}</h3><button class="rg-add" data-group="${gi}">+ Ajouter à mes révisions</button></div>
      <div class="sign-grid">`;
    g.items.forEach(it=>{
      html += `<div class="sign-card" data-jp="${escapeHtml(it.jp)}">
        <div class="sc-jp">${escapeHtml(it.jp)}</div>
        <div class="sc-romaji">${escapeHtml(it.romaji)}</div>
        <div class="sc-fr">${escapeHtml(it.fr)}</div>
        ${it.note?`<div class="sc-note">${escapeHtml(it.note)}</div>`:''}
      </div>`;
    });
    html += `</div></div>`;
  });
  area.innerHTML = html;
  area.querySelectorAll('.sign-card').forEach(c=> c.addEventListener('click', ()=> speak(c.dataset.jp, 0.8)));
  area.querySelectorAll('.rg-add').forEach(b=>{
    b.addEventListener('click', async ()=>{
      const g = READING_GROUPS[parseInt(b.dataset.group,10)];
      const existing = existingKeySet(); let added = 0;
      g.items.forEach(it=>{
        const key = (it.jp+'|'+it.romaji).toLowerCase();
        if(existing.has(key)) return;
        phrases.push(newCard(it.jp, it.romaji, it.fr, it.note||'', 'panneaux', 'lecture'));
        existing.add(key); added++;
      });
      if(added>0){ await savePhrases(); render(); }
      b.textContent = added>0 ? (added + ' ajouté' + (added===1?'':'s') + ' ✓') : 'Déjà dans tes révisions';
      setTimeout(()=>{ b.textContent = '+ Ajouter à mes révisions'; }, 2000);
    });
  });
}
