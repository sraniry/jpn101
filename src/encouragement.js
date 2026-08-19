// ---------- Encouragements façon professeur ----------
// Des messages courts et spécifiques, jamais un simple "bravo" générique, déclenchés aux
// vrais moments de progrès (pas à chaque carte — ça deviendrait du bruit). Plusieurs
// variantes par contexte pour ne pas se répéter mot pour mot d'une session à l'autre.
// Principes (validés avec l'utilisatrice) : toujours nommer précisément ce qui a été fait,
// jamais de louange vide, jamais de ton négatif sur une erreur ou une pause — la reformuler
// comme une étape normale et utile de l'apprentissage.

function pick(pool){ return pool[Math.floor(Math.random()*pool.length)]; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

const POOLS = {
  badge: [
    "Ce genre de régularité, c'est exactement ce qui fait la différence sur 6 mois.",
    "Tu ne le vois pas jour après jour, mais regarde le chemin parcouru.",
    "C'est le genre de palier qu'on n'atteint pas par hasard — bien joué.",
    "Continue comme ça : c'est précisément cette constance qui paiera à Kyoto.",
  ],
  streak: [
    "Ne casse pas la chaîne — elle se reconstruit doucement à chaque interruption.",
    "La régularité s'installe. C'est elle qui fait tout le travail, pas l'intensité.",
    "Chaque jour compte plus que tu ne le penses — le cerveau adore la répétition espacée.",
  ],

  // ---------- 1. Session de révision SRS ----------
  // Choisi selon les vraies stats de la séance (voir review.js) : particules ratées,
  // notes majoritairement bonnes, ou simple décompte réel.
  reviewCount: [
    "Tu viens d'enchaîner {n} cartes sans t'arrêter — c'est cette régularité-là qui construit la mémoire à long terme, pas les sessions marathon occasionnelles.",
    "{n} cartes revues d'affilée. C'est en accumulant des séances comme celle-ci que le vocabulaire devient réflexe.",
    "Séance de {n} cartes bouclée. Ton cerveau va consolider tout ça cette nuit — c'est le vrai moment où l'apprentissage se fixe.",
    "{n} cartes en une session. Tu peux t'arrêter là l'esprit tranquille, ou continuer si tu es lancée.",
  ],
  reviewGoodGrades: [
    "La plupart de tes cartes sont passées en 'Bien' ou 'Facile' ce soir — ce vocabulaire est en train de devenir automatique.",
    "Séance solide : tes bonnes réponses dominent largement. C'est le signe que ça rentre vraiment, pas par hasard.",
    "Beaucoup de cartes évaluées 'Facile' aujourd'hui — le travail des dernières semaines paie.",
  ],
  reviewParticleMistakes: [
    "Tu as buté plusieurs fois sur des particules ce soir — normal, c'est le point le plus contre-intuitif du japonais pour un francophone. Les revoir maintenant, c'est le bon réflexe, pas un échec.",
    "Pas mal d'hésitations sur は/が/を/に aujourd'hui : ces particules-là déroutent tous les francophones au début. Ça se travaille, et tu es justement en train de le faire.",
    "Les particules t'ont donné du fil à retordre cette fois — c'est la partie la plus abstraite du japonais, aucun apprenant n'y échappe. Continue à les croiser, ça se fixe avec la répétition.",
  ],
  reviewCaughtUp: [
    "Tu as tout revu pour aujourd'hui — c'est exactement le rythme qu'il faut tenir.",
    "Rien en attente. Reviens demain, ou explore une autre section si tu as encore de l'énergie.",
  ],

  kanaLesson: [
    "Cette ligne est ancrée. La suivante va te sembler plus simple, comme toujours.",
    "Un pas de plus vers la lecture automatique — c'est exactement comme ça qu'on y arrive.",
    "Bien vu. Dans quelques semaines, tu ne te souviendras même plus d'avoir dû l'apprendre.",
  ],

  // ---------- 5. Tous les kana (46 sons, hiragana + katakana ensemble) ----------
  allKana: [
    "Tu connais maintenant les 46 sons de base, en hiragana et en katakana. C'est la fondation de toute lecture japonaise — à partir de maintenant, tout ce que tu liras s'appuiera là-dessus.",
    "Parcours kana terminé. Ce que tu viens de faire, beaucoup de gens qui abandonnent le japonais ne le font jamais — l'alphabet est passé, la vraie langue commence.",
    "Les kana sont acquis. Ce sera vite invisible — dans quelques semaines, tu ne te souviendras même plus d'avoir dû les apprendre un par un.",
  ],

  // ---------- 2. Dialogue terminé ----------
  dialogue: [
    "Tu viens de faire de vrais choix dans une situation de conversation, pas juste répété une phrase modèle — c'est la compétence la plus dure à muscler, et tu viens de t'entraîner dessus.",
    "Produire une phrase en contexte vaut dix phrases relues passivement — tu viens de le faire.",
    "C'est exactement ce type d'échange qui t'attend à Kyoto. Tu es prête pour une variante.",
    "Dialogue bouclé. La prochaine fois, essaie de répondre avant même de lire les choix — c'est le vrai test.",
  ],
  dialogueBest: [
    "Toutes tes réponses dans ce dialogue étaient les plus naturelles possibles — tu commences à sentir le ton, pas juste la grammaire.",
    "Un sans-faute sur le naturel des réponses. Tu as un bon instinct pour repérer le ton juste — continue comme ça.",
    "Toutes tes réponses étaient les plus idiomatiques du lot. Ça, ça ne s'apprend pas dans un manuel — bravo pour l'oreille.",
  ],
  dialogueWeak: [
    "Une ou deux réponses un peu littérales dans ce dialogue, rien de grave — c'est en tâtonnant sur le ton qu'on apprend ce qu'aucun manuel n'explique vraiment. Rejoue-le si tu veux comparer.",
    "Certains choix étaient corrects mais pas les plus naturels — pas un problème, juste une occasion de voir la différence. Le sens passait, c'est déjà l'essentiel.",
    "Pas grave du tout : chaque dialogue où tu tâtonnes sur le ton t'apprend quelque chose que la théorie seule n'enseigne jamais. Rejoue-le si tu veux.",
  ],

  grammarDrill: [
    "Règle validée. La vraie preuve, ce sera de l'utiliser sans y penser, en conversation.",
    "Tu viens de transformer une explication en réflexe — c'est tout l'intérêt du drill.",
    "Bien joué. Cette règle-là revient sans arrêt à l'oral, tu la reconnaîtras vite.",
  ],

  // ---------- 3. Compétence maîtrisée (5/5) ----------
  skillMastered: [
    "Tu maîtrises maintenant complètement {theme}. Il y a encore quelques semaines, ces phrases t'étaient inconnues — aujourd'hui elles sont acquises. C'est un vrai jalon, pas un simple badge.",
    "{theme} est bouclé à 100 %. Ce n'est pas rien : c'est du vocabulaire que tu peux maintenant utiliser sans y réfléchir.",
    "Compétence maîtrisée : {theme}. Ça se voit rarement d'un coup, mais regarde d'où tu pars — c'est le résultat de toutes ces petites séances.",
  ],

  quizHigh: [
    "Score solide — tu es clairement au-dessus du niveau où tu devines encore.",
    "C'est le genre de résultat qui doit te rassurer : ça rentre, vraiment.",
    "Très bon score. Le prochain défi, c'est de le refaire sans hésitation sur aucune question.",
  ],
  quizLow: [
    "Normal en phase d'apprentissage — le score n'est qu'un indicateur, pas un jugement.",
    "Chaque erreur ici t'évite une vraie confusion à Kyoto. C'est le but de l'entraînement.",
    "Continue, ça vient avec la répétition. Personne ne démarre à 100 %.",
  ],
  // ---------- 4. Progrès JLPT mesuré contre la tentative précédente ----------
  quizImprovement: [
    "Tu es passée de {from} à {to} en {section} depuis ton dernier essai — cette progression est réelle, continue sur cette lancée.",
    "+{delta} points en {section} par rapport à ta dernière tentative. Ce que tu apprends commence vraiment à se voir sous pression.",
    "Belle progression en {section} : {from} → {to} depuis la dernière fois. Ça ne doit rien au hasard.",
  ],
  quizWeakSection: [
    "{section} te demande encore un effort — c'est normal, c'est une des parties les plus abstraites de l'examen. Concentre tes prochaines sessions dessus plutôt que de tout réviser en même temps.",
    "Le score en {section} n'a pas encore bougé, et ce n'est pas grave : cible cette section spécifiquement la prochaine fois plutôt que de tout revoir en bloc.",
  ],
  quizRecord: [
    "Meilleur score jusqu'ici sur ce quiz — ce que tu apprends commence vraiment à se voir sous pression.",
    "Nouveau record personnel. Le format complet impressionne, mais il se travaille comme le reste : par petits blocs répétés.",
  ],
  examPass: [
    "Tu serais reçue à l'examen aujourd'hui. Décembre n'a qu'à bien se tenir.",
    "C'est un vrai résultat — le format entier, sous contrainte de temps, réussi.",
  ],

  dailyProgram: [
    "Programme bouclé. C'est cette discipline-là, jour après jour, qui construit un niveau.",
    "30 minutes bien employées valent largement 3 heures une fois par semaine — tu es sur la bonne voie.",
    "Journée complète. Le cerveau progresse pendant que tu te reposes, maintenant.",
  ],

  // ---------- 6. Retour après une pause — jamais de ton punitif ----------
  welcomeBack: [
    "Ça fait quelques jours — pas de souci du tout, ce qui compte c'est de reprendre. Rien n'est perdu, tes cartes précédentes t'attendent.",
    "Contente de te revoir. Une pause ne défait pas ce que tu as appris, elle retarde juste un peu la suite.",
    "Retour après une coupure — c'est le moment normal où beaucoup abandonnent. Toi, tu es là. C'est ça qui compte.",
    "Pas de culpabilité à avoir pour ces quelques jours — reprends simplement là où tu en étais, tout est encore là.",
  ],
};

// ---------- Toast flottant ----------
let hideTimer = null;
function ensureToastEl(){
  let el = document.getElementById('teacherToast');
  if(!el){
    el = document.createElement('div');
    el.id = 'teacherToast';
    el.className = 'teacher-toast';
    document.body.appendChild(el);
    el.addEventListener('click', hideToast);
  }
  return el;
}
function hideToast(){
  const el = document.getElementById('teacherToast');
  if(el) el.classList.remove('show');
}
function showToast(emoji, title, body){
  const el = ensureToastEl();
  el.innerHTML = `<span class="tt-emoji">${emoji}</span><div class="tt-text"><b>${esc(title)}</b><span>${esc(body)}</span></div>`;
  // reflow pour garantir que la transition rejoue même si un toast précédent était affiché
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(hideToast, 6500);
}

function interpolate(str, params){
  if(!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => params[k] !== undefined ? params[k] : '');
}

/**
 * celebrate(context, {emoji, title, params})
 * context : une clé de POOLS. title/emoji personnalisent l'en-tête (ex: nom du badge).
 * params : valeurs à interpoler dans le message choisi (ex: {theme:'Voyage'}).
 */
export function celebrate(context, opts = {}){
  const pool = POOLS[context];
  if(!pool) return;
  const body = interpolate(pick(pool), opts.params);
  showToast(opts.emoji || '✨', opts.title || 'Bien joué', body);
}

// Choisit un des deux pools selon le score — pour les écrans de fin de quiz.
export function quizLine(pct){
  return pick(pct >= 80 ? POOLS.quizHigh : POOLS.quizLow);
}
