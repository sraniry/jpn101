import { phrases, meta, getConvDone, getQuizStats } from '../storage.js';
import { kanaPathState } from './kana.js';
import { kanjiTodayStatus } from './kanji.js';
import { CONVERSATIONS, CORE_SET } from '../../data/phrases.js';
import { LESSONS } from '../../data/lessons.js';
import { showView } from '../nav.js';
import { escapeHtml } from '../util.js';

// ---------- Mon parcours : la carte du chemin, avec « tu es ici » ----------
// Pas de verrou : on peut toujours passer à la suite. Chaque étape a un critère clair.
const GOALS = { kyoto: 'Vivre à Kyoto au quotidien', lire: 'Lire kanji et menus', jlpt: 'Préparer le JLPT', tout: 'Un peu de tout' };

export function pathSteps(){
  const k = kanaPathState(), kj = kanjiTodayStatus();
  const S = meta.kanjiSrs || {};
  const radKnown = Object.keys(S).filter(x => x.startsWith('r:')).length;
  const kanjiKnown = Object.keys(S).filter(x => !x.startsWith('r:')).length;
  const lessons = (meta.lessonsDone || []).length;
  const begin = CONVERSATIONS.filter(c => c.id && c.id.startsWith('b-'));
  const convDone = getConvDone().filter(id => id.startsWith('b-')).length;
  const survival = phrases.filter(p => CORE_SET.has(p.jp) && p.reps > 0).length;
  const survivalTotal = Math.min(30, CORE_SET.size || 30);
  const readTries = getQuizStats('menus').length + getQuizStats('menus-guess').length;
  return [
    { id: 'kana', icon: 'あ', title: 'Lire les kana', goal: 'Tu lis hiragana et katakana sans hésiter.', crit: '12 leçons validées', done: k.done, total: k.total, min: '10 min/jour', view: 'kana' },
    { id: 'survie', icon: '🙏', title: 'Phrases de survie', goal: 'Bonjour, merci, s\'il vous plaît, « c\'est combien ? ».', crit: `${survivalTotal} phrases essentielles apprises`, done: Math.min(survival, survivalTotal), total: survivalTotal, min: '5 min/jour', view: 'review' },
    { id: 'parler', icon: '💬', title: 'Parler au café, au resto, en ville', goal: 'Tu commandes et tu poses des questions.', crit: 'Dialogues débutants terminés', done: convDone, total: begin.length || 18, min: '1 à 2 par jour', view: 'conversation' },
    { id: 'briques', icon: '🧱', title: 'Les briques : radicaux de base', goal: 'Tu reconnais les 51 briques qui composent les kanji.', crit: '51 radicaux vus', done: Math.min(51, Object.keys(S).filter(x => x.startsWith('r:')).length), total: 51, min: '8 par jour', view: 'kanji' },
    { id: 'gram', icon: '📘', title: 'Grammaire de base', goal: 'こそあど, mots interrogatifs, は/が, particules, て-form…', crit: LESSONS.length + ' leçons courtes', done: lessons, total: LESSONS.length, min: '1 leçon par jour', view: 'lessons' },
    { id: 'k100', icon: '漢', title: '100 premiers kanji', goal: 'Tu débloques « Mots que tu sais lire ».', crit: '100 kanji appris', done: Math.min(100, kanjiKnown), total: 100, min: '6 par jour', view: 'kanji' },
    { id: 'lire', icon: '🍜', title: 'Lire une carte, un panneau', goal: 'Tu lis un menu de ramen et un panneau de gare.', crit: '5 défis ou quiz de menus', done: Math.min(5, readTries), total: 5, min: '5 min/jour', view: 'menus' },
    { id: 'k296', icon: '📖', title: '296 kanji : niveau N5 + N4', goal: 'Les kanji des examens JLPT N5 et N4.', crit: '296 kanji appris', done: Math.min(296, kanjiKnown), total: 296, min: '6 par jour', view: 'kanji' },
    { id: 'k2136', icon: '🏯', title: 'Les 2136 kanji', goal: 'Tout le japonais courant écrit.', crit: '2136 kanji appris', done: kanjiKnown, total: 2136, min: 'un an à 6/jour', view: 'kanji' },
  ];
}

export function renderPath(){
  const area = document.getElementById('pathArea');
  const steps = pathSteps();
  const cur = steps.findIndex(s => s.done < s.total);
  const goal = GOALS[meta.goal] || null;
  const pct = s => Math.round((s.done / s.total) * 100);
  let html = `<div class="hub-intro"><h2>Mon parcours</h2><p>${goal ? `Ton objectif : <b>${escapeHtml(goal)}</b>. ` : ''}Voici le chemin complet, dans l'ordre conseillé. Tu peux aussi avancer sur plusieurs étapes en même temps : le programme du jour s'en occupe.</p></div>`;
  if(cur >= 0){
    const s = steps[cur];
    html += `<div class="path-here"><span class="path-tag">Tu es ici</span><b>${s.icon} ${escapeHtml(s.title)}</b><span>${escapeHtml(s.goal)}</span>
      <div class="today-track"><div class="today-track-fill" style="width:${pct(s)}%"></div></div>
      <span class="path-sub">${s.done} / ${s.total} · ${escapeHtml(s.min)}</span><button type="button" class="continue-btn" data-go="${s.view}">Continuer →</button></div>`;
  } else html += `<div class="path-here"><b>🎉 Tu as fini tout le parcours !</b></div>`;
  html += `<ol class="path-list">`;
  steps.forEach((s, i) => {
    const state = s.done >= s.total ? 'done' : (i === cur ? 'now' : (s.done > 0 ? 'part' : 'next'));
    html += `<li class="path-step ${state}"><button type="button" class="path-btn" data-go="${s.view}">
      <span class="path-num">${state === 'done' ? '✓' : i + 1}</span>
      <span class="path-body"><b>${s.icon} ${escapeHtml(s.title)}</b>${state === 'now' ? `<small>📍 Tu es ici : voir le cadre en haut · ${s.done}/${s.total}</small>` : `<small>${escapeHtml(s.goal)}</small>
        <span class="path-bar"><span style="width:${pct(s)}%"></span></span><small>${escapeHtml(s.crit)} · ${s.done}/${s.total}</small>`}</span>
    </button></li>`;
  });
  html += `</ol><p class="hub-foot">Rien n'est verrouillé. Si une étape te bloque, passe à la suivante et reviens plus tard : c'est normal.</p>`;
  area.innerHTML = html;
  area.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => showView(b.dataset.go)));
}
