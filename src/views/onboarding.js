import { phrases, meta, saveMeta } from '../storage.js';
import { importSeed } from './manage.js';
import { speak } from '../tts.js';
import { showView } from '../nav.js';
import { escapeHtml } from '../util.js';

// ---------- Accueil en 3 étapes (une seule fois) ----------
const GOALS = [['kyoto', '🏯', 'Vivre à Kyoto au quotidien'], ['lire', '🍜', 'Lire kanji et menus'], ['jlpt', '🎓', 'Préparer le JLPT'], ['tout', '🌸', 'Un peu de tout']];
const LEVELS = [['zero', 'Je pars de zéro'], ['kana', 'Je connais les kana'], ['kanji', 'J\'ai déjà quelques kanji']];
const TIMES = [[10, '10 min'], [20, '20 min'], [45, '45 min']];

export function maybeShowOnboarding(){
  if(meta.onboarded) return;
  // Une utilisatrice existante n'a pas besoin de l'accueil : on la considère comme déjà accueillie.
  if(phrases.length > 0 || meta.lastStudyDate || Object.keys(meta.kanjiSrs || {}).length){ meta.onboarded = true; saveMeta(false); return; }
  show();
}
export function reopenOnboarding(){ show(); }

function show(){
  const box = document.getElementById('onboarding'); if(!box) return;
  const st = { step: 1, goal: meta.goal || 'kyoto', level: 'zero', minutes: meta.minutes || 20, romaji: true };
  box.hidden = false;
  const prevFocus = document.activeElement;
  const close = () => { box.hidden = true; box.innerHTML = ''; box.onkeydown = null; if(prevFocus && prevFocus.focus) prevFocus.focus(); };
  // Modale accessible : Échap ferme (= « Passer »), Tab reste dans la fenêtre.
  box.onkeydown = e => {
    if(e.key === 'Escape'){ meta.onboarded = true; saveMeta(); close(); return; }
    if(e.key !== 'Tab') return;
    const f = [...box.querySelectorAll('button, input')].filter(x => !x.disabled); if(!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  };
  const render = () => {
    const dots = `<div class="ob-dots" aria-hidden="true">${[1, 2, 3].map(i => `<span class="${i === st.step ? 'on' : ''}"></span>`).join('')}</div>`;
    let body = '';
    if(st.step === 1){
      body = `<h2>Bienvenue ! 🌸</h2><p class="ob-promise">20 minutes par jour : tu lis les kana en 2 semaines et tu commandes au café en 1 mois.</p><p><b>Quel est ton objectif principal ?</b></p>
        <div class="ob-choices">${GOALS.map(([id, ic, l]) => `<button type="button" class="ob-choice ${st.goal === id ? 'on' : ''}" data-goal="${id}">${ic} ${escapeHtml(l)}</button>`).join('')}</div>`;
    } else if(st.step === 2){
      body = `<h2>Ton niveau et ton temps</h2><p><b>Où en es-tu ?</b></p>
        <div class="ob-choices">${LEVELS.map(([id, l]) => `<button type="button" class="ob-choice ${st.level === id ? 'on' : ''}" data-level="${id}">${escapeHtml(l)}</button>`).join('')}</div>
        <p><b>Combien de temps par jour ?</b></p><div class="ob-choices row">${TIMES.map(([m, l]) => `<button type="button" class="ob-choice ${st.minutes === m ? 'on' : ''}" data-min="${m}">${l}</button>`).join('')}</div>
        <label class="ob-check"><input type="checkbox" id="obRomaji" ${st.romaji ? 'checked' : ''}> Afficher le romaji (lettres latines) sous le japonais</label>`;
    } else {
      body = `<h2>Dernière étape</h2><p>On prépare ton espace : les phrases de base A0-A1 sont ajoutées automatiquement, rien à importer.</p>
        <p><b>Teste le son :</b> tu dois entendre une voix japonaise.</p><button type="button" class="kj-subnav-btn" id="obSound">🔊 Écouter « こんにちは »</button>
        <p class="ob-small">Pas de son ? Active le son de ton appareil ou essaie Safari. Tu pourras refaire le test plus tard.</p>
        <p class="ob-small">Tu pourras choisir une heure de rappel dans l'écran Aujourd'hui (calendrier).</p>`;
    }
    box.innerHTML = `<div class="ob-card">${dots}${body}<div class="ob-actions">${st.step > 1 ? '<button type="button" class="conv-back" id="obPrev">← Retour</button>' : '<button type="button" class="kj-link" id="obSkip">Passer</button>'}<button type="button" class="continue-btn" id="obNext">${st.step < 3 ? 'Suivant' : 'Commencer ma première leçon'}</button></div></div>`;
    box.querySelectorAll('[data-goal]').forEach(b => b.addEventListener('click', () => { st.goal = b.dataset.goal; render(); }));
    box.querySelectorAll('[data-level]').forEach(b => b.addEventListener('click', () => { st.level = b.dataset.level; render(); }));
    box.querySelectorAll('[data-min]').forEach(b => b.addEventListener('click', () => { st.minutes = +b.dataset.min; render(); }));
    const ro = box.querySelector('#obRomaji'); if(ro) ro.addEventListener('change', () => { st.romaji = ro.checked; });
    const snd = box.querySelector('#obSound'); if(snd) snd.addEventListener('click', () => speak('こんにちは', 0.85));
    const prev = box.querySelector('#obPrev'); if(prev) prev.addEventListener('click', () => { st.step--; render(); });
    const skip = box.querySelector('#obSkip'); if(skip) skip.addEventListener('click', () => { meta.onboarded = true; saveMeta(); close(); });
    box.querySelector('#obNext').addEventListener('click', async () => {
      if(st.step < 3){ st.step++; render(); return; }
      meta.onboarded = true; meta.goal = st.goal; meta.minutes = st.minutes; meta.level = st.level;
      if(st.level !== 'zero') meta.kanjiPhase = 'kanji';
      meta.romajiPrefs = Object.assign({ pages: {}, sections: {}, words: {} }, meta.romajiPrefs || {}, { global: st.romaji });
      await saveMeta();
      await importSeed(['A0', 'A1']);
      close(); window.dispatchEvent(new CustomEvent('nihongo:changed'));
      showView(st.level === 'zero' ? 'kana' : 'today');
    });
    box.querySelector('#obNext').focus();
  };
  render();
}
