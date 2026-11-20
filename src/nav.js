// ---------- Navigation : 5 entrées (Aujourd'hui · Parcours · Apprendre · Parler · Moi) + écrans enfants ----------
// Les écrans « enfants » (kana, kanji, menus…) gardent leur section, mais s'ouvrent depuis un hub et
// affichent un bouton « ← retour ». L'historique du navigateur est utilisé : le geste « retour »
// du téléphone remonte d'un écran au lieu de quitter l'appli.
export const PARENT = {
  kana: 'learn', kanji: 'learn', lessons: 'learn', grammar: 'learn', reading: 'learn', texts: 'learn', jlpt: 'learn',
  conversation: 'speak', menus: 'speak', listening: 'speak',
  review: 'me', add: 'me', skills: 'me', progress: 'me', mistakes: 'me', tips: 'me', help: 'me',
};
export const TITLES = {
  kana: 'Alphabet (kana)', kanji: 'Kanji', lessons: 'Leçons de grammaire', grammar: 'Grammaire (référence)', reading: 'Lire des panneaux', texts: 'Petits textes', jlpt: 'Examen JLPT (optionnel)',
  conversation: 'Dialogues', menus: 'Menus & Kyoto', listening: 'Écoute',
  review: 'Réviser mes phrases', add: 'Mes cartes & sauvegarde', skills: 'Mes situations', progress: 'Mes progrès', mistakes: 'Mes erreurs', tips: 'Astuces & leçons de prof', help: 'Comment utiliser l\'appli',
};
const TOP_TITLES = { today: 'Aujourd\'hui', path: 'Mon parcours', learn: 'Apprendre', speak: 'Parler et comprendre', me: 'Moi' };
const renderers = {};
export function registerView(name, fn){ renderers[name] = fn; }
let current = 'today';
export const currentView = () => current;

export function showView(view, opts = {}){
  const section = document.getElementById('view-' + view);
  if(!section){ view = 'today'; }
  const sec = document.getElementById('view-' + view);
  document.querySelectorAll('section.view').forEach(s => s.classList.remove('active'));
  sec.classList.add('active');
  const top = PARENT[view] || view;
  document.querySelectorAll('nav.tabs button').forEach(b => {
    const on = b.dataset.view === top;
    b.classList.toggle('active', on);
    if(on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  // barre « retour » des écrans enfants
  let bar = sec.querySelector(':scope > .subbar');
  if(PARENT[view]){
    if(!bar){ bar = document.createElement('div'); bar.className = 'subbar'; sec.insertBefore(bar, sec.firstChild); }
    const par = PARENT[view];
    bar.innerHTML = `<button type="button" class="subbar-back" aria-label="Retour">← ${({ learn: 'Apprendre', speak: 'Parler', me: 'Moi' })[par]}</button><span class="subbar-title">${TITLES[view] || ''}</span>`;
    bar.querySelector('button').addEventListener('click', () => showView(par));
  } else if(bar){ bar.remove(); }
  current = view;
  const h1 = document.getElementById('pageH1'); if(h1) h1.textContent = TITLES[view] || TOP_TITLES[view] || 'Nihongo Kyoto';
  if(opts.push !== false){ try{ history.pushState({ v: view }, '', '#' + view); }catch(e){} }
  if(renderers[view]) renderers[view](opts);
  if(opts.scroll !== false) window.scrollTo({ top: 0 });
  const h = sec.querySelector('h2, h3, .subbar-title'); // focus utile pour lecteurs d'écran
  document.getElementById('main-content')?.focus?.({ preventScroll: true });
}
window.addEventListener('popstate', e => { const v = (e.state && e.state.v) || (location.hash.slice(1)) || 'today'; if(document.getElementById('view-' + v)) showView(v, { push: false }); });
