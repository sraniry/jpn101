// ---------- Synchronisation cloud (Firestore) — optionnelle, activée par un code personnel ----------
// Design volontairement sans compte : un "code personnel" tapé une fois dans Mes phrases sert
// de clé du document Firestore (collection "progress", doc = ce code). L'authentification anonyme
// Firebase n'est là que pour satisfaire des règles de sécurité minimales (request.auth != null) —
// la vraie protection reste le code lui-même : à traiter comme un mot de passe, ne pas le partager.
// Tant qu'aucun code n'est renseigné, ce module ne fait strictement rien (aucun appel réseau).

import { phrases, meta, storageSet, loadAll, nowTs } from './storage.js';

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
  if(!isSyncConfigured()) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { pushToCloud(); }, 1500);
}

// ---------- Pull + fusion au démarrage (la version la plus récente gagne) ----------
export async function pullAndMerge(){
  const code = getSyncCode();
  if(!code) return;
  setIndicator('syncing');
  const f = await ensureFirebase();
  if(!f){ setIndicator('error', fbLastError); return; }
  try {
    const snap = await f.getDoc(docRef(f, code));
    if(!snap.exists()){
      // Rien sur le cloud pour ce code : on initialise avec la version locale actuelle.
      await pushToCloud();
      return;
    }
    const remote = snap.data();
    const remoteTs = remote.lastModified || 0;
    const localTs = meta.lastModified || 0;
    if(remoteTs > localTs){
      await storageSet('phrases-v2', JSON.stringify(remote.phrases || []));
      await storageSet('meta-v2', JSON.stringify(remote.meta || {}));
      await loadAll();
    } else if(localTs > remoteTs){
      await pushToCloud();
      return; // pushToCloud met déjà l'indicateur à jour
    }
    setIndicator('synced');
  } catch(e) {
    console.error('Pull cloud échoué :', e);
    setIndicator('error', e && e.message);
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
  if(!isSyncConfigured()) return;
  // Garde-fou : le premier rendu ne doit jamais attendre le réseau plus de 4 s.
  await Promise.race([ pullAndMerge(), new Promise(resolve => setTimeout(resolve, 4000)) ]);
}
