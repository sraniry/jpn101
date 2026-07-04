const CACHE = 'nihongo-v4';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './src/main.js',
  './src/storage.js',
  './src/tts.js',
  './src/util.js',
  './src/views/skills.js',
  './src/views/review.js',
  './src/views/shadow.js',
  './src/views/conversation.js',
  './src/views/reading.js',
  './src/views/grammar.js',
  './src/views/manage.js',
  './src/views/kana.js',
  './data/phrases.js',
  './data/grammar.js',
  './data/kana.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first pour les modules ES (dev friendly), cache sinon
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
