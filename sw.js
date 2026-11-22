const CACHE = 'nihongo-v45';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './src/main.js',
  './src/storage.js',
  './src/badges.js',
  './src/encouragement.js',
  './src/romajiToggle.js',
  './src/cloudsync.js',
  './src/merge.js',
  './src/tts.js',
  './src/strokes.js',
  './src/reminder.js',
  './src/util.js',
  './src/views/skills.js',
  './src/views/review.js',
  './src/views/conversation.js',
  './src/views/reading.js',
  './src/views/grammar.js',
  './src/views/manage.js',
  './src/views/kana.js',
  './src/views/today.js',
  './src/views/listening.js',
  './src/views/jlpt.js',
  './src/views/kanji.js',
  './src/views/menus.js',
  './data/jlpt-n5.js',
  './data/jlpt-n4.js',
  './data/jlpt-n4-vocab.js',
  './data/jlpt-n4-grammar.js',
  './data/jlpt-n4-listening.js',
  './data/jlpt-pieges.js',
  './data/conv-breakdowns.js',
  './data/jlpt-kanji-sentences.js',
  './data/kanji-radicals.js',
  './data/phrases.js',
  './data/kanji-joyo.js',
  './data/kanji-strokes.json',
  './data/menus.js',
  './data/kyoto-kit.js',
  './data/kanji-words.js',
  './data/beginner-convs.js',
  './data/grammar.js',
  './data/grammar-drills.js',
  './data/kana.js',
  './src/nav.js',
  './src/views/hubs.js',
  './src/views/path.js',
  './src/views/progress.js',
  './src/views/tips.js',
  './src/views/lessons.js',
  './src/views/onboarding.js',
  './data/tips.js',
  './data/mistakes.js',
  './data/lessons.js',
  './data/summary.js',
  './data/ask-lexicon.js',
  './data/confusables.js',
  './data/reading-texts.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE && k !== 'fonts').map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Réseau d'abord (pour voir les mises à jour tout de suite), mais avec un délai de 3 s : sur un réseau
  // lent (« lie-fi »), on sert le cache au lieu de laisser l'appli se figer.
  if(e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if(u.origin !== self.location.origin){
    // Autres origines : Firestore/Firebase ne sont JAMAIS touchés (le délai de 3 s doublerait leurs requêtes).
    // Seules les polices Google sont mises en cache, pour que le texte garde sa forme hors ligne.
    if(u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com'){
      e.respondWith(caches.open('fonts').then(c => c.match(e.request).then(r => r || fetch(e.request).then(n => { if(n && (n.ok || n.type === 'opaque')) c.put(e.request, n.clone()); return n; }))));
    }
    return;
  }
  e.respondWith(
    Promise.race([
      fetch(e.request, { cache: 'no-cache' }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 3000)),
    ]).catch(() => caches.match(e.request).then(r => r || fetch(e.request)))
  );
});
