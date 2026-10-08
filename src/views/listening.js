import { phrases, registerStudyActivity, addQuizStat, bestQuizScore } from '../storage.js';
import { quizLine } from '../encouragement.js';
import { celebrateNewBadges } from '../badges.js';
import { SEED_PACK } from '../../data/phrases.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';

// ---------- Écoute : compréhension orale type JLPT + drill prix/nombres ----------
// Principe : AUCUN texte japonais visible — uniquement l'audio, comme à l'examen
// (et comme en caisse au konbini). On force le décodage auditif pur.

let listenQuiz = null; // {mode:'sens'|'prix', deck, idx, correct, answered}

function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// Pool de phrases : celles de l'utilisateur si assez nombreuses, sinon le pack complet
function phrasePool(){
  const pool = phrases.filter(p=>!p.archived && p.jp && p.fr);
  return pool.length >= 12 ? pool : SEED_PACK;
}

// Prix réalistes au Japon : konbini, resto, transport, shopping
const PRICE_BUCKETS = [
  [100,120,150,160,180,210,240,280],           // konbini : boisson, onigiri
  [350,380,420,450,500,580,650,780,880,980],   // repas simple, café
  [1000,1200,1250,1500,1800,2400,2980,3500],   // resto, cinéma, petit shopping
  [4980,5800,7500,8900,10000,12800,15000],     // vêtements, hôtel
];
function randomPrice(){
  const bucket = PRICE_BUCKETS[Math.floor(Math.random()*PRICE_BUCKETS.length)];
  return bucket[Math.floor(Math.random()*bucket.length)];
}
// Distracteurs plausibles : mêmes ordres de grandeur, confusions classiques
// (1000/10000 = sen/man, 4/7 = yon/nana, 100/1000 = hyaku/sen)
function priceDistractors(price){
  const cands = new Set();
  [price*10, Math.round(price/10), price+100, price-100, price+1000, price-1000,
   price+10, price-10, price*2, Math.round(price/2)].forEach(v=>{
    if(v>0 && v!==price && v===Math.round(v)) cands.add(v);
  });
  return shuffle([...cands]).slice(0,3);
}
const fmtYen = n => n.toLocaleString('fr-FR') + ' ¥';

function startListenQuiz(mode){
  let deck;
  if(mode === 'prix'){
    const seen = new Set();
    deck = [];
    while(deck.length < 10){ const p = randomPrice(); if(!seen.has(p)){ seen.add(p); deck.push(p); } }
  } else {
    deck = shuffle(phrasePool()).slice(0,10);
  }
  listenQuiz = { mode, deck, idx:0, correct:0, answered:false };
  renderListenQuiz();
}

function renderListenQuiz(){
  const zone = document.getElementById('listenQuizZone');
  const q = listenQuiz;
  if(q.idx >= q.deck.length){
    const pct = Math.round((q.correct/q.deck.length)*100);
    if(!q.recorded){ q.recorded = true; addQuizStat('listening', q.correct, q.deck.length); registerStudyActivity(); celebrateNewBadges(); }
    const best = bestQuizScore('listening');
    zone.innerHTML = `<div class="kana-quiz-done">
      <div class="kqd-score">${q.correct}/${q.deck.length} — ${pct}%</div>
      ${best ? `<div class="kqd-best">Ton record : ${best.correct}/${best.total} (${Math.round(best.pct*100)} %)</div>` : ''}
      <div class="kqd-msg">${pct>=90?'🎉 Oreille affûtée !':pct>=70?'👍 Bien ! Réécoute les ratés.':'💪 Normal au début — l\'oreille vient avec les répétitions.'}</div>
      <div class="kqd-teacher">${quizLine(pct)}</div>
      <button class="kana-quiz-restart" id="listenRestart">🔄 Nouvelle série</button>
    </div>`;
    document.getElementById('listenRestart').addEventListener('click', ()=> startListenQuiz(q.mode));
    return;
  }

  const isPrix = q.mode === 'prix';
  const card = q.deck[q.idx];
  const jpToSay = isPrix ? card + '円' : card.jp;
  let choices;
  if(isPrix){
    choices = shuffle([card, ...priceDistractors(card)]).map(v=>({ label: fmtYen(v), ok: v===card }));
  } else {
    const others = shuffle(phrasePool().filter(p=>p.fr!==card.fr)).slice(0,3);
    choices = shuffle([card, ...others]).map(p=>({ label: p.fr, ok: p.fr===card.fr }));
  }

  zone.innerHTML = `<div class="kana-quiz-card">
    <div class="kqc-progress">${q.idx+1} / ${q.deck.length}</div>
    <button class="listen-btn" id="listenPlay">▶ Écouter${isPrix?' le prix':''}</button>
    <div class="hint" style="margin:10px 0 14px;">${isPrix?'La caissière annonce le total — c\'est combien ?':'Que veut dire cette phrase ?'} Tu peux réécouter autant que nécessaire.</div>
    <div class="kqc-choices listen-choices">
      ${choices.map((c,i)=>`<button class="kqc-btn" data-ok="${c.ok}">${escapeHtml(c.label)}</button>`).join('')}
    </div>
    <div id="listenReveal"></div>
  </div>`;

  const play = ()=> speak(jpToSay, isPrix ? 0.95 : 0.85);
  document.getElementById('listenPlay').addEventListener('click', play);
  play();

  zone.querySelectorAll('.kqc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(q.answered) return;
      q.answered = true;
      const ok = btn.dataset.ok === 'true';
      if(ok){ btn.classList.add('correct'); q.correct++; }
      else { btn.classList.add('wrong'); zone.querySelector('[data-ok="true"]').classList.add('correct'); }
      zone.querySelectorAll('.kqc-btn').forEach(b=>b.disabled=true);
      // révélation du texte APRÈS la réponse — on relie le son à l'écrit
      const reveal = isPrix
        ? `<b>${card}円</b> — ${escapeHtml(numberHint(card))}`
        : `<b>${escapeHtml(card.jp)}</b><br><span class="rj-inline">${escapeHtml(card.romaji||'')}</span>`;
      document.getElementById('listenReveal').innerHTML = `<div class="listen-reveal">${reveal}</div><button class="continue-btn" id="listenNext" style="margin-top:12px;">Continuer</button>`;
      document.getElementById('listenNext').addEventListener('click', ()=>{ q.idx++; q.answered=false; renderListenQuiz(); });
    });
  });
}

// Décomposition d'un prix pour apprendre à le "parser" à l'oreille
function numberHint(n){
  const parts = [];
  const man = Math.floor(n/10000), sen = Math.floor((n%10000)/1000), hyaku = Math.floor((n%1000)/100), rest = n%100;
  if(man) parts.push(man+' man (×10 000)');
  if(sen) parts.push(sen+' sen (×1 000)');
  if(hyaku) parts.push(hyaku+' hyaku (×100)');
  if(rest) parts.push(''+rest);
  return parts.join(' + ') + ' en';
}

export function renderListening(){
  const area = document.getElementById('listeningArea');
  listenQuiz = null;
  area.innerHTML = `
    <div class="skills-intro">Compréhension orale <b>sans texte</b> — comme au JLPT et comme dans la vraie vie. Le texte n'apparaît qu'après ta réponse, pour relier le son à l'écrit.</div>
    <div class="kqs-row" style="margin-bottom:16px;">
      <button class="kqs-btn" id="startSens">🎧 Phrase → sens (10 questions)</button>
      <button class="kqs-btn" id="startPrix">💴 Prix & nombres (10 questions)</button>
    </div>
    <div class="kana-rule-note"><b>💴 Le boss final du konbini :</b> les nombres se construisent en base 10 000 — 万 man (10 000), 千 sen (1 000), 百 hyaku (100). « 1 250 ¥ » se dit <i>sen nihyaku gojū en</i> (mille + 2×cent + 5×dix). Pièges : 300 = san<b>b</b>yaku, 600 = ro<b>pp</b>yaku, 800 = ha<b>pp</b>yaku, 3 000 = san<b>z</b>en, 8 000 = ha<b>ss</b>en.</div>
    <div id="listenQuizZone"></div>
  `;
  document.getElementById('startSens').addEventListener('click', ()=> startListenQuiz('sens'));
  document.getElementById('startPrix').addEventListener('click', ()=> startListenQuiz('prix'));
}
