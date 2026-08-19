import { phrases, existingKeySet, cardKey, newCard, savePhrases, registerStudyActivity,
         getReadingKnown, markReadingKnown, unmarkReadingKnown, addQuizStat, bestQuizScore } from '../storage.js';
import { READING_GROUPS } from '../../data/phrases.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';
import { refreshCounters } from '../main.js';
import { quizLine } from '../encouragement.js';
import { celebrateNewBadges } from '../badges.js';

const READING_ALL = READING_GROUPS.flatMap(g => g.items);

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

let readingQuiz = null; // { deck, idx, correct }

// ---------- reading / signs ----------
export function renderReading(){
  readingQuiz = null;
  renderGrid();
}

// État persistant du bouton de groupe : reflète ce qui est RÉELLEMENT dans les révisions,
// pas une confirmation transitoire qu'on oublie 2 secondes plus tard.
function groupAddLabel(items){
  const existing = existingKeySet();
  const addedCount = items.filter(it => existing.has(cardKey(it.jp, it.romaji))).length;
  if(addedCount === 0) return { label:'+ Ajouter à mes révisions', state:'none' };
  if(addedCount === items.length) return { label:'✓ Déjà dans tes révisions', state:'all' };
  return { label:`+ Ajouter le reste (${items.length-addedCount})`, state:'partial' };
}

function renderGrid(){
  const area = document.getElementById('readingArea');
  const known = getReadingKnown();
  let html = `<div class="read-intro">Tu as dit « parler avant lire » — mais certains mots, tu dois les <b>reconnaître</b> sans hésiter pour survivre : toilettes, gauche/droite, entrée/sortie, interdit. Touche un panneau pour l'entendre, ou ajoute un groupe à tes révisions pour les ancrer.</div>`;
  html += `<button class="continue-btn" id="readingQuizStart" style="margin-bottom:16px;">🎯 Quiz : reconnaître les panneaux (20 questions)</button>`;
  READING_GROUPS.forEach((g, gi)=>{
    const st = groupAddLabel(g.items);
    html += `<div class="read-group">
      <div class="rg-head"><h3>${g.icon} ${g.title}</h3><button class="rg-add ${st.state==='all'?'is-added':''}" data-group="${gi}" ${st.state==='all'?'disabled':''}>${st.label}</button></div>
      <div class="sign-grid">`;
    g.items.forEach(it=>{
      const isKnown = known.includes(it.jp);
      html += `<div class="sign-card ${isKnown?'is-known':''}" data-jp="${escapeHtml(it.jp)}">
        ${isKnown ? `<button class="sign-known-badge" data-unmark="${escapeHtml(it.jp)}" title="Remettre dans le quiz">✓ connu</button>` : ''}
        <div class="sc-jp">${escapeHtml(it.jp)}</div>
        <div class="sc-romaji">${escapeHtml(it.romaji)}</div>
        <div class="sc-fr">${escapeHtml(it.fr)}</div>
        ${it.note?`<div class="sc-note">${escapeHtml(it.note)}</div>`:''}
      </div>`;
    });
    html += `</div></div>`;
  });
  area.innerHTML = html;
  area.querySelectorAll('.sign-card').forEach(c=> c.addEventListener('click', e=>{
    if(e.target.closest('.sign-known-badge')) return;
    speak(c.dataset.jp, 0.8);
  }));
  area.querySelectorAll('.sign-known-badge').forEach(b=> b.addEventListener('click', e=>{
    e.stopPropagation();
    unmarkReadingKnown(b.dataset.unmark);
    renderGrid();
  }));
  area.querySelectorAll('.rg-add').forEach(b=>{
    b.addEventListener('click', async ()=>{
      const g = READING_GROUPS[parseInt(b.dataset.group,10)];
      const existing = existingKeySet(); let added = 0;
      g.items.forEach(it=>{
        const key = cardKey(it.jp, it.romaji);
        if(existing.has(key)) return;
        phrases.push(newCard(it.jp, it.romaji, it.fr, it.note||'', 'panneaux', 'lecture'));
        existing.add(key); added++;
      });
      if(added>0) await savePhrases();
      // refreshCounters() met à jour le badge/stats globaux ; renderGrid() reconstruit CE
      // panneau pour que le bouton affiche l'état réel et durable (« ✓ Déjà dans tes
      // révisions »), plutôt qu'une confirmation qui s'efface après 2 secondes sans rien dire
      // de l'état actuel.
      refreshCounters();
      renderGrid();
    });
  });
  document.getElementById('readingQuizStart').addEventListener('click', startReadingQuiz);
}

// ---------- Quiz : reconnaître le panneau (jp → sens) ----------
// Les panneaux marqués « connus » sont exclus du tirage, pour ne pas revoir en boucle
// ce qu'elle maîtrise déjà — exactement la demande initiale.
function startReadingQuiz(){
  const known = getReadingKnown();
  const pool = READING_ALL.filter(it => !known.includes(it.jp));
  if(pool.length === 0){
    const area = document.getElementById('readingArea');
    area.innerHTML = `<div class="kana-rule-note">Tous les panneaux sont marqués « connus » — bravo ! <button class="continue-btn" id="readingQuizReset" style="margin-top:10px;">← Retour</button></div>`;
    document.getElementById('readingQuizReset').addEventListener('click', renderGrid);
    return;
  }
  readingQuiz = { deck: shuffle(pool).slice(0, Math.min(20, pool.length)), idx:0, correct:0 };
  renderReadingQuizCard();
}

function renderReadingQuizCard(){
  const area = document.getElementById('readingArea');
  const q = readingQuiz;
  if(q.idx >= q.deck.length){
    const pct = Math.round((q.correct/q.deck.length)*100);
    if(!q.recorded){ q.recorded = true; addQuizStat('reading', q.correct, q.deck.length); registerStudyActivity(); celebrateNewBadges(); }
    const best = bestQuizScore('reading');
    area.innerHTML = `<div class="kana-quiz-done">
      <div class="kqd-score">${q.correct}/${q.deck.length} — ${pct}%</div>
      ${best ? `<div class="kqd-best">Ton record : ${best.correct}/${best.total} (${Math.round(best.pct*100)} %)</div>` : ''}
      <div class="kqd-msg">${pct>=90?'🎉 Tu reconnais les panneaux au premier coup d\'œil !':pct>=70?'👍 Bien parti.':'💪 Continue, ça vient vite avec la répétition.'}</div>
      <div class="kqd-teacher">${quizLine(pct)}</div>
      <button class="kana-quiz-restart" id="readingQuizEnd">← Retour aux panneaux</button>
    </div>`;
    document.getElementById('readingQuizEnd').addEventListener('click', renderGrid);
    return;
  }
  const card = q.deck[q.idx];
  const others = shuffle(READING_ALL.filter(it=>it.fr!==card.fr)).slice(0,3);
  const choices = shuffle([card, ...others]);
  area.innerHTML = `<div class="kana-quiz-card">
    <div class="kqc-progress">${q.idx+1} / ${q.deck.length}</div>
    <div class="kqc-question is-kana" data-jp="${escapeHtml(card.jp)}">${escapeHtml(card.jp)}</div>
    <div class="kqc-choices">${choices.map(c=>`<button class="kqc-btn" data-correct="${c.fr===card.fr}">${escapeHtml(c.fr)}</button>`).join('')}</div>
    <div id="readingQuizReveal"></div>
  </div>`;
  area.querySelector('.kqc-question').addEventListener('click', ()=> speak(card.jp, 0.8));
  area.querySelectorAll('.kqc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const ok = btn.dataset.correct === 'true';
      if(ok){ btn.classList.add('correct'); q.correct++; }
      else { btn.classList.add('wrong'); area.querySelector('[data-correct="true"]').classList.add('correct'); }
      area.querySelectorAll('.kqc-btn').forEach(b=>b.disabled=true);
      speak(card.jp, 0.8);
      area.querySelector('#readingQuizReveal').innerHTML = `
        <div class="listen-reveal"><b>${escapeHtml(card.jp)}</b> — ${escapeHtml(card.romaji)}${card.note?`<br>${escapeHtml(card.note)}`:''}</div>
        <div class="reading-quiz-actions">
          <button class="continue-btn" id="readingQuizNext">Continuer</button>
          <button class="archive-btn" id="readingQuizKnown">🎓 Je connais déjà — ne plus revoir</button>
        </div>`;
      document.getElementById('readingQuizNext').addEventListener('click', ()=>{ q.idx++; renderReadingQuizCard(); });
      document.getElementById('readingQuizKnown').addEventListener('click', ()=>{
        markReadingKnown(card.jp);
        q.idx++; renderReadingQuizCard();
      });
    });
  });
}
