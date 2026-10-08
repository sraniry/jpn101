// ---------- Masquer / afficher le romaji (global, page, section, mot) ----------
// Objectif : forcer la lecture des kana/kanji en retirant la béquille romaji, à la carte.
//
// Règle : le niveau le plus précis gagne  →  mot > section > page > global.
// Basculer un niveau efface les réglages des niveaux en dessous (sinon « tout masquer »
// laisserait des romaji visibles sans qu'on comprenne pourquoi).
//
// Fonctionnement sans toucher à chaque vue : un observateur DOM repère les éléments romaji
// (classes de TAGGED) après chaque rendu, leur pose une clé de mot/section/page, y ajoute le
// bouton œil, puis applique l'état. Les romaji noyés dans une phrase passent par <span
// class="rj-inline"> (voir escapeRj dans util.js).
//
// État mémorisé dans meta.romajiPrefs → inclus dans l'export JSON et la synchro cloud.
// Valeurs = « affiché ? » (true/false). Absent = hérite du niveau au-dessus.

import { meta, saveMeta } from './storage.js';

const TAGGED = [
  '.romaji', '.b-romaji', '.sc-romaji', '.kvc-rom', '.kpc-rom', '.kcc-rom', '.jg-rom',
  '.jg-s-romaji', '.jq-q-romaji', '.kqc-btn-rom', '.gd-choice-rom', '.pi-romaji',
  '.drill-romaji', '.jp-big-romaji', '.romaji-sm', '.romaji-line', '.kj-sentence-rom',
  '.rj-inline',
].join(',');

// Éléments trop petits ou imbriqués dans des boutons/cellules pour porter un œil à eux seuls :
// ils restent masquables via section/page/global, et révélables d'un tap.
const NO_WORD_EYE = '.kcc-rom, .kpc-rom, .kqc-btn-rom, .gd-choice-rom, .rj-inline';

const PEEK_MS = 5000;
const PAGES = ['today','skills','review','conversation','listening','reading','kana','grammar','jlpt','add'];

function prefs(){
  if(!meta.romajiPrefs) meta.romajiPrefs = { global:true, pages:{}, sections:{}, words:{} };
  const p = meta.romajiPrefs;
  p.pages = p.pages || {}; p.sections = p.sections || {}; p.words = p.words || {};
  if(typeof p.global !== 'boolean') p.global = true; // défaut validé : visible partout
  return p;
}
function save(){ saveMeta(); }

// ---------- clés ----------
function norm(s){ return (s||'').toLowerCase().replace(/[()（）]/g,'').replace(/\s+/g,' ').trim(); }
function pageOf(el){
  const v = el.closest('section.view');
  return v ? v.id.replace('view-','') : 'x';
}
// Section = le titre qui précède l'élément, en remontant l'arbre. Couvre les groupes Lire
// (.read-group), la référence Grammaire (.gram-section) et les listes à titre simple
// (.rg-head dans JLPT, .kana-table-title dans Alphabet).
function sectionOf(el){
  const grp = el.closest('.read-group, .gram-section');
  if(grp){
    const head = grp.matches('.read-group') ? grp.querySelector('.rg-head') : grp.querySelector('h3');
    if(head) return { head, title: titleOf(head) };
  }
  let n = el;
  while(n && n.parentElement && !n.matches('section.view')){
    let s = n.previousElementSibling;
    while(s){
      if(s.matches('.rg-head, .kana-table-title')) return { head:s, title:titleOf(s) };
      s = s.previousElementSibling;
    }
    n = n.parentElement;
  }
  return null;
}
function titleOf(head){
  if(head.dataset.rjTitle) return head.dataset.rjTitle;
  const h = head.querySelector('h3, h4');
  const t = norm((h || head).textContent);
  head.dataset.rjTitle = t;
  return t;
}

// ---------- état effectif ----------
function shownFor(el){
  const p = prefs();
  const w = el.dataset.rjw;
  if(w && w in p.words) return p.words[w];
  const s = el.dataset.rjs;
  if(s && s in p.sections) return p.sections[s];
  const pg = el.dataset.rjp;
  if(pg in p.pages) return p.pages[pg];
  return p.global;
}
function sectionShown(page, key){
  const p = prefs();
  if(key in p.sections) return p.sections[key];
  if(page in p.pages) return p.pages[page];
  return p.global;
}
function pageShown(page){
  const p = prefs();
  return page in p.pages ? p.pages[page] : p.global;
}

// ---------- initialisation d'un élément romaji ----------
function initEl(el){
  if(el.dataset.rjInit) return;
  el.dataset.rjInit = '1';
  el.classList.add('rj');
  const page = pageOf(el);
  el.dataset.rjp = page;
  el.dataset.rjw = norm(el.textContent);
  const sec = sectionOf(el);
  if(sec){
    el.dataset.rjs = page + '::' + sec.title;
    if(!sec.head.dataset.rjEye){
      sec.head.dataset.rjEye = '1';
      const eye = document.createElement('span');
      eye.className = 'rj-eye rj-eye-section';
      eye.dataset.rjSection = page + '::' + sec.title;
      eye.dataset.rjPage = page;
      eye.setAttribute('role', 'button');
      eye.title = 'Masquer / afficher le romaji de cette section';
      const slot = sec.head.querySelector('.rg-head-actions') || sec.head;
      slot.appendChild(eye);
    }
  }
  if(!el.matches(NO_WORD_EYE)){
    const eye = document.createElement('span');
    eye.className = 'rj-eye rj-eye-word';
    eye.setAttribute('role', 'button');
    eye.title = 'Masquer / afficher ce romaji';
    el.insertAdjacentElement('afterend', eye);
  }
}

// ---------- application ----------
function applyAll(){
  document.querySelectorAll(TAGGED).forEach(el=>{
    initEl(el);
    if(el.classList.contains('rj-peek')) return; // révélation temporaire en cours
    el.classList.toggle('rj-hidden', !shownFor(el));
  });
  updateControls();
}
function setText(el, txt){ if(el.textContent !== txt) el.textContent = txt; } // évite de réveiller l'observateur
function updateControls(){
  const p = prefs();
  const g = document.getElementById('rjGlobalBtn');
  if(g) setText(g, p.global ? '👁 Romaji : visible' : '🙈 Romaji : masqué');
  document.querySelectorAll('.rj-page-btn').forEach(b=>{
    const shown = pageShown(b.dataset.rjPage);
    setText(b, shown ? '👁 Romaji de cette page : visible' : '🙈 Romaji de cette page : masqué');
  });
  document.querySelectorAll('.rj-eye-section').forEach(e=>{
    setText(e, sectionShown(e.dataset.rjPage, e.dataset.rjSection) ? '👁' : '🙈');
  });
  document.querySelectorAll('.rj-eye-word').forEach(e=>{
    const el = e.previousElementSibling;
    setText(e, el && el.classList.contains('rj-hidden') ? '🙈' : '👁');
  });
}

// ---------- actions (chacune efface les réglages plus précis en dessous) ----------
function toggleWord(el){
  const p = prefs();
  p.words[el.dataset.rjw] = !shownFor(el);
  save(); applyAll();
}
function toggleSection(key, page){
  const p = prefs();
  const next = !sectionShown(page, key);
  p.sections[key] = next;
  document.querySelectorAll(`.rj[data-rjs="${CSS.escape(key)}"]`).forEach(el=>{ delete p.words[el.dataset.rjw]; });
  save(); applyAll();
}
function togglePage(page){
  const p = prefs();
  const next = !pageShown(page);
  p.pages[page] = next;
  Object.keys(p.sections).forEach(k=>{ if(k.startsWith(page+'::')) delete p.sections[k]; });
  document.querySelectorAll(`.rj[data-rjp="${page}"]`).forEach(el=>{ delete p.words[el.dataset.rjw]; });
  save(); applyAll();
}
function toggleGlobal(){
  const p = prefs();
  p.global = !p.global;
  p.pages = {}; p.sections = {}; p.words = {};
  save(); applyAll();
}

function peek(el){
  el.classList.remove('rj-hidden');
  el.classList.add('rj-peek');
  setTimeout(()=>{ el.classList.remove('rj-peek'); applyAll(); }, PEEK_MS);
  updateControls();
}

// ---------- barres de contrôle ----------
function buildControls(){
  const header = document.querySelector('header.title');
  if(header && !document.getElementById('rjGlobalBtn')){
    const b = document.createElement('button');
    b.id = 'rjGlobalBtn'; b.className = 'rj-global-btn';
    b.title = 'Masquer / afficher le romaji partout (efface les réglages plus précis)';
    header.appendChild(b);
  }
  PAGES.forEach(page=>{
    const panel = document.querySelector(`#view-${page} .panel`);
    if(!panel || panel.querySelector('.rj-pagebar')) return;
    const bar = document.createElement('div');
    bar.className = 'rj-pagebar';
    const b = document.createElement('button');
    b.className = 'rj-page-btn'; b.dataset.rjPage = page;
    b.title = 'Masquer / afficher le romaji de cette page (efface les réglages de ses sections et mots)';
    bar.appendChild(b);
    panel.insertBefore(bar, panel.firstChild);
  });
}

export function initRomajiToggle(){
  buildControls();

  // capture : on intercepte AVANT les gestionnaires des cartes (audio, réponse de quiz…)
  document.addEventListener('click', e=>{
    const eye = e.target.closest('.rj-eye');
    if(eye){
      e.stopPropagation(); e.preventDefault();
      if(eye.classList.contains('rj-eye-section')) toggleSection(eye.dataset.rjSection, eye.dataset.rjPage);
      else { const el = eye.previousElementSibling; if(el) toggleWord(el); }
      return;
    }
    const pageBtn = e.target.closest('.rj-page-btn');
    if(pageBtn){ e.stopPropagation(); togglePage(pageBtn.dataset.rjPage); return; }
    if(e.target.closest('#rjGlobalBtn')){ e.stopPropagation(); toggleGlobal(); return; }
    // tap sur un romaji masqué : on le révèle 5 s, sans déclencher l'audio ni la réponse du quiz
    const hidden = e.target.closest('.rj.rj-hidden');
    if(hidden){ e.stopPropagation(); e.preventDefault(); peek(hidden); }
  }, true);

  let scheduled = false;
  new MutationObserver(()=>{
    if(scheduled) return;
    scheduled = true;
    // setTimeout plutôt que requestAnimationFrame : rAF est suspendu dans un onglet masqué,
    // le romaji ne serait alors jamais (dé)masqué tant que l'onglet n'est pas au premier plan.
    setTimeout(()=>{ scheduled = false; applyAll(); }, 0);
  }).observe(document.body, { childList:true, subtree:true });

  applyAll();
}

// Rappel manuel (ex: après un chargement de meta depuis le cloud)
export function refreshRomaji(){ applyAll(); }
