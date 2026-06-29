import { phrases, meta, existingKeySet, newCard, savePhrases, saveMeta, archiveCard, getDueAll, nowTs, removePhrase } from '../storage.js';
import { SEED_PACK, CORE_SET } from '../../data/phrases.js';
import { escapeHtml } from '../util.js';
import { render } from '../main.js';

// ---------- import ----------
export function updateImportBanner(){
  const existing = existingKeySet();
  const remaining = SEED_PACK.filter(row => !existing.has((row.jp+'|'+row.romaji).toLowerCase())).length;
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

let listFilterTag = 'all';
export function setListFilterTag(tag){ listFilterTag = tag; }

export function renderTagChips(){
  const chipsEl = document.getElementById('tagChips');
  const tags = ['all', ...new Set(phrases.map(p=>p.tag)), 'archivées'];
  chipsEl.innerHTML = tags.map(t=>`<span class="tag-chip ${t===listFilterTag?'active':''}" data-tag="${t}">${t==='all'?'Toutes':(t==='archivées'?'🎓 Déjà sues':t)}</span>`).join('');
  chipsEl.querySelectorAll('.tag-chip').forEach(c=> c.addEventListener('click', ()=>{ listFilterTag = c.dataset.tag; renderList(); renderTagChips(); }));
}
export function renderList(){
  const list = document.getElementById('phraseList');
  let items;
  if(listFilterTag === 'archivées') items = phrases.filter(p=>p.archived);
  else if(listFilterTag === 'all') items = phrases.filter(p=>!p.archived);
  else items = phrases.filter(p=>p.tag===listFilterTag && !p.archived);
  items = items.slice().sort((a,b)=>a.due-b.due);
  if(items.length === 0){ list.innerHTML = `<p style="font-size:13px;color:#9a9184;text-align:center;padding:20px;">${listFilterTag==='archivées' ? "Rien d'archivé pour l'instant — marque une phrase « Je connais déjà » pendant une révision, ou avec le bouton 🎓 ci-dessous." : 'Aucune phrase pour le moment.'}</p>`; return; }
  list.innerHTML = items.map(p=>{
    const isDue = p.due <= nowTs();
    const dueLabel = p.archived ? 'archivée' : (isDue ? 'à revoir' : 'dans ' + Math.max(1, Math.ceil((p.due-nowTs())/86400000)) + 'j');
    return `<div class="phrase-item ${p.archived?'pi-archived':''}">
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
export function renderStats(){
  document.getElementById('statTotal').textContent = phrases.length;
  document.getElementById('statDue').textContent = getDueAll().length;
  document.getElementById('statMastered').textContent = phrases.filter(p=>p.interval >= 21).length;
}

export function initManage(){
  document.getElementById('importBtn').addEventListener('click', async ()=>{
    const levels = Array.from(document.querySelectorAll('#levelPick input:checked')).map(i=>i.value);
    const existing = existingKeySet(); let added = 0;
    SEED_PACK.forEach(row=>{
      if(!levels.includes(row.level)) return;
      const key = (row.jp+'|'+row.romaji).toLowerCase();
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
  document.getElementById('dailyLimit').addEventListener('change', e=>{ meta.dailyLimit = Math.max(1, parseInt(e.target.value,10) || 8); saveMeta(); });
}
