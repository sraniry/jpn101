const STORAGE_KEY = 'phrases-v2';
const META_KEY = 'meta-v2';

export let phrases = [];
export let meta = { streak:0, lastStudyDate:null, newIntroducedDate:null, newIntroducedCount:0, dailyLimit:40 };

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
export async function loadAll(){
  try{ const v = await storageGet(STORAGE_KEY); phrases = v ? JSON.parse(v) : []; }catch(e){ phrases = []; }
  try{ const v2 = await storageGet(META_KEY); if(v2) meta = Object.assign(meta, JSON.parse(v2)); }catch(e){}
}
export async function savePhrases(){ await storageSet(STORAGE_KEY, JSON.stringify(phrases)); }
export async function saveMeta(){ await storageSet(META_KEY, JSON.stringify(meta)); }

export function nowTs(){ return Date.now(); }
export function todayStr(){ return new Date().toISOString().slice(0,10); }
export function daysToMs(d){ return d*24*60*60*1000; }

export function updateStreak(){
  const today = todayStr();
  if(meta.lastStudyDate && meta.lastStudyDate !== today){
    const diff = (new Date(today) - new Date(meta.lastStudyDate)) / 86400000;
    if(diff > 1.5) meta.streak = 0;
  }
  document.getElementById('streakBadge').textContent = '🔥 ' + (meta.streak||0) + ' jour' + (meta.streak===1?'':'s');
}
export function registerStudyActivity(){
  const today = todayStr();
  if(meta.lastStudyDate !== today){
    meta.streak = (meta.lastStudyDate && (new Date(today)-new Date(meta.lastStudyDate))/86400000 <= 1.5) ? (meta.streak||0)+1 : 1;
    meta.lastStudyDate = today; saveMeta();
    document.getElementById('streakBadge').textContent = '🔥 ' + meta.streak + ' jour' + (meta.streak===1?'':'s');
  }
}

export function newCard(jp, romaji, fr, note, tag, level){
  return { id:'c'+Math.random().toString(36).slice(2,10), jp, romaji, fr, note:note||'', tag:(tag||'général').toLowerCase(), level:level||'',
    interval:0, ease:2.5, reps:0, due:nowTs(), shadowReps:0, created:nowTs(), archived:false };
}

export function rate(card, grade){
  if(grade === 0){ card.interval = 0; card.ease = Math.max(1.3, card.ease-0.2); card.due = nowTs()+1000*60*10; }
  else if(grade === 1){ card.interval = Math.max(1, Math.round(card.interval*1.2)||1); card.due = nowTs()+daysToMs(card.interval); }
  else if(grade === 2){ card.interval = card.reps===0?1:(card.reps===1?3:Math.round(card.interval*card.ease)); card.due = nowTs()+daysToMs(card.interval); }
  else if(grade === 3){ card.ease = Math.min(3, card.ease+0.15); card.interval = card.reps===0?4:Math.round(card.interval*card.ease*1.3); card.due = nowTs()+daysToMs(card.interval); }
  card.reps += 1;
}
export function archiveCard(card, archived){
  card.archived = archived;
  if(archived){ card.due = nowTs() + daysToMs(36500); } // ~100 ans : sort des révisions sans supprimer la donnée
  else { card.due = nowTs(); }
}

export function getDueAll(){ return phrases.filter(p => p.due <= nowTs() && !p.archived); }

const LEVEL_ORDER = { 'A0':0, 'A1':1, 'A2':2, 'B1':3 };
function levelRank(level){ return LEVEL_ORDER.hasOwnProperty(level) ? LEVEL_ORDER[level] : 99; }

export function buildQueue(){
  const today = todayStr();
  if(meta.newIntroducedDate !== today){ meta.newIntroducedDate = today; meta.newIntroducedCount = 0; saveMeta(); }
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
  if(!meta.plan || meta.plan.date !== today){ meta.plan = { date:today, kana:false, reviews:0, conv:false }; saveMeta(); }
  return meta.plan;
}
export function planMark(field, inc){
  const p = planToday();
  if(typeof inc === 'number') p[field] = (p[field]||0) + inc;
  else p[field] = true;
  saveMeta();
}

export function existingKeySet(){ return new Set(phrases.map(p => (p.jp+'|'+p.romaji).toLowerCase())); }

export function removePhrase(id){ phrases = phrases.filter(p => p.id !== id); }

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

// Importe un fichier .json exporté et restaure toute la progression.
export async function importProgressionJSON(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if(!data.phrases || !Array.isArray(data.phrases)) throw new Error('Format invalide.');
        await storageSet(STORAGE_KEY, JSON.stringify(data.phrases));
        if(data.meta) await storageSet(META_KEY, JSON.stringify(data.meta));
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
