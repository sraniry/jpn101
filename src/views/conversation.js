import { CONVERSATIONS } from '../../data/phrases.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';
import { planMark, registerStudyActivity, getConvDone, markConvDone } from '../storage.js';
import { celebrate } from '../encouragement.js';
import { celebrateNewBadges } from '../badges.js';

// Lecture audio d'un dialogue entier (entraînement de l'oreille) :
// les utterances TTS se mettent en file d'attente naturellement dans speechSynthesis.
let listeningId = null;
function playFullDialogue(conv){
  window.speechSynthesis.cancel();
  if(listeningId === conv.id){ listeningId = null; return; }
  listeningId = conv.id;
  conv.turns.forEach(t=>{
    if(t.speaker === 'npc') speak(t.jp, 0.85);
    else if(t.choices){ const best = t.choices.find(c=>c.quality==='best') || t.choices[0]; speak(best.jp, 0.85); }
  });
}

// ---------- conversation simulator ----------
let convState = null; // {convId, turnIdx}

// Routing direct : ouvre un dialogue précis par son id (utilisé par l'onglet Aujourd'hui)
export function openConversation(id){
  const conv = CONVERSATIONS.find(c=>c.id === id && Array.isArray(c.turns));
  if(!conv){ renderConversationList(); return; }
  convState = { convId:id, turnIdx:0 };
  renderConversationStage();
}

export function renderConversationList(){
  const area = document.getElementById('conversationArea');
  try {
    const valid = CONVERSATIONS.filter(c => c.id && Array.isArray(c.turns));
    if(valid.length === 0){
      area.innerHTML = `<div class="skills-intro" style="color:#c0392b;">⚠️ Aucun dialogue chargé (CONVERSATIONS vide ou corrompu). Fais Cmd+Shift+R pour vider le cache.</div>`;
      return;
    }
    const done = getConvDone();
    const doneHere = valid.filter(c=>done.includes(c.id)).length;
    let html = `<div class="skills-intro">Mini-dialogues guidés : choisis la réponse la plus naturelle à chaque tour. C'est de la <b>production active</b> — la façon la plus efficace de préparer une vraie conversation.</div>`;
    html += `<div class="conv-progress">
      <div class="conv-progress-head"><span><b>${doneHere}</b> / ${valid.length} dialogues terminés</span><span>${Math.round((doneHere/valid.length)*100)} %</span></div>
      <div class="today-track"><div class="today-track-fill" style="width:${(doneHere/valid.length)*100}%"></div></div>
    </div>`;
    html += `<div class="conv-list">`;
    valid.forEach(c=>{
      const isDone = done.includes(c.id);
      html += `<div class="conv-pick ${isDone?'is-done':''}" data-id="${c.id}">
        <div><h4>${isDone?'✓ ':''}${c.icon} ${escapeHtml(c.title)}</h4><p>${escapeHtml(c.level)} · ${c.turns.filter(t=>t.speaker==='user').length} prises de parole</p></div>
        <div class="conv-actions"><button class="conv-listen" data-id="${c.id}" title="Écouter le dialogue en entier">🎧</button><span class="conv-badge">${isDone?'Rejouer':'Commencer'}</span></div>
      </div>`;
    });
    html += `</div>`;
    area.innerHTML = html;
    area.querySelectorAll('.conv-pick').forEach(el=> el.addEventListener('click', ()=>{ convState = {convId: el.dataset.id, turnIdx: 0}; renderConversationStage(); }));
    area.querySelectorAll('.conv-listen').forEach(b=> b.addEventListener('click', e=>{
      e.stopPropagation();
      const conv = valid.find(c=>c.id === b.dataset.id);
      if(conv) playFullDialogue(conv);
    }));
  } catch(err) {
    area.innerHTML = `<div class="skills-intro" style="color:#c0392b;">⚠️ Erreur : ${err.message}. Fais Cmd+Shift+R pour vider le cache.</div>`;
    console.error('renderConversationList:', err);
  }
}
function renderConversationStage(){
  const area = document.getElementById('conversationArea');
  const conv = CONVERSATIONS.find(c=>c.id === convState.convId);
  const turn = conv.turns[convState.turnIdx];
  if(!turn){
    const firstTime = !getConvDone().includes(conv.id);
    planMark('conv', 1); // compteur (objectif 2/jour), plus un simple booléen
    markConvDone(conv.id);      // trace permanente : alimente la barre de progression et les badges
    registerStudyActivity();     // un dialogue terminé compte dans la série quotidienne
    // Le toast ne sort qu'à la première réussite d'un dialogue donné — le rejouer pour
    // essayer d'autres réponses (suggéré juste en dessous) ne doit pas re-déclencher le même mot.
    if(firstTime) celebrate('dialogue', { emoji:'💬', title: 'Dialogue terminé' });
    celebrateNewBadges();
    area.innerHTML = `<div class="conv-done"><div class="stamp" style="margin:0 auto 14px;">合格</div><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">Dialogue terminé !</h3><p style="color:#7a7268;font-size:13.5px;">Rejoue-le pour essayer d'autres réponses, ou choisis un autre dialogue.</p><button class="continue-btn" id="convBackBtn" style="margin-top:16px;">← Tous les dialogues</button></div>`;
    document.getElementById('convBackBtn').addEventListener('click', renderConversationList);
    return;
  }
  let html = `<div class="conv-stage-head">
    <span>${conv.icon} ${escapeHtml(conv.title)}</span>
    <span class="conv-turn-count">tour ${convState.turnIdx+1} / ${conv.turns.length}</span>
  </div>
  <div class="today-track conv-turn-track"><div class="today-track-fill" style="width:${(convState.turnIdx/conv.turns.length)*100}%"></div></div>
  <div class="conv-stage">`;
  // show prior turns as resolved bubbles
  for(let i=0;i<convState.turnIdx;i++){
    html += renderResolvedTurn(conv.turns[i], conv._chosen ? conv._chosen[i] : null);
  }
  if(turn.speaker === 'npc'){
    html += bubbleHtml('npc', turn.jp, turn.romaji, turn.fr);
    html += `</div><div class="conv-nav-row"><button class="conv-back" id="convExit">← Quitter</button><button class="continue-btn" id="convNext">Continuer</button></div>`;
    area.innerHTML = html;
    document.getElementById('convNext').addEventListener('click', ()=>{ speak(turn.jp,0.85); convState.turnIdx++; renderConversationStage(); });
    document.getElementById('convExit').addEventListener('click', renderConversationList);
    setTimeout(()=> speak(turn.jp, 0.85), 150);
  } else {
    html += `<div class="conv-choices" id="convChoices">`;
    turn.choices.forEach((ch, idx)=>{
      html += `<button class="conv-choice-btn" data-idx="${idx}"><span class="cc-jp">${escapeHtml(ch.jp)}</span>${escapeHtml(ch.romaji)} — ${escapeHtml(ch.fr)}</button>`;
    });
    html += `</div></div><div class="conv-nav-row"><button class="conv-back" id="convExit">← Quitter</button><div></div></div>`;
    area.innerHTML = html;
    document.getElementById('convExit').addEventListener('click', renderConversationList);
    area.querySelectorAll('.conv-choice-btn').forEach(b=>{
      b.addEventListener('click', ()=>{
        const ch = turn.choices[parseInt(b.dataset.idx,10)];
        speak(ch.jp, 0.85);
        const cls = ch.quality === 'best' ? 'best' : (ch.quality === 'ok' ? 'ok' : 'weak');
        const label = ch.quality === 'best' ? '✓ Le plus naturel' : (ch.quality === 'ok' ? '≈ Ça marche' : '○ Trop littéral / pas idéal');
        const fb = document.createElement('div'); fb.className = 'conv-feedback '+cls; fb.innerHTML = `<b>${label}</b><br>${escapeHtml(ch.feedback)}`;
        document.getElementById('convChoices').appendChild(fb);
        area.querySelectorAll('.conv-choice-btn').forEach(x=>x.disabled = true);
        conv._chosen = conv._chosen || {}; conv._chosen[convState.turnIdx] = ch;
        const nextBtn = document.createElement('button'); nextBtn.className='continue-btn'; nextBtn.style.marginTop='14px'; nextBtn.textContent='Continuer';
        nextBtn.addEventListener('click', ()=>{ convState.turnIdx++; renderConversationStage(); });
        document.getElementById('convChoices').appendChild(nextBtn);
      });
    });
  }
}
function bubbleHtml(who, jp, romaji, fr){
  return `<div class="bubble ${who}">${escapeHtml(jp)} <button class="bubble-audio" data-jp="${escapeHtml(jp)}">🔊</button><span class="b-romaji">${escapeHtml(romaji)}</span><span class="b-fr">${escapeHtml(fr)}</span></div>`;
}
function renderResolvedTurn(turn, chosen){
  if(turn.speaker === 'npc') return bubbleHtml('npc', turn.jp, turn.romaji, turn.fr);
  if(chosen) return bubbleHtml('user', chosen.jp, chosen.romaji, chosen.fr);
  return '';
}
