import { MENUS, MENU_VOCAB, MENU_PHRASES, MENU_ASK, MENU_CHALLENGES } from '../../data/menus.js';
import { planMark, registerStudyActivity, addQuizStat } from '../storage.js';
import { speak } from '../tts.js';
import { escapeHtml, kanaToRomaji } from '../util.js';
import { celebrate } from '../encouragement.js';

// ---------- Menus : lire une carte (café, udon, ramen, sushi) et savoir commander ----------
let sub = 'home';   // home | menu | vocab | phrases | ask | quiz
let ui = {};

const dayNumber = () => Math.floor(Date.now() / 86400000);
export const todayChallenge = () => MENU_CHALLENGES[dayNumber() % MENU_CHALLENGES.length];
export function openMenuChallenge(id){
  const ch = MENU_CHALLENGES.find(c => c.id === id) || todayChallenge();
  sub = 'quiz'; ui = { quiz: buildChallengeQuiz(ch), challenge: ch };
  renderMenus();
}

const rj = kana => `<span class="rj-inline">${escapeHtml(kanaToRomaji(kana || ''))}</span>`;
const yen = n => n.toLocaleString('fr-FR') + ' 円';
function shuffle(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const pick = (arr, n) => shuffle(arr).slice(0, n);
const uniqBy = (arr, f) => { const seen = new Set(); return arr.filter(x => { const k = f(x); if(seen.has(k)) return false; seen.add(k); return true; }); };

export function renderMenus(){
  const area = document.getElementById('menusArea');
  if(sub === 'home') return renderHome(area);
  if(sub === 'menu') return renderMenu(area);
  if(sub === 'vocab') return renderVocab(area);
  if(sub === 'phrases') return renderPhrases(area);
  if(sub === 'ask') return renderAsk(area);
  if(sub === 'quiz') return renderQuiz(area);
}
function go(s, extra){ sub = s; ui = extra || {}; renderMenus(); }
const backBtn = `<button class="conv-back" id="mnBack">← Menus</button>`;
const wireBack = () => { const b = document.getElementById('mnBack'); if(b) b.addEventListener('click', () => go('home')); };
function wireAudio(root){ root.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); speak(b.dataset.say, 0.85); })); }

// ---------- accueil ----------
function renderHome(area){
  const ch = todayChallenge();
  let html = `<div class="skills-intro"><b>Lire une carte, commander, poser des questions.</b> Café de matcha, udon, ramen avec distributeur de tickets, sushi : on s'entraîne sur de vraies cartes, avec les kanji tels qu'on les voit sur place. Astuce : essaie de lire AVANT de révéler la traduction.</div>
  <div class="mn-challenge" id="mnChallenge"><span class="mn-ch-tag">Défi du jour</span><b>${ch.icon} ${escapeHtml(ch.title)}</b><span>${escapeHtml(ch.goal)}</span><span class="ts-go">Relever le défi →</span></div>
  <h4 class="kj-h">📜 Lire une vraie carte</h4><div class="mn-grid">`;
  MENUS.forEach(m => { html += `<button class="mn-tile" data-menu="${m.id}"><span class="mn-ico">${m.icon}</span><b>${escapeHtml(m.title)}</b><small>${escapeHtml(m.shop)}</small></button>`; });
  html += `</div><h4 class="kj-h">📖 Les mots à connaître</h4><div class="mn-grid">`;
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
  area.querySelectorAll('[data-vocab]').forEach(b => b.addEventListener('click', () => go('vocab', { id: b.dataset.vocab, reveal: false })));
  area.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go, {})));
}

// ---------- une carte ----------
function renderMenu(area){
  const m = MENUS.find(x => x.id === ui.id);
  let html = `<div class="kj-top">${backBtn}<span>${m.icon} ${escapeHtml(m.title)}</span></div>
    <div class="skills-intro">${escapeHtml(m.intro)}</div>
    <div class="mn-board"><div class="mn-shop">${escapeHtml(m.shop)}</div>`;
  m.sections.forEach(sec => {
    html += `<div class="mn-sec"><span>${escapeHtml(sec.title)}</span><small>${escapeHtml(sec.titleFr || '')}</small></div>`;
    sec.items.forEach(it => {
      html += `<div class="mn-item" data-i="${escapeHtml(it.jp)}">
        <div class="mn-main"><span class="mn-jp">${escapeHtml(it.jp)}</span><span class="mn-price">${it.price ? yen(it.price) : '無料'}</span></div>
        <div class="mn-sub"><span class="mn-kana">${escapeHtml(it.kana)} · ${rj(it.kana)}</span><button class="kj-audio" data-say="${escapeHtml(it.kana)}">🔊</button></div>
        <div class="mn-fr" style="display:${ui.reveal ? 'block' : 'none'}">${escapeHtml(it.fr)}${it.note ? ` <small>— ${escapeHtml(it.note)}</small>` : ''}</div>
      </div>`;
    });
  });
  html += `</div><div class="mn-actions"><button class="kj-subnav-btn" id="mnReveal">${ui.reveal ? '🙈 Cacher les traductions' : '👁️ Montrer les traductions'}</button><button class="continue-btn" id="mnQuiz">Quiz sur cette carte →</button></div>
    <p class="kj-tip">Touche un article pour voir sa traduction. Essaie de deviner d'abord.</p>`;
  area.innerHTML = html;
  wireBack(); wireAudio(area);
  area.querySelectorAll('.mn-item').forEach(el => el.addEventListener('click', () => { const f = el.querySelector('.mn-fr'); f.style.display = f.style.display === 'none' ? 'block' : 'none'; }));
  document.getElementById('mnReveal').addEventListener('click', () => { ui.reveal = !ui.reveal; renderMenus(); });
  document.getElementById('mnQuiz').addEventListener('click', () => go('quiz', { quiz: buildMenuQuiz(m, 8), title: m.title, backTo: 'menu', backUi: { id: m.id, reveal: ui.reveal } }));
}

// ---------- vocabulaire ----------
function renderVocab(area){
  const g = MENU_VOCAB.find(x => x.id === ui.id);
  let html = `<div class="kj-top">${backBtn}<span>${g.icon} ${escapeHtml(g.title)}</span></div>
    <div class="skills-intro">${escapeHtml(g.intro)}</div>
    <div class="mn-board">`;
  g.items.forEach(it => {
    html += `<div class="mn-item">
      <div class="mn-main"><span class="mn-jp">${escapeHtml(it.jp)}</span></div>
      <div class="mn-sub"><span class="mn-kana">${escapeHtml(it.kana)} · ${rj(it.kana)}</span><button class="kj-audio" data-say="${escapeHtml(it.kana)}">🔊</button></div>
      <div class="mn-fr" style="display:${ui.reveal ? 'block' : 'none'}">${escapeHtml(it.fr)}${it.note ? ` <small>— ${escapeHtml(it.note)}</small>` : ''}</div>
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
  let html = `<div class="kj-top">${backBtn}<span>💬 Phrases pour commander</span></div>
    <div class="skills-intro">Écoute, répète à voix haute, puis choisis les 5 que tu utiliseras vraiment. La structure qui sert partout : <b>ce que tu veux + を + ください</b>.</div>`;
  MENU_PHRASES.forEach(p => {
    html += `<div class="mn-phrase"><div class="mn-ph-top"><span class="mn-jp-s">${escapeHtml(p.jp)}</span><button class="kj-audio" data-say="${escapeHtml(p.jp)}">🔊</button></div>
      <div class="mn-kana">${rj(p.kana)}</div><div class="mn-ph-fr">${escapeHtml(p.fr)}</div><div class="mn-when">${escapeHtml(p.when)}</div></div>`;
  });
  html += `<div class="mn-actions"><span></span><button class="continue-btn" id="mnQuiz">Quiz →</button></div>`;
  area.innerHTML = html; wireBack(); wireAudio(area);
  document.getElementById('mnQuiz').addEventListener('click', () => go('quiz', { quiz: buildPhrasesQuiz(8), title: 'Phrases', backTo: 'phrases', backUi: {} }));
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
    qs.push({ q: `Combien coûte « ${it.jp} » ?`, ok: yen(it.price), choices: [yen(it.price), ...others], explain: `${it.jp} (${it.fr}) : ${yen(it.price)}.`, say: it.kana });
  });
  pick(items, 3).forEach(it => {
    const others = pick(uniqBy(items.filter(x => x.fr !== it.fr), x => x.fr), 3).map(x => x.fr);
    qs.push({ q: `Que veut dire « ${it.jp} » ?`, ok: it.fr, choices: [it.fr, ...others], explain: `${it.jp} se lit ${it.kana} : ${it.fr}.${it.note ? ' ' + it.note : ''}`, say: it.kana });
  });
  const rev = pick(items, 1)[0];
  if(rev){ const others = pick(items.filter(x => x.jp !== rev.jp), 3).map(x => x.jp); qs.push({ q: `Quel article est « ${rev.fr} » ?`, ok: rev.jp, choices: [rev.jp, ...others], explain: `${rev.jp} (${rev.kana}) = ${rev.fr}.`, say: rev.kana }); }
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
    const others = pick(uniqBy(items.filter(x => x.fr !== it.fr), x => x.fr), 3).map(x => x.fr);
    qs.push({ q: `Que veut dire « ${it.jp} » ?`, ok: it.fr, choices: [it.fr, ...others], explain: `${it.jp} se lit ${it.kana}${it.note ? ' — ' + it.note : ''}.`, say: it.kana });
  });
  pick(items, Math.floor(n * 0.3)).forEach(it => {
    const others = pick(items.filter(x => x.jp !== it.jp), 3).map(x => x.jp);
    qs.push({ q: `Comment écrit-on « ${it.fr} » ?`, ok: it.jp, choices: [it.jp, ...others], explain: `${it.fr} = ${it.jp} (${it.kana}).`, say: it.kana });
  });
  pick(items.filter(i => /[一-鿿]/.test(i.jp)), n - qs.length).forEach(it => {
    const others = pick(uniqBy(items.filter(x => x.kana !== it.kana), x => x.kana), 3).map(x => x.kana);
    qs.push({ q: `Comment se lit « ${it.jp} » ?`, ok: it.kana, choices: [it.kana, ...others], explain: `${it.jp} se lit ${it.kana} (${it.fr}).`, say: it.kana });
  });
  return shuffle(qs).filter(q => new Set(q.choices).size === q.choices.length).slice(0, n);
}
function buildPhrasesQuiz(n){
  return pick(MENU_PHRASES, n).map(p => {
    const others = pick(MENU_PHRASES.filter(x => x.jp !== p.jp), 3).map(x => x.jp);
    return { q: `Comment dire : « ${p.fr} » ?`, ok: p.jp, choices: [p.jp, ...others], explain: `${p.jp} — ${p.when}.`, say: p.kana };
  });
}
function buildAskQuiz(topic, n){
  const pool = topic === 'all' ? MENU_ASK : MENU_ASK.filter(q => q.topic === topic);
  return pick(pool, n).map(a => ({ q: a.q, ok: a.ok, choices: a.choices, explain: a.explanation, say: a.ok }));
}
function buildChallengeQuiz(ch){
  if(ch.kind === 'menu') return buildMenuQuiz(MENUS.find(m => m.id === ch.ref), 6);
  if(ch.kind === 'vocab') return buildVocabQuiz(MENU_VOCAB.find(g => g.id === ch.ref), 8);
  if(ch.kind === 'phrases') return buildPhrasesQuiz(6);
  return buildAskQuiz(ch.ref, 5);
}

// ---------- lecteur de quiz ----------
function renderQuiz(area){
  const z = ui.quiz;
  if(!z || !z.length){ go('home'); return; }
  ui.i = ui.i || 0; ui.right = ui.right || 0;
  if(ui.i >= z.length){
    const perfect = ui.right === z.length;
    addQuizStat('menus', ui.right, z.length);
    if(ui.challenge){ planMark('challenge', 1); }
    registerStudyActivity();
    celebrate('reviewCount', { emoji: '🍣', title: ui.challenge ? 'Défi du jour réussi' : 'Quiz terminé', params: { n: z.length } });
    area.innerHTML = `<div class="conv-done"><div class="stamp" style="margin:0 auto 14px;">合格</div>
      <h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${ui.right} / ${z.length}${perfect ? ' — parfait !' : ''}</h3>
      <p style="color:#7a7268;font-size:13.5px;">${perfect ? 'Tu peux commander les yeux fermés.' : 'Refais-le : les réponses restent en mémoire plus longtemps quand on se trompe puis qu\'on corrige.'}</p>
      <button class="continue-btn" id="mnAgain" style="margin-top:16px;">Recommencer</button> <button class="conv-back" id="mnHome" style="margin-top:16px;">← Menus</button></div>`;
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
    <div class="kj-card"><p class="mn-q">${escapeHtml(q.q)}</p>
      <div class="kj-choices">${choices.map(c => `<button class="kj-choice mn-choice" data-c="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}</div><div id="mnFb"></div></div>`;
  wireBack();
  area.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.c === q.ok;
    area.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === q.ok) x.classList.add('ok'); });
    if(!ok) b.classList.add('ko'); else ui.right++;
    document.getElementById('mnFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ Pas tout à fait'}</div><div class="mn-explain">${escapeHtml(q.explain || '')}</div><button class="continue-btn" id="mnNext">Continuer</button>`;
    document.getElementById('mnNext').addEventListener('click', () => { ui.i++; renderMenus(); });
    if(q.say) speak(q.say, 0.85);
  }));
}
