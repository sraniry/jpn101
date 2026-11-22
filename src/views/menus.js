import { MENUS, MENU_VOCAB, MENU_PHRASES, MENU_ASK, MENU_CHALLENGES } from '../../data/menus.js';
import { ASK_LEX, ASK_PARTICLES } from '../../data/ask-lexicon.js';
import { KIT_VOCAB, KIT_PHRASES, KIT_ASK, KIT_TIPS, KIT_CHALLENGES } from '../../data/kyoto-kit.js';
import { planMark, registerStudyActivity, addQuizStat, getQuizStats, recordAnswer, meta } from '../storage.js';
import { kanaPathState } from './kana.js';
import { speak } from '../tts.js';
import { escapeHtml, kanaToRomaji, romajiPhrase } from '../util.js';
import { celebrate } from '../encouragement.js';

let DECK_CACHE = null, RAD_CACHE = null;
async function deck(){ if(!DECK_CACHE){ const m = await import('../../data/kanji-joyo.js'); DECK_CACHE = new Map(m.KANJI_DECK.map(d => [d.k, d])); RAD_CACHE = new Map(m.RADICALS.map(r => [r.r, r])); } return DECK_CACHE; }
const hira2kata = t => t.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
const isKanaStr = t => /^[ぁ-ゖァ-ヺー・\s]+$/.test(t);
// Fiche de lecture des kanji d'un mot : sens, prononciation en romaji, briques et aide-mémoire.
function kanjiInfoHtml(jp){
  if(!DECK_CACHE) return '';
  const chars = [...new Set(jp.match(CJK) || [])]; if(!chars.length) return '';
  const rows = chars.map(c => {
    const d = DECK_CACHE.get(c); if(!d) return `<div class="ki-row"><span class="ki-g">${escapeHtml(c)}</span><div class="ki-t">Kanji hors liste</div></div>`;
    const on = (d.on || []).slice(0, 2).map(x => `${escapeHtml(hira2kata(x))} ${rj(x)}`).join(' · ');
    const kun = (d.kun || []).slice(0, 2).map(x => `${escapeHtml(x)} ${rj(x.replace(/[()]/g, ''))}`).join(' · ');
    const comps = (d.c || []).map(g => `${escapeHtml(g)} ${escapeHtml(RAD_CACHE.get(g) ? RAD_CACHE.get(g).name : '')}`).join(' + ');
    return `<div class="ki-row"><span class="ki-g">${escapeHtml(c)}</span><div class="ki-t"><b>${escapeHtml(d.fr)}</b>
      ${on ? `<div class="ki-rd">On : ${on}</div>` : ''}${kun ? `<div class="ki-rd">Kun : ${kun}</div>` : ''}
      ${comps ? `<div class="ki-c">Briques : ${comps}</div>` : ''}${d.st ? `<div class="ki-s">💡 ${escapeHtml(d.st)}</div>` : ''}</div></div>`;
  }).join('');
  return `<div class="ki-box"><span class="kj-slabel">Les kanji de ce mot</span>${rows}</div>`;
}
const CJK = /[㐀-䶿一-鿿]/g;

// ---------- Menus : lire une carte (café, udon, ramen, sushi) et savoir commander ----------
let sub = 'home';   // home | menu | vocab | phrases | ask | quiz
let ui = {};

const dayNumber = () => Math.floor(Date.now() / 86400000);
const ALL_CHALLENGES = [];
(function(){ const a = MENU_CHALLENGES, b = KIT_CHALLENGES; for(let i = 0; i < Math.max(a.length, b.length); i++){ if(a[i]) ALL_CHALLENGES.push(a[i]); if(b[i]) ALL_CHALLENGES.push(b[i]); } })();
const KIT_IDS = new Set(KIT_CHALLENGES.map(c => c.id));
const ALL_VOCAB = [...MENU_VOCAB, ...KIT_VOCAB];
export const todayChallenge = () => {
  // Tant que les kana ne sont pas acquis, pas de défi qui demande de lire des kanji : on propose
  // les défis de phrases à dire (aucune lecture requise) ou de situations.
  let pool = ALL_CHALLENGES;
  try{ const k = kanaPathState(); if(k.done < k.total) pool = ALL_CHALLENGES.filter(c => c.kind === 'phrases' || c.kind === 'ask'); }catch(e){}
  if(!pool.length) pool = ALL_CHALLENGES;
  return pool[dayNumber() % pool.length];
};
export function openMenuChallenge(id){
  const ch = ALL_CHALLENGES.find(c => c.id === id) || todayChallenge();
  sub = 'quiz'; ui = { quiz: buildChallengeQuiz(ch), challenge: ch };
  renderMenus();
}

const rj = kana => `<span class="rj-inline">${escapeHtml(kanaToRomaji(kana || ''))}</span>`;
const yen = n => n.toLocaleString('fr-FR') + ' 円';
function shuffle(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const pick = (arr, n) => shuffle(arr).slice(0, n);
const uniqBy = (arr, f) => { const seen = new Set(); return arr.filter(x => { const k = f(x); if(seen.has(k)) return false; seen.add(k); return true; }); };

export async function renderMenus(){
  const area = document.getElementById('menusArea');
  if(!DECK_CACHE){ try{ await deck(); }catch(e){} }
  if(sub === 'home') return renderHome(area);
  if(sub === 'menu') return renderMenu(area);
  if(sub === 'vocab') return renderVocab(area);
  if(sub === 'phrases') return renderPhrases(area);
  if(sub === 'ask') return renderAsk(area);
  if(sub === 'quiz') return renderQuiz(area);
  if(sub === 'kit') return renderKit(area);
  if(sub === 'guess') return renderGuess(area);
  if(sub === 'photo') return renderPhoto(area);
}
function go(s, extra){ sub = s; ui = extra || {}; renderMenus(); }
const backBtn = `<button class="conv-back" id="mnBack">← Menus</button>`;
const wireBack = () => { const b = document.getElementById('mnBack'); if(b) b.addEventListener('click', () => go('home')); };
function wireAudio(root){ root.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); speak(b.dataset.say, 0.85); })); }

// ---------- accueil ----------
function renderHome(area){
  lexicon().catch(() => {});
  const ch = todayChallenge();
  let html = `<div class="skills-intro"><b>Lire une carte, commander, poser des questions.</b> Café de matcha, udon, ramen avec distributeur de tickets, sushi : on s'entraîne sur de vraies cartes, avec les kanji tels qu'on les voit sur place. Astuce : essaie de lire AVANT de révéler la traduction.</div>
  <div class="mn-challenge" id="mnChallenge"><span class="mn-ch-tag">Défi du jour</span><b>${ch.icon} ${escapeHtml(ch.title)}</b><span>${escapeHtml(ch.goal)}</span><span class="ts-go">Relever le défi →</span></div>
  <h4 class="kj-h">📜 Lire une vraie carte</h4><div class="mn-grid">`;
  MENUS.forEach(m => { html += `<button class="mn-tile" data-menu="${m.id}"><span class="mn-ico">${m.icon}</span><b>${escapeHtml(m.title)}</b><small>${escapeHtml(m.shop)}</small></button>`; });
  html += `</div><h4 class="kj-h">📷 Lire une carte « en vrai »</h4><div class="mn-grid">
    <button class="mn-tile" data-go="guessPick"><span class="mn-ico">🕵️</span><b>Devine le plat</b><small>Tu vois le nom, tu devines, puis correction avec les kanji</small></button>
    <button class="mn-tile" data-go="photo"><span class="mn-ico">📷</span><b>Ma photo de menu</b><small>Ta photo + un lecteur de mots</small></button>
  </div><h4 class="kj-h">🚉 Kit survie Kyoto</h4><div class="mn-grid">${KIT_VOCAB.map(g => `<button class="mn-tile" data-kit="${g.id}"><span class="mn-ico">${g.icon}</span><b>${escapeHtml(g.title)}</b><small>${g.items.length} mots, conseils, mises en situation</small></button>`).join('')}
    <button class="mn-tile" data-go="panneaux"><span class="mn-ico">🪧</span><b>Lire les panneaux</b><small>14 panneaux à décoder</small></button>
    <button class="mn-tile" data-go="kitphrases"><span class="mn-ico">💬</span><b>Phrases utiles en ville</b><small>${KIT_PHRASES.length} phrases avec audio</small></button></div><h4 class="kj-h">📖 Les mots à connaître</h4><div class="mn-grid">`;
  MENU_VOCAB.forEach(g => { html += `<button class="mn-tile" data-vocab="${g.id}"><span class="mn-ico">${g.icon}</span><b>${escapeHtml(g.title)}</b><small>${g.items.length} mots</small></button>`; });
  html += `</div><h4 class="kj-h">🗣️ Parler</h4><div class="mn-grid">
    <button class="mn-tile" data-go="phrases"><span class="mn-ico">💬</span><b>Phrases pour commander</b><small>${MENU_PHRASES.length} phrases avec audio</small></button>
    <button class="mn-tile" data-go="ask"><span class="mn-ico">❓</span><b>Que dire dans cette situation ?</b><small>${MENU_ASK.length} mises en situation</small></button>
  </div>
  <details class="kj-method"><summary>🍣 Astuces pour lire une carte</summary>
    <p><b>Les prix.</b> 円 se lit « en », c'est le yen. Un prix suivi de 税込 est « taxe comprise » : c'est ce que tu paieras.</p>
    <p><b>Tailles.</b> 並 = normal, 大盛 = grande portion, 小 = petit.</p>
    <p><b>Chaud / froid.</b> ホット ou 温 = chaud. アイス ou 冷 = froid.</p>
    <p><b>Distributeur de tickets (券売機).</b> On paie d'abord à la machine, on prend le ticket, et on le donne au personnel. Beaucoup de ramen et d'udon fonctionnent ainsi.</p>
    <p><b>Les poissons.</b> Les noms sont souvent écrits en kana sur les cartes : les kanji comme 鮪 ou 鯛 se voient surtout sur les tasses et les menus de sushiya traditionnels.</p>
  </details>`;
  area.innerHTML = html;
  document.getElementById('mnChallenge').addEventListener('click', () => openMenuChallenge(ch.id));
  area.querySelectorAll('[data-menu]').forEach(b => b.addEventListener('click', () => go('menu', { id: b.dataset.menu, reveal: false })));
  area.querySelectorAll('[data-kit]').forEach(b => b.addEventListener('click', () => go('kit', { id: b.dataset.kit })));
  area.querySelectorAll('[data-vocab]').forEach(b => b.addEventListener('click', () => go('vocab', { id: b.dataset.vocab, reveal: false })));
  area.querySelectorAll('[data-go="panneaux"]').forEach(b => b.addEventListener('click', () => go('quiz', { quiz: buildAskQuiz('panneau', 8), title: 'Panneaux', backTo: 'home', backUi: {} })));
  area.querySelectorAll('[data-go]:not([data-go="panneaux"])').forEach(b => b.addEventListener('click', () => go(b.dataset.go === 'guessPick' ? 'guess' : (b.dataset.go === 'kitphrases' ? 'phrases' : b.dataset.go), b.dataset.go === 'kitphrases' ? { kit: true } : {})));
}

// ---------- une carte ----------
function renderMenu(area){
  const m = MENUS.find(x => x.id === ui.id);
  let html = `<div class="kj-top">${backBtn}<span>${m.icon} ${escapeHtml(m.title)}</span></div>
    <div class="skills-intro">${escapeHtml(m.intro)}</div>
    <div class="mn-styles">Style : <button data-st="paper" class="${(ui.style||'paper')==='paper'?'on':''}">Papier</button><button data-st="chalk" class="${ui.style==='chalk'?'on':''}">Tableau</button><button data-st="vertical" class="${ui.style==='vertical'?'on':''}">Vertical</button></div>
    <div class="mn-board b-${ui.style || 'paper'}"><div class="mn-shop">${escapeHtml(m.shop)}</div>`;
  m.sections.forEach(sec => {
    html += `<div class="mn-sec"><span>${escapeHtml(sec.title)}</span><small>${escapeHtml(sec.titleFr || '')}</small></div>`;
    sec.items.forEach(it => {
      html += `<div class="mn-item" data-i="${escapeHtml(it.jp)}">
        <div class="mn-main"><span class="mn-jp">${escapeHtml(it.jp)}</span><span class="mn-price">${it.price ? yen(it.price) : '無料'}</span></div>
        <div class="mn-sub"><span class="mn-kana">${escapeHtml(it.kana)} · ${rj(it.kana)}</span><button class="kj-audio" data-say="${escapeHtml(it.kana)}">🔊</button></div>
        <div class="mn-fr" style="display:${ui.reveal ? 'block' : 'none'}">${escapeHtml(it.fr)}${it.note ? ` <small>— ${escapeHtml(it.note)}</small>` : ''}${kanjiInfoHtml(it.jp)}</div>
      </div>`;
    });
  });
  html += `</div><div class="mn-actions"><button class="kj-subnav-btn" id="mnReveal">${ui.reveal ? '🙈 Cacher les traductions' : '👁️ Montrer les traductions'}</button><button class="continue-btn" id="mnQuiz">Quiz sur cette carte →</button></div>
    <p class="kj-tip">Touche un article pour voir sa traduction. Essaie de deviner d'abord.</p>`;
  area.innerHTML = html;
  area.querySelectorAll('.mn-styles button').forEach(b => b.addEventListener('click', () => { ui.style = b.dataset.st; renderMenus(); }));
  wireBack(); wireAudio(area);
  area.querySelectorAll('.mn-item').forEach(el => el.addEventListener('click', () => { const f = el.querySelector('.mn-fr'); f.style.display = f.style.display === 'none' ? 'block' : 'none'; }));
  document.getElementById('mnReveal').addEventListener('click', () => { ui.reveal = !ui.reveal; renderMenus(); });
  document.getElementById('mnQuiz').addEventListener('click', () => go('quiz', { quiz: buildMenuQuiz(m, 8), title: m.title, backTo: 'menu', backUi: { id: m.id, reveal: ui.reveal } }));
}

// ---------- vocabulaire ----------
function renderVocab(area){
  const g = ALL_VOCAB.find(x => x.id === ui.id);
  let html = `<div class="kj-top">${backBtn}<span>${g.icon} ${escapeHtml(g.title)}</span></div>
    <div class="skills-intro">${escapeHtml(g.intro)}</div>
    <div class="mn-board">`;
  g.items.forEach(it => {
    html += `<div class="mn-item">
      <div class="mn-main"><span class="mn-jp">${escapeHtml(it.jp)}</span></div>
      <div class="mn-sub"><span class="mn-kana">${escapeHtml(it.kana)} · ${rj(it.kana)}</span><button class="kj-audio" data-say="${escapeHtml(it.kana)}">🔊</button></div>
      <div class="mn-fr" style="display:${ui.reveal ? 'block' : 'none'}">${escapeHtml(it.fr)}${it.note ? ` <small>— ${escapeHtml(it.note)}</small>` : ''}${kanjiInfoHtml(it.jp)}</div>
    </div>`;
  });
  html += `</div><div class="mn-actions"><button class="kj-subnav-btn" id="mnReveal">${ui.reveal ? '🙈 Cacher les traductions' : '👁️ Montrer les traductions'}</button><button class="continue-btn" id="mnQuiz">Quiz →</button></div>`;
  area.innerHTML = html;
  wireBack(); wireAudio(area);
  area.querySelectorAll('.mn-item').forEach(el => el.addEventListener('click', () => { const f = el.querySelector('.mn-fr'); f.style.display = f.style.display === 'none' ? 'block' : 'none'; }));
  document.getElementById('mnReveal').addEventListener('click', () => { ui.reveal = !ui.reveal; renderMenus(); });
  document.getElementById('mnQuiz').addEventListener('click', () => go('quiz', { quiz: buildVocabQuiz(g, 10), title: g.title, backTo: 'vocab', backUi: { id: g.id, reveal: ui.reveal } }));
}

// ---------- phrases ----------
function renderPhrases(area){
  const src = ui.kit ? KIT_PHRASES : MENU_PHRASES;
  let html = `<div class="kj-top">${backBtn}<span>💬 ${ui.kit ? 'Phrases utiles en ville' : 'Phrases pour commander'}</span></div>
    <div class="skills-intro">Écoute, répète à voix haute, puis choisis les 5 que tu utiliseras vraiment. La structure qui sert partout : <b>ce que tu veux + を + ください</b>.</div>`;
  src.forEach(p => {
    html += `<div class="mn-phrase"><div class="mn-ph-top"><span class="mn-jp-s">${escapeHtml(p.jp)}</span><button class="kj-audio" data-say="${escapeHtml(p.jp)}">🔊</button></div>
      <div class="mn-kana"><span class="rj-inline">${escapeHtml(romajiPhrase(p.kana))}</span></div><div class="mn-ph-fr">${escapeHtml(p.fr)}</div><div class="mn-when">${escapeHtml(p.when)}</div></div>`;
  });
  html += `<div class="mn-actions"><span></span><button class="continue-btn" id="mnQuiz">Quiz →</button></div>`;
  area.innerHTML = html; wireBack(); wireAudio(area);
  document.getElementById('mnQuiz').addEventListener('click', () => go('quiz', { quiz: buildPhrasesQuiz(8, src), title: 'Phrases', backTo: 'phrases', backUi: { kit: ui.kit } }));
}

// ---------- mises en situation ----------
function renderAsk(area){
  const topics = [['cafe', '☕ Café'], ['udon', '🍜 Udon'], ['ramen', '🍥 Ramen'], ['sushi', '🍣 Sushi'], ['resto', '🍽️ Restaurant']];
  area.innerHTML = `<div class="kj-top">${backBtn}<span>❓ Que dire ?</span></div>
    <div class="skills-intro">On te met dans une situation. Choisis la phrase japonaise qui convient. Une explication de prof suit chaque réponse.</div>
    <div class="mn-grid">${topics.map(([t, l]) => `<button class="mn-tile" data-t="${t}"><b>${l}</b><small>${MENU_ASK.filter(q => q.topic === t).length} situations</small></button>`).join('')}
    <button class="mn-tile" data-t="all"><b>🎲 Tout mélangé</b><small>10 situations</small></button></div>`;
  wireBack();
  area.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => go('quiz', { quiz: buildAskQuiz(b.dataset.t, b.dataset.t === 'all' ? 10 : 8), title: 'Que dire ?', backTo: 'ask', backUi: {} })));
}

// ---------- générateurs de questions ----------
const rawItems = m => m.sections.flatMap(s => s.items);
const distinctPrices = items => uniqBy(items.filter(i => i.price > 0), i => i.price);
function buildMenuQuiz(m, n){
  const items = rawItems(m), priced = distinctPrices(items), qs = [];
  pick(priced, 3).forEach(it => {
    const others = pick(priced.filter(x => x.price !== it.price), 3).map(x => yen(x.price));
    qs.push({ q: `Combien coûte « ${it.jp} » ?`, ok: yen(it.price), choices: [yen(it.price), ...others], explain: `${it.jp} (${it.fr}) : ${yen(it.price)}.`, say: it.kana, word: it.jp, kana: it.kana });
  });
  pick(items, 3).forEach(it => {
    const oth = pick(uniqBy(items.filter(x => x.fr !== it.fr), x => x.fr), 3), others = oth.map(x => x.fr);
    qs.push({ q: `Que veut dire « ${it.jp} » ?`, ok: it.fr, choices: [it.fr, ...others], inf: Object.fromEntries([it, ...oth].map(x => [x.fr, x])), explain: `${it.jp} : ${it.fr}.${it.note ? ' ' + it.note : ''}`, say: it.kana, word: it.jp, kana: it.kana });
  });
  const rev = pick(items, 1)[0];
  if(rev){ const others = pick(items.filter(x => x.jp !== rev.jp), 3).map(x => x.jp); qs.push({ q: `Quel article est « ${rev.fr} » ?`, ok: rev.jp, choices: [rev.jp, ...others], explain: `${rev.jp} = ${rev.fr}.`, say: rev.kana, word: rev.jp, kana: rev.kana }); }
  if(priced.length >= 4){
    const four = pick(priced, 4), min = four.reduce((a, b) => a.price <= b.price ? a : b);
    qs.push({ q: 'Lequel est le moins cher ?', ok: min.jp, choices: [min.jp, ...four.filter(x => x !== min).map(x => x.jp)], explain: four.map(x => `${x.jp} : ${yen(x.price)}`).join(' · ') });
    const [a, b] = pick(priced, 2), sum = a.price + b.price;
    const wrong = uniqBy([sum + 100, sum - 100, sum + 50, sum - 80, sum + 200].filter(v => v > 0 && v !== sum), v => v).slice(0, 3).map(yen);
    qs.push({ q: `Tu prends « ${a.jp} » et « ${b.jp} ». Combien paies-tu ?`, ok: yen(sum), choices: [yen(sum), ...wrong], explain: `${yen(a.price)} + ${yen(b.price)} = ${yen(sum)}.` });
  }
  return shuffle(qs).slice(0, n);
}
function buildVocabQuiz(g, n){
  const items = g.items, qs = [];
  pick(items, Math.ceil(n * 0.5)).forEach(it => {
    const oth = pick(uniqBy(items.filter(x => x.fr !== it.fr), x => x.fr), 3), others = oth.map(x => x.fr);
    qs.push({ q: `Que veut dire « ${it.jp} » ?`, ok: it.fr, choices: [it.fr, ...others], inf: Object.fromEntries([it, ...oth].map(x => [x.fr, x])), explain: `${it.jp} : ${it.fr}${it.note ? ' — ' + it.note : ''}.`, say: it.kana, word: it.jp, kana: it.kana });
  });
  pick(items, Math.floor(n * 0.3)).forEach(it => {
    const others = pick(items.filter(x => x.jp !== it.jp), 3).map(x => x.jp);
    qs.push({ q: `Comment écrit-on « ${it.fr} » ?`, ok: it.jp, choices: [it.jp, ...others], explain: `${it.fr} = ${it.jp}.`, say: it.kana, word: it.jp, kana: it.kana });
  });
  pick(items.filter(i => /[一-鿿]/.test(i.jp)), n - qs.length).forEach(it => {
    const others = pick(uniqBy(items.filter(x => x.kana !== it.kana), x => x.kana), 3).map(x => x.kana);
    qs.push({ q: `Comment se lit « ${it.jp} » ?`, ok: it.kana, choices: [it.kana, ...others], explain: `${it.jp} = ${it.fr}.`, say: it.kana, word: it.jp, kana: it.kana });
  });
  return shuffle(qs).filter(q => new Set(q.choices).size === q.choices.length).slice(0, n);
}
function buildPhrasesQuiz(n, src = MENU_PHRASES){
  return pick(src, n).map(p => {
    const others = pick(src.filter(x => x.jp !== p.jp), 3).map(x => x.jp);
    return { q: `Comment dire : « ${p.fr} » ?`, ok: p.jp, choices: [p.jp, ...others], explain: `${p.jp} — ${p.when}.`, say: p.kana };
  });
}
function buildAskQuiz(topic, n){
  const all = [...MENU_ASK, ...KIT_ASK];
  const pool = topic === 'all' ? all : all.filter(q => q.topic === topic);
  return pick(pool, n).map(a => ({ q: a.q, ok: a.ok, choices: a.choices, explain: a.explanation, say: a.ok }));
}
function buildChallengeQuiz(ch){
  if(ch.kind === 'menu') return buildMenuQuiz(MENUS.find(m => m.id === ch.ref), 6);
  if(ch.kind === 'vocab') return buildVocabQuiz(ALL_VOCAB.find(g => g.id === ch.ref), 8);
  if(ch.kind === 'phrases') return buildPhrasesQuiz(6, KIT_IDS.has(ch.id) ? KIT_PHRASES : MENU_PHRASES);
  return buildAskQuiz(ch.ref, 5);
}


// ---------- Aide des défis : grammaire + kanji + romaji ----------
const GRAMMAR_HINTS = [
  [/をください/, 'を + ください', "Ce que tu veux + を + ください = « donnez-moi … ». を marque l'objet (on le prononce « o »). C'est la phrase magique pour commander.", 'N5'],
  [/でお願いします|をお願いします|お願いします/, 'お願いします', "お願いします (onegai shimasu) = « s'il vous plaît / je vous le demande ». Plus poli que ください. で + お願いします = « avec ça, s'il vous plaît » (choix d'un réglage).", 'N5'],
  [/ですか/, '〜ですか ?', "か à la fin = point d'interrogation. Pas de changement d'ordre des mots : on ajoute か.", 'N5'],
  [/はいくら|いくら/, 'いくら', "いくら = combien (prix). Ce + は + いくら + ですか = « c'est combien ? ».", 'N5'],
  [/はどこ/, 'は + どこ', "どこ = où. Lieu + は + どこですか = « où est … ? ». は se prononce « wa ».", 'N5'],
  [/はありますか|ありますか/, 'ありますか', "ありますか = « est-ce qu'il y a … ? / vous avez … ? ». Pour une chose (pas une personne).", 'N5'],
  [/できますか/, 'できますか', "できます = pouvoir / être possible. 〜できますか = « est-ce possible de … ? ».", 'N4'],
  [/たいです/, '〜たいです', "Verbe (racine) + たいです = « je veux … ». Ex. 食べたい = je veux manger.", 'N5'],
  [/抜き/, '〜抜き', "〜抜き (nuki) = « sans … ». Ex. ねぎ抜き = sans ciboule.", 'N4'],
  [/ひとつ|ふたつ|みっつ|一つ|二つ|三つ/, 'ひとつ, ふたつ, みっつ', "Compter des objets : ひとつ = 1, ふたつ = 2, みっつ = 3. On le place après を : 抹茶ラテをひとつください.", 'N5'],
  [/これ|それ|あれ/, 'これ / それ / あれ', "これ = ceci (près de moi), それ = cela (près de toi), あれ = là-bas. は marque le thème, を l'objet.", 'N5'],
  [/何/, '何 (nan / nani)', "何 = quoi. これは何ですか = « qu'est-ce que c'est ? ».", 'N5'],
];
// Aide générale par défi (avant de commencer)
const CHALLENGE_GRAMMAR = {
  menu: ["Lire une carte", ["Le nom du plat est à gauche, le prix à droite (円 = yen).", "Les kanji décrivent la garniture : cherche ceux que tu connais.", "Appuie sur « Aide » sous la question pour voir chaque kanji (sens, lecture, romaji)."]],
  vocab: ["Retenir des mots", ["Dis chaque mot à voix haute avec 🔊.", "Les kanji sont expliqués sous la question : sens + lecture en romaji.", "Le même kanji revient dans plusieurs mots : repère-le."]],
  phrases: ["Phrases à dire", ["Structure de base : ce que tu veux + を + ください.", "お願いします = s'il vous plaît (poli).", "Le romaji est sous chaque choix : lis-le à voix haute."]],
  ask: ["Que dire dans la situation ?", ["Ce que tu veux + を + ください = « donnez-moi ».", "〜は + いくら / どこ / 何 + ですか = poser une question (か = « ? »).", "Sous chaque choix : romaji + sens des mots clés."]]
};
const grammarFor = txt => GRAMMAR_HINTS.filter(([re]) => re.test(txt)).slice(0, 4);
const gramLine = ([, t, d, lv]) => `<p><span class="lv-badge lv-${lv}">${lv}</span> <b>${escapeHtml(t)}</b> — ${escapeHtml(d)}</p>`;
const kLevel = c => { const d = DECK_CACHE && DECK_CACHE.get(c); return !d ? 'N3+' : d.j === 5 ? 'N5' : d.j === 4 ? 'N4' : 'N3+'; };
// niveau d'une phrase / d'un mot : N4 dès qu'un kanji ou une structure dépasse le N5
function textLevel(t){
  const ks = [...new Set(String(t).match(CJK) || [])];
  if(ks.some(c => kLevel(c) !== 'N5')) return 'N4';
  return grammarFor(t).some(g => g[3] === 'N4') ? 'N4' : 'N5';
}
const hintsHtml = txt => {
  const g = grammarFor(txt); if(!g.length) return '';
  const a = g.filter(x => x[3] === 'N5'), b = g.filter(x => x[3] !== 'N5');
  return `<div class="mn-gram"><span class="kj-slabel">Grammaire</span>${a.map(gramLine).join('')}${b.length ? `<span class="kj-slabel">Pour aller plus loin (N4)</span>${b.map(gramLine).join('')}` : ''}</div>`;
};
function kanjiMiniHtml(jp){
  if(!DECK_CACHE) return '';
  const chars = [...new Set(jp.match(CJK) || [])]; if(!chars.length) return '';
  const row = c => { const d = DECK_CACHE.get(c); if(!d) return `<li><b class="ki-g" style="font-size:22px">${escapeHtml(c)}</b> hors liste</li>`; const r = (d.on && d.on[0] && d.j === 5 && !(d.kun && d.kun[0])) ? d.on[0] : ((d.kun && d.kun[0]) || (d.on && d.on[0]) || ''); return `<li><b class="ki-g" style="font-size:22px">${escapeHtml(c)}</b> ${escapeHtml(d.fr)}${r ? ` <span class="mn-rom">${rj(String(r).replace(/[()]/g, ''))}</span>` : ''}</li>`; };
  const n5 = chars.filter(c => kLevel(c) === 'N5'), up = chars.filter(c => kLevel(c) !== 'N5');
  return `<div class="ki-box">${n5.length ? `<span class="kj-slabel">Kanji à connaître (N5)</span><ul class="ki-mini">${n5.map(row).join('')}</ul>` : ''}${up.length ? `<span class="kj-slabel">Pour aller plus loin (N4 et +)</span><ul class="ki-mini">${up.map(row).join('')}</ul>` : ''}</div>`;
}
function questionHelp(q, choices){
  const parts = [];
  const quoted = (q.q.match(/«\s*([^»]+?)\s*»/g) || []).map(x => x.replace(/[«»]/g, '').trim()).filter(x => /[ぁ-ヶ㐀-鿿]/.test(x));
  if(quoted.length && q.kana) parts.push(`<div class="mn-say-box"><b>${escapeHtml(quoted[0])}</b> se lit <b>${escapeHtml(q.kana)}</b> <span class="mn-rom">${rj(q.kana)}</span> <button class="kj-audio" data-say="${escapeHtml(q.kana)}">🔊</button></div>`);
  const jpTexts = [...quoted, ...choices.filter(c => /[㐀-鿿]/.test(c))];
  const kinfo = jpTexts.length ? kanjiMiniHtml(jpTexts.join('')) : '';
  const gram = hintsHtml(choices.join(' '));
  if(!parts.length && !kinfo && !gram) return '';
  return `<details class="mn-help" open><summary>💡 Aide : kanji, romaji, grammaire</summary>${parts.join('')}${kinfo}${gram}</details>`;
}
// Après la réponse : CHAQUE choix expliqué (romaji, sens des mots, grammaire, kanji), pas seulement la bonne réponse.
function allChoicesHtml(q, choices, chosen){
  const rows = choices.map(c => {
    const isOk = c === q.ok, isMine = c === chosen;
    const inf = q.inf && q.inf[c];
    const jp = /[ぁ-ヶ㐀-鿿]/.test(c) ? c : (inf ? inf.jp : '');
    let body = '';
    if(/[ぁ-ヶ㐀-鿿]/.test(c)){ const a = askRomaji(c); if(a) body += `<div class="mn-rom">${escapeHtml(a.rj)}</div>${a.gloss ? `<div class="mn-ch-gloss2">${escapeHtml(a.gloss)}</div>` : ''}`; else { const e = lexCache && lexCache.lex.get(c); if(e){ body += `<div class="mn-rom">${rj(e.kana)}</div><div class="mn-ch-gloss2">${escapeHtml(e.fr)}</div>`; } } }
    else if(inf){ body += `<div class="mn-ch-gloss2">en japonais : <b>${escapeHtml(inf.jp)}</b> ${rj(inf.kana)}</div>`; }
    if(isKanaStr(c) && !body) body += `<div class="mn-rom">${rj(c)}</div>`;
    const lv = jp ? textLevel(jp) : '';
    const kin = jp && /[㐀-鿿]/.test(jp) ? kanjiMiniHtml(jp) : '';
    const g = jp ? hintsHtml(jp) : '';
    return `<div class="mn-all ${isOk ? 'is-ok' : (isMine ? 'is-ko' : '')}"><div class="mn-all-h">${isOk ? '✓' : (isMine ? '✗' : '•')} <b>${escapeHtml(c)}</b> ${lv ? `<span class="lv-badge lv-${lv}">${lv}</span>` : ''}${isMine && !isOk ? ' <em>(ta réponse)</em>' : ''}</div>${body}${g}${kin}</div>`;
  }).join('');
  return `<details class="mn-help mn-all-box" open><summary>🔎 Chaque réponse expliquée</summary>${rows}</details>`;
}
function introHtml(ch){
  const [title, lines] = CHALLENGE_GRAMMAR[ch.kind] || CHALLENGE_GRAMMAR.ask;
  return `<details class="mn-help mn-intro" open><summary>📘 Avant de commencer : ${escapeHtml(title)}</summary><ul>${lines.map(l => `<li>${escapeHtml(l)}</li>`).join('')}</ul><p class="mn-lvnote">Repères : <span class="lv-badge lv-N5">N5</span> = à connaître d'abord · <span class="lv-badge lv-N4">N4</span> = pour aller plus loin, pas obligatoire.</p><div id="lvIntro"></div></details>`;
}
// ---------- encouragements + positionnement ----------
const OK_MSG = ['Bravo !', 'Exact, bien joué !', 'Tu progresses !', 'Super, continue !', 'Ça rentre !'];
const KO_MSG = ["Pas grave : c'est en se trompant qu'on retient.", 'Presque ! Lis l\'explication, tu l\'auras la prochaine fois.', 'Courage, tu apprends.', 'Une erreur de plus = une chose de mieux retenue.'];
const endMsg = r => r === 1 ? 'Parfait ! Tu pourrais commander les yeux fermés. 🎉' : r >= 0.8 ? 'Très bien ! Tu lis déjà beaucoup de choses. Encore un peu et c\'est parfait.' : r >= 0.6 ? 'Bien joué, tu as la moitié du chemin et plus. Relis « Chaque réponse expliquée » et refais le défi.' : r >= 0.3 ? 'C\'est un début solide : ces défis sont difficiles. Refais-le en lisant bien les aides, tu verras la différence.' : 'Pas facile, et c\'est normal : tu apprends une nouvelle écriture ! Refais-le avec les aides ouvertes, une bonne réponse à la fois.';
const streakMsg = n => n >= 5 ? `🔥 ${n} bonnes réponses d'affilée, incroyable !` : n >= 3 ? `🔥 ${n} d'affilée !` : '';
function levelStats(){
  const sum = k => getQuizStats(k).slice(-15).reduce((a, e) => [a[0] + e.correct, a[1] + e.total], [0, 0]);
  return { n5: sum('menus-n5'), n4: sum('menus-n4') };
}
// Le N4 n'apparaît que si au moins un kanji N4 a été vu (sinon on ne sait pas encore « situer » le N4).
export async function n4SeenCount(){
  try{ const m = await import('../../data/kanji-joyo.js'); const S = meta.kanjiSrs || {};
    return m.KANJI_DECK.filter(d => d.j === 4 && S[d.k]).length; }catch(e){ return 0; }
}
export function levelBoxHtml(n4Seen = 0){
  const { n5, n4 } = levelStats();
  const pc = a => a[1] ? Math.round(100 * a[0] / a[1]) : null;
  const a = pc(n5), b = n4Seen > 0 ? pc(n4) : null;
  let label, hint;
  if(n5[1] < 8){ label = 'Pas encore assez de réponses pour situer ton niveau'; hint = 'Fais 2 ou 3 défis : on te dira où tu en es.'; }
  else if(a >= 85 && b !== null && b >= 60){ label = 'Tu maîtrises le N5 et tu attaques le N4 🎉'; hint = 'Continue sur les défis N4 : lis les kanji un par un.'; }
  else if(a >= 85){ label = 'N5 solide'; hint = b === null ? 'Prochaine étape : les kanji N4 (ils apparaîtront ici).' : 'Prochaine étape : les phrases marquées N4.'; }
  else if(a >= 65){ label = 'N5 en bonne voie'; hint = 'Revois les kanji N5 des réponses ratées.'; }
  else { label = 'Début du N5 : normal, tout le monde commence ici'; hint = 'Concentre-toi sur les phrases N5 pour l\'instant.'; }
  const bar = (t, v) => `<div class="lv-bar"><span class="lv-badge lv-${t}">${t}</span><div class="lv-track"><div style="width:${v || 0}%"></div></div><b>${v === null ? '–' : v + ' %'}</b></div>`;
  return `<div class="lv-box"><b>🧭 Ton niveau estimé : ${label}</b>${bar('N5', a)}${n4Seen > 0 ? bar('N4', b) : ''}<small>${hint}</small></div>`;
}
// Version asynchrone : charge la liste des kanji pour savoir si le N4 est commencé.
export async function levelBoxAsync(){ return levelBoxHtml(await n4SeenCount()); }
// ---------- lecteur de quiz ----------
// Romaji + mots-clés sous chaque choix : on découpe la phrase avec le mini-lexique des défis (data/ask-lexicon.js).
const ASK_MAP = new Map(ASK_LEX.map(([j, k, f]) => [j, { k, f, j }]));
const ASK_MAX = Math.max(...[...ASK_MAP.keys()].map(s => s.length));
function askSegment(t){
  const out = []; let unk = '', i = 0;
  const flush = () => { if(unk){ out.push({ k: unk, j: unk, bad: /[㐀-鿿]/.test(unk) }); unk = ''; } };
  while(i < t.length){
    if(/[。、！？\s]/.test(t[i])){ flush(); i++; continue; }
    let hit = null;
    for(let n = Math.min(ASK_MAX, t.length - i); n >= 1; n--){
      const s = t.slice(i, i + n);
      if(ASK_MAP.has(s)){ hit = [s, ASK_MAP.get(s)]; break; }
      if(n <= 2 && ASK_PARTICLES[s]){ hit = [s, { k: s, j: s, p: true }]; break; }
    }
    // un は/を/が… collé à un nom est une particule, même si « はい » existe dans le lexique
    const PROTECT = ['です', 'ですか', 'でした', 'ます', 'ました', 'ません', 'ください', 'ひとつ', 'ふたつ', 'みっつ', 'どうぞ', 'どこ', 'どう'];
    const prevOk = (out.length && !out[out.length - 1].p) || unk;
    if(hit && i > 0 && prevOk && hit[0].length <= 2 && !hit[1].p && ASK_PARTICLES[t[i]] && !PROTECT.includes(hit[0]) && /^(はい|はら|でい|のり|もう|とう|でき)/.test(hit[0] + '') ) hit = [t[i], { k: t[i], j: t[i], p: true }];
    if(hit){ flush(); out.push(hit[1]); i += hit[0].length; } else { unk += t[i]; i++; }
  }
  flush(); return out;
}
export function askRomaji(text){
  const seg = askSegment(text);
  if(!seg.length || seg.some(x => x.bad)) return null;
  const rjs = seg.map(x => x.p ? ASK_PARTICLES[x.k] : kanaToRomaji(x.k));
  const gloss = []; const seen = new Set();
  seg.forEach(x => { if(x.f && !seen.has(x.j) && !/^(です|ですか|ます か|ました|ません|ください)$/.test(x.k)){ seen.add(x.j); gloss.push(`${x.j} = ${x.f}`); } });
  return { rj: rjs.join(' '), gloss: gloss.slice(0, 5).join(' · ') };
}
function choiceRj(c){
  if(/[ぁ-ヶ㐀-鿿]/.test(c)){
    const a = askRomaji(c);
    if(a) return `<span class="mn-ch-rj">${escapeHtml(a.rj)}</span>${a.gloss ? `<span class="mn-ch-gloss" style="display:block;font-size:12px;color:#5f574d;font-family:inherit">${escapeHtml(a.gloss)}</span>` : ''}`;
  }
  if(isKanaStr(c)) return `<span class="mn-ch-rj">${rj(c)}</span>`;
  const e = lexCache && lexCache.lex.get(c);
  return e && e.kana ? `<span class="mn-ch-rj">${rj(e.kana)}</span>` : '';
}
function renderQuiz(area){
  if(!lexCache) lexicon().then(() => { if(ui.quiz && document.getElementById('mnFb') && !ui.answered) { const a = document.getElementById('mnFb').closest('.kj-card'); if(a && !a.dataset.rj){ a.dataset.rj = 1; a.querySelectorAll('.mn-choice').forEach(b => { if(!b.querySelector('.mn-ch-rj')) b.insertAdjacentHTML('beforeend', choiceRj(b.dataset.c)); }); } } }).catch(() => {});
  const z = ui.quiz;
  if(!z || !z.length){ go('home'); return; }
  ui.i = ui.i || 0; ui.right = ui.right || 0;
  if(ui.i >= z.length){
    const perfect = ui.right === z.length;
    addQuizStat('menus', ui.right, z.length);
    const lv = ui.lv || {}; ['N5', 'N4'].forEach(t => { if(lv[t] && lv[t][1]) addQuizStat('menus-' + t.toLowerCase(), lv[t][0], lv[t][1]); });
    if(ui.challenge){ planMark('challenge', 1); }
    registerStudyActivity();
    celebrate('reviewCount', { emoji: '🍣', title: ui.challenge ? 'Défi du jour réussi' : 'Quiz terminé', params: { n: z.length } });
    area.innerHTML = `<div class="conv-done">${ui.right / z.length >= 0.6 ? '<div class="stamp" style="margin:0 auto 14px;">合格</div>' : ''}
      <h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${ui.right} / ${z.length}${perfect ? ' — parfait !' : ''}</h3>
      <p style="color:#5f574d;font-size:13.5px;">${endMsg(ui.right / z.length)}</p><div id="lvEnd"></div>
      <button class="continue-btn" id="mnAgain" style="margin-top:16px;">Recommencer</button> <button class="conv-back" id="mnHome" style="margin-top:16px;">← Menus</button></div>`;
    levelBoxAsync().then(h => { const e = document.getElementById('lvEnd'); if(e) e.innerHTML = h; });
    document.getElementById('mnHome').addEventListener('click', () => go('home'));
    document.getElementById('mnAgain').addEventListener('click', () => {
      if(ui.challenge) return openMenuChallenge(ui.challenge.id);
      const back = ui.backTo, bu = ui.backUi; go(back || 'home', bu);
    });
    return;
  }
  const q = z[ui.i], choices = shuffle(q.choices);
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="mnBack">← Quitter</button><span>${ui.challenge ? ui.challenge.icon + ' ' + escapeHtml(ui.challenge.title) : escapeHtml(ui.title || '')}</span><span>${ui.i + 1} / ${z.length}</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(ui.i / z.length) * 100}%"></div></div>
    <div class="kj-card">${ui.challenge && ui.i === 0 ? introHtml(ui.challenge) : ''}<p class="mn-q">${escapeHtml(q.q)}</p>
      ${questionHelp(q, choices)}<div class="kj-choices">${choices.map(c => `<button class="kj-choice mn-choice" data-c="${escapeHtml(c)}">${escapeHtml(c)}${choiceRj(c)}</button>`).join('')}</div><div id="mnFb"></div></div>`;
  if(ui.challenge && ui.i === 0) levelBoxAsync().then(h => { const e = document.getElementById('lvIntro'); if(e) e.innerHTML = h; });
  wireBack();
  area.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.c === q.ok;
    area.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === q.ok) x.classList.add('ok'); });
    if(!ok) b.classList.add('ko'); else ui.right++;
    ui.streak = ok ? (ui.streak || 0) + 1 : 0;
    const lvT = textLevel(q.ok + ' ' + (q.word || '')); ui.lv = ui.lv || {}; const L = ui.lv[lvT] = ui.lv[lvT] || [0, 0]; L[1]++; if(ok) L[0]++;
    recordAnswer(KIT_IDS.has((ui.challenge || {}).id) || ui.backTo === 'kit' ? 'kit' : 'menu', (q.word || q.q).slice(0, 40) + ':' + q.q.slice(0, 10), ok, { q: q.q, ok: q.ok, choices: q.choices, explain: q.explain, say: q.say, chosen: b.dataset.c });
    document.getElementById('mnFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ ' + OK_MSG[ui.i % OK_MSG.length] : '✗ ' + KO_MSG[ui.i % KO_MSG.length]}${streakMsg(ui.streak) ? ' ' + streakMsg(ui.streak) : ''} <span class="lv-badge lv-${lvT}">${lvT}</span></div>${q.kana ? `<div class="mn-say-box"><b>${escapeHtml(q.word || '')}</b> se dit <b>${escapeHtml(q.kana)}</b> <span class="mn-rom">${rj(q.kana)}</span> <button class="kj-audio" data-say="${escapeHtml(q.kana)}">🔊</button></div>` : ''}<div class="mn-explain">${escapeHtml(q.explain || '')}</div>${q.word ? kanjiInfoHtml(q.word) : ''}${allChoicesHtml(q, choices, b.dataset.c)}<button class="continue-btn" id="mnNext">Continuer</button>`;
    wireAudio(document.getElementById('mnFb'));
    document.getElementById('mnNext').addEventListener('click', () => { ui.i++; renderMenus(); });
    if(q.say) speak(q.say, 0.85);
  }));
}

// ---------- « Devine le plat » : deviner à partir des kanji, puis correction ----------
async function renderGuess(area){
  if(!ui.menuId){
    area.innerHTML = `<div class="kj-top">${backBtn}<span>🕵️ Devine le plat</span></div>
      <div class="skills-intro">Sur une vraie carte, tu n'as pas de traduction. Ici, tu vois le nom tel qu'il est écrit. Tu cherches ce que ça peut être, tu demandes un indice (les kanji un par un), puis tu vérifies.</div>
      <div class="mn-grid">${MENUS.map(m => `<button class="mn-tile" data-m="${m.id}"><span class="mn-ico">${m.icon}</span><b>${escapeHtml(m.title)}</b><small>${rawItems(m).length} plats</small></button>`).join('')}</div>`;
    wireBack();
    area.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => go('guess', { menuId: b.dataset.m })));
    return;
  }
  if(!ui.queue){ const m = MENUS.find(x => x.id === ui.menuId); ui.queue = pick(rawItems(m), 10); ui.i = 0; ui.score = { ok: 0, near: 0, miss: 0 }; ui.step = 0; }
  if(ui.i >= ui.queue.length){
    const sc = ui.score; addQuizStat('menus-guess', sc.ok, ui.queue.length); registerStudyActivity();
    if(ui.challenge) planMark('challenge', 1);
    area.innerHTML = `<div class="conv-done"><div class="stamp" style="margin:0 auto 14px;">合格</div><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${sc.ok} trouvés, ${sc.near} presque, ${sc.miss} ratés</h3>
      <p style="color:#5f574d;font-size:13.5px;">Ce qui compte : repérer les kanji connus. Chaque kanji appris rend la carte plus lisible.</p>
      <button class="continue-btn" id="mnAgain" style="margin-top:16px;">Rejouer</button> <button class="conv-back" id="mnHome" style="margin-top:16px;">← Menus</button></div>`;
    document.getElementById('mnHome').addEventListener('click', () => go('home'));
    document.getElementById('mnAgain').addEventListener('click', () => go('guess', { menuId: ui.menuId }));
    return;
  }
  const it = ui.queue[ui.i], D = await deck();
  const chars = [...new Set((it.jp.match(CJK) || []))];
  const hints = chars.length ? chars.map(c => { const d = D.get(c); return `<span class="gs-h"><b>${c}</b> ${d ? escapeHtml(d.fr) : '?'}</span>`; }).join('') : '<span class="gs-h">Écrit en kana : lis-le à voix haute !</span>';
  const detail = kanjiInfoHtml(it.jp);
  const m = MENUS.find(x => x.id === ui.menuId);
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="mnBack">← Quitter</button><span>${m.icon} ${escapeHtml(m.title)}</span><span>${ui.i + 1} / ${ui.queue.length}</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(ui.i / ui.queue.length) * 100}%"></div></div>
    <div class="kj-card"><div class="gs-jp">${escapeHtml(it.jp)}</div><p class="kj-ask">Qu'est-ce que ça peut être ? Essaie avant de demander un indice.</p>
      ${ui.step >= 1 ? `<div class="gs-hints"><span class="kj-slabel">Indice : les kanji</span>${hints}</div>` : ''}
      ${ui.step >= 2 ? `<div class="gs-answer"><div class="mn-fr" style="display:block;font-size:17px;">${escapeHtml(it.fr)}</div><div class="mn-say-box"><b>${escapeHtml(it.jp)}</b> se dit <b>${escapeHtml(it.kana)}</b> <span class="mn-rom">${rj(it.kana)}</span> <button class="kj-audio" data-say="${escapeHtml(it.kana)}">🔊</button></div>${detail}${it.price ? `<div class="mn-kana">${yen(it.price)}</div>` : ''}${it.note ? `<div class="mn-explain">${escapeHtml(it.note)}</div>` : ''}</div>
        <p class="kj-ask">Tu avais trouvé ?</p><div class="rate-row"><button class="rate-good" data-r="ok">Trouvé</button><button class="rate-hard" data-r="near">Presque</button><button class="rate-again" data-r="miss">Raté</button></div>`
        : `<div class="mn-actions" style="justify-content:center">${ui.step === 0 ? '<button class="kj-subnav-btn" id="gsHint">💡 Un indice</button>' : ''}<button class="continue-btn" id="gsReveal">Voir la réponse</button></div>`}
    </div>`;
  const back = document.getElementById('mnBack'); back.addEventListener('click', () => go('home'));
  wireAudio(area);
  const h = document.getElementById('gsHint'); if(h) h.addEventListener('click', () => { ui.step = 1; renderMenus(); });
  const r = document.getElementById('gsReveal'); if(r) r.addEventListener('click', () => { ui.step = 2; renderMenus(); });
  area.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => { ui.score[b.dataset.r]++; ui.i++; ui.step = 0; renderMenus(); }));
}

// ---------- Ma photo de menu : ta photo + lecteur de mots ----------
let lexCache = null;
async function lexicon(){
  if(lexCache) return lexCache;
  const D = await deck(); const lex = new Map();
  const add = (jp, kana, fr) => { if(jp && !lex.has(jp)) lex.set(jp, { kana, fr }); };
  MENUS.forEach(m => rawItems(m).forEach(i => { add(i.jp, i.kana, i.fr); add(i.jp.replace(/（[^）]*）/g, ''), i.kana, i.fr); }));
  MENU_VOCAB.forEach(g => g.items.forEach(i => { add(i.jp, i.kana, i.fr); add(i.jp.replace(/（[^）]*）/g, ''), i.kana, i.fr); }));
  try{ const kit = await import('../../data/kyoto-kit.js'); kit.KIT_VOCAB.forEach(g => g.items.forEach(i => add(i.jp, i.kana, i.fr))); }catch(e){}
  try{ const w = await import('../../data/kanji-words.js'); w.KANJI_WORDS.forEach(i => add(i.jp, i.kana, i.fr)); }catch(e){}
  D.forEach(d => { if(d.ex) add(d.ex[0], d.ex[1], d.ex[2]); });
  lexCache = { D, lex, max: Math.max(...[...lex.keys()].map(k => k.length)) };
  return lexCache;
}
function segment(text, L){
  const out = []; let i = 0;
  while(i < text.length){
    let hit = null;
    for(let n = Math.min(L.max, text.length - i); n >= 1; n--){ const sub = text.slice(i, i + n); if(L.lex.has(sub) && (n > 1 || /[㐀-䶿一-鿿]/.test(sub) || true)){ hit = [sub, L.lex.get(sub)]; break; } }
    if(hit){ out.push({ t: hit[0], e: hit[1] }); i += hit[0].length; }
    else { out.push({ t: text[i] }); i++; }
  }
  return out;
}
function renderPhoto(area){
  area.innerHTML = `<div class="kj-top">${backBtn}<span>📷 Ma photo de menu</span></div>
    <div class="skills-intro">Prends en photo une vraie carte. <b>Elle reste sur ton appareil</b> : rien n'est envoyé nulle part. Essaie de deviner les plats, puis tape ou colle un mot que tu vois pour le décoder.</div>
    <label class="mn-file"><input type="file" accept="image/*" id="phFile"> 📷 Choisir ou prendre une photo</label>
    <div id="phImg" class="ph-img"></div>
    <div class="kj-card kj-learn"><span class="kj-slabel">Lecteur de mots</span>
      <textarea id="phText" class="ph-text" rows="2" placeholder="Écris ou colle ici ce que tu lis sur la carte (ex. 抹茶ラテ 780円)"></textarea>
      <button class="continue-btn" id="phGo">Décoder</button><div id="phOut"></div>
      <p class="kj-tip" style="text-align:left">Astuce iPhone / Mac : dans la photo, appuie longtemps sur le texte japonais (« Texte en direct ») pour le copier, puis colle-le ici. Sur la carte, la ligne du bas est souvent le prix : le chiffre suivi de 円.</p></div>`;
  wireBack();
  document.getElementById('phFile').addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]; if(!f) return;
    const box = document.getElementById('phImg'); if(ui.url) URL.revokeObjectURL(ui.url);
    ui.url = URL.createObjectURL(f); box.innerHTML = `<img src="${ui.url}" alt="Ta photo de menu"><button class="kj-subnav-btn" id="phZoom">🔍 Agrandir</button>`;
    document.getElementById('phZoom').addEventListener('click', () => box.classList.toggle('zoom'));
  });
  document.getElementById('phGo').addEventListener('click', async () => {
    const text = document.getElementById('phText').value.trim(); if(!text) return;
    const out = document.getElementById('phOut'); out.innerHTML = 'Analyse…';
    const L = await lexicon(); const seg = segment(text, L);
    const rows = [];
    seg.forEach(s => {
      if(s.e){ rows.push(`<div class="ph-row ok"><b>${escapeHtml(s.t)}</b> <span class="mn-kana">${escapeHtml(s.e.kana)} · ${rj(s.e.kana)}</span><div>${escapeHtml(s.e.fr)}</div></div>`); return; }
      if(/[㐀-䶿一-鿿]/.test(s.t)){ const d = L.D.get(s.t); rows.push(d ? `<div class="ph-row"><b>${escapeHtml(s.t)}</b> <span class="mn-kana">${escapeHtml((d.on || []).slice(0, 2).join('・') )} / ${escapeHtml((d.kun || []).slice(0, 2).join('・'))}</span><div>${escapeHtml(d.fr)} (kanji seul)</div></div>` : `<div class="ph-row"><b>${escapeHtml(s.t)}</b> <div>Kanji hors liste</div></div>`); }
    });
    const nums = [...text.matchAll(/(\d[\d,]*)\s*円/g)].map(m => `${m[1]} 円`);
    out.innerHTML = (nums.length ? `<div class="ph-row ok">💴 Prix repérés : ${nums.join(', ')}</div>` : '') + (rows.join('') || '<div class="ph-row">Je ne reconnais rien dans ce texte. Essaie un mot à la fois.</div>');
  });
}

// ---------- une scène du kit Kyoto ----------
function renderKit(area){
  const g = KIT_VOCAB.find(x => x.id === ui.id), tips = KIT_TIPS[g.id] || [];
  const asks = [...KIT_ASK].filter(q => q.topic === g.id).length;
  area.innerHTML = `<div class="kj-top">${backBtn}<span>${g.icon} ${escapeHtml(g.title)}</span></div>
    <div class="skills-intro">${escapeHtml(g.intro)}</div>
    ${tips.length ? `<div class="kit-tips"><span class="kj-slabel">À savoir à Kyoto</span><ul>${tips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul></div>` : ''}
    <div class="kj-actions"><button class="kj-big primary" id="kitVocab">📖 Les ${g.items.length} mots</button><button class="kj-big ${asks ? 'primary' : ''}" id="kitAsk" ${asks ? '' : 'disabled'}>❓ Mises en situation (${asks})</button></div>`;
  wireBack();
  document.getElementById('kitVocab').addEventListener('click', () => go('vocab', { id: g.id, reveal: false }));
  document.getElementById('kitAsk').addEventListener('click', () => go('quiz', { quiz: buildAskQuiz(g.id, 8), title: g.title, backTo: 'kit', backUi: { id: g.id } }));
}
