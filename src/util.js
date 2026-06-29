export function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

export function emptyState(title, body){ return `<div class="empty"><div class="stamp">合格</div><h3>${title}</h3><p>${body}</p></div>`; }

// ---------- Détection automatique des patterns grammaticaux (pattern recognition) ----------
export function detectGrammarTags(jp){
  const tags = [];
  if(/たい/.test(jp)) tags.push('vouloir -たい');
  if(/ました/.test(jp)) tags.push('passé -ました');
  if(/ません/.test(jp)) tags.push('négation -ません');
  if(/ましょう/.test(jp)) tags.push('proposition -ましょう');
  if(/てください/.test(jp)) tags.push('demande -てください');
  if(/ています|ています/.test(jp)) tags.push('en cours -ています');
  if(/ませんか/.test(jp)) tags.push('invitation -ませんか');
  if(/は/.test(jp)) tags.push('は thème');
  if(/が/.test(jp)) tags.push('が sujet');
  if(/を/.test(jp)) tags.push('を objet');
  if(/に/.test(jp) && !/たい/.test(jp)) tags.push('に direction/moment');
  if(/で/.test(jp)) tags.push('で lieu/moyen');
  return tags.slice(0,3);
}

export function grammarChipsHtml(jp){
  const tags = detectGrammarTags(jp);
  if(!tags.length) return '';
  return `<div style="margin-top:8px;display:flex;gap:5px;flex-wrap:wrap;">${tags.map(t=>`<span style="font-size:10.5px;background:rgba(44,62,92,0.1);color:var(--indigo);padding:3px 9px;border-radius:999px;font-weight:600;">${escapeHtml(t)}</span>`).join('')}</div>`;
}
export function formatExplain(txt){
  // bold the Japanese chunks so structure reads clearly
  return escapeHtml(txt).replace(/([぀-ヿ一-龯〜ー]+)/g, '<b class="jpchunk">$1</b>');
}
