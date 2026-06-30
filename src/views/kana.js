import { HIRAGANA, KATAKANA } from '../../data/kana.js';
import { speak } from '../tts.js';

// GROUPES pour le tableau (5 par rangée, voyelles + consonnes)
const H_ROWS = [
  { label:'Voyelles', chars: HIRAGANA.slice(0, 5) },
  { label:'K', chars: HIRAGANA.slice(5, 10) },
  { label:'S', chars: HIRAGANA.slice(10, 15) },
  { label:'T', chars: HIRAGANA.slice(15, 20) },
  { label:'N', chars: HIRAGANA.slice(20, 25) },
  { label:'H', chars: HIRAGANA.slice(25, 30) },
  { label:'M', chars: HIRAGANA.slice(30, 35) },
  { label:'Y', chars: [HIRAGANA[35], HIRAGANA[36], HIRAGANA[37]] },
  { label:'R', chars: HIRAGANA.slice(38, 43) },
  { label:'W/N', chars: [HIRAGANA[43], HIRAGANA[44], HIRAGANA[45]] },
];

const K_ROWS = [
  { label:'Voyelles', chars: KATAKANA.slice(0, 5) },
  { label:'K', chars: KATAKANA.slice(5, 10) },
  { label:'S', chars: KATAKANA.slice(10, 15) },
  { label:'T', chars: KATAKANA.slice(15, 20) },
  { label:'N', chars: KATAKANA.slice(20, 25) },
  { label:'H', chars: KATAKANA.slice(25, 30) },
  { label:'M', chars: KATAKANA.slice(30, 35) },
  { label:'Y', chars: [KATAKANA[35], KATAKANA[36], KATAKANA[37]] },
  { label:'R', chars: KATAKANA.slice(38, 43) },
  { label:'W/N', chars: [KATAKANA[43], KATAKANA[44], KATAKANA[45]] },
];

// État du quiz
let quizState = null;

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(correct, pool, n = 4) {
  const others = shuffleArray(pool.filter(x => x.kana !== correct.kana)).slice(0, n - 1);
  return shuffleArray([correct, ...others]);
}

function renderTable(rows, title) {
  let html = `<div class="kana-table-wrap"><h4 class="kana-table-title">${title}</h4><div class="kana-table">`;
  rows.forEach(row => {
    html += `<div class="kana-row"><span class="kana-row-label">${row.label}</span>`;
    row.chars.forEach(c => {
      html += `<div class="kana-cell" data-jp="${c.kana}">
        <span class="kc-char">${c.kana}</span>
        <span class="kc-rom">${c.romaji}</span>
      </div>`;
    });
    html += `</div>`;
  });
  html += `</div></div>`;
  return html;
}

function startQuiz(pool, mode) {
  const deck = shuffleArray(pool.filter(c => c.kana.length <= 2)); // basic + some combos
  quizState = { pool, mode, deck, idx: 0, correct: 0, total: deck.length };
  renderQuizCard();
}

function renderQuizCard() {
  const area = document.getElementById('kanaArea');
  if (!quizState || quizState.idx >= quizState.deck.length) {
    const pct = Math.round((quizState.correct / quizState.total) * 100);
    area.querySelector('#kana-quiz-zone').innerHTML = `
      <div class="kana-quiz-done">
        <div class="kqd-score">${quizState.correct}/${quizState.total} — ${pct}%</div>
        <div class="kqd-msg">${pct >= 90 ? '🎉 Excellent !' : pct >= 70 ? '👍 Bien !' : '💪 Continue !'}</div>
        <button class="kana-quiz-restart">🔄 Recommencer</button>
      </div>`;
    area.querySelector('.kana-quiz-restart').addEventListener('click', () => startQuiz(quizState.pool, quizState.mode));
    return;
  }
  const card = quizState.deck[quizState.idx];
  const choices = buildChoices(card, quizState.pool);
  const isKanaToRomaji = quizState.mode === 'k2r';
  const question = isKanaToRomaji ? card.kana : card.romaji;
  const choiceDisplay = (c) => isKanaToRomaji ? c.romaji : c.kana;

  area.querySelector('#kana-quiz-zone').innerHTML = `
    <div class="kana-quiz-card">
      <div class="kqc-progress">${quizState.idx + 1} / ${quizState.total}</div>
      <div class="kqc-question ${isKanaToRomaji ? 'is-kana' : 'is-romaji'}" data-jp="${card.kana}">${question}</div>
      <div class="kqc-choices">
        ${choices.map(c => `<button class="kqc-btn" data-kana="${c.kana}" data-correct="${c.kana === card.kana}">${choiceDisplay(c)}</button>`).join('')}
      </div>
    </div>`;

  // Click to pronounce
  const qEl = area.querySelector('.kqc-question');
  if (isKanaToRomaji) qEl.addEventListener('click', () => speak(card.kana, 0.8));

  area.querySelectorAll('.kqc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.dataset.correct === 'true';
      if (isCorrect) {
        btn.classList.add('correct');
        quizState.correct++;
      } else {
        btn.classList.add('wrong');
        area.querySelector(`[data-correct="true"]`).classList.add('correct');
      }
      area.querySelectorAll('.kqc-btn').forEach(b => b.disabled = true);
      if (!isKanaToRomaji) speak(card.kana, 0.8);
      setTimeout(() => { quizState.idx++; renderQuizCard(); }, 900);
    });
  });
}

export function renderKana() {
  const area = document.getElementById('kanaArea');

  area.innerHTML = `
    <div class="kana-intro">
      <b>Hiragana</b> : mots japonais natifs, particules, conjugaisons.<br>
      <b>Katakana</b> : mots étrangers (コーヒー = café, バス = bus).<br>
      Clique sur un caractère pour l'entendre. Entraîne-toi avec le quiz.
    </div>

    <div class="kana-tabs">
      <button class="kana-tab active" data-tab="hiragana">あ Hiragana</button>
      <button class="kana-tab" data-tab="katakana">ア Katakana</button>
      <button class="kana-tab" data-tab="quiz">🎯 Quiz</button>
    </div>

    <div id="kana-tab-hiragana" class="kana-tab-panel active">
      ${renderTable(H_ROWS, 'Hiragana — 46 caractères de base')}
      <div class="kana-dakuten-note">+ Les formes avec ゛(voiced, ex: が・じ) et ゜(p-, ex: ぱ) et les combinaisons (きゃ・しゅ…) sont dans le tableau étendu ci-dessous.</div>
      <details class="kana-extended">
        <summary>Voir les formes dérivées et combinaisons (゛゜ + yōon)</summary>
        <div class="kana-table kana-table-small">
          ${HIRAGANA.slice(46).map(c => `<div class="kana-cell" data-jp="${c.kana}"><span class="kc-char">${c.kana}</span><span class="kc-rom">${c.romaji}</span></div>`).join('')}
        </div>
      </details>
    </div>

    <div id="kana-tab-katakana" class="kana-tab-panel" style="display:none">
      ${renderTable(K_ROWS, 'Katakana — 46 caractères de base')}
      <div class="kana-dakuten-note">+ Formes dérivées, combinaisons, et sons spéciaux pour mots étrangers ci-dessous.</div>
      <details class="kana-extended">
        <summary>Voir les formes dérivées, combinaisons et sons étrangers (ファ, ヴ…)</summary>
        <div class="kana-table kana-table-small">
          ${KATAKANA.slice(46).map(c => `<div class="kana-cell" data-jp="${c.kana}"><span class="kc-char">${c.kana}</span><span class="kc-rom">${c.romaji}</span></div>`).join('')}
        </div>
      </details>
    </div>

    <div id="kana-tab-quiz" class="kana-tab-panel" style="display:none">
      <div class="kana-quiz-setup">
        <p class="kqs-label">Choisir le quiz :</p>
        <div class="kqs-row">
          <button class="kqs-btn" data-set="hiragana" data-mode="k2r">あ → romaji</button>
          <button class="kqs-btn" data-set="hiragana" data-mode="r2k">romaji → あ</button>
          <button class="kqs-btn" data-set="katakana" data-mode="k2r">ア → romaji</button>
          <button class="kqs-btn" data-set="katakana" data-mode="r2k">romaji → ア</button>
          <button class="kqs-btn" data-set="both" data-mode="k2r">あ+ア → romaji</button>
        </div>
      </div>
      <div id="kana-quiz-zone"></div>
    </div>
  `;

  // Tab switching
  area.querySelectorAll('.kana-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      area.querySelectorAll('.kana-tab').forEach(t => t.classList.remove('active'));
      area.querySelectorAll('.kana-tab-panel').forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const panel = area.querySelector(`#kana-tab-${tab.dataset.tab}`);
      if (panel) panel.style.display = '';
    });
  });

  // Click kana cell → speak
  area.addEventListener('click', e => {
    const cell = e.target.closest('.kana-cell');
    if (cell) speak(cell.dataset.jp, 0.8);
  });

  // Quiz start buttons
  area.querySelectorAll('.kqs-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const set = btn.dataset.set;
      const mode = btn.dataset.mode;
      const pool = set === 'hiragana' ? HIRAGANA : set === 'katakana' ? KATAKANA : [...HIRAGANA, ...KATAKANA];
      startQuiz(pool, mode);
    });
  });
}
