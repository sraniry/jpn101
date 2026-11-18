import { phrases, meta, todayStr, getConvDone, getQuizStats, openMistakes, masteredMistakes, recordAnswer, registerStudyActivity, saveMeta } from '../storage.js';
import { kanjiTodayStatus } from './kanji.js';
import { badgesHtml } from '../badges.js';
import { speak } from '../tts.js';
import { LESSONS } from '../../data/lessons.js';
import { showView } from '../nav.js';
import { escapeHtml } from '../util.js';

// ---------- Mes progrès ----------
const SRC_LABEL = { kanji: 'Kanji', radical: 'Radical', menu: 'Menu', kit: 'Kyoto', word: 'Mot', kana: 'Kana', grammar: 'Grammaire', lesson: 'Leçon', phrase: 'Phrase', jlpt: 'JLPT', pitfall: 'Piège', text: 'Texte' };
const QUIZ_LABEL = { kana: 'Kana', kanji: 'Kanji N5', 'kanji-n4': 'Kanji N4', jlpt: 'JLPT N5', 'jlpt-n4': 'JLPT N4', menus: 'Menus', 'menus-guess': 'Devine le plat', 'listening-n4': 'Écoute N4' };

function lastDays(n){
  const out = []; const d = new Date();
  for(let i = n - 1; i >= 0; i--){ const x = new Date(d); x.setDate(d.getDate() - i); const p = v => String(v).padStart(2, '0'); out.push(`${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`); }
  return out;
}
function daysSince(dateStr){ if(!dateStr) return null; return Math.round((new Date(todayStr()) - new Date(dateStr)) / 86400000); }

function teacherMessage(){
  const log = meta.studyLog || {}, week = lastDays(7).filter(d => log[d]).length;
  const gap = daysSince(meta.lastStudyDate), kj = kanjiTodayStatus();
  if(!meta.lastStudyDate) return 'Bienvenue ! Ta première séance est la plus importante : 10 minutes suffisent.';
  if(gap >= 3) return `Dernière séance il y a ${gap} jours : ce n'est pas grave. Reprends doucement, commence par tes révisions du jour.`;
  if(week >= 5) return `${week} jours sur 7 cette semaine : c'est exactement la régularité qui fait avancer. Bravo.`;
  if(week >= 3) return `${week} jours étudiés cette semaine. Un jour de plus et tu as une vraie habitude.`;
  if(kj.due > 20) return `Tu as ${kj.due} cartes kanji à réviser : fais-les avant d'apprendre de nouveaux kanji.`;
  return 'Chaque petite séance compte. 10 minutes aujourd\'hui valent mieux que 2 heures dimanche.';
}

export function renderProgress(){
  const area = document.getElementById('progressArea');
  const S = meta.kanjiSrs || {}, kk = Object.entries(S).filter(([k]) => !k.startsWith('r:')), rr = Object.keys(S).filter(k => k.startsWith('r:'));
  const mature = kk.filter(([, c]) => c.interval >= 21).length;
  const log = meta.studyLog || {}, days = lastDays(30);
  const studied30 = days.filter(d => log[d]).length;
  const mastered = phrases.filter(p => p.interval >= 7 && !p.archived).length;
  const convs = getConvDone().length;

  let html = `<div class="hub-intro"><h2>Mes progrès</h2><p>${escapeHtml(teacherMessage())}</p></div>
  <div class="kj-dash">
    <div class="kj-stat"><b>${meta.streak || 0}</b><span>${(meta.streak || 0) > 1 ? 'jours' : 'jour'} d'affilée</span></div>
    <div class="kj-stat"><b>${studied30}</b><span>${studied30 > 1 ? 'jours' : 'jour'} sur 30</span></div>
    <div class="kj-stat"><b>${kk.length}</b><span>kanji vus / 2136</span></div>
    <div class="kj-stat"><b>${mature}</b><span>kanji bien ancrés</span></div>
    <div class="kj-stat"><b>${rr.length}/51</b><span>radicaux</span></div>
    <div class="kj-stat"><b>${mastered}</b><span>phrases maîtrisées</span></div>
    <div class="kj-stat"><b>${convs}</b><span>dialogues faits</span></div>
    <div class="kj-stat"><b>${(meta.lessonsDone || []).length}/${LESSONS.length}</b><span>leçons de grammaire</span></div>
  </div>
  <h4 class="kj-h">Les 30 derniers jours</h4>
  <div class="cal" role="img" aria-label="${studied30} jours étudiés sur les 30 derniers jours">${days.map(d => `<span class="cal-d ${log[d] ? (log[d] > 15 ? 'l3' : log[d] > 5 ? 'l2' : 'l1') : ''}" title="${d}${log[d] ? ' : ' + log[d] + ' actions' : ''}"></span>`).join('')}</div>
  <p class="kj-tip" style="text-align:left">Une case colorée = un jour où tu as étudié. Une case vide n'est pas un échec : on reprend, c'est tout.</p>`;

  // courbe des kanji vus (par date d'introduction)
  const byDay = {}; kk.forEach(([, c]) => { if(c.intro) byDay[c.intro] = (byDay[c.intro] || 0) + 1; });
  const dates = Object.keys(byDay).sort();
  if(dates.length >= 2){
    let acc = 0; const pts = dates.map(d => ({ d, v: (acc += byDay[d]) })), max = acc;
    const W = 300, H = 70, path = pts.map((p, i) => `${i ? 'L' : 'M'}${(i / (pts.length - 1)) * W},${H - (p.v / max) * (H - 6) - 3}`).join(' ');
    html += `<h4 class="kj-h">Kanji vus dans le temps</h4><svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="Courbe des kanji vus : ${max} au total"><path d="${path}" fill="none" stroke="var(--indigo-deep)" stroke-width="2"/></svg>`;
  }

  // scores
  const rows = Object.keys(QUIZ_LABEL).map(k => { const l = getQuizStats(k); if(!l.length) return ''; const last = l[l.length - 1], best = Math.max(...l.map(s => Math.round((s.correct / (s.total || 1)) * 100))); return `<tr><td>${QUIZ_LABEL[k]}</td><td>${Math.round((last.correct / (last.total || 1)) * 100)} %</td><td>${best} %</td><td>${l.length}</td></tr>`; }).join('');
  html += `<h4 class="kj-h">Mes scores</h4>` + (rows ? `<table class="score-table"><thead><tr><th>Quiz</th><th>Dernier</th><th>Meilleur</th><th>Fois</th></tr></thead><tbody>${rows}</tbody></table>` : `<p class="kj-tip" style="text-align:left">Pas encore de quiz terminé. Dès ton premier, tes scores apparaîtront ici.</p>`);
  html += `<h4 class="kj-h">Mes badges</h4>${badgesHtml()}`;
  area.innerHTML = html;
}

// ---------- Mes erreurs : retravailler ce qui t'a fait trébucher ----------
let rq = null; // quiz de retravail en cours
function shuffle(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

export function renderMistakes(opts){
  const area = document.getElementById('mistakesArea');
  if(rq) return renderRework(area);
  const open = openMistakes().sort((a, b) => (b.n || 0) - (a.n || 0) || (b.last || '').localeCompare(a.last || ''));
  const done = masteredMistakes().length;
  const filter = (opts && opts.src) || 'all';
  const list = filter === 'all' ? open : open.filter(e => e.src === filter);
  const srcs = [...new Set(open.map(e => e.src))];
  let html = `<div class="hub-intro"><h2>Mes erreurs</h2><p>Une erreur n'est pas un échec : c'est ce qui te dit quoi retravailler. Réussis une question 3 fois de suite et elle disparaît de la liste.</p></div>`;
  if(!open.length){
    html += `<div class="path-here"><b>${done ? `🎉 ${done} erreur${done > 1 ? 's' : ''} maîtrisée${done > 1 ? 's' : ''} !` : 'Pas encore d\'erreur enregistrée'}</b><span>${done ? 'Plus rien à retravailler pour le moment.' : 'C\'est normal au début. Dès que tu te tromperas dans un quiz, la question arrivera ici avec la bonne réponse et un conseil.'}</span></div>`;
    area.innerHTML = html; return;
  }
  html += `<div class="kj-actions"><button type="button" class="kj-big primary" id="mkRework">🎯 Retravailler (${Math.min(10, open.length)} questions)</button><button type="button" class="kj-big" id="mkTips">💡 Erreurs classiques des francophones</button></div>
    <div class="mn-styles" role="group" aria-label="Filtrer">Filtre : <button type="button" data-f="all" class="${filter === 'all' ? 'on' : ''}">Tout (${open.length})</button>${srcs.map(s => `<button type="button" data-f="${s}" class="${filter === s ? 'on' : ''}">${SRC_LABEL[s] || s} (${open.filter(e => e.src === s).length})</button>`).join('')}</div>
    <div class="mk-list">`;
  list.slice(0, 40).forEach(e => {
    html += `<div class="mk-item"><div class="mk-top"><span class="mk-src">${SRC_LABEL[e.src] || e.src}</span><span class="mk-n">${e.n} faute${e.n > 1 ? 's' : ''} · ${escapeHtml(e.last || '')}</span></div>
      <div class="mk-q">${escapeHtml(e.q)}</div>
      <div class="mk-a">✓ ${escapeHtml(e.ok)}${e.say ? ` <button type="button" class="kj-audio" data-say="${escapeHtml(e.say)}" aria-label="Écouter">🔊</button>` : ''}</div>
      ${e.chosen ? `<div class="mk-w">Ta réponse : ${escapeHtml(e.chosen)}</div>` : ''}
      ${e.explain ? `<div class="mn-explain">${escapeHtml(e.explain)}</div>` : ''}</div>`;
  });
  html += `</div>`;
  area.innerHTML = html;
  area.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', () => speak(b.dataset.say, 0.85)));
  area.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => renderMistakes({ src: b.dataset.f })));
  document.getElementById('mkRework').addEventListener('click', () => { rq = { qs: shuffle(open).slice(0, 10), i: 0, right: 0 }; renderMistakes(); });
  document.getElementById('mkTips').addEventListener('click', () => showView('tips', { tab: 'erreurs' }));
}

function renderRework(area){
  if(rq.i >= rq.qs.length){
    const r = rq; rq = null; registerStudyActivity(); saveMeta();
    area.innerHTML = `<div class="conv-done"><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${r.right} / ${r.qs.length}</h3><p style="color:#7a7268;font-size:13.5px;">${r.right === r.qs.length ? 'Tout juste ! Ces erreurs avancent vers « maîtrisées ».' : 'Chaque réponse juste rapproche une erreur de la sortie de la liste (3 d\'affilée).'}</p><button type="button" class="continue-btn" id="mkBack" style="margin-top:16px;">← Mes erreurs</button></div>`;
    document.getElementById('mkBack').addEventListener('click', () => renderMistakes());
    return;
  }
  const e = rq.qs[rq.i], choices = shuffle(e.choices || [e.ok]);
  area.innerHTML = `<div class="kj-top"><button type="button" class="conv-back" id="mkQuit">← Quitter</button><span>${rq.i + 1} / ${rq.qs.length}</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(rq.i / rq.qs.length) * 100}%"></div></div>
    <div class="kj-card"><p class="mn-q">${escapeHtml(e.q)}</p><div class="kj-choices">${choices.map(c => `<button type="button" class="kj-choice" data-c="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}</div><div id="mkFb" aria-live="polite"></div></div>`;
  document.getElementById('mkQuit').addEventListener('click', () => { rq = null; renderMistakes(); });
  area.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.c === e.ok;
    area.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === e.ok) x.classList.add('ok'); });
    if(!ok) b.classList.add('ko'); else rq.right++;
    recordAnswer(e.src, e.key, ok, ok ? e : { q: e.q, ok: e.ok, choices: e.choices, explain: e.explain, say: e.say, chosen: b.dataset.c });
    saveMeta();
    document.getElementById('mkFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ Pas tout à fait'}</div>${e.explain ? `<div class="mn-explain">${escapeHtml(e.explain)}</div>` : ''}<button type="button" class="continue-btn" id="mkNext">Continuer</button>`;
    document.getElementById('mkNext').addEventListener('click', () => { rq.i++; renderMistakes(); });
    if(e.say) speak(e.say, 0.85);
  }));
}
