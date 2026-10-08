import { KANA_BASE, KANA_DAKUTEN, KANA_HANDAKUTEN, KANA_YOON, KATAKANA_ONLY } from '../data/kana.js';

export function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// ---------- Kana → romaji (dérivé des tables validées de data/kana.js) ----------
// Utilisé pour garantir un romaji sous CHAQUE caractère japonais dans la section JLPT N5.
// Convertit hiragana + katakana, gère les combinaisons yōon (きゃ) et le petit tsu (っ, double la consonne suivante).
// Style doublé (ou, uu) plutôt que macron, pour cohérence avec le reste des données de l'app.
const KANA_ROMAJI_MAP = (() => {
  const map = {};
  [...KANA_BASE, ...KANA_DAKUTEN, ...KANA_HANDAKUTEN, ...KANA_YOON].forEach(g => {
    g.items.forEach(it => { map[it.h] = it.romaji; map[it.k] = it.romaji; });
  });
  KATAKANA_ONLY.forEach(it => { map[it.k] = it.romaji; });
  return map;
})();
const KANA_KEYS_BY_LEN = Object.keys(KANA_ROMAJI_MAP).sort((a, b) => b.length - a.length);
const SOKUON = new Set(['っ', 'ッ']);

export function kanaToRomaji(str){
  if(!str) return '';
  // 「・」 (point médian katakana) sépare deux lectures : il doit devenir un séparateur latin,
  // sinon un caractère japonais subsiste dans une ligne censée être 100 % lisible en romaji.
  str = str.replace(/・/g, ' / ').replace(/\s{2,}/g, ' ');
  let out = '', i = 0;
  while(i < str.length){
    const ch = str[i];
    if(SOKUON.has(ch)){
      i++;
      const matched = KANA_KEYS_BY_LEN.find(k => str.startsWith(k, i));
      if(matched) out += KANA_ROMAJI_MAP[matched][0]; // double la consonne suivante
      continue;
    }
    if(ch === 'ー'){ out += out.slice(-1); i++; continue; }
    const matched = KANA_KEYS_BY_LEN.find(k => str.startsWith(k, i));
    if(matched){ out += KANA_ROMAJI_MAP[matched]; i += matched.length; continue; }
    out += ch; i++; // caractères non-kana (kanji, ponctuation, parenthèses…) inchangés
  }
  return out;
}

// Ajoute la romanisation entre parenthèses juste après une furigana entre （）, ex: "一つ（ひとつ）" → "一つ（ひとつ / hitotsu）"
export function annotateFurigana(str){
  if(!str) return '';
  return str.replace(/（([^）]+)）/g, (m, kana) => `（${kana} / ${rjMark(kanaToRomaji(kana))}）`);
}

// ---------- Marqueurs romaji dans du texte libre ----------
// Un romaji noyé dans une phrase (explication, lecture d'un kanji…) doit pouvoir être masqué
// seul. On l'entoure de ⟦…⟧ dans la donnée, et escapeRj() le transforme en <span class="rj-inline">
// APRÈS l'échappement HTML — le module romajiToggle gère ensuite ces spans comme les autres.
export function rjMark(s){ return '⟦' + s + '⟧'; }
export function escapeRj(s){
  return escapeHtml(s).replace(/⟦([^⟧]*)⟧/g, '<span class="rj-inline">$1</span>');
}

export function emptyState(title, body){ return `<div class="empty"><div class="stamp">合格</div><h3>${title}</h3><p>${body}</p></div>`; }

// ---------- Particules en couleur ----------
const PARTICLE_MAP = {
  'から':'p-kara','まで':'p-made','より':'p-yori','ので':'p-node','のに':'p-noni',
  'は':'p-wa','が':'p-ga','を':'p-wo','に':'p-ni','で':'p-de',
  'へ':'p-e','と':'p-to','も':'p-mo','の':'p-no',
};
const PARTICLE_RE = /(から|まで|より|ので|のに|は|が|を|に|で|へ|と|も|の)/g;
export function colorizeJp(text){
  if(!text) return '';
  return text.split(PARTICLE_RE).map(part =>
    PARTICLE_MAP[part]
      ? `<span class="${PARTICLE_MAP[part]}">${escapeHtml(part)}</span>`
      : escapeHtml(part)
  ).join('');
}

// ---------- Pitch accent ----------
// Format du champ pitch : morae séparés par "-", MAJUSCULE = ton haut, minuscule = ton bas
// Ex: おはよう → "o-HA-YO-u"  /  はい → "HA-i"
export function renderPitch(pitchStr){
  if(!pitchStr) return '';
  const morae = pitchStr.split('-');
  const spans = morae.map(m => {
    const isHigh = /[A-Z]/.test(m);
    return `<span class="mora ${isHigh?'hi':'lo'}">${escapeHtml(m.toLowerCase())}</span>`;
  }).join('<span class="mora-sep">·</span>');
  return `<div class="pitch-row" title="Hauteur tonale : soulignement = ton haut, gris = ton bas">${spans}</div>`;
}

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
