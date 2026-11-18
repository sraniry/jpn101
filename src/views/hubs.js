import { phrases, meta, getDueAll, getConvDone, openMistakes } from '../storage.js';
import { kanaPathState } from './kana.js';
import { kanjiTodayStatus } from './kanji.js';
import { CONVERSATIONS } from '../../data/phrases.js';
import { showView } from '../nav.js';
import { escapeHtml } from '../util.js';

// ---------- Hubs : trois grandes entrées qui regroupent les écrans ----------
// Une carte = un écran. Chaque carte dit en une ligne à quoi ça sert et où tu en es.
function card(view, icon, title, desc, chip, opts){
  return `<button type="button" class="hub-card" data-go="${view}"${opts ? ` data-opts='${escapeHtml(JSON.stringify(opts))}'` : ''}>
    <span class="hub-ico" aria-hidden="true">${icon}</span>
    <span class="hub-txt"><b>${escapeHtml(title)}</b><small>${escapeHtml(desc)}</small></span>
    ${chip ? `<span class="hub-chip">${escapeHtml(chip)}</span>` : ''}
  </button>`;
}
function wire(area){
  area.querySelectorAll('.hub-card').forEach(b => b.addEventListener('click', () => {
    let o = {}; try{ o = b.dataset.opts ? JSON.parse(b.dataset.opts) : {}; }catch(e){}
    showView(b.dataset.go, o);
  }));
}

export function renderLearnHub(){
  const area = document.getElementById('learnArea');
  const k = kanaPathState(), kj = kanjiTodayStatus();
  const lessonsDone = (meta.lessonsDone || []).length;
  area.innerHTML = `<div class="hub-intro"><h2>Apprendre</h2><p>Ici, tu apprends du neuf. Pas sûre de quoi faire ? Ouvre <b>Parcours</b> : il te dit la prochaine étape.</p></div>
  <div class="hub-grid">
    ${card('kana', 'あ', 'Alphabet (kana)', 'Hiragana et katakana : la base de tout.', `${k.done}/${k.total} leçons`)}
    ${card('kanji', '漢', 'Kanji', '6 par jour, avec radicaux, histoires et ordre des traits.', kj.learnedTotal ? `${kj.learnedTotal} / 2136` : 'à commencer')}
    ${card('lessons', '📘', 'Leçons de grammaire', 'こそあど, は/が, て-form… une leçon courte à la fois.', `${lessonsDone}/11`)}
    ${card('texts', '📰', 'Petits textes', 'Lire un message du logeur, une affiche, un menu.', '')}
    ${card('reading', '🪧', 'Panneaux & formulaires', 'Reconnaître 出口, 入口, 禁止… d\'un coup d\'œil.', '')}
    ${card('tips', '💡', 'Kanji qui se ressemblent', '右/左, 大/犬/太… ne plus les confondre.', '', { tab: 'confusables' })}
    ${card('grammar', '📚', 'Grammaire (référence)', 'Le tableau complet, pour plus tard.', '')}
    ${card('jlpt', '🎓', 'Examen JLPT (optionnel)', 'N5 et N4 : vocabulaire, quiz, examens blancs.', '')}
  </div>`;
  wire(area);
}

export function renderSpeakHub(){
  const area = document.getElementById('speakArea');
  const convs = CONVERSATIONS.filter(c => c.id && Array.isArray(c.turns)), done = getConvDone().filter(id => convs.some(c => c.id === id)).length;
  area.innerHTML = `<div class="hub-intro"><h2>Parler & comprendre</h2><p>Pour utiliser ton japonais dans la vraie vie : café, resto, gare, magasin.</p></div>
  <div class="hub-grid">
    ${card('conversation', '💬', 'Dialogues', 'Très courts, avec explications de chaque phrase.', `${done}/${convs.length}`)}
    ${card('menus', '🍜', 'Menus & Kyoto', 'Café, udon, ramen, sushi, gare, temple, konbini.', '')}
    ${card('listening', '🎧', 'Écoute', 'Comprendre sans texte : phrases, prix, nombres.', '')}
    ${card('tips', '🗣️', 'Prononciation', 'Voyelles longues, consonnes doubles, accent.', '', { tab: 'prononciation' })}
    ${card('tips', '🏯', 'Kyoto-ben & savoir-vivre', 'Ce que tu entendras, et comment te comporter.', '', { tab: 'kyoto' })}
  </div>`;
  wire(area);
}

export function renderMeHub(){
  const area = document.getElementById('meArea');
  const due = getDueAll().length, errs = openMistakes().length;
  area.innerHTML = `<div class="hub-intro"><h2>Moi</h2><p>Tes progrès, tes erreurs, les conseils de prof et tes réglages.</p></div>
  <div class="hub-grid">
    ${card('progress', '📈', 'Mes progrès', 'Jours étudiés, kanji appris, scores, badges.', '')}
    ${card('mistakes', '❗', 'Mes erreurs', 'Ce qui t\'a fait trébucher, à retravailler.', errs ? `${errs} à revoir` : '')}
    ${card('tips', '💡', 'Astuces & leçons de prof', 'Erreurs classiques des francophones, méthode, astuces.', '')}
    ${card('review', '🔁', 'Réviser mes phrases', 'Cartes de phrases à rappel espacé.', due ? `${due} à revoir` : '')}
    ${card('skills', '🧭', 'Mes situations', 'Tes phrases par thème (voyage, travail…).', '')}
    ${card('add', '💾', 'Mes cartes & sauvegarde', 'Ajouter des phrases, sauvegarder, synchroniser.', '')}
    ${card('help', '❓', 'Comment utiliser l\'appli', 'Le mode d\'emploi en 5 minutes.', '')}
  </div>
  <p class="hub-foot">Ta progression est enregistrée sur cet appareil. Pense à la sauvegarder : <button type="button" class="kj-link" data-go-link="add">Mes cartes & sauvegarde</button>.</p>`;
  wire(area);
  area.querySelector('[data-go-link]').addEventListener('click', () => showView('add'));
}
