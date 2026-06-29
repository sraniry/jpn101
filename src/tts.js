import { renderShadow } from './views/shadow.js';

// ---------- robust TTS ----------
let jaVoiceFound = null, voiceProbed = false, speakStatus = null; // null | 'speaking' | 'failed'

export function probeVoices(){
  if(!('speechSynthesis' in window)){ console.warn('[TTS] speechSynthesis non disponible sur ce navigateur'); return; }
  const voices = speechSynthesis.getVoices();
  if(voices.length){
    jaVoiceFound = voices.find(v => v.lang && v.lang.toLowerCase().replace('_','-').startsWith('ja')) || null;
    voiceProbed = true;
    if(jaVoiceFound) console.log(`[TTS] Voice found: ${jaVoiceFound.name} (${jaVoiceFound.lang})`);
    else console.warn(`[TTS] No Japanese voice detected — ${voices.length} voix disponibles, aucune "ja". Langues: ${[...new Set(voices.map(v=>v.lang))].join(', ')}`);
    renderSoundBars();
  } else {
    console.log('[TTS] probeVoices: getVoices() vide pour l\'instant — en attente de onvoiceschanged');
  }
}
if('speechSynthesis' in window){
  speechSynthesis.onvoiceschanged = probeVoices;
  probeVoices();
  setTimeout(probeVoices, 300);
  setTimeout(probeVoices, 1200);
}
let ttsWarmed = false;
function warmUpTTS(){
  if(ttsWarmed || !('speechSynthesis' in window)) return;
  try{ const u = new SpeechSynthesisUtterance('あ'); u.volume = 0; speechSynthesis.speak(u); ttsWarmed = true; }catch(e){}
}
export function resetTTS(){
  try{ speechSynthesis.cancel(); }catch(e){}
  ttsWarmed = false; speakStatus = null;
  setTimeout(()=>{ probeVoices(); renderSoundBars(); }, 150);
}
export function speak(text, rate){
  if(!('speechSynthesis' in window)) return;
  warmUpTTS();
  const go = ()=>{
    const voices = speechSynthesis.getVoices();
    const ja = voices.find(v => v.lang && v.lang.toLowerCase().replace('_','-').startsWith('ja')) || null;
    jaVoiceFound = ja; voiceProbed = true;
    if(ja) console.log(`[TTS] speak("${text}") → Voice found: ${ja.name} (${ja.lang})`);
    else console.warn(`[TTS] speak("${text}") → No Japanese voice detected (${voices.length} voix), lecture avec lang=ja-JP sans voix explicite`);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP'; u.rate = rate || 1;
    if(ja) u.voice = ja;
    let started = false;
    u.onstart = ()=>{ started = true; speakStatus = 'speaking'; renderSoundBars(); };
    u.onend = ()=>{ speakStatus = null; renderSoundBars(); };
    u.onerror = ()=>{ speakStatus = 'failed'; renderSoundBars(); };
    try{
      speechSynthesis.cancel(); // toujours vider la file, même si l'état "speaking" semble faux (bug connu de Chrome après inactivité)
      setTimeout(()=>{
        try{ speechSynthesis.speak(u); }catch(e){ speakStatus='failed'; renderSoundBars(); }
        setTimeout(()=>{ if(!started){ speakStatus = 'failed'; renderSoundBars(); } }, 1200);
      }, 30);
    }catch(e){ console.error(e); speakStatus = 'failed'; renderSoundBars(); }
  };
  if(speechSynthesis.getVoices().length === 0){ speechSynthesis.onvoiceschanged = go; setTimeout(go, 250); }
  else go();
}

export function soundBarHTML(){
  let statusDot, statusText;
  if(!('speechSynthesis' in window)){ statusDot='bad'; statusText='Synthèse vocale non disponible sur ce navigateur'; }
  else if(speakStatus === 'failed'){ statusDot='bad'; statusText="Le son s'est bloqué — touche Réinitialiser ⟳"; }
  else if(voiceProbed && !jaVoiceFound){ statusDot='bad'; statusText='Aucune voix japonaise détectée'; }
  else if(jaVoiceFound){ statusDot='ok'; statusText='Voix japonaise prête'; }
  else { statusDot=''; statusText='Touche pour tester le son'; }
  return `<div class="sound-bar">
    <span><span class="dot ${statusDot}"></span>${statusText}</span>
    <span style="display:flex;gap:6px;">
      <button data-act="reset" title="Si le son se bloque après un moment d'inactivité">⟳ Réinitialiser</button>
      <button data-act="test">🔊 Tester (こんにちは)</button>
    </span>
  </div>
  <div class="sound-help ${(voiceProbed && !jaVoiceFound) || speakStatus==='failed' ?'show':''}">
    <b>Pas de son ?</b> 1) Touche d'abord ⟳ Réinitialiser (Chrome bloque parfois la voix après quelques minutes d'inactivité de l'onglet). 2) Si ça persiste : la voix japonaise est une donnée de ton <b>appareil</b>, pas de l'appli.
    <b>iPhone :</b> Réglages → Accessibilité → Contenu énoncé → Voix → ajouter une voix japonaise.
    <b>Android :</b> installe « Synthèse vocale Google » + le pack de langue japonaise.
    <b>Ordinateur :</b> ouvre l'appli dans Chrome ou Edge, et vérifie que l'onglet n'est pas en mode silencieux (clic droit sur l'onglet).
  </div>`;
}
export function wireSoundBar(el){
  if(!el) return;
  el.querySelectorAll('button[data-act=test]').forEach(b=> b.addEventListener('click', ()=> speak('こんにちは', 0.9)));
  el.querySelectorAll('button[data-act=reset]').forEach(b=> b.addEventListener('click', resetTTS));
}
export function renderSoundBars(){
  const r = document.getElementById('soundBarReview');
  const s = document.getElementById('soundBarShadow');
  const c = document.getElementById('soundBarConv');
  if(r){ r.innerHTML = soundBarHTML(); wireSoundBar(r); }
  if(s){ s.innerHTML = soundBarHTML(); wireSoundBar(s); }
  if(c){ c.innerHTML = soundBarHTML(); wireSoundBar(c); }
}

// ---------- microphone recording ----------
export let recState = { recording:false, url:null, chunks:[] };
let mediaRecorder = null, mediaStream = null;
export async function toggleRecording(){
  if(recState.recording){
    if(mediaRecorder) mediaRecorder.stop();
    return;
  }
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    alert("Ton navigateur ne permet pas l'enregistrement micro ici. Essaie dans Chrome.");
    return;
  }
  try{
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio:true });
    recState.chunks = [];
    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = e => { if(e.data.size>0) recState.chunks.push(e.data); };
    mediaRecorder.onstop = ()=>{
      const blob = new Blob(recState.chunks, { type:'audio/webm' });
      if(recState.url) URL.revokeObjectURL(recState.url);
      recState.url = URL.createObjectURL(blob);
      recState.recording = false;
      mediaStream.getTracks().forEach(t=>t.stop());
      renderShadow();
    };
    mediaRecorder.start();
    recState.recording = true;
    renderShadow();
  }catch(e){
    alert("Micro refusé ou indisponible. Autorise l'accès au micro dans les réglages du site (icône 🔒 ou caméra dans la barre d'adresse).");
  }
}
