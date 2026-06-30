import { phrases, registerStudyActivity, savePhrases } from '../storage.js';
import { speak, recState, toggleRecording } from '../tts.js';
import { escapeHtml, emptyState, formatExplain, grammarChipsHtml } from '../util.js';

// ---------- shadowing ----------
let shadowIdx = 0, shadowRate = 1, shadowFilterTag = 'all';

export function setShadowFilterTag(tag){ shadowFilterTag = tag; }

export function renderShadow(){
  const area = document.getElementById('shadowArea');
  if(phrases.length === 0){ area.innerHTML = emptyState('Rien à répéter encore', 'Importe le pack A0 → B1 dans « Mes phrases », ou ajoute tes phrases.'); return; }
  const tags = ['all', ...new Set(phrases.map(p=>p.tag))];
  const filtered = shadowFilterTag === 'all' ? phrases : phrases.filter(p=>p.tag === shadowFilterTag);
  if(shadowIdx >= filtered.length) shadowIdx = 0;
  if(filtered.length === 0){ area.innerHTML = emptyState('Catégorie vide', 'Aucune phrase dans cette catégorie.'); return; }
  const card = filtered[shadowIdx];

  let html = '<div class="shadow-card">';
  html += `<div class="shadow-filter">${tags.map(t=>`<span class="tag-chip ${t===shadowFilterTag?'active':''}" data-tag="${t}">${t==='all'?'Toutes':t}</span>`).join('')}</div>`;
  html += `<p class="section-label">Phrase ${shadowIdx+1} / ${filtered.length}${card.level?' · '+card.level:''}</p>`;
  html += `<div class="shadow-jp">${escapeHtml(card.jp)}</div>`;
  html += `<div class="shadow-romaji">${escapeHtml(card.romaji||'')}</div>`;
  html += `<div class="shadow-fr">${escapeHtml(card.fr||'')}</div>`;
  html += `<button class="play-btn" id="playBtn">▶</button>`;
  html += `<div class="rep-row"><button class="rep-btn" id="repMinus">−</button><div><div class="rep-count">${card.shadowReps||0}</div><div style="font-size:10px;color:#9a9184;text-transform:uppercase;letter-spacing:.5px;">répétitions</div></div><button class="rep-btn" id="repPlus">+</button></div>`;
  html += `<div class="record-block">
    <button class="record-btn" id="recordBtn">🎙️ ${recState.recording ? 'Arrêter' : `M'enregistrer`}</button>
    ${recState.url ? `<button class="record-play-btn" id="recordPlayBtn">▶ Réécouter ma voix</button>` : ''}
    <p class="record-hint">Compare en alternant : 🔊 (modèle) puis ▶ (ta voix). Pas de note automatique — c'est ton oreille qui juge, et c'est très bien comme ça.</p>
  </div>`;
  if(card.note){ html += `<div class="explain-box shadow-explain"><span class="eb-label">Structure & grammaire</span>${formatExplain(card.note)}${grammarChipsHtml(card.jp)}</div>`; }
  html += `<div class="shadow-nav"><button id="prevPhrase">← Précédente</button><button id="nextPhrase">Suivante →</button></div>`;
  html += '</div>';
  area.innerHTML = html;

  area.querySelectorAll('.shadow-filter .tag-chip').forEach(c=> c.addEventListener('click', ()=>{ shadowFilterTag = c.dataset.tag; shadowIdx = 0; renderShadow(); }));
  document.getElementById('playBtn').addEventListener('click', ()=> speak(card.jp, 1));
  document.getElementById('repPlus').addEventListener('click', ()=>{ card.shadowReps=(card.shadowReps||0)+1; registerStudyActivity(); savePhrases(); renderShadow(); });
  document.getElementById('repMinus').addEventListener('click', ()=>{ card.shadowReps=Math.max(0,(card.shadowReps||0)-1); savePhrases(); renderShadow(); });
  document.getElementById('prevPhrase').addEventListener('click', ()=>{ shadowIdx=(shadowIdx-1+filtered.length)%filtered.length; recState.recording=false; recState.url=null; recState.chunks=[]; renderShadow(); });
  const recBtn = document.getElementById('recordBtn');
  if(recBtn) recBtn.addEventListener('click', toggleRecording);
  const recPlayBtn = document.getElementById('recordPlayBtn');
  if(recPlayBtn) recPlayBtn.addEventListener('click', ()=>{ if(recState.url){ const a = new Audio(recState.url); a.play(); } });
  document.getElementById('nextPhrase').addEventListener('click', ()=>{ shadowIdx=(shadowIdx+1)%filtered.length; recState.recording=false; recState.url=null; recState.chunks=[]; renderShadow(); });
}
