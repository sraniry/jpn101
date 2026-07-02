import { HIRAGANA, KATAKANA, KANA_BASE, KANA_DAKUTEN, KANA_HANDAKUTEN, KANA_YOON, KATAKANA_ONLY } from '../../data/kana.js';
import { speak } from '../tts.js';

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

// Tableau principal : hiragana et katakana appariés côte à côte (même son)
function renderPairedTable(groups, withMnemo) {
  let html = `<div class="kana-table-wrap"><div class="kana-pair-table">`;
  groups.forEach(g => {
    html += `<div class="kana-pair-row"><span class="kana-row-label">${g.row}</span><div class="kana-pair-cells">`;
    g.items.forEach(it => {
      html += `<div class="kana-pair-cell">
        <div class="kpc-jp"><span class="kpc-h" data-jp="${it.h}">${it.h}</span><span class="kpc-sep">/</span><span class="kpc-k" data-jp="${it.k}">${it.k}</span></div>
        <span class="kpc-rom">${it.romaji}</span>
        ${withMnemo && it.mnemo ? `<span class="kpc-mnemo">${it.mnemo}</span>` : ''}
      </div>`;
    });
    html += `</div></div>`;
  });
  html += `</div></div>`;
  return html;
}

// Tableau dense pour les formes dérivées/combinaisons (compact, plusieurs par ligne, pas une ligne par caractère)
function renderCompactTable(groups) {
  let html = `<div class="kana-compact-table">`;
  groups.forEach(g => {
    html += `<div class="kana-compact-group"><span class="kcg-label">${g.row}</span><div class="kcg-cells">`;
    g.items.forEach(it => {
      html += `<div class="kana-compact-cell" data-jp="${it.h}">
        <span class="kcc-h" data-jp="${it.h}">${it.h}</span><span class="kcc-k" data-jp="${it.k}">${it.k}</span><span class="kcc-rom">${it.romaji}</span>
      </div>`;
    });
    html += `</div></div>`;
  });
  html += `</div>`;
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
      <b>Hiragana</b> (gauche) : mots japonais natifs, particules, conjugaisons.<br>
      <b>Katakana</b> (droite) : mots étrangers (コーヒー = café, バス = bus).<br>
      Clique sur un caractère pour l'entendre et voir son moyen mnémotechnique. Entraîne-toi avec le quiz.
    </div>

    <div class="kana-tabs">
      <button class="kana-tab active" data-tab="base">あ/ア Base</button>
      <button class="kana-tab" data-tab="derived">゛゜ Dérivés</button>
      <button class="kana-tab" data-tab="quiz">🎯 Quiz</button>
    </div>

    <div id="kana-tab-base" class="kana-tab-panel active">
      <h4 class="kana-table-title">46 sons de base — hiragana / katakana</h4>
      <label class="kana-mnemo-toggle"><input type="checkbox" id="mnemoToggle"> Afficher les moyens mnémotechniques (katakana)</label>
      ${renderPairedTable(KANA_BASE, true)}
    </div>

    <div id="kana-tab-derived" class="kana-tab-panel" style="display:none">
      <div class="kana-rule-note">
        <b>゛ (dakuten)</b> : les deux petits traits ajoutent de la « voix » à la consonne — k→g, s→z, t→d, h→b. Comme des guillemets qui font vibrer le son.
      </div>
      <h4 class="kana-table-title">Sonores ゛ — が・ざ・だ・ば</h4>
      ${renderCompactTable(KANA_DAKUTEN)}

      <div class="kana-rule-note">
        <b>゜ (handakuten)</b> : uniquement sur la ligne H, fait « péter » un son P — comme une bulle qui pop.
      </div>
      <h4 class="kana-table-title">P ゜ — ぱ行</h4>
      ${renderCompactTable(KANA_HANDAKUTEN)}

      <div class="kana-rule-note">
        <b>Combinaisons yōon</b> : un petit や/ゆ/よ collé à une consonne en -i fusionne en une seule syllabe (きゃ = "kya", jamais "ki-ya").
      </div>
      <h4 class="kana-table-title">Combinaisons — きゃ・しゃ・ちゃ…</h4>
      ${renderCompactTable(KANA_YOON)}

      <div class="kana-rule-note">
        <b>Sons étrangers</b> : katakana seul, sans équivalent hiragana, utilisés pour transcrire des sons absents du japonais natif (ex. ファ pour "fa").
      </div>
      <h4 class="kana-table-title">Sons spéciaux katakana — ファ・ヴァ…</h4>
      <div class="kana-compact-table">
        <div class="kana-compact-group"><span class="kcg-label">Étrangers</span><div class="kcg-cells">
          ${KATAKANA_ONLY.map(it => `<div class="kana-compact-cell" data-jp="${it.k}"><span class="kcc-k" data-jp="${it.k}">${it.k}</span><span class="kcc-rom">${it.romaji}</span></div>`).join('')}
        </div></div>
      </div>
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

  // Mnemonics toggle (base table only)
  const mnemoToggle = area.querySelector('#mnemoToggle');
  if (mnemoToggle) {
    mnemoToggle.addEventListener('change', () => {
      area.querySelector('#kana-tab-base').classList.toggle('show-mnemo', mnemoToggle.checked);
    });
  }

  // Click kana char → speak + toggle mnemonic on the cell
  area.addEventListener('click', e => {
    const el = e.target.closest('[data-jp]');
    if (!el || !el.dataset.jp) return;
    speak(el.dataset.jp, 0.8);
    const cell = e.target.closest('.kana-pair-cell');
    if (cell) cell.classList.toggle('is-open');
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
