// Tests automatiques : node tests/run.mjs  (aucune dépendance)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let fails = 0; const ok = (c, m) => { if(!c){ console.error('✗', m); fails++; } else console.log('✓', m); };
const imp = f => import(pathToFileURL(path.join(root, f)).href);

// 1. SRS : après un oubli, « Bien » ne doit jamais donner 0 jour
globalThis.document = { getElementById: () => null }; globalThis.window = { addEventListener(){}, dispatchEvent(){} };
globalThis.localStorage = { getItem: () => null, setItem(){} }; globalThis.CustomEvent = class {};
const st = await imp('src/storage.js');
const card = { interval: 0, ease: 2.5, reps: 0, due: 0 };
[2, 2, 2, 0, 2, 2].forEach(g => st.rate(card, g));
ok(card.interval >= 1, 'SRS : après un oubli, Bien redonne au moins 1 jour (interval=' + card.interval + ')');
const c2 = { interval: 0, ease: 2.5, reps: 0, due: 0 }; [2, 2, 0, 3].forEach(g => st.rate(c2, g));
ok(c2.interval >= 2, 'SRS : Facile après oubli >= 2 jours');

// 2. Date locale
const d = new Date(); const p = n => String(n).padStart(2, '0');
ok(st.todayStr() === `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`, 'todayStr() est la date locale');

// 3. Données : invariants
const { KANJI_DECK, RADICALS } = await imp('data/kanji-joyo.js');
ok(KANJI_DECK.length === 2136 && new Set(KANJI_DECK.map(k => k.k)).size === 2136, '2136 kanji uniques');
ok(RADICALS.filter(r => r.starter).length === 51, '51 radicaux de base');
ok(KANJI_DECK.every(k => k.ex && k.ex[0].includes(k.k)), 'chaque mot d\'exemple contient son kanji');
const { KANJI_WORDS } = await imp('data/kanji-words.js'); const set = new Set(KANJI_DECK.map(k => k.k));
ok(KANJI_WORDS.every(w => [...w.jp].filter(c => /[㐀-䶿一-鿿]/.test(c)).every(c => set.has(c))), 'mots : tous les kanji sont dans le paquet');
for(const [f, ex] of [['data/menus.js', 'MENU_ASK'], ['data/kyoto-kit.js', 'KIT_ASK']]){ const m = await imp(f); ok(m[ex].every(q => q.choices[0] === q.ok && new Set(q.choices).size === q.choices.length), `${ex} : ok en premier, choix distincts`); }
const { LESSONS } = await imp('data/lessons.js');
ok(LESSONS.length === 11 && LESSONS.every(l => l.drill.length === 6 && l.drill.every(q => q.choices[0] === q.ok && new Set(q.choices).size === 4)), '11 leçons, 6 questions valides chacune');
const { MISTAKES } = await imp('data/mistakes.js'); ok(MISTAKES.length === 30 && MISTAKES.every(m => m.drill.choices[0] === m.drill.ok), '30 erreurs classiques valides');

// 4. Service worker : tous les fichiers précachés existent
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8'); const assets = [...sw.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]);
const missing = assets.filter(a => a && !fs.existsSync(path.join(root, a)));
ok(missing.length === 0, 'sw.js : tous les fichiers précachés existent' + (missing.length ? ' (manquants : ' + missing.join(', ') + ')' : ''));
const files = [...fs.readdirSync(path.join(root, 'src')).filter(f => f.endsWith('.js')).map(f => 'src/' + f), ...fs.readdirSync(path.join(root, 'src/views')).map(f => 'src/views/' + f)];
const notCached = files.filter(f => !assets.includes(f)); ok(notCached.length === 0, 'sw.js : tous les modules src/ sont précachés' + (notCached.length ? ' (oubliés : ' + notCached.join(', ') + ')' : ''));
process.exit(fails ? 1 : 0);
