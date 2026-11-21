import { LESSONS } from '../../data/lessons.js';
import { meta, saveMeta, recordAnswer, registerStudyActivity, addQuizStat, planMark } from '../storage.js';
import { speak } from '../tts.js';
import { escapeHtml, kanaToRomaji } from '../util.js';
import { celebrate } from '../encouragement.js';

// ---------- Leçons de grammaire : une règle courte, des exemples, un piège, un petit exercice ----------
let st = { id: null, i: 0, right: 0, answered: false, done: false };
const rj = t => `<span class="rj-inline">${escapeHtml(t || '')}</span>`;
function shuffle(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

export function renderLessons(opts){
  const area = document.getElementById('lessonsArea');
  if(opts && opts.id) st = { id: opts.id, i: 0, right: 0, answered: false, done: false, quiz: false };
  if(!st.id) return renderList(area);
  const L = LESSONS.find(l => l.id === st.id);
  if(!L){ st.id = null; return renderList(area); }
  return st.quiz ? renderDrill(area, L) : renderLesson(area, L);
}

function renderList(area){
  const done = meta.lessonsDone || [];
  area.innerHTML = `<div class="hub-intro"><h2>Leçons de grammaire</h2><p>${LESSONS.length} petites leçons dans l'ordre. Chacune : la règle en quelques lignes, des exemples avec audio, l'erreur classique des francophones, puis 6 questions. Valide-la avec 5 bonnes réponses.</p></div>
    <ol class="path-list">${LESSONS.map((l, i) => `<li class="path-step ${done.includes(l.id) ? 'done' : (i === done.length ? 'now' : 'next')}"><button type="button" class="path-btn" data-id="${l.id}">
      <span class="path-num">${done.includes(l.id) ? '✓' : i + 1}</span><span class="path-body"><b>${l.icon} ${escapeHtml(l.title)}</b><small>${escapeHtml(l.why)}</small></span></button></li>`).join('')}</ol>`;
  area.querySelectorAll('[data-id]').forEach(b => b.addEventListener('click', () => { st = { id: b.dataset.id, i: 0, right: 0, answered: false, done: false, quiz: false }; renderLessons(); window.scrollTo({ top: 0 }); }));
}

function tableHtml(t){
  if(!t || !t.rows) return '';
  return `<div class="ls-table-wrap"><table class="ls-table"><thead><tr>${t.head.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${escapeHtml(String(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderLesson(area, L){
  area.innerHTML = `<div class="kj-top"><button type="button" class="conv-back" id="lsBack">← Toutes les leçons</button><span>${L.icon}</span></div>
    <div class="hub-intro"><h2>${escapeHtml(L.title)}</h2><p>${escapeHtml(L.why)}</p></div>
    <div class="ls-rule"><span class="kj-slabel">La règle</span><ul>${L.rule.map(r => `<li>${escapeHtml(r)}</li>`).join('')}</ul></div>
    ${tableHtml(L.table)}
    <h4 class="kj-h">Des exemples</h4>
    ${L.examples.map(e => `<div class="mn-phrase"><div class="mn-ph-top"><span class="mn-jp-s">${escapeHtml(e.jp)}</span><button type="button" class="kj-audio" data-say="${escapeHtml(e.jp)}" aria-label="Écouter">🔊</button></div><div class="mn-kana">${rj(e.romaji)}</div><div class="mn-ph-fr">${escapeHtml(e.fr)}</div></div>`).join('')}
    <div class="ls-pitfall"><span class="kj-slabel">⚠️ L'erreur classique</span><p><b>Ce qu'on fait souvent :</b> ${escapeHtml(L.pitfall.says)}</p>
      <p><b>À dire plutôt :</b> ${fixHtml(L.pitfall.fix)}</p><p>${escapeHtml(L.pitfall.why)}</p></div>
    <div class="ls-tip"><span class="kj-slabel">💡 Le conseil de la prof</span>${escapeHtml(L.tip)}</div>
    <div class="mn-actions" style="justify-content:center"><button type="button" class="continue-btn" id="lsDrill">Passer aux 6 questions →</button></div>`;
  area.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', () => speak(b.dataset.say, 0.85)));
  document.getElementById('lsBack').addEventListener('click', () => { st.id = null; renderLessons(); });
  document.getElementById('lsDrill').addEventListener('click', () => { st.quiz = true; st.i = 0; st.right = 0; st.order = shuffle(L.drill.map((_, i) => i)); renderLessons(); window.scrollTo({ top: 0 }); });
}

// « À dire plutôt » : tolère une simple phrase (chaîne) ou un objet {jp, romaji, fr}.
function fixHtml(fix){
  if(!fix) return '';
  if(typeof fix === 'string') return escapeHtml(fix);
  return `${escapeHtml(fix.jp || '')} ${fix.romaji ? rj(fix.romaji) : ''} ${fix.fr ? '— ' + escapeHtml(fix.fr) : ''}`;
}
// Lecture des kanji les plus fréquents dans les questions, pour ne pas bloquer une débutante.
const KANJI_RJ = { '駅': 'eki', '何': 'nan', '円': 'en', '時': 'ji', '分': 'fun', '人': 'hito', '水': 'mizu', '本': 'hon', '日': 'nichi', '月': 'tsuki', '店': 'mise', '学校': 'gakkou', '食': 'ta', '飲': 'no', '行': 'i', '来': 'ku', '見': 'mi', '買': 'ka', '高': 'taka', '安': 'yasu', '大': 'oo', '小': 'chii', '私': 'watashi', '先生': 'sensei', '今': 'ima', '百': 'hyaku', '千': 'sen', '万': 'man' };
function qHtml(text){
  // Pas de lecture injectée caractère par caractère : elle donnait des lectures fausses (水曜日, 昨日, 三本…).
  return escapeHtml(text);
}
const isKanaOnly = c => /^[ぁ-ゖァ-ヶー・、。？！ ]+$/.test(c);
function choiceHtml(c){
  return escapeHtml(c) + (isKanaOnly(c) ? `<span class="mn-ch-rj">${rj(kanaToRomaji(c))}</span>` : '');
}

function renderDrill(area, L){
  if(st.i >= L.drill.length){
    const ok = st.right >= 5, done = meta.lessonsDone || [];
    if(ok && !done.includes(L.id)){ meta.lessonsDone = [...done, L.id]; planMark('lesson', 1); celebrate('reviewCount', { emoji: '📘', title: 'Leçon validée', params: { n: L.drill.length } }); }
    addQuizStat('lesson-' + L.id, st.right, L.drill.length); registerStudyActivity(); saveMeta();
    area.innerHTML = `<div class="conv-done"><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${st.right} / ${L.drill.length}${ok ? ' — leçon validée ✓' : ''}</h3>
      <p style="color:#5f574d;font-size:13.5px;">${ok ? 'Bien joué. Tes erreurs éventuelles sont dans « Mes erreurs ».' : 'Presque ! Relis la règle puis refais les questions : il faut 5 bonnes réponses sur 6.'}</p>
      <button type="button" class="continue-btn" id="lsAgain" style="margin-top:16px;">${ok ? 'Revoir la leçon' : 'Relire la règle'}</button> <button type="button" class="conv-back" id="lsAll" style="margin-top:16px;">Toutes les leçons</button></div>`;
    document.getElementById('lsAgain').addEventListener('click', () => { st.quiz = false; renderLessons(); });
    document.getElementById('lsAll').addEventListener('click', () => { st.id = null; renderLessons(); });
    return;
  }
  const q = L.drill[st.order[st.i]], choices = shuffle(q.choices);
  area.innerHTML = `<div class="kj-top"><button type="button" class="conv-back" id="lsBack">← La leçon</button><span>${st.i + 1} / ${L.drill.length}</span></div>
    <div class="today-track"><div class="today-track-fill" style="width:${(st.i / L.drill.length) * 100}%"></div></div>
    <div class="kj-card"><p class="mn-q">${qHtml(q.q)}</p><div class="kj-choices">${choices.map(c => `<button type="button" class="kj-choice" data-c="${escapeHtml(c)}">${choiceHtml(c)}</button>`).join('')}</div><div id="lsFb" aria-live="polite"></div></div>`;
  document.getElementById('lsBack').addEventListener('click', () => { st.quiz = false; renderLessons(); });
  area.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.c === q.ok;
    area.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === q.ok) x.classList.add('ok'); });
    if(!ok) b.classList.add('ko'); else st.right++;
    recordAnswer('lesson', L.id + ':' + q.q, ok, { q: q.q, ok: q.ok, choices: q.choices, explain: q.explanation, chosen: b.dataset.c });
    document.getElementById('lsFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ Pas tout à fait'}</div><div class="mn-explain">${escapeHtml(q.explanation)}</div><button type="button" class="continue-btn" id="lsNext">Continuer</button>`;
    document.getElementById('lsNext').addEventListener('click', () => { st.i++; renderLessons(); });
  }));
}

// ---------- Petits textes à lire ----------
let tx = { id: null, q: -1, right: 0, texts: null };
export async function renderTexts(){
  const area = document.getElementById('textsArea');
  if(!tx.texts){
    try{ tx.texts = (await import('../../data/reading-texts.js')).READING_TEXTS; }catch(e){ area.innerHTML = '<div class="skills-intro">Les petits textes arrivent bientôt.</div>'; return; }
  }
  const done = meta.textsDone || [];
  if(!tx.id){
    area.innerHTML = `<div class="hub-intro"><h2>Petits textes</h2><p>De vrais petits messages : un mot du logeur, une affiche, un menu. Lis d'abord, devine, puis touche une phrase pour voir le romaji et la traduction.</p></div>
      <ol class="path-list">${tx.texts.map((t, i) => `<li class="path-step ${done.includes(t.id) ? 'done' : 'next'}"><button type="button" class="path-btn" data-id="${t.id}"><span class="path-num">${done.includes(t.id) ? '✓' : i + 1}</span><span class="path-body"><b>${escapeHtml(t.title)}</b><small>${escapeHtml(t.kind)} · niveau ${t.level}</small></span></button></li>`).join('')}</ol>`;
    area.querySelectorAll('[data-id]').forEach(b => b.addEventListener('click', () => { tx.id = b.dataset.id; tx.q = -1; tx.right = 0; renderTexts(); window.scrollTo({ top: 0 }); }));
    return;
  }
  const t = tx.texts.find(x => x.id === tx.id);
  if(tx.q < 0){
    area.innerHTML = `<div class="kj-top"><button type="button" class="conv-back" id="txBack">← Tous les textes</button><span>${escapeHtml(t.kind)}</span></div>
      <div class="hub-intro"><h2>${escapeHtml(t.title)}</h2></div>
      <div class="mn-board">${t.lines.map(l => `<div class="mn-item tx-line"><div class="mn-main"><span class="mn-jp">${escapeHtml(l.jp)}</span><button type="button" class="kj-audio" data-say="${escapeHtml(l.jp)}" aria-label="Écouter">🔊</button></div><div class="mn-fr" style="display:none">${rj(l.romaji)}<br>${escapeHtml(l.fr)}</div></div>`).join('')}</div>
      <p class="kj-tip" style="text-align:left">Touche une phrase pour voir le romaji et la traduction.</p>
      <details class="kj-method"><summary>Mots clés</summary>${t.vocab.map(v => `<p><b>${escapeHtml(v.jp)}</b> (${escapeHtml(v.kana)}) : ${escapeHtml(v.fr)}</p>`).join('')}</details>
      <div class="mn-actions" style="justify-content:center"><button type="button" class="continue-btn" id="txQ">Questions de compréhension →</button></div>`;
    document.getElementById('txBack').addEventListener('click', () => { tx.id = null; renderTexts(); });
    area.querySelectorAll('.tx-line').forEach(el => el.addEventListener('click', () => { const f = el.querySelector('.mn-fr'); f.style.display = f.style.display === 'none' ? 'block' : 'none'; }));
    area.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); speak(b.dataset.say, 0.85); }));
    document.getElementById('txQ').addEventListener('click', () => { tx.q = 0; renderTexts(); });
    return;
  }
  if(tx.q >= t.questions.length){
    if(tx.right >= t.questions.length && !done.includes(t.id)){ meta.textsDone = [...done, t.id]; saveMeta(); }
    registerStudyActivity();
    area.innerHTML = `<div class="conv-done"><h3 style="font-family:'Shippori Mincho',serif;color:var(--indigo-deep);">${tx.right} / ${t.questions.length}</h3><button type="button" class="continue-btn" id="txAll" style="margin-top:16px;">← Tous les textes</button></div>`;
    document.getElementById('txAll').addEventListener('click', () => { tx.id = null; renderTexts(); });
    return;
  }
  const q = t.questions[tx.q], choices = shuffle(q.choices);
  area.innerHTML = `<div class="kj-top"><button type="button" class="conv-back" id="txBack">← Le texte</button><span>${tx.q + 1} / ${t.questions.length}</span></div>
    <div class="kj-card"><p class="mn-q">${escapeHtml(q.q)}</p><div class="kj-choices">${choices.map(c => `<button type="button" class="kj-choice" data-c="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}</div><div id="txFb" aria-live="polite"></div></div>`;
  document.getElementById('txBack').addEventListener('click', () => { tx.q = -1; renderTexts(); });
  area.querySelectorAll('.kj-choice').forEach(b => b.addEventListener('click', () => {
    const ok = b.dataset.c === q.ok;
    area.querySelectorAll('.kj-choice').forEach(x => { x.disabled = true; if(x.dataset.c === q.ok) x.classList.add('ok'); });
    if(!ok) b.classList.add('ko'); else tx.right++;
    recordAnswer('text', t.id + ':' + q.q, ok, { q: q.q, ok: q.ok, choices: q.choices, explain: q.explanation, chosen: b.dataset.c });
    document.getElementById('txFb').innerHTML = `<div class="kj-fb ${ok ? 'ok' : 'ko'}">${ok ? '✓ Oui !' : '✗ Pas tout à fait'}</div><div class="mn-explain">${escapeHtml(q.explanation || '')}</div><button type="button" class="continue-btn" id="txNext">Continuer</button>`;
    document.getElementById('txNext').addEventListener('click', () => { tx.q++; renderTexts(); });
  }));
}
