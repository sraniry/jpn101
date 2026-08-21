import { phrases, registerStudyActivity, savePhrases, archiveCard } from '../storage.js';
import { refreshCounters } from '../main.js';
import { speak, recState, toggleRecording } from '../tts.js';
import { escapeHtml, emptyState, formatExplain, grammarChipsHtml, colorizeJp, renderPitch } from '../util.js';

// ---------- shadowing ----------
let shadowIdx = 0, shadowRate = 1, shadowFilterTag = 'all';

export function setShadowFilterTag(tag){ shadowFilterTag = tag; }

export function renderShadow(){
  const area = document.getElementById('shadowArea');
  // Une carte archivée (« Je connais déjà ») ne doit réapparaître nulle part, y compris ici —
  // sinon archiver depuis Réviser n'empêche pas de retomber dessus en Prononcer.
  const active = phrases.filter(p=>!p.archived);
  if(active.length === 0){ area.innerHTML = emptyState('Rien à répéter encore', phrases.length ? 'Toutes tes phrases sont marquées « connues ». Ajoute-en dans « Mes phrases », ou remets-en une en revision.' : 'Importe le pack A0 → A2 dans « Mes phrases », ou ajoute tes phrases.'); return; }
  const tags = ['all', ...new Set(active.map(p=>p.tag))];
  const filtered = shadowFilterTag === 'all' ? active : active.filter(p=>p.tag === shadowFilterTag);
  if(shadowIdx >= filtered.length) shadowIdx = 0;
  if(filtered.length === 0){ area.innerHTML = emptyState('Catégorie vide', 'Aucune phrase active dans cette catégorie.'); return; }
  const card = filtered[shadowIdx];

  let html = `<div class="skills-intro">Écoute le modèle, répète à voix haute, puis <b>enregistre-toi et compare</b>. C'est l'exercice qui fait le plus progresser à l'oral — et le seul où tu produis vraiment du son. Compte les répétitions : 3 à 5 par phrase suffisent.</div>`;
  html += '<div class="shadow-card">';
  html += `<div class="shadow-filter">${tags.map(t=>`<span class="tag-chip ${t===shadowFilterTag?'active':''}" data-tag="${t}">${t==='all'?'Toutes':t}</span>`).join('')}</div>`;
  html += `<p class="section-label">Phrase ${shadowIdx+1} / ${filtered.length}${card.level?' · '+card.level:''}</p>`;
  html += `<div class="shadow-jp">${colorizeJp(card.jp)}</div>`;
  html += `<div class="shadow-romaji">${escapeHtml(card.romaji||'')}</div>`;
  if(card.pitch) html += renderPitch(card.pitch);
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
  html += `<button class="archive-btn" id="archiveBtnShadow">🎓 Je connais déjà — ne plus revoir</button>`;
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
  document.getElementById('archiveBtnShadow').addEventListener('click', ()=>{
    archiveCard(card, true); savePhrases(); refreshCounters();
    recState.recording=false; recState.url=null; recState.chunks=[];
    if(shadowIdx >= filtered.length - 1) shadowIdx = 0;
    renderShadow();
  });
}
