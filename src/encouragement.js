// ---------- Encouragements façon professeur ----------
// Des messages courts et spécifiques, jamais un simple "bravo" générique, déclenchés aux
// vrais moments de progrès (pas à chaque carte — ça deviendrait du bruit). Plusieurs
// variantes par contexte pour ne pas se répéter mot pour mot d'une session à l'autre.

function pick(pool){ return pool[Math.floor(Math.random()*pool.length)]; }

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
  reviewGoal: [
    "Ton cerveau va consolider tout ça cette nuit — c'est le vrai moment où l'apprentissage se fixe.",
    "Séance solide. C'est en accumulant des journées comme celle-ci que le vocabulaire devient réflexe.",
    "Objectif du jour atteint. Tu peux t'arrêter là l'esprit tranquille, ou continuer si tu es lancée.",
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
  dialogue: [
    "Produire une phrase en contexte vaut dix phrases relues passivement — tu viens de le faire.",
    "C'est exactement ce type d'échange qui t'attend à Kyoto. Tu es prête pour une variante.",
    "Bien géré. La prochaine fois, essaie de répondre avant même de voir les choix.",
  ],
  grammarDrill: [
    "Règle validée. La vraie preuve, ce sera de l'utiliser sans y penser, en conversation.",
    "Tu viens de transformer une explication en réflexe — c'est tout l'intérêt du drill.",
    "Bien joué. Cette règle-là revient sans arrêt à l'oral, tu la reconnaîtras vite.",
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
  examPass: [
    "Tu serais reçue à l'examen aujourd'hui. Décembre n'a qu'à bien se tenir.",
    "C'est un vrai résultat — le format entier, sous contrainte de temps, réussi.",
  ],
  dailyProgram: [
    "Programme bouclé. C'est cette discipline-là, jour après jour, qui construit un niveau.",
    "30 minutes bien employées valent largement 3 heures une fois par semaine — tu es sur la bonne voie.",
    "Journée complète. Le cerveau progresse pendant que tu te reposes, maintenant.",
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
  el.innerHTML = `<span class="tt-emoji">${emoji}</span><div class="tt-text"><b>${title}</b><span>${body}</span></div>`;
  // reflow pour garantir que la transition rejoue même si un toast précédent était affiché
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(hideToast, 5500);
}

/**
 * celebrate(context, {emoji, title, extra})
 * context : une clé de POOLS. title/emoji personnalisent l'en-tête (ex: nom du badge).
 */
export function celebrate(context, opts = {}){
  const pool = POOLS[context];
  if(!pool) return;
  const body = pick(pool);
  showToast(opts.emoji || '✨', opts.title || 'Bien joué', body);
}

// Choisit un des deux pools selon le score — pour les écrans de fin de quiz.
export function quizLine(pct){
  return pick(pct >= 80 ? POOLS.quizHigh : POOLS.quizLow);
}
