// ---------- Fusion pure (sans réseau) de deux états de progression ----------
// Utilisée par cloudsync.js ; testée dans tests/run.mjs. Rien n'est perdu : on combine, on n'écrase pas.
import { cardKey } from './storage.js';

const UNION_KEYS = ['convDone', 'readingKnown', 'badgesSeen', 'grammarDrills', 'masteredSkillsSeen', 'lessonsDone', 'textsDone'];
export const MAX_MISTAKES = 300, MAX_QUIZ = 50, MAX_EXAMS = 100;
export function unionArr(a, b){ return [...new Set([...(a || []), ...(b || [])])]; }
function mergeByKey(a, b, pick){
  const out = Object.assign({}, a || {});
  Object.entries(b || {}).forEach(([k, v]) => { out[k] = (k in out) ? pick(out[k], v) : v; });
  return out;
}
// Carte la plus récemment travaillée ; à égalité, celle qui a le plus de répétitions.
export function newerCard(x, y){
  const lx = x.last || 0, ly = y.last || 0;
  if(lx !== ly) return ly > lx ? y : x;
  return ((y.reps || 0) > (x.reps || 0) || ((y.reps || 0) === (x.reps || 0) && (y.due || 0) > (x.due || 0))) ? y : x;
}
// Phrases : clé = contenu (jp|romaji), pas l'id aléatoire. `deleted` = tombstones { cardKey: horodatage }.
export function mergePhrases(a, b, deleted){
  const del = deleted || {}, m = new Map();
  [...(a || []), ...(b || [])].forEach(c => {
    const k = cardKey(c.jp, c.romaji), o = m.get(k);
    m.set(k, o ? newerCard(o, c) : c);
  });
  return [...m.entries()].filter(([k, c]) => !(del[k] && del[k] > (c.last || c.created || 0))).map(([, c]) => c);
}
// Compteurs d'une même journée : max des nombres, union des listes.
export function mergeDay(x, y){
  const out = Object.assign({}, x, y);
  new Set([...Object.keys(x), ...Object.keys(y)]).forEach(k => {
    const u = x[k], v = y[k];
    if(Array.isArray(u) || Array.isArray(v)) out[k] = unionArr(u, v);
    else if(typeof u === 'number' || typeof v === 'number') out[k] = Math.max(+u || 0, +v || 0);
    else if(typeof u === 'boolean' || typeof v === 'boolean') out[k] = !!(u || v);
  });
  return out;
}
export function mergeMeta(a, b){
  a = a || {}; b = b || {};
  const newer = (a.lastModified || 0) >= (b.lastModified || 0) ? a : b, older = newer === a ? b : a;
  const out = Object.assign({}, older, newer);
  UNION_KEYS.forEach(k => { out[k] = unionArr(a[k], b[k]); });
  out.kanjiSrs = mergeByKey(a.kanjiSrs, b.kanjiSrs, newerCard);
  out.studyLog = mergeByKey(a.studyLog, b.studyLog, (x, y) => Math.max(x, y));
  out.deleted = mergeByKey(a.deleted, b.deleted, Math.max);
  // Notes personnelles et préférences : fusionnées clé par clé (la plus récente gagne sur une même clé), jamais écrasées en bloc.
  out.kanjiNotes = Object.assign({}, older.kanjiNotes, newer.kanjiNotes);
  out.romajiPrefs = Object.assign({}, older.romajiPrefs, newer.romajiPrefs, { pages: Object.assign({}, (older.romajiPrefs || {}).pages, (newer.romajiPrefs || {}).pages), sections: Object.assign({}, (older.romajiPrefs || {}).sections, (newer.romajiPrefs || {}).sections), words: Object.assign({}, (older.romajiPrefs || {}).words, (newer.romajiPrefs || {}).words) });
  if(!a.romajiPrefs && !b.romajiPrefs) delete out.romajiPrefs;
  if(!a.kanjiNotes && !b.kanjiNotes) delete out.kanjiNotes;
  const mist = mergeByKey(a.mistakes, b.mistakes, (x, y) => ((y.last || '') > (x.last || '')) ? y : x);
  out.mistakes = capMistakes(mist);
  const qs = {}; new Set([...Object.keys(a.quizStats || {}), ...Object.keys(b.quizStats || {})]).forEach(k => {
    const seen = new Set(), list = [];
    [...((a.quizStats || {})[k] || []), ...((b.quizStats || {})[k] || [])].forEach(e => { const j = JSON.stringify(e); if(!seen.has(j)){ seen.add(j); list.push(e); } });
    qs[k] = list.sort((x, y) => (x.date || '').localeCompare(y.date || '')).slice(-MAX_QUIZ);
  }); out.quizStats = qs;
  { const seen = new Set(), list = []; [...(a.examHistory || []), ...(b.examHistory || [])].forEach(e => { const j = JSON.stringify(e); if(!seen.has(j)){ seen.add(j); list.push(e); } }); out.examHistory = list.slice(-MAX_EXAMS); }
  out.kanaPath = { done: unionArr((a.kanaPath || {}).done, (b.kanaPath || {}).done) };
  // Séries : même dernier jour d'étude sur les deux appareils → on garde la plus longue.
  const lastA = a.lastStudyDate || '', lastB = b.lastStudyDate || '';
  const fresher = lastA >= lastB ? a : b;
  out.lastStudyDate = fresher.lastStudyDate || null;
  out.streak = lastA === lastB ? Math.max(a.streak || 0, b.streak || 0) : (fresher.streak || 0);
  // Plan du jour et kanji du jour : même date → fusion par jour ; sinon le plus récent gagne.
  ['plan', 'kanjiDaily'].forEach(k => {
    const x = a[k], y = b[k];
    if(x && y && x.date === y.date) out[k] = mergeDay(x, y);
    else if(x && y) out[k] = (x.date || '') >= (y.date || '') ? x : y;
    else if(x || y) out[k] = x || y;
  });
  out.lastModified = Math.max(a.lastModified || 0, b.lastModified || 0);
  return out;
}
// Garde les 300 erreurs les plus récentes (les maîtrisées partent en premier) : meta ne grossit pas sans fin.
export function capMistakes(m){
  const ents = Object.entries(m || {});
  if(ents.length <= MAX_MISTAKES) return m || {};
  ents.sort((x, y) => (+!!x[1].mastered - +!!y[1].mastered) || (y[1].last || '').localeCompare(x[1].last || ''));
  return Object.fromEntries(ents.slice(0, MAX_MISTAKES));
}
