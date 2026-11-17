import { meta, saveMeta, todayStr, nowTs, rate, registerStudyActivity } from '../storage.js';
import { speak } from '../tts.js';
import { escapeHtml, escapeRj, rjMark, kanaToRomaji } from '../util.js';
import { celebrate } from '../encouragement.js';

// ---------- Kanji : les 2136 kanji d'usage courant, à raison de quelques-uns par jour ----------
// Méthode : radicaux de base d'abord (les « briques »), puis N nouveaux kanji par jour,
// chaque kanji décomposé en briques + une petite histoire. Révision espacée (SRS) : une carte
// revient au moment où tu allais l'oublier. Les cartes sont stockées dans meta.kanjiSrs.

const TOTAL = 2136;
let DECK = null, RADS = null, BY_K = null, BY_R = null, RAD_USE = null;
let sub = 'home';            // home | lesson | review | browse | radicals
let ui = {};                 // état d'écran en cours

async function loadData(){
  if(DECK) return;
  const m = await import('../../data/kanji-joyo.js');
  DECK = m.KANJI_DECK; RADS = m.RADICALS;
  BY_K = new Map(DECK.map(d => [d.k, d]));
  BY_R = new Map(RADS.map(r => [r.r, r]));
  RAD_USE = new Map();
  DECK.forEach(d => (d.c || []).forEach(c => { const a = RAD_USE.get(c) || []; if(a.length < 4) a.push(d.k); RAD_USE.set(c, a); }));
}

// ---------- état persistant ----------
export const cfg = () => Object.assign({ perDay: 6, radPerDay: 8 }, meta.kanjiCfg || {});
const srs = () => (meta.kanjiSrs = meta.kanjiSrs || {});
function daily(){
  const t = todayStr();
  if(!meta.kanjiDaily || meta.kanjiDaily.date !== t) meta.kanjiDaily = { date: t, newK: [], newR: [], reviewed: 0 };
  return meta.kanjiDaily;
}
const keyK = k => k, keyR = r => 'r:' + r;
const isRadKey = key => key.startsWith('r:');

// Résumé lisible sans charger le paquet (utilisé par l'onglet Aujourd'hui).
export function kanjiTodayStatus(){
  const s = srs(), now = nowTs(), d = daily();
  const due = Object.values(s).filter(c => c.due <= now).length;
  const phase = meta.kanjiPhase === 'kanji' ? 'kanji' : 'radicals';
  const goal = phase === 'radicals' ? cfg().radPerDay : cfg().perDay;
  const introduced = phase === 'radicals' ? d.newR.length : d.newK.length;
  const lessonDone = introduced >= goal ? d.newK.concat(d.newR).every(k => s[k]) : false;
  const learnedTotal = Object.keys(s).filter(k => !isRadKey(k)).length;
  return { due, phase, goal, introduced, lessonDone, reviewed: d.reviewed, learnedTotal, started: Object.keys(s).length > 0 || introduced > 0 };
}

function newCardRec(){ return { interval: 0, ease: 2.5, reps: 0, due: nowTs(), lapses: 0, intro: todayStr() }; }

// ---------- affichage d'une fiche ----------
const hira2kata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
const rj = kana => `<span class="rj-inline">${escapeHtml(kanaToRomaji(kana))}</span>`;

function chipsHtml(d){
  if(!d.c || !d.c.length) return '';
  const known = srs();
  return `<div class="kj-chips">` + d.c.map(c => {
    const r = BY_R.get(c);
    const star = known[keyR(c)] ? ' is-known' : '';
    return `<button type="button" class="kj-chip${star}" data-rad="${escapeHtml(c)}"><span class="kj-chip-g">${escapeHtml(c)}</span><span class="kj-chip-n">${escapeHtml(r ? r.name : '?')}</span></button>`;
  }).join('<span class="kj-plus">+</span>') + `</div><div class="kj-chip-story" id="kjChipStory"></div>`;
}
function wireChips(root){
  root.querySelectorAll('.kj-chip').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const r = BY_R.get(b.dataset.rad); const box = root.querySelector('#kjChipStory');
    if(box && r) box.innerHTML = `<b>${escapeHtml(r.r)} — ${escapeHtml(r.name)}</b> : ${escapeHtml(r.story)}${r.meaning ? `<br><span class="kj-meaning">Apporte l'idée de : ${escapeHtml(r.meaning)}</span>` : ''}`;
  }));
}
function readingsHtml(d){
  const on = (d.on || []).map(x => `<span class="kj-rd">${escapeHtml(hira2kata(x))}<small>${rj(x)}</small></span>`).join('');
  const kun = (d.kun || []).map(x => `<span class="kj-rd">${escapeHtml(x)}<small>${rj(x.replace(/[()]/g, ''))}</small></span>`).join('');
  return `<div class="kj-readings">
    ${on ? `<div><span class="kj-rlabel">On (lecture « chinoise », dans les mots composés)</span>${on}</div>` : ''}
    ${kun ? `<div><span class="kj-rlabel">Kun (lecture « japonaise », seul ou avec des kana)</span>${kun}</div>` : ''}
  </div>`;
}
function kanjiFront(d){ return `<div class="kj-glyph">${escapeHtml(d.k)}</div>`; }
function kanjiBack(d, withAudio = true){
  const ex = d.ex || [];
  return `<div class="kj-fr">${escapeHtml(d.fr)}</div>
    ${chipsHtml(d)}
    ${d.st ? `<div class="kj-story"><span class="kj-slabel">💡 Pour s'en souvenir</span>${escapeHtml(d.st)}</div>` : ''}
    ${readingsHtml(d)}
    ${ex.length ? `<div class="kj-ex"><span class="kj-slabel">Un mot pour l'ancrer</span><b>${escapeHtml(ex[0])}</b> <span class="kj-exk">（${escapeHtml(ex[1])} / ${rj(ex[1])}）</span> — ${escapeHtml(ex[2])}${withAudio ? ` <button class="kj-audio" data-say="${escapeHtml(ex[1])}" title="Écouter">🔊</button>` : ''}</div>` : ''}
    <div class="kj-meta">${d.s} trait${d.s>1?'s':''} · ${d.g <= 6 ? 'école primaire (année ' + d.g + ')' : 'collège / lycée'}${d.j ? ' · JLPT N' + d.j : ''} · n° ${d.n} / ${TOTAL}</div>`;
}
function radFront(r){ return `<div class="kj-glyph">${escapeHtml(r.r)}</div><div class="kj-tag">Radical (brique)</div>`; }
function radBack(r){
  const use = (RAD_USE.get(r.r) || []).map(k => BY_K.get(k)).filter(Boolean);
  return `<div class="kj-fr">${escapeHtml(r.name)}</div>
    <div class="kj-story"><span class="kj-slabel">💡 Pour le reconnaître</span>${escapeHtml(r.story)}</div>
    ${r.meaning ? `<div class="kj-meaning">Dans un kanji, il apporte l'idée de : ${escapeHtml(r.meaning)}</div>` : ''}
    ${use.length ? `<div class="kj-ex"><span class="kj-slabel">On le retrouve dans</span>${use.map(u => `<b class="kj-use">${escapeHtml(u.k)}</b> ${escapeHtml(u.fr)}`).join(' · ')}</div>` : ''}`;
}
function wireAudio(root){
  root.querySelectorAll('.kj-audio').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); speak(b.dataset.say, 0.85); }));
}

// ---------- sélection des nouveaux éléments du jour ----------
function pickNew(){
  const d = daily(), s = srs();
  const phase = meta.kanjiPhase === 'kanji' ? 'kanji' : 'radicals';
  if(phase === 'radicals'){
    const starters = RADS.filter(r => r.starter).sort((a, b) => a.order - b.order);
    const pool = starters.filter(r => !s[keyR(r.r)] && !d.newR.includes(r.r));
    while(d.newR.length < cfg().radPerDay && pool.length) d.newR.push(pool.shift().r);
    if(!starters.some(r => !s[keyR(r.r)] && !d.newR.includes(r.r))) { /* tout est introduit : les kanji suivront demain */ }
    saveMeta();
    return d.newR.map(r => ({ kind: 'r', id: r }));
  }
  const pool = DECK.filter(x => !s[keyK(x.k)] && !d.newK.includes(x.k));
  while(d.newK.length < cfg().perDay && pool.length) d.newK.push(pool.shift().k);
  saveMeta();
  return d.newK.map(k => ({ kind: 'k', id: k }));
}
function maybeAdvancePhase(){
  if(meta.kanjiPhase === 'kanji') return;
  const s = srs();
  if(RADS.filter(r => r.starter).every(r => s[keyR(r.r)])){ meta.kanjiPhase = 'kanji'; saveMeta(); }
}

// ---------- rendu principal ----------
export async function renderKanji(){
  const area = document.getElementById('kanjiArea');
  area.innerHTML = '<div class="skills-intro">Chargement des kanji…</div>';
  try{ await loadData(); }catch(err){ area.innerHTML = `<div class="skills-intro" style="color:#c0392b;">⚠️ Impossible de charger les kanji (${escapeHtml(err.message)}). Fais Cmd+Shift+R.</div>`; return; }
  if(sub === 'home') renderHome(area);
  else if(sub === 'lesson') renderLesson(area);
  else if(sub === 'review') renderReviewStep(area);
  else if(sub === 'browse') renderBrowse(area);
  else if(sub === 'radicals') renderRadicals(area);
}
function go(s, extra){ sub = s; ui = extra || {}; renderKanji(); }

export function openKanjiHome(){ sub = 'home'; ui = {}; }
export async function startKanjiLesson(){ sub = 'lesson'; ui = {}; }
export async function startKanjiReview(){ sub = 'review'; ui = {}; }

function projectedEnd(learned, perDay){
  const left = Math.max(0, TOTAL - learned);
  const days = Math.ceil(left / Math.max(1, perDay));
  const d = new Date(); d.setDate(d.getDate() + days);
  return { days, label: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) };
}

function renderHome(area){
  const st = kanjiTodayStatus();
  const s = srs();
  const items = Object.entries(s);
  const kanjiItems = items.filter(([k]) => !isRadKey(k));
  const radItems = items.filter(([k]) => isRadKey(k));
  const mature = kanjiItems.filter(([, c]) => c.interval >= 21).length;
  const learning = kanjiItems.length - mature;
  const starters = RADS.filter(r => r.starter);
  const radKnown = starters.filter(r => s[keyR(r.r)]).length;
  const proj = projectedEnd(kanjiItems.length, cfg().perDay);
  const inRad = st.phase === 'radicals';
  const pending = [...daily().newK, ...daily().newR].filter(k => !s[k]).length;
  const newLabel = inRad ? 'radicaux' : 'kanji';
  const remainingToday = Math.max(0, st.goal - (inRad ? daily().newR.length : daily().newK.length)) + pending;

  let html = `<div class="skills-intro"><b>Les 2 136 kanji d'usage courant, sans pression.</b> Avec ${cfg().perDay} nouveaux kanji par jour, tu les as tous en ~${Math.ceil(TOTAL / cfg().perDay / 30)} mois. On commence par les <b>radicaux</b> : ce sont les briques qui composent tous les kanji. Quand tu les reconnais, un kanji n'est plus un dessin compliqué, c'est une petite histoire.</div>`;

  html += `<div class="kj-dash">
    <div class="kj-stat"><b>${kanjiItems.length}</b><span>kanji vus</span></div>
    <div class="kj-stat"><b>${mature}</b><span>bien ancrés</span></div>
    <div class="kj-stat"><b>${radKnown}/${starters.length}</b><span>radicaux de base</span></div>
    <div class="kj-stat"><b>${st.due}</b><span>à réviser</span></div>
  </div>
  <div class="today-track"><div class="today-track-fill" style="width:${(kanjiItems.length / TOTAL) * 100}%"></div></div>
  <p class="kj-proj">${kanjiItems.length} / ${TOTAL} kanji. Au rythme de ${cfg().perDay} par jour : terminé le <b>${proj.label}</b>.</p>`;

  html += `<div class="kj-actions">
    <button class="kj-big ${st.due ? 'primary' : ''}" id="kjReview" ${st.due ? '' : 'disabled'}>🔁 Réviser <b>${st.due}</b> carte${st.due > 1 ? 's' : ''}</button>
    <button class="kj-big ${remainingToday ? 'primary' : ''}" id="kjLesson" ${remainingToday ? '' : 'disabled'}>✨ Apprendre ${remainingToday ? remainingToday + ' ' + newLabel + ' nouveau' + (remainingToday > 1 ? 'x' : '') : '— quota du jour atteint'}</button>
  </div>`;
  if(inRad){
    html += `<div class="kj-note">🧱 <b>Phase 1 : les radicaux de base</b> (${cfg().radPerDay} par jour, environ ${Math.ceil(starters.length / cfg().radPerDay)} jours). Les kanji commencent ensuite automatiquement. <button class="kj-link" id="kjSkip">Passer aux kanji tout de suite</button></div>`;
  } else if(radKnown < starters.length){
    html += `<div class="kj-note">🧱 Il te reste ${starters.length - radKnown} radicaux de base à voir. <button class="kj-link" id="kjBackRad">Les apprendre maintenant</button></div>`;
  }
  html += `<div class="kj-subnav">
    <button id="kjRadicals">🧱 Radicaux</button>
    <button id="kjBrowse">🗂️ Tous les kanji</button>
    <button id="kjCfg">⚙️ Rythme : ${cfg().perDay}/jour</button>
  </div>
  <details class="kj-method"><summary>🧠 La méthode, en bref</summary>
    <p><b>1. Des briques, pas des dessins.</b> Chaque kanji est montré découpé en radicaux. Tu retiens « arbre + soleil », pas 8 traits au hasard.</p>
    <p><b>2. Une petite histoire.</b> Une image absurde ou visuelle reste bien mieux qu'une liste de lectures.</p>
    <p><b>3. Rappel actif.</b> Tu cherches la réponse AVANT de retourner la carte. C'est l'effort de se souvenir qui ancre.</p>
    <p><b>4. Révisions espacées.</b> « Galère » : la carte revient dans 10 minutes. « Bien » : demain, puis dans 3 jours, une semaine, un mois… Chaque carte revient juste avant l'oubli.</p>
    <p><b>5. Un mot par kanji.</b> Les lectures s'apprennent à travers un vrai mot, pas par cœur.</p>
    <p><b>6. Régularité.</b> 6 par jour sans jamais sauter bat 60 un dimanche. Si tu rates quelques jours, les révisions s'accumulent : fais-les d'abord, et pause les nouveaux.</p>
  </details>
  <p class="kj-credit">Données de lecture : KANJIDIC et KRADFILE (EDRDG), licence CC BY-SA 4.0. Histoires et exemples rédigés pour cette appli.</p>`;
  area.innerHTML = html;
  const $ = id => document.getElementById(id);
  if($('kjReview')) $('kjReview').addEventListener('click', () => go('review'));
  if($('kjLesson')) $('kjLesson').addEventListener('click', () => go('lesson'));
  $('kjRadicals').addEventListener('click', () => go('radicals'));
  $('kjBrowse').addEventListener('click', () => go('browse', { page: 0, q: '' }));
  $('kjCfg').addEventListener('click', () => {
    const v = parseInt(prompt('Combien de nouveaux kanji par jour ? (3 à 15)', cfg().perDay), 10);
    if(v >= 3 && v <= 15){ meta.kanjiCfg = Object.assign(cfg(), { perDay: v }); saveMeta(); renderKanji(); }
  });
  if($('kjSkip')) $('kjSkip').addEventListener('click', () => { meta.kanjiPhase = 'kanji'; saveMeta(); renderKanji(); });
  if($('kjBackRad')) $('kjBackRad').addEventListener('click', () => { meta.kanjiPhase = 'radicals'; saveMeta(); renderKanji(); });
}

// ---------- leçon : fiches puis mini-quiz ----------
function itemData(it){ return it.kind === 'r' ? { r: BY_R.get(it.id) } : { d: BY_K.get(it.id) }; }
function renderLesson(area){
  if(!ui.items){
    ui.items = pickNew().filter(it => !srs()[it.kind === 'r' ? keyR(it.id) : keyK(it.id)]);
    ui.i = 0; ui.phase = 'learn'; ui.qi = 0; ui.right = 0;
    if(!ui.items.length){ go('home'); return; }
  }
  if(ui.phase === 'learn') return renderLearnCard(area);
  return renderQuizQ(area);
}
function renderLearnCard(area){
  const it = ui.items[ui.i], data = itemData(it);
  const front = it.kind === 'r' ? radFront(data.r) : kanjiFront(data.d);
  const back = it.kind === 'r' ? radBack(data.r) : kanjiBack(data.d);
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="kjBack">← Retour</button><span>Fiche ${ui.i + 1} / ${ui.items.length}</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(ui.i / ui.items.length) * 100}%"></div></div>
    <div class="kj-card kj-learn">${front}${back}</div>
    <div class="kj-nav">
      ${ui.i > 0 ? '<button class="conv-back" id="kjPrev">←</button>' : '<span></span>'}
      <button class="continue-btn" id="kjNext">${ui.i + 1 < ui.items.length ? 'Suivant' : 'Mini-quiz →'}</button>
    </div>
    <p class="kj-tip">Prends 20 secondes : lis l'histoire à voix haute, trace le kanji du doigt, imagine la scène.</p>`;
  wireChips(area); wireAudio(area);
  document.getElementById('kjBack').addEventListener('click', () => go('home'));
  const p = document.getElementById('kjPrev'); if(p) p.addEventListener('click', () => { ui.i--; renderKanji(); });
  document.getElementById('kjNext').addEventListener('click', () => {
    if(ui.i + 1 < ui.items.length){ ui.i++; renderKanji(); }
    else { ui.phase = 'quiz'; ui.qi = 0; ui.order = shuffle(ui.items.map((_, i) => i)); renderKanji(); }
  });
  if(it.kind === 'k') speak(data.d.ex ? data.d.ex[1] : data.d.k, 0.85);
}
function shuffle(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function labelOf(it){ return it.kind === 'r' ? BY_R.get(it.id).name : BY_K.get(it.id).fr; }
function distractors(it, n){
  const mine = labelOf(it);
  const pool = it.kind === 'r' ? RADS.filter(r => r.starter).map(r => r.name) : DECK.slice(Math.max(0, BY_K.get(it.id).n - 60), BY_K.get(it.id).n + 40).map(d => d.fr);
  const uniq = [...new Set(pool)].filter(x => x !== mine);
  return shuffle(uniq).slice(0, n);
}
function renderQuizQ(area){
  if(ui.qi >= ui.order.length){
    // fin : enregistre tout le monde dans le SRS
    ui.items.forEach(it => {
      const key = it.kind === 'r' ? keyR(it.id) : keyK(it.id);
      if(srs()[key]) return;
      const c = newCardRec(); const ok = ui.results && ui.results[key];
      rate(c, ok ? 2 : 0); srs()[key] = c;
    });
    registerStudyActivity(); maybeAdvancePhase(); saveMeta();
    const total = ui.items.length, right = ui.right;
    area.innerHTML = `<div class="conv-done"><div class="stamp" style="margin:0 auto 14px;">合格</div><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${total} nouveau${total > 1 ? 'x' : ''} appris !</h3>
      <p style="color:#7a7268;font-size:13.5px;">${right} / ${total} du premier coup. Ils reviendront en révision : demain pour ceux que tu connais, dans 10 minutes pour ceux qui ont résisté.</p>
      <button class="continue-btn" id="kjDone" style="margin-top:16px;">Terminer</button></div>`;
    celebrate('reviewCount', { emoji: '🈁', title: 'Nouveaux kanji appris', params: { n: total } });
    document.getElementById('kjDone').addEventListener('click', () => go('home'));
    return;
  }
  const it = ui.items[ui.order[ui.qi]], key = it.kind === 'r' ? keyR(it.id) : keyK(it.id);
  const g = it.kind === 'r' ? it.id : it.id;
  const choices = shuffle([labelOf(it), ...distractors(it, 3)]);
  area.innerHTML = `<div class="kj-top"><span>Mini-quiz</span><span>${ui.qi + 1} / ${ui.order.length}</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(ui.qi / ui.order.length) * 100}%"></div></div>
    <div class="kj-card"><div class="kj-glyph">${escapeHtml(g)}</div><p class="kj-ask">Que veut dire ${it.kind === 'r' ? 'ce radical' : 'ce kanji'} ?</p>
    <div class="kj-choices">${choices.map(c => `<button class="kj-choice" data-c="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}</div><div id="kjFb"></div></div>`;
  area.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.c === labelOf(it);
    area.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === labelOf(it)) x.classList.add('ok'); });
    if(!ok) b.classList.add('ko');
    ui.results = ui.results || {}; ui.results[key] = ok; if(ok) ui.right++;
    const data = itemData(it);
    document.getElementById('kjFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ C\'était : ' + escapeHtml(labelOf(it))}</div><button class="continue-btn" id="kjQn">Continuer</button>`;
    document.getElementById('kjQn').addEventListener('click', () => { ui.qi++; renderKanji(); });
    if(it.kind === 'k' && data.d.ex) speak(data.d.ex[1], 0.85);
  }));
}

// ---------- révision SRS ----------
function dueKeys(){
  const now = nowTs(), s = srs();
  return Object.entries(s).filter(([, c]) => c.due <= now).sort((a, b) => a[1].due - b[1].due).map(([k]) => k);
}
function renderReviewStep(area){
  if(!ui.queue){ ui.queue = shuffle(dueKeys()).slice(0, 60); ui.total = ui.queue.length; ui.done = 0; ui.revealed = false; ui.ok = 0; }
  if(!ui.queue.length){
    if(ui.total) { registerStudyActivity(); celebrate('reviewCaughtUp', { emoji: '✅', title: 'Révisions kanji terminées' }); }
    area.innerHTML = `<div class="conv-done"><div class="stamp" style="margin:0 auto 14px;">合格</div><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${ui.total ? 'Révisions terminées !' : 'Rien à réviser pour l\'instant'}</h3>
      <p style="color:#7a7268;font-size:13.5px;">${ui.total ? `${ui.ok} réussies sur ${ui.done} passages.` : 'Reviens plus tard : chaque carte revient quand elle en a besoin.'}</p>
      <button class="continue-btn" id="kjDone" style="margin-top:16px;">← Kanji</button></div>`;
    document.getElementById('kjDone').addEventListener('click', () => go('home'));
    return;
  }
  const key = ui.queue[0], rad = isRadKey(key);
  const data = rad ? BY_R.get(key.slice(2)) : BY_K.get(key);
  if(!data){ ui.queue.shift(); return renderReviewStep(area); }
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="kjBack">← Retour</button><span>${ui.done} faites · ${ui.queue.length} restantes</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(ui.done / (ui.done + ui.queue.length)) * 100}%"></div></div>
    <div class="kj-card ${ui.revealed ? '' : 'kj-hidden'}" id="kjCard">${rad ? radFront(data) : kanjiFront(data)}
      ${ui.revealed ? (rad ? radBack(data) : kanjiBack(data)) : '<p class="kj-ask">Que veut dire ce ' + (rad ? 'radical' : 'kanji') + (rad ? '' : ', et comment se lit-il') + ' ? Cherche avant de retourner.</p><button class="continue-btn" id="kjReveal">Retourner la carte</button>'}
    </div>
    ${ui.revealed ? `<div class="rate-row">
      <button class="rate-again" data-grade="0">Galère</button><button class="rate-hard" data-grade="1">Difficile</button>
      <button class="rate-good" data-grade="2">Bien</button><button class="rate-easy" data-grade="3">Facile</button></div>` : ''}`;
  wireChips(area); wireAudio(area);
  document.getElementById('kjBack').addEventListener('click', () => go('home'));
  const rv = document.getElementById('kjReveal');
  if(rv) rv.addEventListener('click', () => { ui.revealed = true; renderKanji(); if(!rad && data.ex) speak(data.ex[1], 0.85); });
  area.querySelectorAll('.rate-row button').forEach(b => b.addEventListener('click', () => {
    const grade = parseInt(b.dataset.grade, 10), c = srs()[key];
    const before = c.interval;
    rate(c, grade); if(grade === 0) c.lapses = (c.lapses || 0) + 1;
    ui.queue.shift(); ui.done++;
    if(grade === 0) ui.queue.push(key); else ui.ok++;
    daily().reviewed++; registerStudyActivity(); saveMeta();
    ui.revealed = false; renderKanji();
  }));
}

// ---------- radicaux : liste ----------
function renderRadicals(area){
  const s = srs();
  const starters = RADS.filter(r => r.starter).sort((a, b) => a.order - b.order);
  const others = RADS.filter(r => !r.starter).sort((a, b) => a.r.localeCompare(b.r));
  const cell = r => `<button class="kj-rcell ${s[keyR(r.r)] ? 'is-known' : ''}" data-r="${escapeHtml(r.r)}"><span class="kj-rg">${escapeHtml(r.r)}</span><span class="kj-rn">${escapeHtml(r.name)}</span></button>`;
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="kjBack">← Retour</button><span>${starters.filter(r => s[keyR(r.r)]).length} / ${starters.length} appris</span></div>
    <div class="skills-intro">Un radical est une brique réutilisée dans des centaines de kanji. Touche une brique pour voir son histoire. Les radicaux « de base » s'apprennent dans l'ordre (carrés verts = déjà vus).</div>
    <h4 class="kj-h">Les radicaux de base</h4><div class="kj-rgrid">${starters.map(cell).join('')}</div>
    <h4 class="kj-h">Autres briques (apparaissent dans les fiches kanji)</h4><div class="kj-rgrid">${others.map(cell).join('')}</div>
    <div class="kj-card kj-learn" id="kjRDetail" style="display:none"></div>`;
  document.getElementById('kjBack').addEventListener('click', () => go('home'));
  area.querySelectorAll('.kj-rcell').forEach(b => b.addEventListener('click', () => {
    const r = BY_R.get(b.dataset.r), box = document.getElementById('kjRDetail');
    box.style.display = 'block'; box.innerHTML = radFront(r) + radBack(r);
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}

// ---------- parcours : tous les kanji ----------
function renderBrowse(area){
  const s = srs(), q = (ui.q || '').trim().toLowerCase(), PAGE = 120;
  let list = DECK;
  if(q) list = DECK.filter(d => d.k === q || d.fr.toLowerCase().includes(q) || (d.on || []).concat(d.kun || []).some(x => x.includes(q)));
  const pages = Math.max(1, Math.ceil(list.length / PAGE)); ui.page = Math.min(ui.page || 0, pages - 1);
  const slice = list.slice(ui.page * PAGE, (ui.page + 1) * PAGE);
  const state = k => { const c = s[keyK(k)]; if(!c) return 'new'; return c.interval >= 21 ? 'mature' : 'seen'; };
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="kjBack">← Retour</button><span>${list.length} kanji</span></div>
    <input class="kj-search" id="kjQ" placeholder="Chercher un kanji, un sens ou une lecture…" value="${escapeHtml(ui.q || '')}">
    <div class="kj-legend"><span class="kj-dot new"></span>pas encore vu <span class="kj-dot seen"></span>en cours <span class="kj-dot mature"></span>bien ancré</div>
    <div class="kj-grid">${slice.map(d => `<button class="kj-gcell ${state(d.k)}" data-k="${escapeHtml(d.k)}">${escapeHtml(d.k)}</button>`).join('')}</div>
    <div class="kj-pager">${ui.page > 0 ? '<button class="conv-back" id="kjP">←</button>' : '<span></span>'}<span>${ui.page + 1} / ${pages} (kanji ${ui.page * PAGE + 1}–${Math.min(list.length, (ui.page + 1) * PAGE)})</span>${ui.page + 1 < pages ? '<button class="conv-back" id="kjN">→</button>' : '<span></span>'}</div>
    <div class="kj-card kj-learn" id="kjDetail" style="display:none"></div>`;
  document.getElementById('kjBack').addEventListener('click', () => go('home'));
  const qEl = document.getElementById('kjQ');
  qEl.addEventListener('change', () => { ui.q = qEl.value; ui.page = 0; renderKanji(); });
  const p = document.getElementById('kjP'); if(p) p.addEventListener('click', () => { ui.page--; renderKanji(); });
  const n = document.getElementById('kjN'); if(n) n.addEventListener('click', () => { ui.page++; renderKanji(); });
  area.querySelectorAll('.kj-gcell').forEach(b => b.addEventListener('click', () => {
    const d = BY_K.get(b.dataset.k), box = document.getElementById('kjDetail');
    box.style.display = 'block'; box.innerHTML = kanjiFront(d) + kanjiBack(d);
    wireChips(box); wireAudio(box);
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));
}
