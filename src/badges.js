import { phrases, meta, getKanaPath, getConvDone, getExamHistory, bestQuizScore } from './storage.js';
import { CONVERSATIONS, CORE_SET } from '../data/phrases.js';
import { KANA_LESSONS } from './views/kana.js';

// ---------- Badges ----------
// Chaque badge est calculé à la volée depuis la progression réelle (aucun état dupliqué).
// `progress` renvoie [fait, objectif] pour afficher une barre même quand le badge n'est pas encore acquis :
// voir la marche restante motive davantage qu'un badge grisé sans information.

const totalConversations = () => CONVERSATIONS.filter(c => c.id && Array.isArray(c.turns)).length;

export const BADGES = [
  {
    id:'kana-half', icon:'あ', title:'Moitié des kana',
    desc:'Valide la moitié des leçons de l\'alphabet',
    progress: () => [getKanaPath().done.length, Math.ceil(KANA_LESSONS.length/2)],
  },
  {
    id:'kana-all', icon:'🈶', title:'Tous les kana',
    desc:'Valide les 12 leçons hiragana + katakana',
    progress: () => [getKanaPath().done.length, KANA_LESSONS.length],
  },
  {
    id:'conv-3', icon:'💬', title:'Premiers dialogues',
    desc:'Termine 3 dialogues différents',
    progress: () => [getConvDone().length, 3],
  },
  {
    id:'conv-10', icon:'🗣️', title:'Bavarde',
    desc:'Termine 10 dialogues différents',
    progress: () => [getConvDone().length, 10],
  },
  {
    id:'conv-all', icon:'🎭', title:'Tous les dialogues',
    desc:'Termine les ' + totalConversations() + ' dialogues',
    progress: () => [getConvDone().length, totalConversations()],
  },
  {
    id:'core-mastered', icon:'⭐', title:'Pareto bouclé',
    desc:'Maîtrise les phrases ⭐ essentielles (intervalle ≥ 7 jours)',
    progress: () => {
      const core = phrases.filter(p => CORE_SET.has(p.jp));
      return [core.filter(p => p.interval >= 7).length, Math.max(1, core.length)];
    },
  },
  {
    id:'srs-50', icon:'🔁', title:'50 cartes ancrées',
    desc:'50 cartes avec un intervalle ≥ 7 jours',
    progress: () => [phrases.filter(p => p.interval >= 7).length, 50],
  },
  {
    id:'srs-200', icon:'🧠', title:'200 cartes ancrées',
    desc:'200 cartes avec un intervalle ≥ 7 jours',
    progress: () => [phrases.filter(p => p.interval >= 7).length, 200],
  },
  {
    id:'streak-7', icon:'🔥', title:'Une semaine',
    desc:'7 jours d\'affilée',
    progress: () => [meta.streak || 0, 7],
  },
  {
    id:'streak-30', icon:'🏮', title:'Un mois',
    desc:'30 jours d\'affilée',
    progress: () => [meta.streak || 0, 30],
  },
  {
    id:'ear-90', icon:'👂', title:'Oreille affûtée',
    desc:'≥ 90 % à un quiz d\'écoute',
    progress: () => { const b = bestQuizScore('listening'); return [b && b.pct >= 0.9 ? 1 : 0, 1]; },
  },
  {
    id:'exam-pass', icon:'🎓', title:'Examen blanc réussi',
    desc:'≥ 80/180 avec toutes les sections au-dessus du seuil',
    progress: () => [getExamHistory().filter(r => r.passed).length ? 1 : 0, 1],
  },
];

export function badgeState(){
  return BADGES.map(b => {
    const [done, goal] = b.progress();
    const clamped = Math.min(done, goal);
    return { ...b, done: clamped, goal, earned: clamped >= goal, pct: Math.min(100, Math.round((clamped/goal)*100)) };
  });
}

export function earnedCount(){ return badgeState().filter(b => b.earned).length; }

// Badges nouvellement acquis depuis le dernier passage — pour l'annonce visuelle.
export function popNewlyEarned(){
  const seen = meta.badgesSeen || [];
  const earned = badgeState().filter(b => b.earned).map(b => b.id);
  const fresh = earned.filter(id => !seen.includes(id));
  if(fresh.length){ meta.badgesSeen = earned; }
  return fresh;
}

export function badgesHtml(){
  const state = badgeState();
  const earned = state.filter(b => b.earned).length;
  return `<div class="badge-head"><h4 class="kana-table-title" style="margin:0;">🏅 Badges</h4><span class="badge-count">${earned}/${state.length}</span></div>
    <div class="badge-grid">
      ${state.map(b => `<div class="badge-card ${b.earned ? 'is-earned' : ''}" title="${b.desc}">
        <span class="bc-icon">${b.icon}</span>
        <span class="bc-title">${b.title}</span>
        <span class="bc-desc">${b.desc}</span>
        ${b.earned
          ? `<span class="bc-status">✓ Obtenu</span>`
          : `<div class="bc-track"><div class="bc-fill" style="width:${b.pct}%"></div></div><span class="bc-status">${b.done}/${b.goal}</span>`}
      </div>`).join('')}
    </div>`;
}
