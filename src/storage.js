import { celebrate } from './encouragement.js';

const STORAGE_KEY = 'phrases-v2';
const META_KEY = 'meta-v2';

export const phrases = [];
const META_DEFAULTS = () => ({ streak:0, lastStudyDate:null, newIntroducedDate:null, newIntroducedCount:0, dailyLimit:10 });
export let meta = META_DEFAULTS();

// ---------- storage abstraction : localStorage en priorité (fonctionne en fichier local Chrome),
// window.storage utilisé seulement si présent (aperçu Claude). Corrige le bug de ré-import permanent.
export async function storageGet(key){
  try{ const v = localStorage.getItem(key); if(v !== null) return v; }catch(e){}
  if(typeof window.storage !== 'undefined'){
    try{ const r = await window.storage.get(key, false); return r ? r.value : null; }catch(e){}
  }
  return null;
}
export async function storageSet(key, value){
  let ok = false;
  try{ localStorage.setItem(key, value); ok = true; }catch(e){}
  if(typeof window.storage !== 'undefined'){
    try{ await window.storage.set(key, value, false); ok = true; }catch(e){}
  }
  if(!ok) console.error('Sauvegarde impossible (localStorage bloqué).');
}
// loadAll MUTE en place : les objets de `phrases` (et `meta`) déjà en mémoire — ceux que la file de révision
// ou une fiche ouverte tiennent par référence — restent valides. Sinon une note donnée après une relecture
// serait écrite sur un objet périmé, puis perdue (bug « révisions perdues après retour sur l'appli »).
function adoptPhrases(list){
  const byId = new Map(phrases.map(p => [p.id, p]));
  const next = list.map(c => {
    const o = c && byId.get(c.id);
    if(!o) return c;
    Object.keys(o).forEach(k => { if(!(k in c)) delete o[k]; });
    return Object.assign(o, c);
  });
  phrases.length = 0; next.forEach(c => phrases.push(c));
}
function adoptMeta(next, replace){
  if(replace) Object.keys(meta).forEach(k => { if(!(k in next)) delete meta[k]; });
  Object.assign(meta, next);
}
export async function loadAll(){
  let list = [];
  try{ const v = await storageGet(STORAGE_KEY); list = v ? JSON.parse(v) : []; }catch(e){ list = []; }
  if(!Array.isArray(list)) list = [];
  adoptPhrases(list);
  try{ const v2 = await storageGet(META_KEY); if(v2) adoptMeta(JSON.parse(v2), false); }catch(e){}
}
// Adopte un état fusionné (cloud) en gardant l'identité des objets (cartes appariées par cardKey).
export function adoptMerged(list, newMeta){
  const byKey = new Map(phrases.map(p => [cardKey(p.jp, p.romaji), p]));
  const next = (list || []).map(c => { const o = byKey.get(cardKey(c.jp, c.romaji)); if(!o) return c; Object.keys(o).forEach(k => { if(!(k in c)) delete o[k]; }); return Object.assign(o, c); });
  phrases.length = 0; next.forEach(c => phrases.push(c));
  adoptMeta(newMeta || {}, true);
}
// Écriture de meta REGROUPÉE : une rafale d'actions (note + erreur + plan + série…) = 1 seule écriture
// (~250 ms plus tard) au lieu d'une par action. flushMeta() écrit tout de suite (fermeture de page, savePhrases).
let metaTimer = null, metaWaiters = [], metaTouched = false;
async function writeMeta(){
  metaTimer = null;
  const waiters = metaWaiters, touched = metaTouched; metaWaiters = []; metaTouched = false;
  try{ await storageSet(META_KEY, JSON.stringify(meta)); }finally{ waiters.forEach(r => r()); }
  if(touched) window.dispatchEvent(new CustomEvent('nihongo:changed'));
}
export function flushMeta(){ if(metaTimer){ clearTimeout(metaTimer); return writeMeta(); } return Promise.resolve(); }
// touch=false : écriture technique (migration, remise à zéro du jour) qui ne doit PAS faire croire
// à la synchro cloud que cet appareil a de la progression plus récente que les autres.
export function saveMeta(touch = true){
  if(touch){ meta.lastModified = nowTs(); metaTouched = true; }
  return new Promise(res => { metaWaiters.push(res); clearTimeout(metaTimer); metaTimer = setTimeout(writeMeta, 250); });
}
export const saveMetaSoon = saveMeta;
try{
  window.addEventListener('pagehide', flushMeta);
  window.addEventListener('visibilitychange', () => { if(typeof document !== 'undefined' && document.visibilityState === 'hidden') flushMeta(); });
}catch(e){}
export async function savePhrases(){
  meta.lastModified = nowTs(); metaTouched = true;
  await storageSet(STORAGE_KEY, JSON.stringify(phrases));
  clearTimeout(metaTimer); await writeMeta();   // meta part avec les cartes : une seule écriture
}

export function nowTs(){ return Date.now(); }
// Date LOCALE (et non UTC) : à Kyoto, le « jour » doit changer à minuit, pas à 9 h.
export function todayStr(){ const d = new Date(), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`; }
export function daysToMs(d){ return d*24*60*60*1000; }

export function updateStreak(){
  const today = todayStr();
  if(meta.lastStudyDate && meta.lastStudyDate !== today){
    const diff = (new Date(today) - new Date(meta.lastStudyDate)) / 86400000;
    if(diff > 1.5) meta.streak = 0;
  }
  setStreakBadge();
}
// Jamais de « 0 jour » sec : après une pause, on invite à reprendre plutôt que de punir.
export function setStreakBadge(){
  const el = document.getElementById('streakBadge'); if(!el) return;
  const n = meta.streak || 0;
  el.textContent = n > 0 ? '🔥 ' + n + ' jour' + (n===1?'':'s') : (meta.lastStudyDate ? '🌱 On reprend ?' : '🌱 Jour 1');
}
// ---------- Journal d'étude (calendrier des progrès) ----------
function bumpStudyLog(){
  const d = todayStr(), log = meta.studyLog = meta.studyLog || {};
  log[d] = (log[d] || 0) + 1;
  const keys = Object.keys(log).sort(); if(keys.length > 400) keys.slice(0, keys.length - 400).forEach(k => delete log[k]);
}
// ---------- Journal d'erreurs ----------
// Chaque mauvaise réponse est gardée avec sa question complète : on peut la rejouer à l'identique.
// Les réponses de quiz arrivent en rafale : on regroupe les écritures de meta (~300 ms) au lieu de tout réécrire à chaque clic.
export function recordAnswer(src, key, ok, q){
  const m = meta.mistakes = meta.mistakes || {};
  const id = src + '|' + key;
  if(ok){
    const e = m[id]; if(!e) return;
    e.streak = (e.streak || 0) + 1;
    if(e.streak >= 3){ e.mastered = true; e.masteredOn = todayStr(); }
    saveMetaSoon();
    return;
  }
  const e = m[id] || { src, key, n: 0 };
  Object.assign(e, { q: q.q, ok: q.ok, choices: q.choices, explain: q.explain || '', say: q.say || '', chosen: q.chosen || '', last: todayStr(), streak: 0, mastered: false });
  e.n = (e.n || 0) + 1; m[id] = e;
  const ids = Object.keys(m); if(ids.length > 300){ ids.sort((a, b) => (m[a].last || '').localeCompare(m[b].last || '')).slice(0, ids.length - 300).forEach(i => delete m[i]); }
  saveMetaSoon();
}
export function openMistakes(){ return Object.values(meta.mistakes || {}).filter(e => !e.mastered); }
export function masteredMistakes(){ return Object.values(meta.mistakes || {}).filter(e => e.mastered); }

export function registerStudyActivity(){
  bumpStudyLog();
  const today = todayStr();
  if(meta.lastStudyDate !== today){
    const gapDays = meta.lastStudyDate ? (new Date(today)-new Date(meta.lastStudyDate))/86400000 : 0;
    meta.streak = (meta.lastStudyDate && gapDays <= 1.5) ? (meta.streak||0)+1 : 1;
    meta.lastStudyDate = today; saveMeta();
    setStreakBadge();
    // Import statique (en tête de fichier) plutôt que dynamique : un import() différé
    // résolvait APRÈS des toasts synchrones déclenchés dans le même clic (ex: « file vidée »
    // en Réviser), et l'écrasait par accident selon l'ordre de résolution des promesses.
    // Retour après une coupure : jamais de ton punitif sur la série perdue, uniquement un
    // accueil rassurant. Prioritaire sur le message de streak (streak repart à 1 ce jour-là).
    if(gapDays > 1.5){
      celebrate('welcomeBack', { emoji:'👋', title:'Contente de te revoir' });
    } else if(meta.streak >= 2 && meta.streak < 7){
      // Les paliers 7 et 30 jours ont déjà leur propre badge (célébré ailleurs) ; entre les
      // deux, un petit mot rappelle que chaque jour compte, sans spammer le tout premier jour.
      celebrate('streak', { emoji:'🔥', title: meta.streak + ' jours d\'affilée' });
    }
  }
}

export function newCard(jp, romaji, fr, note, tag, level){
  return { id:'c'+Math.random().toString(36).slice(2,10), jp, romaji, fr, note:note||'', tag:(tag||'général').toLowerCase(), level:level||'',
    interval:0, ease:2.5, reps:0, due:nowTs(), shadowReps:0, created:nowTs(), archived:false };
}

export function rate(card, grade){
  card.last = nowTs(); // la fusion cloud garde la carte la plus récemment travaillée (un oubli récent bat un vieux « bien »)
  if(grade === 0){
    // Oubli : retour à l'échelle d'apprentissage (10 min, puis 1 j, 3 j…). reps repart à 0 pour que
    // « Bien » donne ensuite 1 jour et non 0 (bug d'avant : la carte restait due pour toujours).
    card.interval = 0; card.ease = Math.max(1.3, card.ease-0.2); card.due = nowTs()+1000*60*10;
    card.lapses = (card.lapses||0) + 1; card.reps = 0;
    return;
  }
  if(grade === 1){ card.interval = Math.max(1, Math.round(card.interval*1.2)||1); card.due = nowTs()+daysToMs(card.interval); }
  else if(grade === 2){ card.interval = Math.max(1, card.reps===0?1:(card.reps===1?3:Math.round(card.interval*card.ease))); card.due = nowTs()+daysToMs(card.interval); }
  else if(grade === 3){ card.ease = Math.min(3, card.ease+0.15); card.interval = Math.max(2, card.reps===0?4:Math.round(card.interval*card.ease*1.3)); card.due = nowTs()+daysToMs(card.interval); }
  card.reps += 1;
}
export function archiveCard(card, archived){
  card.archived = archived;
  if(archived){ card.due = nowTs() + daysToMs(36500); } // ~100 ans : sort des révisions sans supprimer la donnée
  else { card.due = nowTs(); }
}

export function getDueAll(){ return phrases.filter(p => p.due <= nowTs() && !p.archived); }
// Révisions réellement en retard (cartes déjà vues) : les cartes jamais vues sont des « nouvelles », pas du retard.
export function getReviewDue(){ return phrases.filter(p => p.due <= nowTs() && !p.archived && p.reps > 0); }

const LEVEL_ORDER = { 'A0':0, 'A1':1, 'A2':2, 'B1':3 };
export function levelRank(level){ return LEVEL_ORDER.hasOwnProperty(level) ? LEVEL_ORDER[level] : 99; }

export function buildQueue(){
  const today = todayStr();
  if(meta.newIntroducedDate !== today){ meta.newIntroducedDate = today; meta.newIntroducedCount = 0; saveMeta(false); }
  const limit = meta.dailyLimit || 40;
  const due = getDueAll();
  const seen = due.filter(p => p.reps > 0);
  // les nouvelles cartes sont introduites par niveau croissant (A0 d'abord, puis A1, A2, B1)
  // pour ne jamais mélanger du B1 avant d'avoir consolidé les bases
  const fresh = due.filter(p => p.reps === 0).slice().sort((a,b)=>{
    const r = levelRank(a.level) - levelRank(b.level);
    return r !== 0 ? r : a.created - b.created;
  });
  const remainingNewSlots = Math.max(0, limit - meta.newIntroducedCount);
  const newBatch = fresh.slice(0, remainingNewSlots);
  // seules les cartes déjà vues sont mélangées entre elles ; les nouvelles gardent leur ordre de niveau
  for(let i=seen.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [seen[i],seen[j]]=[seen[j],seen[i]]; }
  return seen.concat(newBatch);
}

// ---------- Plan quotidien (onglet Aujourd'hui) ----------
// meta.plan = {date, kana:bool, reviews:int, conv:bool} — remis à zéro chaque jour
export function planToday(){
  const today = todayStr();
  if(!meta.plan || meta.plan.date !== today){ meta.plan = { date:today, kana:false, reviews:0, conv:0, challenge:0 }; saveMeta(false); }
  return meta.plan;
}
export function planMark(field, inc){
  const p = planToday();
  if(typeof inc === 'number') p[field] = (p[field]||0) + inc;
  else p[field] = true;
  saveMeta();
}

// ---------- Clé de déduplication d'une carte ----------
// Un kanji isolé peut être ajouté depuis deux écrans (Alphabet → 漢字 et JLPT N5 → Kanji) avec
// deux lectures différentes ("ichi" vs "ichi / hitotsu"). On dédoublonne donc les kanji sur le
// seul caractère, sinon la même carte entre deux fois dans le SRS avec deux réponses attendues.
const SINGLE_KANJI = /^[一-鿿]$/;
export function cardKey(jp, romaji){
  const j = (jp||'').trim();
  return SINGLE_KANJI.test(j) ? j : (j+'|'+(romaji||'')).toLowerCase();
}
export function existingKeySet(){ return new Set(phrases.map(p => cardKey(p.jp, p.romaji))); }

// ---------- Progressions hors-SRS, stockées dans meta ----------
// Elles vivaient dans leurs propres clés localStorage : elles échappaient donc à l'export JSON
// comme à la synchro cloud (qui ne transportent que phrases + meta). En les rangeant dans meta,
// elles suivent automatiquement la sauvegarde, la restauration et la synchro multi-appareils.
const LEGACY_KANA_KEY = 'kanaPath-v1';
const LEGACY_EXAM_KEY = 'jlptExamHistory-v1';

export function migrateLegacyStores(){
  let changed = false;
  if(!meta.kanaPath){
    let legacy = null;
    try { legacy = JSON.parse(localStorage.getItem(LEGACY_KANA_KEY)); } catch(e){}
    meta.kanaPath = (legacy && Array.isArray(legacy.done)) ? { done: legacy.done } : { done: [] };
    changed = true;
  }
  if(!meta.examHistory){
    let legacy = null;
    try { legacy = JSON.parse(localStorage.getItem(LEGACY_EXAM_KEY)); } catch(e){}
    meta.examHistory = Array.isArray(legacy) ? legacy : [];
    changed = true;
  }
  if(!meta.convDone){ meta.convDone = []; changed = true; }
  if(!meta.grammarDrills){ meta.grammarDrills = []; changed = true; }
  if(!meta.readingKnown){ meta.readingKnown = []; changed = true; }
  if(!meta.masteredSkillsSeen){ meta.masteredSkillsSeen = []; changed = true; }
  if(!meta.quizStats){ meta.quizStats = {}; changed = true; }
  if(!meta.badgesSeen){ meta.badgesSeen = []; changed = true; }
  if(changed) saveMeta(false);
}

export function getKanaPath(){ return meta.kanaPath || { done: [] }; }
export function markKanaLesson(idx){
  const p = getKanaPath();
  if(!p.done.includes(idx)){ p.done.push(idx); meta.kanaPath = p; saveMeta(); }
}

export function getExamHistory(){ return meta.examHistory || []; }
export function addExamRecord(record){
  meta.examHistory = [...getExamHistory(), record].slice(-100);
  saveMeta();
}

// Règles de grammaire validées (drill réussi à ≥ 80 %), identifiées par leur titre de section
export function getGrammarDrills(){ return meta.grammarDrills || []; }
export function markGrammarDrill(key){
  const d = getGrammarDrills();
  if(key && !d.includes(key)){ meta.grammarDrills = [...d, key]; saveMeta(); }
}

// Panneaux/formulaires marqués « connus » dans Lire — indépendant du SRS : ces éléments ne
// sont pas forcément importés dans les révisions, on veut juste ne plus les revoir en quiz.
export function getReadingKnown(){ return meta.readingKnown || []; }
export function markReadingKnown(jp){
  const k = getReadingKnown();
  if(jp && !k.includes(jp)){ meta.readingKnown = [...k, jp]; saveMeta(); }
}
export function unmarkReadingKnown(jp){
  const k = getReadingKnown();
  if(k.includes(jp)){ meta.readingKnown = k.filter(x=>x!==jp); saveMeta(); }
}

// Compétences (onglet Compétences) déjà célébrées au niveau 5/5 — évite de répéter le
// toast de maîtrise à chaque re-rendu du dashboard une fois le niveau atteint.
export function getMasteredSkillsSeen(){ return meta.masteredSkillsSeen || []; }
export function markSkillMasteredSeen(tag){
  const s = getMasteredSkillsSeen();
  if(tag && !s.includes(tag)){ meta.masteredSkillsSeen = [...s, tag]; saveMeta(); }
}

export function getConvDone(){ return meta.convDone || []; }
export function markConvDone(id){
  const d = getConvDone();
  if(id && !d.includes(id)){ meta.convDone = [...d, id]; saveMeta(); }
}

// Historique des scores de quiz : { kana:[…], kanji:[…], jlpt:[…], listening:[…] }
// Chaque entrée = { date, correct, total }. Sert aux records personnels et aux badges.
export function addQuizStat(kind, correct, total){
  const all = meta.quizStats || {};
  const list = all[kind] || [];
  list.push({ date: todayStr(), correct, total });
  all[kind] = list.slice(-50); // on garde les 50 dernières, largement assez pour une courbe
  meta.quizStats = all;
  saveMeta();
}
export function getQuizStats(kind){ return (meta.quizStats || {})[kind] || []; }
export function bestQuizScore(kind){
  const list = getQuizStats(kind);
  if(!list.length) return null;
  return list.reduce((best, s)=>{
    const pct = s.total ? s.correct/s.total : 0;
    return (!best || pct > best.pct) ? { pct, ...s } : best;
  }, null);
}

export function removePhrase(id){
  const p = phrases.find(x => x.id === id);
  // Tombstone : sans elle, la carte supprimée ici ressusciterait à la prochaine fusion avec un autre appareil.
  if(p){ (meta.deleted = meta.deleted || {})[cardKey(p.jp, p.romaji)] = nowTs(); saveMeta(); }
  { const i = phrases.findIndex(x => x.id === id); if(i >= 0) phrases.splice(i, 1); }
}

// ---------- Export / Import JSON (sauvegarde locale manuelle) ----------
// Exporte toute la progression dans un fichier .json téléchargeable.
export function exportProgressionJSON(){
  const data = { phrases, meta, exportedAt: new Date().toISOString(), version: 2 };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nihongo-progression-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Valide/assainit tout état venu de l'extérieur (fichier, lien #sync=, cloud) avant de l'utiliser : les nombres
// redeviennent des nombres, les ids sont contraints, pour qu'aucune donnée importée ne puisse injecter du HTML.
export function sanitizeState(ph, me){
  const num = v => Number.isFinite(+v) ? +v : 0, int = (v, d = 0) => Number.isFinite(+v) ? Math.trunc(+v) : d;
  const str = (v, n = 400) => typeof v === 'string' ? v.slice(0, n) : '';
  const obj = v => (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
  const strList = (v, n = 3000, len = 80) => Array.isArray(v) ? v.slice(0, n).map(x => str(x, len)) : [];
  const date = v => /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : '';
  const id = v => /^[A-Za-z0-9_-]{1,40}$/.test(String(v)) ? String(v) : 'c' + Math.random().toString(36).slice(2, 10);
  // Copie profonde bornée : nombres, booléens, chaînes courtes, listes/objets limités — aucune clé « dangereuse », rien d'exécutable.
  const deep = (v, d = 0) => {
    if(typeof v === 'number') return num(v);
    if(typeof v === 'boolean') return v;
    if(typeof v === 'string') return str(v, 300);
    if(d >= 3 || !v || typeof v !== 'object') return null;
    if(Array.isArray(v)) return v.slice(0, 60).map(x => deep(x, d + 1));
    const r = {}; Object.entries(v).slice(0, 40).forEach(([k, x]) => { if(k !== '__proto__' && k !== 'constructor') r[str(k, 60)] = deep(x, d + 1); }); return r;
  };
  const srsCard = c => { c = obj(c); const o = { interval: num(c.interval), ease: num(c.ease) || 2.5, reps: int(c.reps), due: num(c.due), lapses: int(c.lapses), last: num(c.last) }; if(typeof c.intro === 'string') o.intro = date(c.intro); return o; };

  ph = (Array.isArray(ph) ? ph : []).filter(p => p && typeof p.jp === 'string').map(p => Object.assign({}, p, {
    id: id(p.id), jp: str(p.jp, 300), romaji: str(p.romaji, 300), fr: str(p.fr, 300), note: str(p.note, 600), level: str(p.level, 8),
    interval: num(p.interval), ease: num(p.ease) || 2.5, reps: int(p.reps), due: num(p.due), last: num(p.last), lapses: int(p.lapses),
    created: num(p.created), shadowReps: int(p.shadowReps), archived: !!p.archived, tag: str(p.tag, 60),
  }));

  me = obj(me); const o = {};
  // ----- nombres / chaînes simples
  ['streak', 'minutes', 'dailyLimit', 'lastModified', 'newIntroducedCount'].forEach(k => { if(k in me) o[k] = num(me[k]); });
  ['lastStudyDate', 'newIntroducedDate', 'dailyProgramCelebrated', 'radDoneOn'].forEach(k => { if(k in me) o[k] = date(me[k]) || null; });
  ['goal', 'level', 'kanjiPhase'].forEach(k => { if(k in me) o[k] = str(me[k], 20); });
  ['onboarded', 'reviewReadMode'].forEach(k => { if(k in me) o[k] = !!me[k]; });
  if('kanjiCfg' in me){ const c = obj(me.kanjiCfg); o.kanjiCfg = { perDay: Math.min(30, Math.max(1, int(c.perDay, 6))), radPerDay: Math.min(30, Math.max(1, int(c.radPerDay, 8))) }; }
  // ----- listes de textes
  ['convDone', 'readingKnown', 'badgesSeen', 'grammarDrills', 'masteredSkillsSeen', 'lessonsDone', 'textsDone'].forEach(k => { if(k in me) o[k] = strList(me[k]); });
  // ----- SRS kanji
  if('kanjiSrs' in me){ o.kanjiSrs = {}; Object.entries(obj(me.kanjiSrs)).slice(0, 4000).forEach(([k, c]) => { o.kanjiSrs[str(k, 20)] = srsCard(c); }); }
  if('kanjiNotes' in me){ o.kanjiNotes = {}; Object.entries(obj(me.kanjiNotes)).slice(0, 2500).forEach(([k, v]) => { o.kanjiNotes[str(k, 20)] = str(v, 160); }); }
  if('kanjiDaily' in me){ const d = obj(me.kanjiDaily); o.kanjiDaily = Object.assign(obj(deep(d)), { date: date(d.date), newK: strList(d.newK, 200, 20), newR: strList(d.newR, 200, 20), reviewed: int(d.reviewed) }); }
  // ----- plan du jour
  if('plan' in me){ const p = obj(me.plan); o.plan = Object.assign(obj(deep(p)), { date: date(p.date), kana: !!p.kana, reviews: int(p.reviews), conv: int(p.conv), challenge: int(p.challenge), lesson: int(p.lesson), rework: int(p.rework) }); }
  // ----- journal d'étude, tombstones
  if('studyLog' in me){ o.studyLog = {}; Object.entries(obj(me.studyLog)).slice(-500).forEach(([k, v]) => { if(date(k)) o.studyLog[k] = int(v); }); }
  if('deleted' in me){ o.deleted = {}; Object.entries(obj(me.deleted)).slice(0, 3000).forEach(([k, v]) => { o.deleted[str(k, 300)] = num(v); }); }
  // ----- journal d'erreurs : « src » dans une liste fixe, tout le reste borné
  if('mistakes' in me){
    const SRC = ['kanji', 'radical', 'menu', 'kit', 'word', 'kana', 'grammar', 'lesson', 'phrase', 'jlpt', 'pitfall', 'text', 'listening', 'dialogue', 'autre'];
    o.mistakes = {};
    Object.entries(obj(me.mistakes)).slice(0, 600).forEach(([k, e]) => { e = obj(e);
      o.mistakes[str(k, 200)] = { src: SRC.includes(e.src) ? e.src : 'autre', key: str(e.key, 120), n: int(e.n), streak: int(e.streak), mastered: !!e.mastered, masteredOn: date(e.masteredOn),
        q: str(e.q, 400), ok: str(e.ok, 200), explain: str(e.explain, 600), say: str(e.say, 200), chosen: str(e.chosen, 200), last: date(e.last), choices: strList(e.choices, 6, 200) }; });
  }
  // ----- quiz, examens, kana, rappel, romaji
  if('quizStats' in me){ o.quizStats = {}; Object.entries(obj(me.quizStats)).slice(0, 40).forEach(([k, l]) => { o.quizStats[str(k, 40)] = (Array.isArray(l) ? l : []).slice(-50).map(e => ({ date: date(obj(e).date), correct: int(obj(e).correct), total: int(obj(e).total) })); }); }
  if('examHistory' in me){ o.examHistory = (Array.isArray(me.examHistory) ? me.examHistory : []).slice(-100).map(e => { e = obj(e); return obj(deep(e)); }); }
  if('kanaPath' in me){ o.kanaPath = { done: (Array.isArray(obj(me.kanaPath).done) ? me.kanaPath.done : []).slice(0, 100).map(x => int(x)) }; }
  if('reminder' in me){ const r = obj(me.reminder); o.reminder = { time: /^\d{2}:\d{2}$/.test(r.time) ? r.time : '19:00', notif: !!r.notif, notifiedOn: date(r.notifiedOn) }; }
  if('romajiPrefs' in me){ const r = obj(me.romajiPrefs), bools = v => { const b = {}; Object.entries(obj(v)).slice(0, 500).forEach(([k, x]) => { b[str(k, 120)] = !!x; }); return b; };
    o.romajiPrefs = { global: r.global !== false, pages: bools(r.pages), sections: bools(r.sections), words: bools(r.words) }; }
  return { phrases: ph, meta: o };
}

// Importe un fichier .json exporté et restaure toute la progression.
export async function importProgressionJSON(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data0 = JSON.parse(e.target.result);
        if(!data0.phrases || !Array.isArray(data0.phrases)) throw new Error('Format invalide.');
        const clean = sanitizeState(data0.phrases, data0.meta), data = { phrases: clean.phrases, meta: clean.meta };
        try{ localStorage.setItem('backup-before-restore', JSON.stringify({ phrases, meta, at: new Date().toISOString() })); }catch(_){}
        meta = META_DEFAULTS();
        if(data.meta && typeof data.meta === 'object') Object.assign(meta, data.meta);
        meta.lastModified = nowTs(); // la restauration doit gagner sur le cloud
        await storageSet(STORAGE_KEY, JSON.stringify(data.phrases));
        await storageSet(META_KEY, JSON.stringify(meta));
        await loadAll();
        resolve(data.phrases.length);
      } catch(err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier.'));
    reader.readAsText(file);
  });
}

// ---------- Pour aller plus loin : sync multi-appareils en temps réel ----------
// L'export/import JSON est manuel mais 100 % fiable sans backend.
// Pour une vraie sync automatique Mac ↔ iPhone, deux options simples :
//
// Option A — Supabase (PostgreSQL managé, free tier généreux) :
//   1. Créer un projet sur supabase.com (gratuit)
//   2. Table `progressions` : colonnes user_id (text), phrases (jsonb), meta (jsonb)
//   3. Remplacer storageGet/storageSet par des appels fetch() vers l'API REST Supabase
//   4. Auth minimale : magic link email ou OAuth Google (SDK Supabase JS)
//
// Option B — PocketBase (SQLite embarqué, auto-hébergé) :
//   1. Binaire unique (~15 MB), déployable sur Fly.io (free tier) ou VPS
//   2. API REST et SDK JS fournis d'office, même schéma de données
//
// Dans les deux cas, le schéma est déjà propre (phrases-v2 + meta-v2 en JSON plat).
// Il suffit de brancher storageGet/storageSet sur un endpoint distant au lieu de localStorage.
