// Aide kanji partagée (révision de phrases, etc.) : sens, lectures en romaji, briques, astuce de mémorisation.
import { escapeHtml, kanaToRomaji } from './util.js';

const CJK = /[㐀-䶿一-鿿]/;
let DECK = null, RADS = null, loading = null;

export const hasKanji = t => CJK.test(String(t || ''));
export const deckReady = () => !!DECK;

// Chargement unique du dictionnaire des kanji ; l'appelant re-rend quand la promesse se résout.
export function loadKanjiHelp(){
  if(DECK) return Promise.resolve();
  if(!loading) loading = import('../data/kanji-joyo.js').then(m => {
    DECK = new Map(m.KANJI_DECK.map(d => [d.k, d]));
    RADS = new Map(m.RADICALS.map(r => [r.r, r]));
  });
  return loading;
}

const rom = k => kanaToRomaji(String(k).replace(/[()（）]/g, '').replace(/\./g, ''));
const ks = jp => [...new Set(String(jp).match(/[㐀-䶿一-鿿]/g) || [])];

// Un conseil de mémorisation par kanji : l'histoire du dictionnaire si elle existe, sinon les briques.
function tipFor(c, d){
  if(d.st) return d.st;
  const parts = (d.c || []).map(g => { const r = RADS && RADS.get(g); return r ? `${g} (${r.name})` : g; });
  return parts.length ? `Repère les briques : ${parts.join(' + ')}.` : `Associe ${c} à « ${d.fr} » en le disant à voix haute.`;
}

// Bloc HTML : une fiche par kanji du texte. Renvoie '' si le dictionnaire n'est pas chargé ou si pas de kanji.
export function kanjiHelpHtml(jp){
  if(!DECK) return '';
  const chars = ks(jp); if(!chars.length) return '';
  const rows = chars.map(c => {
    const d = DECK.get(c);
    if(!d) return `<div class="kh-row"><span class="kh-g">${escapeHtml(c)}</span><div class="kh-t">Kanji hors liste N5/N4 : vérifie dans un dictionnaire.</div></div>`;
    const on = (d.on || []).slice(0, 2).map(x => `${escapeHtml(x)} <span class="kh-rom">${escapeHtml(rom(x))}</span>`).join(' · ');
    const kun = (d.kun || []).slice(0, 2).map(x => `${escapeHtml(x)} <span class="kh-rom">${escapeHtml(rom(x))}</span>`).join(' · ');
    const comps = (d.c || []).map(g => { const r = RADS && RADS.get(g); return `<b>${escapeHtml(g)}</b> ${escapeHtml(r ? r.name : '')}`; }).join(' + ');
    return `<div class="kh-row">
      <span class="kh-g">${escapeHtml(c)}</span>
      <div class="kh-t"><b>${escapeHtml(d.fr)}</b>
        ${on ? `<div class="kh-rd">On : ${on}</div>` : ''}${kun ? `<div class="kh-rd">Kun : ${kun}</div>` : ''}
        ${comps ? `<div class="kh-c">Briques : ${comps}</div>` : ''}
        <div class="kh-tip">💡 ${escapeHtml(tipFor(c, d))}</div>
      </div></div>`;
  }).join('');
  return `<div class="kh-box">${rows}
    <div class="kh-general"><b>Pour les retenir</b>
      <ul><li>Lis la phrase à voix haute en même temps que tu regardes les kanji.</li>
      <li>Ne mémorise pas tout : repère le kanji qui revient souvent (人, 日, 食…) et la brique connue.</li>
      <li>Un kanji = un sens de base. Les lectures viennent ensuite, avec les mots.</li></ul></div>
  </div>`;
}
