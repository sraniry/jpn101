import { meta, saveMeta, todayStr, nowTs, rate, registerStudyActivity, recordAnswer, getReviewDue } from '../storage.js';
import { speak } from '../tts.js';
import { escapeHtml, escapeRj, rjMark, kanaToRomaji } from '../util.js';
import { celebrate } from '../encouragement.js';
import { wireStrokeButtons } from '../strokes.js';

// ---------- Kanji : les 2136 kanji d'usage courant, à raison de quelques-uns par jour ----------
// Méthode : radicaux de base d'abord (les « briques »), puis N nouveaux kanji par jour,
// chaque kanji décomposé en briques + une petite histoire. Révision espacée (SRS) : une carte
// revient au moment où tu allais l'oublier. Les cartes sont stockées dans meta.kanjiSrs.

const TOTAL = 2136;
let DECK = null, RADS = null, BY_K = null, BY_R = null, RAD_USE = null, WORDS = null;
let sub = 'home';            // home | lesson | review | browse | radicals
let ui = {};                 // état d'écran en cours

async function loadData(){
  if(DECK) return;
  const m = await import('../../data/kanji-joyo.js');
  DECK = m.KANJI_DECK; RADS = m.RADICALS;
  BY_K = new Map(DECK.map(d => [d.k, d]));
  BY_R = new Map(RADS.map(r => [r.r, r]));
  try{ WORDS = (await import('../../data/kanji-words.js')).KANJI_WORDS; }catch(e){ WORDS = []; }
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
// Phase du parcours : radicaux d'abord ; le passage aux kanji ne se fait qu'AU LENDEMAIN de la fin des radicaux
// (sinon la journée en cours repartirait de 0/6 et l'étape du jour ne pourrait jamais se valider).
const RAD_TOTAL = 51;
export const DUE_PAUSE = 60; // au-delà de 60 cartes dues, on met les nouveautés en pause : on rattrape d'abord
function currentPhase(){
  if(meta.kanjiPhase === 'kanji') return 'kanji';
  if(meta.radDoneOn && meta.radDoneOn < todayStr()) meta.kanjiPhase = 'kanji';
  return meta.kanjiPhase === 'kanji' ? 'kanji' : 'radicals';
}
// Source unique des compteurs « à revoir » (bannière, pastilles, hub Moi) : kanji + phrases déjà vues.
export function dueCounts(){
  const kanji = Object.values(srs()).filter(c => c.due <= nowTs()).length;
  const ph = getReviewDue().length;
  return { kanji, phrases: ph, total: kanji + ph };
}
export function kanjiTodayStatus(){
  const s = srs(), now = nowTs(), d = daily();
  const due = Object.values(s).filter(c => c.due <= now).length;
  const phase = currentPhase();
  const goal = phase === 'radicals' ? cfg().radPerDay : cfg().perDay;
  const introduced = phase === 'radicals' ? d.newR.length : d.newK.length;
  const radSeen = Object.keys(s).filter(k => isRadKey(k)).length;
  const radLeft = RAD_TOTAL - radSeen - d.newR.filter(r => !s[keyR(r)]).length;
  const paused = due > DUE_PAUSE && introduced === 0;
  const quotaMet = introduced >= goal || (phase === 'radicals' && radLeft <= 0) || paused;
  const lessonDone = quotaMet ? (d.newK.every(k => s[k]) && d.newR.every(r => s[keyR(r)] || s[r])) : false;
  const learnedTotal = Object.keys(s).filter(k => !isRadKey(k)).length;
  return { due, paused, phase, goal, introduced, lessonDone, reviewed: d.reviewed, learnedTotal, started: Object.keys(s).length > 0 || introduced > 0 };
}

function newCardRec(){ return { interval: 0, ease: 2.5, reps: 0, due: nowTs(), lapses: 0, intro: todayStr() }; }

// ---------- affichage d'une fiche ----------
const hira2kata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60));
const rj = kana => `<span class="rj-inline">${escapeHtml(kanaToRomaji(kana))}</span>`;

function chipName(c){ const r = BY_R.get(c); if(r) return r.name; const k = BY_K.get(c); return k ? k.fr : null; }
function chipsHtml(d){
  const shown = (d.c || []).filter(c => chipName(c));
  if(!shown.length) return '';
  const known = srs();
  return `<div class="kj-chips">` + shown.map(c => {
    const star = known[keyR(c)] || known[keyK(c)] ? ' is-known' : '';
    return `<button type="button" class="kj-chip${star}" data-rad="${escapeHtml(c)}"><span class="kj-chip-g">${escapeHtml(c)}</span><span class="kj-chip-n">${escapeHtml(chipName(c))}</span></button>`;
  }).join('<span class="kj-plus">+</span>') + `</div><div class="kj-chip-story" id="kjChipStory"></div>`;
}
function wireChips(root){
  root.querySelectorAll('.kj-chip').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const r = BY_R.get(b.dataset.rad) || (BY_K.get(b.dataset.rad) ? { r: b.dataset.rad, name: BY_K.get(b.dataset.rad).fr, story: BY_K.get(b.dataset.rad).st || '' } : null); const box = root.querySelector('#kjChipStory');
    if(box && r) box.innerHTML = `<b>${escapeHtml(r.r)} — ${escapeHtml(r.name)}</b>${r.jp ? ` (se dit <b>${escapeHtml(r.jp)}</b> ${rj(r.jp)})` : ''} : ${escapeHtml(r.story)}${r.meaning ? `<br><span class="kj-meaning">Apporte l'idée de : ${escapeHtml(r.meaning)}</span>` : ''}`;
  }));
}
function rdChip(shown, kana){
  const k = kana.replace(/[()]/g, '');
  return `<span class="kj-rd">${escapeHtml(shown)}<small>${rj(k)}</small><button type="button" class="kj-audio kj-rd-a" data-say="${escapeHtml(k)}" title="Écouter">🔊</button></span>`;
}
function readingsHtml(d){
  const on = d.on || [], kun = d.kun || [];
  const main = [on[0] && rdChip(hira2kata(on[0]), on[0]), kun[0] && rdChip(kun[0], kun[0])].filter(Boolean);
  const others = [...on.slice(1).map(x => rdChip(hira2kata(x), x)), ...kun.slice(1).map(x => rdChip(x, x))];
  return `<div class="kj-readings"><span class="kj-slabel">🗣️ Comment ça se prononce</span>
    <div>${on[0] ? `<span class="kj-rlabel">On = lecture « chinoise » <small>(dans les mots à plusieurs kanji, ex. 日本 ni-hon)</small></span>${rdChip(hira2kata(on[0]), on[0])}` : ''}</div>
    <div>${kun[0] ? `<span class="kj-rlabel">Kun = lecture « japonaise » <small>(le kanji seul ou suivi de kana, ex. 食べる ta-beru)</small></span>${rdChip(kun[0], kun[0])}` : ''}</div>
    ${others.length ? `<details class="kj-more"><summary>Autres lectures (plus rares)</summary>${others.join('')}</details>` : ''}
  </div>`;
}
// Prononciation d'un radical : son nom japonais (ex. さんずい) et/ou les lectures du kanji s'il en est un.
function radSayHtml(r){
  const k = BY_K && BY_K.get(r.r);
  const nm = r.jp ? `<div><span class="kj-rlabel">Son nom en japonais</span>${rdChip(r.jp, r.jp)}${r.jpNote ? `<span class="kj-meaning"> ${escapeHtml(r.jpNote)}</span>` : ''}</div>` : (r.jpNote ? `<div class="kj-meaning">${escapeHtml(r.jpNote)}</div>` : '');
  const rest = k ? readingsHtml(Object.assign({}, k, { on: (k.on || []).slice(0, 2), kun: (k.kun || []).slice(0, 2) })).replace('🗣️ Comment ça se prononce', 'Ce même signe est aussi un kanji') : '';
  if(!nm && !rest) return '';
  return `<div class="kj-readings"><span class="kj-slabel">🗣️ Comment ça se dit</span>${nm}</div>${rest}`;
}
function futureKanji(word, d){
  if(!BY_K) return false;
  return [...word].some(c => { const x = BY_K.get(c); return x && x.n > d.n; });
}
function kanjiFront(d){ return `<div class="kj-glyph">${escapeHtml(d.k)}</div>`; }
function kanjiBack(d, withAudio = true){
  const ex = d.ex || [];
  return `<div class="kj-fr">${escapeHtml(d.fr)}</div>
    ${readingsHtml(d)}
    ${chipsHtml(d)}
    ${d.st ? `<div class="kj-story"><span class="kj-slabel">💡 Image pour retenir</span>${escapeHtml(d.st)}</div>` : ''}
    ${(meta.kanjiNotes || {})[d.k] ? `<div class="kj-story"><span class="kj-slabel">✏️ Ton image</span>${escapeHtml(meta.kanjiNotes[d.k])}</div>` : ''}
    ${ex.length ? `<div class="kj-ex"><span class="kj-slabel">Un mot pour l'ancrer${futureKanji(ex[0], d) ? ' <em class="kj-soon">(contient un kanji que tu verras plus tard)</em>' : ''}</span><b>${escapeHtml(ex[0])}</b> <span class="kj-exk">（${escapeHtml(ex[1])} / ${rj(ex[1])}）</span> — ${escapeHtml(ex[2])}${withAudio ? ` <button class="kj-audio" data-say="${escapeHtml(ex[1])}" title="Écouter">🔊</button>` : ''}</div>` : ''}
    <button type="button" class="kj-stroke-btn" data-k="${escapeHtml(d.k)}">✍️ Ordre des traits</button><div class="kj-stroke-box"></div>
    <div class="kj-meta">${d.s} trait${d.s>1?'s':''} · ${d.g <= 6 ? 'école primaire (année ' + d.g + ')' : 'collège / lycée'}${d.j ? ' · JLPT N' + d.j : ''} · n° ${d.n} / ${TOTAL}</div>`;
}
function radFront(r){ return `<div class="kj-glyph">${escapeHtml(r.r)}</div><div class="kj-tag">Radical (brique)</div>`; }
function radBack(r){
  const use = (RAD_USE.get(r.r) || []).map(k => BY_K.get(k)).filter(Boolean);
  return `<div class="kj-fr">${escapeHtml(r.name)}</div>
    ${radSayHtml(r)}
    <div class="kj-story"><span class="kj-slabel">💡 Pour le reconnaître</span>${escapeHtml(r.story)}</div>
    ${r.meaning ? `<div class="kj-meaning">Dans un kanji, il apporte l'idée de : ${escapeHtml(r.meaning)}</div>` : ''}
    ${use.length ? `<div class="kj-ex"><span class="kj-slabel">On le retrouve dans</span>${use.map(u => `<b class="kj-use">${escapeHtml(u.k)}</b> ${escapeHtml(u.fr)}`).join(' · ')}</div>` : ''}`;
}
function wireAudio(root){
  wireStrokeButtons(root);
  root.querySelectorAll('.kj-audio').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); speak(b.dataset.say, 0.85); }));
}

// ---------- sélection des nouveaux éléments du jour ----------
function pickNew(){
  const d = daily(), s = srs();
  if(kanjiTodayStatus().paused) return [];
  const phase = currentPhase();
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
  if(meta.kanjiPhase === 'kanji' || meta.radDoneOn) return;
  const s = srs();
  if(RADS.filter(r => r.starter).every(r => s[keyR(r.r)])){ meta.radDoneOn = todayStr(); saveMeta(); }
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
  else if(sub === 'words') renderWords(area);
  else if(sub === 'wquiz') renderWordQuiz(area);
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
  if(st.paused) html += `<div class="kj-note" role="status">⏸️ <b>Pause des nouveaux kanji</b> : tu as ${st.due} cartes à revoir (plus de ${DUE_PAUSE}). On rattrape d'abord ! Fais tes révisions, et les nouveaux reviendront tout seuls dès que tu auras moins de ${DUE_PAUSE} cartes en attente.</div>`;

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
    <button id="kjWords">📖 Mots que tu sais lire</button>
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
  <p class="kj-credit">Lectures : KANJIDIC et KRADFILE (EDRDG, CC BY-SA 4.0). Tracés : KanjiVG (CC BY-SA 3.0, kanjivg.tagaini.net). Histoires et exemples rédigés pour cette appli.</p>`;
  area.innerHTML = html;
  const $ = id => document.getElementById(id);
  if($('kjReview')) $('kjReview').addEventListener('click', () => go('review'));
  if($('kjLesson')) $('kjLesson').addEventListener('click', () => go('lesson'));
  $('kjRadicals').addEventListener('click', () => go('radicals'));
  $('kjWords').addEventListener('click', () => go('words', { list: false }));
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
    const good = right * 2 >= total;
    area.innerHTML = `<div class="conv-done">${good ? '<div class="stamp" style="margin:0 auto 14px;">合格</div>' : ''}<h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${good ? `${total} nouveau${total > 1 ? 'x' : ''} vu${total > 1 ? 's' : ''} !` : 'On les revoit bientôt !'}</h3>
      <p style="color:#5f564a;font-size:13.5px;">${right} / ${total} du premier coup. ${good ? '' : 'Ce n\'est pas grave : c\'est le premier contact. '}Ceux que tu connais reviennent demain ; ceux qui ont résisté reviennent dans 10 minutes, et se trouvent dans « Mes erreurs ».</p>
      <button class="continue-btn" id="kjDone" style="margin-top:16px;">Terminer</button></div>`;
    if(good) celebrate('reviewCount', { emoji: '🈁', title: 'Nouveaux kanji vus', params: { n: total } });
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
    recordAnswer(it.kind === 'r' ? 'radical' : 'kanji', key, ok, { q: `Que veut dire ${g} ?`, ok: labelOf(it), choices, explain: it.kind === 'r' ? (data.r.story || '') : (data.d.st || ''), say: it.kind === 'k' && data.d.ex ? data.d.ex[1] : '', chosen: b.dataset.c });
    document.getElementById('kjFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ C\'était : ' + escapeHtml(labelOf(it))}</div>${it.kind === 'k' ? readingsHtml(data.d) : radSayHtml(data.r)}${!ok ? `<div class="kj-story"><span class="kj-slabel">💡 Image pour retenir</span>${escapeHtml(it.kind === 'k' ? (data.d.st || '') : (data.r.story || ''))}</div>` : ''}<button class="continue-btn" id="kjQn">Continuer</button>`;
    wireAudio(document.getElementById('kjFb'));
    document.getElementById('kjQn').addEventListener('click', () => { ui.qi++; renderKanji(); });
    if(it.kind === 'k' && data.d.ex) speak(data.d.ex[1], 0.85);
  }));
}

// ---------- révision SRS ----------
function dueKeys(){
  const now = nowTs(), s = srs();
  return Object.entries(s).filter(([, c]) => c.due <= now).sort((a, b) => a[1].due - b[1].due).map(([k]) => k);
}
// Carte « sangsue » : oubliée 4 fois ou plus. On propose d'autres mots d'exemple et une image à soi,
// gardée dans meta.kanjiNotes et réaffichée ensuite.
function leechBox(area, key, data){
  const c = srs()[key];
  if(!c || (c.lapses || 0) < 4){
    const own = (meta.kanjiNotes || {})[key];
    if(own) area.querySelector('#kjCard')?.insertAdjacentHTML('beforeend', `<div class="kj-story"><span class="kj-slabel">✏️ Ton image</span>${escapeHtml(own)}</div>`);
    return;
  }
  c.leech = true;
  const alts = (WORDS || []).filter(w => w.jp.includes(key) && w.jp !== (data.ex || [])[0]).slice(0, 3);
  const own = (meta.kanjiNotes || {})[key] || '';
  const box = document.createElement('div'); box.className = 'kj-note';
  box.innerHTML = `<b>🩹 Carte difficile</b> : tu l'as oubliée ${c.lapses} fois, ce n'est pas grave, ça arrive à tout le monde. Change d'image : invente la tienne (la plus bizarre est la meilleure).
    ${alts.length ? `<div>Autres mots pour l'ancrer : ${alts.map(w => `<b>${escapeHtml(w.jp)}</b> (${escapeHtml(w.kana)}) ${escapeHtml(w.fr)}`).join(' · ')}</div>` : ''}
    <input type="text" id="kjOwn" maxlength="160" placeholder="Ton image à toi…" value="${escapeHtml(own)}" aria-label="Ton image pour ce kanji" style="width:100%;margin-top:6px;padding:8px;font-size:15px">`;
  area.querySelector('#kjCard')?.after(box);
  const inp = box.querySelector('#kjOwn');
  inp.addEventListener('change', () => { meta.kanjiNotes = meta.kanjiNotes || {}; meta.kanjiNotes[key] = inp.value.trim().slice(0, 160); saveMeta(); });
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
  if(ui.revealed && !rad) leechBox(area, key, data);
  wireChips(area); wireAudio(area);
  document.getElementById('kjBack').addEventListener('click', () => go('home'));
  const rv = document.getElementById('kjReveal');
  if(rv) rv.addEventListener('click', () => { ui.revealed = true; renderKanji(); if(!rad && data.ex) speak(data.ex[1], 0.85); });
  area.querySelectorAll('.rate-row button').forEach(b => b.addEventListener('click', () => {
    const grade = parseInt(b.dataset.grade, 10), c = srs()[key];
    const before = c.interval;
    rate(c, grade);
    if(grade === 0){
      const lbl = labelOf({ kind: rad ? 'r' : 'k', id: rad ? key.slice(2) : key });
      const ch = shuffle([lbl, ...distractors({ kind: rad ? 'r' : 'k', id: rad ? key.slice(2) : key }, 3)]);
      recordAnswer(rad ? 'radical' : 'kanji', key, false, { q: `Que veut dire ${rad ? key.slice(2) : key} ?`, ok: lbl, choices: ch, explain: rad ? (data.story || '') : (data.st || ''), say: !rad && data.ex ? data.ex[1] : '', chosen: '' });
    } else recordAnswer(rad ? 'radical' : 'kanji', key, true, {});
    ui.queue.shift(); ui.done++;
    if(grade === 0) ui.queue.push(key); else ui.ok++;
    daily().reviewed++; registerStudyActivity(); saveMeta(); window.dispatchEvent(new CustomEvent('nihongo:badge'));
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

// ---------- mots que tu sais lire (tous leurs kanji sont déjà appris) ----------
const CJK1 = /[㐀-䶿一-鿿]/g;
function readableWords(){
  const learned = new Set(Object.keys(srs()).filter(k => !isRadKey(k)));
  const seen = new Set(), pool = [];
  const push = (jp, kana, fr) => { if(!seen.has(jp)){ seen.add(jp); pool.push({ jp, kana, fr }); } };
  WORDS.forEach(w => push(w.jp, w.kana, w.fr));
  DECK.forEach(d => { if(d.ex) push(d.ex[0], d.ex[1], d.ex[2]); });
  return { learned, list: pool.filter(w => { const cs = w.jp.match(CJK1); return cs && cs.every(c => learned.has(c)); }) };
}
function renderWords(area){
  const { learned, list } = readableWords();
  const n = learned.size;
  if(n < 100){
    area.innerHTML = `<div class="kj-top"><button class="conv-back" id="kjBack">← Retour</button><span>📖 Mots</span></div>
      <div class="skills-intro">Cette section s'ouvre quand tu as appris <b>100 kanji</b> : tu y trouveras des vrais mots, comme sur une carte ou un panneau, qui ne contiennent QUE des kanji que tu connais déjà. Il t'en reste <b>${100 - n}</b>.</div>
      <div class="today-track"><div class="today-track-fill" style="width:${n}%"></div></div>`;
    document.getElementById('kjBack').addEventListener('click', () => go('home'));
    return;
  }
  const shown = ui.list ? list : [];
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="kjBack">← Retour</button><span>📖 ${list.length} mots lisibles</span></div>
    <div class="skills-intro">Avec les <b>${n}</b> kanji que tu connais, tu peux déjà lire <b>${list.length}</b> mots. Chaque nouveau kanji en débloque d'autres.</div>
    <div class="kj-actions"><button class="kj-big primary" id="wq">🎯 Quiz de 10 mots</button><button class="kj-big" id="wl">${ui.list ? '🙈 Cacher la liste' : '📜 Voir la liste'}</button></div>
    ${ui.list ? `<div class="mn-board">${list.map(w => `<div class="mn-item" data-say="${escapeHtml(w.kana)}"><div class="mn-main"><span class="mn-jp">${escapeHtml(w.jp)}</span></div><div class="mn-sub"><span class="mn-kana">${escapeHtml(w.kana)} · ${rj(w.kana)}</span></div><div class="mn-fr" style="display:none">${escapeHtml(w.fr)}</div></div>`).join('')}</div><p class="kj-tip">Touche un mot pour voir sa traduction et l'écouter.</p>` : ''}`;
  document.getElementById('kjBack').addEventListener('click', () => go('home'));
  document.getElementById('wl').addEventListener('click', () => { ui.list = !ui.list; renderKanji(); });
  document.getElementById('wq').addEventListener('click', () => {
    const qs = shuffle(list).slice(0, 10).map((w, i) => {
      const others = shuffle(list.filter(x => x.fr !== w.fr)).slice(0, 3);
      if(i % 2 === 0) return { q: `Que veut dire « ${w.jp} » ?`, ok: w.fr, choices: [w.fr, ...others.map(x => x.fr)], explain: `${w.jp} = ${w.fr}.`, say: w.kana, word: w.jp, kana: w.kana };
      const o2 = shuffle(list.filter(x => x.kana !== w.kana)).slice(0, 3);
      return { q: `Comment se lit « ${w.jp} » ?`, ok: w.kana, choices: [w.kana, ...o2.map(x => x.kana)], explain: `${w.jp} = ${w.fr}.`, say: w.kana, word: w.jp, kana: w.kana };
    });
    go('wquiz', { qs, i: 0, right: 0 });
  });
  area.querySelectorAll('.mn-item').forEach(el => el.addEventListener('click', () => { const f = el.querySelector('.mn-fr'); f.style.display = f.style.display === 'none' ? 'block' : 'none'; speak(el.dataset.say, 0.85); }));
}
function renderWordQuiz(area){
  if(ui.i >= ui.qs.length){
    registerStudyActivity();
    area.innerHTML = `<div class="conv-done"><div class="stamp" style="margin:0 auto 14px;">合格</div><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${ui.right} / ${ui.qs.length}</h3>
      <p style="color:#7a7268;font-size:13.5px;">Ces mots, tu les lis avec des kanji que tu as appris toi-même.</p><button class="continue-btn" id="kjDone" style="margin-top:16px;">← Mots</button></div>`;
    document.getElementById('kjDone').addEventListener('click', () => go('words', { list: false }));
    return;
  }
  const q = ui.qs[ui.i], choices = shuffle(q.choices);
  area.innerHTML = `<div class="kj-top"><button class="conv-back" id="kjBack">← Quitter</button><span>${ui.i + 1} / ${ui.qs.length}</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(ui.i / ui.qs.length) * 100}%"></div></div>
    <div class="kj-card"><p class="mn-q">${escapeHtml(q.q)}</p><div class="kj-choices">${choices.map(c => `<button class="kj-choice" data-c="${escapeHtml(c)}">${escapeHtml(c)}${/^[ぁ-ゖァ-ヺー・\s]+$/.test(c) ? `<span class="mn-ch-rj">${rj(c)}</span>` : ''}</button>`).join('')}</div><div id="kjFb"></div></div>`;
  document.getElementById('kjBack').addEventListener('click', () => go('words', { list: false }));
  area.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.c === q.ok;
    area.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === q.ok) x.classList.add('ok'); });
    if(!ok) b.classList.add('ko'); else ui.right++;
    recordAnswer('word', q.word + ':' + q.q.slice(0, 6), ok, { q: q.q, ok: q.ok, choices: q.choices, explain: q.explain, say: q.say, chosen: b.dataset.c });
    document.getElementById('kjFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ Pas tout à fait'}</div><div class="mn-say-box"><b>${escapeHtml(q.word)}</b> se dit <b>${escapeHtml(q.kana)}</b> <span class="mn-rom">${rj(q.kana)}</span></div><div class="mn-explain">${escapeHtml(q.explain)}</div><button class="continue-btn" id="kjQn">Continuer</button>`;
    document.getElementById('kjQn').addEventListener('click', () => { ui.i++; renderKanji(); });
    speak(q.say, 0.85);
  }));
}
