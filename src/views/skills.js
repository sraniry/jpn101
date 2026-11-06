import { phrases, getMasteredSkillsSeen, markSkillMasteredSeen } from '../storage.js';
import { CORE_SET, CONVERSATIONS } from '../../data/phrases.js';
import { escapeHtml, emptyState } from '../util.js';
import { setListFilterTag } from './manage.js';
import { setReviewFilterTag } from './review.js';
import { openConversation } from './conversation.js';
import { badgesHtml } from '../badges.js';
import { celebrate } from '../encouragement.js';

// ---------- skills dashboard ----------
const SKILL_META = {
  'général': {icon:'🗣️', label:'Bases & politesse'},
  'voyage': {icon:'✈️', label:'Voyage & transports'},
  'travail': {icon:'💼', label:'Travail'},
  'étude': {icon:'📚', label:'Université'},
  'relation': {icon:'🤝', label:'Vie sociale'},
  'panneaux': {icon:'🪧', label:'Lecture des panneaux'}
};
function skillLevel(pct){ if(pct>=100) return 5; if(pct>=75) return 4; if(pct>=50) return 3; if(pct>=25) return 2; return pct>0?1:0; }

export function renderSkills(){
  const area = document.getElementById('skillsArea');
  if(phrases.length === 0){
    area.innerHTML = `<div class="skills-intro">Importe le pack A0 → A2 dans « Mes phrases » pour voir tes compétences se remplir ici.</div>` + emptyState('Aucune compétence encore', 'Va dans « Mes phrases » et importe au moins le niveau A0.');
    return;
  }
  const byTag = {};
  phrases.forEach(p=>{ (byTag[p.tag] = byTag[p.tag] || []).push(p); });
  let html = `<div class="skills-intro">Chaque compétence regroupe des phrases par situation réelle. Une carte est « maîtrisée » dès qu'elle a un intervalle de révision ≥ 7 jours. Avec 30 min/jour, vise 1 compétence au niveau 5 par semaine.</div>`;
  html += `<div class="pareto-banner">⭐ <b>Pareto 20/80 :</b> les phrases marquées ⭐ sont les ~20% qui couvrent ~80% des situations réelles. Si tu es limité(e) en temps, maîtrise-les en priorité — elles se retrouvent dans presque toutes les compétences ci-dessous.</div>`;
  html += `<div class="skill-grid">`;
  const seenMastered = getMasteredSkillsSeen();
  let newlyMastered = null; // un seul toast même si plusieurs passent à 5/5 au même rendu
  Object.keys(byTag).sort((a,b)=> byTag[b].length - byTag[a].length).forEach(tag=>{
    const list = byTag[tag];
    const mastered = list.filter(p=>p.interval >= 7).length;
    const pct = Math.round((mastered/list.length)*100);
    const lvl = skillLevel(pct);
    const meta = SKILL_META[tag] || {icon:'📁', label:tag};
    const coreCount = list.filter(p=>CORE_SET.has(p.jp)).length;
    if(lvl >= 5 && !seenMastered.includes(tag) && !newlyMastered) newlyMastered = { tag, label: meta.label };
    html += `<div class="skill-card" data-tag="${tag}">
      <div class="skill-head"><h4>${meta.icon} ${escapeHtml(meta.label)}${coreCount?`<span class="star-pill">⭐ ${coreCount}</span>`:''}</h4><span class="skill-level">Niveau ${lvl}/5</span></div>
      <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${pct}%"></div></div>
      <div class="skill-meta"><span>${mastered}/${list.length} maîtrisées</span><span>${pct}%</span></div>
      ${lvl===3 ? `<button class="skill-challenge skill-challenge-btn" data-tag="${tag}">🎯 Mini-défi débloqué — tente une conversation sur ce thème →</button>` : ''}
      ${lvl>=5 ? `<div class="skill-challenge">🏆 Compétence maîtrisée !</div>` : ''}
    </div>`;
  });
  html += `</div>`;
  if(newlyMastered){
    markSkillMasteredSeen(newlyMastered.tag);
    celebrate('skillMastered', { emoji:'🏆', title:'Compétence maîtrisée', params:{ theme: newlyMastered.label } });
  }
  html += badgesHtml();
  area.innerHTML = html;
  area.querySelectorAll('.skill-card').forEach(c=>{
    c.addEventListener('click', e=>{
      if(e.target.closest('.skill-challenge-btn')) return; // handled separately
      setReviewFilterTag(c.dataset.tag); setListFilterTag(c.dataset.tag);
      document.querySelector('nav.tabs button[data-view="review"]').click();
    });
  });
  area.querySelectorAll('.skill-challenge-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.stopPropagation();
      const tag = btn.dataset.tag;
      const conv = CONVERSATIONS.find(c => c.skill === tag && Array.isArray(c.turns));
      if(!conv) return;
      document.querySelector('nav.tabs button[data-view="conversation"]').click();
      openConversation(conv.id);
    });
  });
}
