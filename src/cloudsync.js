// ---------- Synchronisation cloud (Firestore) — optionnelle, activée par un code personnel ----------
// Design volontairement sans compte : un "code personnel" tapé une fois dans Mes phrases sert
// de clé du document Firestore (collection "progress", doc = ce code). L'authentification anonyme
// Firebase n'est là que pour satisfaire des règles de sécurité minimales (request.auth != null) —
// la vraie protection reste le code lui-même : à traiter comme un mot de passe, ne pas le partager.
// Tant qu'aucun code n'est renseigné, ce module ne fait strictement rien (aucun appel réseau).

import { phrases, meta, storageSet, loadAll, nowTs, cardKey } from './storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyBXm8d0Q4Y3225jz1h_5GPRoxIbZ6HlvM4",
  authDomain: "jpn101.firebaseapp.com",
  projectId: "jpn101",
  storageBucket: "jpn101.firebasestorage.app",
  messagingSenderId: "236647269316",
  appId: "1:236647269316:web:baefabac32c88c293eda91"
};

const SYNC_CODE_KEY = 'syncCode-v1';
const FIREBASE_APP_SDK = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
const FIRESTORE_SDK = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
const AUTH_SDK = 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

let fb = null;        // { doc, getDoc, setDoc, serverTimestamp, db } une fois chargé
let fbReadyPromise = null;
let pushTimer = null;
let syncReady = false;   // tant que le premier pull n'est pas fini, aucun push (sinon un appareil en retard écrase le cloud)
let fbLastError = null; // dernier message d'erreur Firebase, pour l'afficher à l'utilisatrice

export function getSyncCode(){
  try { return (localStorage.getItem(SYNC_CODE_KEY) || '').trim(); } catch(e){ return ''; }
}
export function setSyncCode(code){
  try { localStorage.setItem(SYNC_CODE_KEY, (code||'').trim()); } catch(e){}
}
export function isSyncConfigured(){ return !!getSyncCode(); }

async function ensureFirebase(){
  if(fbReadyPromise) return fbReadyPromise;
  fbReadyPromise = (async () => {
    try {
      const [{ initializeApp }, { getFirestore, doc, getDoc, setDoc, serverTimestamp }, { getAuth, signInAnonymously }] =
        await Promise.all([ import(FIREBASE_APP_SDK), import(FIRESTORE_SDK), import(AUTH_SDK) ]);
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      await signInAnonymously(auth);
      const db = getFirestore(app);
      fb = { doc, getDoc, setDoc, serverTimestamp, db };
      return fb;
    } catch(e) {
      console.error('Firebase indisponible :', e);
      fbLastError = (e && e.message) ? e.message : String(e);
      fb = null;
      return null;
    }
  })();
  return fbReadyPromise;
}

function docRef(f, code){ return f.doc(f.db, 'progress', code); }

// ---------- Indicateur visuel (bloc "Mes phrases") ----------
// detail : message d'erreur réel (Firebase/Firestore), affiché en title (survol) et dans
// le texte sous le champ — sans lui, "⚠️ Erreur de synchronisation" ne dit jamais pourquoi,
// impossible à diagnostiquer (navigation privée ? bloqueur de pub ? réseau ?).
function setIndicator(state, detail){
  const el = document.getElementById('cloudSyncIndicator');
  if(!el) return;
  const map = {
    unconfigured: ['⚠️ Pas encore configuré', 'cs-warn'],
    syncing:      ['🔄 Synchronisation…',      'cs-syncing'],
    synced:       ['☁️ Synchronisé',            'cs-ok'],
    error:        ['⚠️ Erreur de synchronisation', 'cs-error'],
  };
  const [label, cls] = map[state] || ['', ''];
  el.textContent = label;
  el.className = 'cloud-sync-indicator ' + cls;
  el.title = detail || '';
  const status = document.getElementById('syncCodeStatus');
  if(status && state === 'error'){
    status.textContent = detail
      ? `⚠️ ${detail} — vérifie que tu n'es pas en navigation privée et qu'aucun bloqueur de pub ne filtre google/gstatic.`
      : `⚠️ Erreur inconnue — vérifie ta connexion, la navigation privée, ou un bloqueur de pub qui filtrerait Google.`;
  }
}
export function updateSyncIndicator(){
  setIndicator(isSyncConfigured() ? 'synced' : 'unconfigured');
}

// ---------- Push (écriture en arrière-plan, jamais bloquant pour l'UI) ----------
export async function pushToCloud(){
  const code = getSyncCode();
  if(!code) return;
  setIndicator('syncing');
  const f = await ensureFirebase();
  if(!f){ setIndicator('error', fbLastError); return; }
  try {
    await f.setDoc(docRef(f, code), {
      phrases,
      meta,
      lastModified: meta.lastModified || nowTs(),
      updatedAt: f.serverTimestamp(),
    });
    setIndicator('synced');
  } catch(e) {
    console.error('Push cloud échoué :', e);
    setIndicator('error', e && e.message);
  }
}

// Débounce : une sauvegarde locale déclenche un push groupé 1,5 s plus tard,
// pour ne pas spammer Firestore si plusieurs cartes sont notées coup sur coup.
export function schedulePush(){
  if(!isSyncConfigured() || !syncReady) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushToCloud(); }, 1500);
}

// ---------- Pull + FUSION au démarrage ----------
// Avant : « la version la plus récente écrase tout » → un appareil neuf ou resté hors-ligne pouvait
// effacer la progression des autres. Maintenant on FUSIONNE : rien n'est perdu.
const UNION_KEYS = ['convDone', 'readingKnown', 'badgesSeen', 'grammarDrills', 'masteredSkillsSeen', 'lessonsDone', 'textsDone'];
function unionArr(a, b){ return [...new Set([...(a || []), ...(b || [])])]; }
function mergeByKey(a, b, pick){
  const out = Object.assign({}, a || {});
  Object.entries(b || {}).forEach(([k, v]) => { out[k] = (k in out) ? pick(out[k], v) : v; });
  return out;
}
export function mergePhrases(a, b){
  // Clé = contenu de la carte (jp|romaji), pas l'id aléatoire : le pack importé sur deux appareils ne doit pas être doublé.
  const m = new Map();
  [...(a || []), ...(b || [])].forEach(c => {
    const k = cardKey(c.jp, c.romaji), o = m.get(k);
    if(!o){ m.set(k, c); return; }
    const better = (c.reps || 0) > (o.reps || 0) || ((c.reps || 0) === (o.reps || 0) && (c.due || 0) > (o.due || 0));
    m.set(k, better ? c : o);
  });
  return [...m.values()];
}
export function mergeMeta(a, b){
  a = a || {}; b = b || {};
  const newer = (a.lastModified || 0) >= (b.lastModified || 0) ? a : b, older = newer === a ? b : a;
  const out = Object.assign({}, older, newer);
  UNION_KEYS.forEach(k => { out[k] = unionArr(a[k], b[k]); });
  out.kanjiSrs = mergeByKey(a.kanjiSrs, b.kanjiSrs, (x, y) => ((y.reps || 0) > (x.reps || 0) || ((y.reps || 0) === (x.reps || 0) && (y.due || 0) > (x.due || 0))) ? y : x);
  out.studyLog = mergeByKey(a.studyLog, b.studyLog, (x, y) => Math.max(x, y));
  out.mistakes = mergeByKey(a.mistakes, b.mistakes, (x, y) => ((y.last || '') > (x.last || '')) ? y : x);
  const qs = {}; new Set([...Object.keys(a.quizStats || {}), ...Object.keys(b.quizStats || {})]).forEach(k => {
    const seen = new Set(), list = [];
    [...((a.quizStats || {})[k] || []), ...((b.quizStats || {})[k] || [])].forEach(e => { const j = JSON.stringify(e); if(!seen.has(j)){ seen.add(j); list.push(e); } });
    qs[k] = list.sort((x, y) => (x.date || '').localeCompare(y.date || '')).slice(-50);
  }); out.quizStats = qs;
  { const seen = new Set(), list = []; [...(a.examHistory || []), ...(b.examHistory || [])].forEach(e => { const j = JSON.stringify(e); if(!seen.has(j)){ seen.add(j); list.push(e); } }); out.examHistory = list.slice(-100); }
  out.kanaPath = { done: unionArr((a.kanaPath || {}).done, (b.kanaPath || {}).done) };
  const lastA = a.lastStudyDate || '', lastB = b.lastStudyDate || '';
  const fresher = lastA >= lastB ? a : b;
  out.lastStudyDate = fresher.lastStudyDate || null; out.streak = fresher.streak || 0;
  out.lastModified = Math.max(a.lastModified || 0, b.lastModified || 0);
  return out;
}
function isEmptyLocal(){
  return phrases.length === 0 && !Object.keys(meta.kanjiSrs || {}).length && !(meta.convDone || []).length && !meta.lastStudyDate;
}

export async function pullAndMerge(){
  const code = getSyncCode();
  if(!code) return false;
  setIndicator('syncing');
  const f = await ensureFirebase();
  if(!f){ setIndicator('error', fbLastError); return false; }
  try {
    const snap = await f.getDoc(docRef(f, code));
    const emptyBefore = isEmptyLocal();
    if(!snap.exists()){
      if(!emptyBefore) await pushToCloud();   // jamais d'écrasement du cloud par un état vide
      else setIndicator('synced');
      return false;
    }
    const remote = snap.data();
    if(emptyBefore){
      // Appareil neuf : on adopte simplement le cloud, sans rien pousser.
      await storageSet('phrases-v2', JSON.stringify(remote.phrases || []));
      await storageSet('meta-v2', JSON.stringify(remote.meta || {}));
      await loadAll();
      setIndicator('synced');
      return true;
    }
    const mergedPhrases = mergePhrases(phrases, remote.phrases);
    const mergedMeta = mergeMeta(meta, remote.meta);
    await storageSet('phrases-v2', JSON.stringify(mergedPhrases));
    await storageSet('meta-v2', JSON.stringify(mergedMeta));
    await loadAll();
    await pushToCloud();   // le cloud reçoit la fusion
    return true;
  } catch(e) {
    console.error('Pull cloud échoué :', e);
    setIndicator('error', e && e.message);
    return false;
  }
}

// Écoute les sauvegardes locales (émises par storage.js) pour déclencher un push —
// enregistré une seule fois, ne fait rien tant qu'aucun code n'est configuré.
window.addEventListener('nihongo:changed', schedulePush);

// ---------- Câblage du champ "code personnel" dans Mes phrases ----------
export function initCloudSyncUI(){
  const input = document.getElementById('syncCodeInput');
  const btn = document.getElementById('syncCodeSaveBtn');
  const status = document.getElementById('syncCodeStatus');
  if(!input || !btn) return;
  input.value = getSyncCode();
  updateSyncIndicator();
  btn.addEventListener('click', async () => {
    const code = input.value.trim();
    if(!code){ status.textContent = 'Entre un code non vide.'; return; }
    setSyncCode(code);
    status.textContent = 'Code enregistré — synchronisation en cours…';
    updateSyncIndicator();
    await pullAndMerge();
    status.textContent = 'Prêt. Tes appareils avec ce même code resteront synchronisés automatiquement.';
  });
}

// ---------- Appelé une fois au démarrage de l'app (après le chargement local) ----------
export async function initCloudSync(){
  updateSyncIndicator();
  if(!isSyncConfigured()){ syncReady = true; return false; }
  // Le premier rendu part du local ; le résultat de la fusion déclenche un nouveau rendu (voir main.js).
  try{ return await pullAndMerge(); } finally { syncReady = true; }
}
