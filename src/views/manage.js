import { phrases, meta, existingKeySet, cardKey, newCard, savePhrases, saveMeta, archiveCard, getDueAll, nowTs, removePhrase, loadAll, exportProgressionJSON, importProgressionJSON, levelRank } from '../storage.js';
import { SEED_PACK, CORE_SET } from '../../data/phrases.js';
import { escapeHtml } from '../util.js';
import { render } from '../main.js';

// ---------- import ----------
export function updateImportBanner(){
  const existing = existingKeySet();
  const remaining = SEED_PACK.filter(row => !existing.has(cardKey(row.jp, row.romaji))).length;
  const banner = document.getElementById('importBanner');
  const text = document.getElementById('importStatusText');
  const btn = document.getElementById('importBtn');
  if(remaining === 0){
    banner.classList.add('done');
    text.textContent = 'Pack complet déjà importé (' + SEED_PACK.length + ' phrases avec explications).';
    btn.textContent = 'Tout est importé ✓'; btn.disabled = true;
  } else {
    banner.classList.remove('done');
    text.textContent = remaining + ' phrase' + (remaining===1?'':'s') + ' disponible' + (remaining===1?'':'s') + ' selon les niveaux cochés.';
    btn.textContent = 'Importer la sélection'; btn.disabled = false;
  }
}

// « core » par défaut : les ⭐ Essentiels (Pareto 20/80) sont la première chose visible
let listFilterTag = 'core';
export function setListFilterTag(tag){ listFilterTag = tag; }

export function renderTagChips(){
  const chipsEl = document.getElementById('tagChips');
  // « archivées » juste après les deux premiers plutôt qu'en toute fin de liste — sinon elle
  // se perd parmi les tags de contenu (café, verbes, voyage…) au fur et à mesure qu'ils s'accumulent.
  const tags = ['core', 'all', 'archivées', ...new Set(phrases.map(p=>p.tag))];
  const label = t => t==='core' ? '⭐ Essentiels' : t==='all' ? 'Toutes' : t==='archivées' ? '🎓 Déjà sues' : t;
  chipsEl.innerHTML = tags.map(t=>`<span class="tag-chip ${t===listFilterTag?'active':''}" data-tag="${t}">${label(t)}</span>`).join('');
  chipsEl.querySelectorAll('.tag-chip').forEach(c=> c.addEventListener('click', ()=>{ listFilterTag = c.dataset.tag; renderList(); renderTagChips(); }));
}
export function renderList(){
  const list = document.getElementById('phraseList');
  if(listFilterTag === 'core'){ renderCoreList(list); return; }
  let items;
  if(listFilterTag === 'archivées') items = phrases.filter(p=>p.archived);
  else if(listFilterTag === 'all') items = phrases.filter(p=>!p.archived);
  else items = phrases.filter(p=>p.tag===listFilterTag && !p.archived);
  // Tri par niveau (A0 → A1 → A2) en priorité, échéance en second critère : on apprend
  // dans l'ordre plutôt que de sauter du vocabulaire A2 avant d'avoir vu tout le A0.
  items = items.slice().sort((a,b)=> levelRank(a.level) - levelRank(b.level) || a.due-b.due);
  if(items.length === 0){ list.innerHTML = `<p style="font-size:13px;color:#9a9184;text-align:center;padding:20px;">${listFilterTag==='archivées' ? "Rien d'archivé pour l'instant — marque une phrase « Je connais déjà » pendant une révision, ou avec le bouton 🎓 ci-dessous." : 'Aucune phrase pour le moment.'}</p>`; return; }
  let lastLevel = null;
  list.innerHTML = items.map(p=>{
    const isDue = p.due <= nowTs();
    const dueLabel = p.archived ? 'archivée' : (isDue ? 'à revoir' : 'dans ' + Math.max(1, Math.ceil((p.due-nowTs())/86400000)) + 'j');
    const header = (p.level !== lastLevel) ? (lastLevel = p.level, levelHeaderHtml(p.level)) : '';
    return header + `<div class="phrase-item ${p.archived?'pi-archived':''}">
      <div class="pi-jp">${escapeHtml(p.jp)}${CORE_SET.has(p.jp)?' ⭐':''}</div>
      <div class="pi-mid"><div class="pi-romaji">${escapeHtml(p.romaji||'')}</div><div class="pi-fr">${escapeHtml(p.fr||'')}</div></div>
      ${p.level ? `<div class="pi-level">${escapeHtml(p.level)}</div>` : ''}
      <div class="pi-tag">${escapeHtml(p.tag)}</div>
      <div class="pi-due" style="color:${isDue&&!p.archived?'#b8401f':'#9a9184'}">${dueLabel}</div>
      <button class="pi-restore" data-id="${p.id}">${p.archived?'↩ Remettre':'🎓 Je sais déjà'}</button>
      <button class="pi-del" data-id="${p.id}" title="Supprimer">✕</button>
    </div>`;
  }).join('');
  list.querySelectorAll('.pi-del').forEach(b=> b.addEventListener('click', async ()=>{ removePhrase(b.dataset.id); await savePhrases(); updateImportBanner(); render(); }));
  list.querySelectorAll('.pi-restore').forEach(b=> b.addEventListener('click', async ()=>{
    const p = phrases.find(x=>x.id===b.dataset.id);
    if(p){ archiveCard(p, !p.archived); await savePhrases(); render(); }
  }));
}
// Petit en-tête inséré au changement de niveau dans une liste triée par levelRank —
// rend le regroupement A0 → A1 → A2 visible plutôt qu'un simple tri silencieux.
const LEVEL_INTRO = {
  'A0':'Bases absolues — à voir en premier, avant tout le reste.',
  'A1':'Une fois les bases à l\'aise : vocabulaire du quotidien.',
  'A2':'Une fois l\'A1 confortable : situations plus élaborées.',
};
function levelHeaderHtml(level){
  const label = level || 'Sans niveau';
  const intro = LEVEL_INTRO[level] || '';
  return `<div class="level-section-head"><span class="lsh-badge">${escapeHtml(label)}</span>${intro ? `<span class="lsh-intro">${escapeHtml(intro)}</span>` : ''}</div>`;
}

// Liste ⭐ Essentiels : construite depuis le SEED_PACK filtré par CORE_SET (source de vérité),
// visible même avant l'import du pack. Indique si la carte est déjà dans les révisions.
function renderCoreList(list){
  const inSrs = existingKeySet();
  const core = SEED_PACK.filter(r => CORE_SET.has(r.jp))
    .slice().sort((a,b)=> levelRank(a.level) - levelRank(b.level));
  let lastLevel = null;
  list.innerHTML = `<p style="font-size:12.5px;color:#7a7268;margin:0 0 10px;">Les <b>${core.length} phrases ⭐</b> qui couvrent ~80 % des situations réelles. Si tu manques de temps, maîtrise-les en priorité.</p>` +
    core.map(r=>{
      const added = inSrs.has(cardKey(r.jp, r.romaji));
      const header = (r.level !== lastLevel) ? (lastLevel = r.level, levelHeaderHtml(r.level)) : '';
      return header + `<div class="phrase-item">
        <div class="pi-jp">⭐ ${escapeHtml(r.jp)}</div>
        <div class="pi-mid"><div class="pi-romaji">${escapeHtml(r.romaji||'')}</div><div class="pi-fr">${escapeHtml(r.fr||'')}</div></div>
        ${r.level ? `<div class="pi-level">${escapeHtml(r.level)}</div>` : ''}
        <div class="pi-tag">${escapeHtml(r.tag)}</div>
        <div class="pi-due" style="color:${added?'#5c7a4f':'#9a9184'}">${added?'dans tes révisions ✓':'pas encore importée'}</div>
      </div>`;
    }).join('');
}
export function renderStats(){
  document.getElementById('statTotal').textContent = phrases.length;
  document.getElementById('statDue').textContent = getDueAll().length;
  document.getElementById('statMastered').textContent = phrases.filter(p=>p.interval >= 21).length;
}

// ---------- Partage de progression via URL ----------
export function exportToURL(){
  try {
    const data = {
      phrases: JSON.parse(localStorage.getItem('phrases-v2') || '[]'),
      meta: JSON.parse(localStorage.getItem('meta-v2') || '{}'),
      exportedAt: new Date().toISOString()
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const url = location.origin + location.pathname + '#sync=' + encoded;
    return url;
  } catch(e) { return null; }
}

export async function importFromURL(){
  const hash = location.hash;
  if(!hash.startsWith('#sync=')) return false;
  try {
    const encoded = hash.slice(6);
    const data = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    if(data.phrases) localStorage.setItem('phrases-v2', JSON.stringify(data.phrases));
    if(data.meta) localStorage.setItem('meta-v2', JSON.stringify(data.meta));
    history.replaceState(null, '', location.pathname); // nettoie l'URL
    await loadAll();
    return true;
  } catch(e) { return false; }
}

export function initManage(){
  document.getElementById('importBtn').addEventListener('click', async ()=>{
    const levels = Array.from(document.querySelectorAll('#levelPick input:checked')).map(i=>i.value);
    const existing = existingKeySet(); let added = 0;
    SEED_PACK.forEach(row=>{
      if(!levels.includes(row.level)) return;
      const key = cardKey(row.jp, row.romaji);
      if(existing.has(key)) return;
      phrases.push(newCard(row.jp, row.romaji, row.fr, row.ex, row.tag, row.level));
      existing.add(key); added++;
    });
    if(added > 0) await savePhrases();
    updateImportBanner(); render();
    if(added > 0){ document.getElementById('importStatusText').textContent = added + ' phrase' + (added===1?'':'s') + ' importée' + (added===1?'':'s') + ' ✓'; setTimeout(updateImportBanner, 2200); }
  });
  document.querySelectorAll('#levelPick input').forEach(cb=> cb.addEventListener('change', updateImportBanner));

  document.getElementById('addPhraseBtn').addEventListener('click', async ()=>{
    const jp = document.getElementById('f-jp').value.trim();
    const romaji = document.getElementById('f-romaji').value.trim();
    const fr = document.getElementById('f-fr').value.trim();
    const note = document.getElementById('f-note').value.trim();
    const tag = document.getElementById('f-tag').value.trim();
    if(!jp || !fr){ alert('Au minimum : le japonais et la traduction.'); return; }
    phrases.push(newCard(jp, romaji, fr, note, tag, ''));
    await savePhrases();
    ['f-jp','f-romaji','f-fr','f-note','f-tag'].forEach(id=>document.getElementById(id).value='');
    updateImportBanner(); render();
  });
  document.getElementById('dailyLimit').addEventListener('change', e=>{ meta.dailyLimit = Math.max(1, parseInt(e.target.value,10) || 40); saveMeta(); });

  document.getElementById('exportJsonBtn').addEventListener('click', ()=>{
    exportProgressionJSON();
  });

  document.getElementById('importJsonInput').addEventListener('change', async (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const status = document.getElementById('importJsonStatus');
    if(!confirm('⚠️ Ceci remplacera ta progression actuelle (phrases, intervalles SRS, streak).\nContinuer ?')){
      e.target.value = ''; return;
    }
    try {
      const count = await importProgressionJSON(file);
      status.textContent = '✅ ' + count + ' phrase' + (count===1?'':'s') + ' restaurée' + (count===1?'':'s') + ' !';
      render();
    } catch(err) {
      status.textContent = '❌ Erreur : ' + err.message;
    }
    e.target.value = '';
  });

  document.getElementById('exportUrlBtn').addEventListener('click', ()=>{
    const url = exportToURL();
    if(!url){ document.getElementById('exportUrlStatus').textContent = '⚠️ Erreur — aucune donnée à exporter.'; return; }
    const result = document.getElementById('exportUrlResult');
    document.getElementById('exportUrlText').value = url;
    result.style.display = 'block';
    navigator.clipboard.writeText(url).then(()=>{
      document.getElementById('exportUrlStatus').textContent = '✓ Copié dans le presse-papier !';
    }).catch(()=>{
      document.getElementById('exportUrlStatus').textContent = 'Sélectionne et copie le lien ci-dessous.';
    });
  });
}
