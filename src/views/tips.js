import { TIPS, HOWTO, PRONUNCIATION, KYOTO } from '../../data/tips.js';
import { MISTAKES } from '../../data/mistakes.js';
import { CONFUSABLES } from '../../data/confusables.js';
import { recordAnswer, saveMeta } from '../storage.js';
import { speak } from '../tts.js';
import { escapeHtml } from '../util.js';
import { kanaPathState } from './kana.js';
import { kanjiTodayStatus } from './kanji.js';

// ---------- Astuces & leçons de prof ----------
const dayNumber = () => Math.floor(Date.now() / 86400000);
// L'astuce du jour s'adapte au niveau : pas de piège de katakana à qui n'a pas fini les kana.
export const tipOfTheDay = () => {
  let themes = null;
  try{
    const k = kanaPathState(), n = kanjiTodayStatus().learnedTotal;
    if(k.done < k.total) themes = ['kana', 'prononciation', 'methode', 'motivation'];
    else if(n < 100) themes = ['kanji', 'prononciation', 'nombres', 'methode', 'motivation', 'kyoto'];
  }catch(e){}
  const pool = themes ? TIPS.filter(t => themes.includes(t.theme)) : TIPS;
  const list = pool.length ? pool : TIPS;
  return list[dayNumber() % list.length];
};
let tipsShown = 12;
const rj = t => `<span class="rj-inline">${escapeHtml(t || '')}</span>`;
function shuffle(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

const TABS = [['astuces', '💡 Astuces'], ['erreurs', '⚠️ Erreurs classiques'], ['prononciation', '🗣️ Prononciation'], ['kyoto', '🏯 Kyoto'], ['methode', '🎓 Méthode'], ['confusables', '👀 Kanji jumeaux']];
const CAT = { prononciation: 'Prononciation', particules: 'Particules', verbes: 'Verbes & politesse', nombres: 'Nombres', pieges: 'Mots-pièges', ecriture: 'Écriture' };
const THEME = { kana: 'Kana', kanji: 'Kanji', prononciation: 'Prononciation', particules: 'Particules', methode: 'Méthode', nombres: 'Nombres', kyoto: 'Kyoto', motivation: 'Motivation' };
let tab = 'astuces', theme = 'all';

export function renderTips(opts){
  const area = document.getElementById('tipsArea');
  if(opts && opts.tab) tab = opts.tab;
  let html = `<div class="hub-intro"><h2>Astuces & leçons de prof</h2></div><div class="mn-styles" role="tablist" aria-label="Rubriques">${TABS.map(([id, l]) => `<button type="button" role="tab" aria-selected="${id === tab}" data-tab="${id}" class="${id === tab ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  if(tab === 'astuces') html += tipsHtml();
  else if(tab === 'erreurs') html += mistakesHtml();
  else if(tab === 'prononciation') html += pronHtml();
  else if(tab === 'kyoto') html += kyotoHtml();
  else if(tab === 'methode') html += howtoHtml();
  else html += confHtml();
  area.innerHTML = html;
  area.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => { tab = b.dataset.tab; renderTips(); }));
  area.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', () => speak(b.dataset.say, 0.8)));
  area.querySelectorAll('[data-theme]').forEach(b => b.addEventListener('click', () => { theme = b.dataset.theme; tipsShown = 12; renderTips(); }));
  const tm = area.querySelector('#tipsMore'); if(tm) tm.addEventListener('click', () => { tipsShown += 12; renderTips(); });
  wireDrills(area);
}

function tipsHtml(){
  const list = theme === 'all' ? TIPS : TIPS.filter(t => t.theme === theme);
  const today = tipOfTheDay();
  return `<div class="tip-today"><span class="kj-slabel">Astuce du jour</span>${escapeHtml(today.text)}${today.example ? `<div class="mn-kana">${escapeHtml(today.example.jp)} ${rj(today.example.romaji)} — ${escapeHtml(today.example.fr)}</div>` : ''}</div>
    <div class="mn-styles" role="group" aria-label="Thème"><button type="button" data-theme="all" class="${theme === 'all' ? 'on' : ''}">Tout</button>${Object.entries(THEME).map(([k, l]) => `<button type="button" data-theme="${k}" class="${theme === k ? 'on' : ''}">${l}</button>`).join('')}</div>
    ${list.slice(0, tipsShown).map(t => `<div class="tip-card"><span class="mk-src">${THEME[t.theme] || t.theme}</span><p>${escapeHtml(t.text)}</p>${t.example ? `<div class="mn-kana">${escapeHtml(t.example.jp)} ${rj(t.example.romaji)} — ${escapeHtml(t.example.fr)} <button type="button" class="kj-audio" data-say="${escapeHtml(t.example.jp)}" aria-label="Écouter">🔊</button></div>` : ''}</div>`).join('')}${list.length > tipsShown ? `<button type="button" class="kj-big" id="tipsMore">Voir plus d'astuces (${list.length - tipsShown} autres)</button>` : ''}`;
}

function mistakesHtml(){
  let html = `<div class="skills-intro">Les 30 erreurs que font presque toutes les francophones. Les connaître, c'est déjà les éviter. Touche une fiche, puis fais le mini-exercice.</div>`;
  const cats = [...new Set(MISTAKES.map(m => m.cat))];
  cats.forEach(c => {
    html += `<h4 class="kj-h">${CAT[c] || c}</h4>`;
    MISTAKES.filter(m => m.cat === c).forEach(m => {
      html += `<details class="mi-card"><summary>${escapeHtml(m.title)}</summary>
        <p><b>Ce qu'on fait :</b> ${escapeHtml(m.says)}</p>
        <p><b>À dire :</b> ${escapeHtml(m.fix.jp)} ${rj(m.fix.romaji)} — ${escapeHtml(m.fix.fr)} <button type="button" class="kj-audio" data-say="${escapeHtml(m.fix.jp)}" aria-label="Écouter">🔊</button></p>
        <p>${escapeHtml(m.why)}</p><div class="ls-tip"><span class="kj-slabel">💡 Astuce</span>${escapeHtml(m.tip)}</div>
        <div class="drill-box" data-id="${m.id}"><p class="mn-q">${escapeHtml(m.drill.q)}</p><div class="kj-choices">${shuffle(m.drill.choices).map(c => `<button type="button" class="kj-choice" data-c="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}</div><div class="drill-fb" aria-live="polite"></div></div></details>`;
    });
  });
  return html;
}
function confHtml(){
  return `<div class="skills-intro">Des kanji qui se ressemblent et qu'on confond tout le temps. Chaque paire a son astuce, puis un petit quiz.</div>` + CONFUSABLES.map(c => `<details class="mi-card"><summary><span class="conf-g">${c.chars.map(escapeHtml).join(' / ')}</span> ${escapeHtml((c.names || []).join(' / '))}</summary><p>${escapeHtml(c.tip)}</p>
    ${c.quiz.map((q, i) => `<div class="drill-box" data-conf="${c.id}:${i}"><p class="mn-q">${escapeHtml(q.q)}</p><div class="kj-choices">${shuffle(q.choices).map(x => `<button type="button" class="kj-choice" data-c="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join('')}</div><div class="drill-fb" aria-live="polite"></div></div>`).join('')}</details>`).join('');
}
function wireDrills(area){
  area.querySelectorAll('.drill-box').forEach(box => {
    let q, src, key;
    if(box.dataset.id){ const m = MISTAKES.find(x => x.id === box.dataset.id); q = { q: m.drill.q, ok: m.drill.ok, choices: m.drill.choices, explain: m.drill.explanation }; src = 'pitfall'; key = m.id; }
    else if(box.dataset.conf){ const [id, i] = box.dataset.conf.split(':'), c = CONFUSABLES.find(x => x.id === id), qq = c.quiz[+i]; q = { q: qq.q, ok: qq.ok, choices: qq.choices, explain: qq.explanation }; src = 'kanji'; key = 'conf:' + box.dataset.conf; }
    if(!q) return;
    box.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
      const ok = b.dataset.c === q.ok;
      box.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === q.ok) x.classList.add('ok'); });
      if(!ok) b.classList.add('ko');
      recordAnswer(src, key, ok, { q: q.q, ok: q.ok, choices: q.choices, explain: q.explain, chosen: b.dataset.c }); saveMeta();
      box.querySelector('.drill-fb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ Pas tout à fait'}</div><div class="mn-explain">${escapeHtml(q.explain || '')}</div>`;
    }));
  });
}

function pronHtml(){
  return `<div class="skills-intro">${escapeHtml(PRONUNCIATION.intro)}</div>
    <div class="ls-tip"><span class="kj-slabel">À savoir sur l'accent</span>${escapeHtml(PRONUNCIATION.accentNote)}</div>
    <h4 class="kj-h">12 paires à écouter</h4>
    ${PRONUNCIATION.pairs.map(p => `<div class="mn-phrase"><div class="pr-pair">
      <div><b class="mn-jp-s">${escapeHtml(p.a.jp)}</b> <button type="button" class="kj-audio" data-say="${escapeHtml(p.a.kana)}" aria-label="Écouter ${escapeHtml(p.a.jp)}">🔊</button><div class="mn-kana">${escapeHtml(p.a.kana)} ${rj(p.a.kana)}<br>${escapeHtml(p.a.fr)}</div></div>
      <div><b class="mn-jp-s">${escapeHtml(p.b.jp)}</b> <button type="button" class="kj-audio" data-say="${escapeHtml(p.b.kana)}" aria-label="Écouter ${escapeHtml(p.b.jp)}">🔊</button><div class="mn-kana">${escapeHtml(p.b.kana)} ${rj(p.b.kana)}<br>${escapeHtml(p.b.fr)}</div></div></div>
      <div class="mn-when">${escapeHtml(p.focus)} · ${escapeHtml(p.tip)}</div></div>`).join('')}`;
}
function kyotoHtml(){
  return `<div class="skills-intro">${escapeHtml(KYOTO.intro)}</div>
    <h4 class="kj-h">Le dialecte de Kyoto : à comprendre</h4>
    ${KYOTO.benn.map(b => `<div class="mn-phrase"><div class="mn-ph-top"><span class="mn-jp-s">${escapeHtml(b.jp)}</span><button type="button" class="kj-audio" data-say="${escapeHtml(b.kana)}" aria-label="Écouter">🔊</button></div><div class="mn-kana">${escapeHtml(b.kana)} ${rj(b.kana)}</div><div class="mn-ph-fr">${escapeHtml(b.fr)}</div><div class="mn-when">${escapeHtml(b.note)}</div></div>`).join('')}
    <h4 class="kj-h">Savoir-vivre</h4>
    ${KYOTO.manners.map(m => `<div class="tip-card"><b>${escapeHtml(m.title)}</b><p>${escapeHtml(m.body)}</p></div>`).join('')}`;
}
function howtoHtml(){
  return `<div class="skills-intro">Dix conseils de méthode, pour apprendre sans t'épuiser.</div>` + HOWTO.map((h, i) => `<details class="mi-card" ${i === 0 ? 'open' : ''}><summary>${i + 1}. ${escapeHtml(h.title)}</summary><p>${escapeHtml(h.body)}</p></details>`).join('');
}

// ---------- Mode d'emploi ----------
export function renderHelp(){
  const area = document.getElementById('helpArea');
  area.innerHTML = `<div class="hub-intro"><h2>Comment utiliser l'appli</h2><p>En 5 minutes, tu sais où aller.</p></div>
  <ol class="help-list">
    <li><b>🏠 Aujourd'hui</b> : ton programme du jour, dans l'ordre. Si tu n'as qu'un geste à faire : ouvre cet écran.</li>
    <li><b>🗺️ Parcours</b> : le chemin complet, avec « tu es ici ». Tu ne sais pas quoi faire ensuite ? Regarde ici.</li>
    <li><b>📖 Apprendre</b> : kana, kanji (6 par jour), leçons de grammaire, petits textes, panneaux.</li>
    <li><b>💬 Parler</b> : dialogues, menus de café et de resto, kit Kyoto, écoute, prononciation.</li>
    <li><b>👤 Moi</b> : tes progrès, tes erreurs à retravailler, les astuces de prof, tes cartes, la sauvegarde.</li>
  </ol>
  <div class="ls-tip"><span class="kj-slabel">Les mots de l'appli</span><b>Révision espacée</b> : une carte revient juste avant que tu l'oublies. <b>Radical</b> : une brique qui compose les kanji. <b>On / Kun</b> : deux façons de lire un kanji (dans les mots / seul). <b>JLPT</b> : l'examen officiel de japonais, facultatif.</div>
  <h4 class="kj-h">Conseils de méthode</h4>
  ${HOWTO.slice(0, 5).map(h => `<details class="mi-card"><summary>${escapeHtml(h.title)}</summary><p>${escapeHtml(h.body)}</p></details>`).join('')}`;
}
