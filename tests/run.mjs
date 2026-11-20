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
ok(LESSONS.length === 12 && LESSONS.every(l => l.drill.length === 6 && l.drill.every(q => q.choices[0] === q.ok && new Set(q.choices).size === 4)), '12 leçons, 6 questions valides chacune');
const { MISTAKES } = await imp('data/mistakes.js'); ok(MISTAKES.length === 30 && MISTAKES.every(m => m.drill.choices[0] === m.drill.ok), '30 erreurs classiques valides');

// 4. Service worker : tous les fichiers précachés existent
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8'); const assets = [...sw.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]);
const missing = assets.filter(a => a && !fs.existsSync(path.join(root, a)));
ok(missing.length === 0, 'sw.js : tous les fichiers précachés existent' + (missing.length ? ' (manquants : ' + missing.join(', ') + ')' : ''));
const files = [...fs.readdirSync(path.join(root, 'src')).filter(f => f.endsWith('.js')).map(f => 'src/' + f), ...fs.readdirSync(path.join(root, 'src/views')).map(f => 'src/views/' + f)];
const notCached = files.filter(f => !assets.includes(f)); ok(notCached.length === 0, 'sw.js : tous les modules src/ sont précachés' + (notCached.length ? ' (oubliés : ' + notCached.join(', ') + ')' : ''));
// 5. Fusion cloud (sans réseau) + assainissement
const mg = await imp('src/merge.js');
{
  const A = [{ jp: 'あ', romaji: 'a', reps: 0, last: 200, due: 5 }], B = [{ jp: 'あ', romaji: 'a', reps: 5, last: 100, due: 9 }];
  ok(mg.mergePhrases(A, B)[0].reps === 0, 'fusion : un oubli récent bat un vieux « bien » d\'un autre appareil');
  const seed = [{ jp: 'い', romaji: 'i', reps: 0 }, { jp: 'う', romaji: 'u', reps: 0 }];
  ok(mg.mergePhrases(seed, seed.map(c => ({ ...c, id: 'x' + c.jp }))).length === 2, 'fusion : le pack de départ n\'est pas dupliqué');
  const key = st.cardKey('い', 'i');
  ok(mg.mergePhrases(seed, seed, { [key]: Date.now() + 1000 }).length === 1, 'fusion : une phrase supprimée (tombstone) ne ressuscite pas');
  ok(mg.mergePhrases([{ jp: 'い', romaji: 'i', reps: 1, last: Date.now() + 5000 }], [], { [key]: Date.now() }).length === 1, 'fusion : une carte retravaillée après la suppression revient');
  const m1 = mg.mergeMeta({ streak: 12, lastStudyDate: '2026-11-18', lastModified: 1 }, { streak: 1, lastStudyDate: '2026-11-18', lastModified: 2 });
  ok(m1.streak === 12, 'fusion : même jour → la plus longue série (12, pas 1)');
  const m2 = mg.mergeMeta({ plan: { date: 'd', reviews: 4, conv: 0, kana: false }, kanjiDaily: { date: 'd', newK: ['日'], newR: [], reviewed: 2 }, lastModified: 1 }, { plan: { date: 'd', reviews: 9, conv: 1, kana: true }, kanjiDaily: { date: 'd', newK: ['月'], newR: ['人'], reviewed: 1 }, lastModified: 2 });
  ok(m2.plan.reviews === 9 && m2.plan.kana === true && m2.kanjiDaily.newK.length === 2 && m2.kanjiDaily.newR.length === 1 && m2.kanjiDaily.reviewed === 2, 'fusion : plan et kanji du jour fusionnés (max des compteurs, union des listes)');
  const m3 = mg.mergeMeta({ lessonsDone: ['a'], studyLog: { x: 3 }, lastModified: 1 }, { lessonsDone: ['b'], studyLog: { x: 5, y: 1 }, lastModified: 2 });
  ok(m3.lessonsDone.length === 2 && m3.studyLog.x === 5 && m3.studyLog.y === 1, 'fusion : leçons unies, journal d\'étude au max');
  const many = {}; for(let i = 0; i < 400; i++) many['q|' + i] = { last: '2026-01-' + String(1 + (i % 28)).padStart(2, '0'), mastered: i % 2 === 0 };
  ok(Object.keys(mg.mergeMeta({ mistakes: many }, {}).mistakes).length <= 300, 'fusion : le journal d\'erreurs reste plafonné à 300');
  const sx = st.sanitizeState([{ jp: 'あ', id: '<img onerror=1>', reps: 'x' }, { nope: 1 }], { minutes: '<b>', streak: '5' });
  ok(sx.phrases.length === 1 && /^[A-Za-z0-9_-]+$/.test(sx.phrases[0].id) && sx.phrases[0].reps === 0 && sx.meta.minutes === 0 && sx.meta.streak === 5, 'sanitizeState : ids, nombres et entrées invalides nettoyés');
}

// 13. Contenu : dialogues débutants et fiches kanji (passe « audit n°3 »)
{
  const { BEGINNER_CONVS } = await imp('data/beginner-convs.js');
  const weak = BEGINNER_CONVS.flatMap(c => c.turns.filter(t => t.speaker === 'user').flatMap(t => t.choices.filter(ch => ch.quality !== 'best')));
  ok(weak.length > 0 && weak.every(ch => Array.isArray(ch.breakdown) && ch.breakdown.length >= 1 && ch.breakdown.every(b => b.chunk && b.role)), `dialogues b-* : les ${weak.length} choix « ok/weak » ont une explication`);
  const EXC = new Set([...'孫僕軸駒鯨琴鐘溝魂坪厘扉泡暁奴侍峠岬塀唇瞳升棺薪艶畝繭虞朕丙俺芯股餌顎柵']); // mots courants qui s'écrivent avec un seul kanji
  const alone = KANJI_DECK.filter(k => k.ex[0] === k.k && !EXC.has(k.k));
  ok(alone.length === 0, 'fiches kanji : exemple = vrai mot composé (sauf exceptions justifiées)' + (alone.length ? ' : ' + alone.map(k => k.k).join('') : ''));
  const norm = r => r.replace(/[()]/g, '');
  const dup = KANJI_DECK.filter(k => ['on', 'kun'].some(f => new Set(k[f].map(norm)).size !== k[f].length));
  ok(dup.length === 0, 'fiches kanji : pas de lecture en double' + (dup.length ? ' : ' + dup.map(k => k.k).join('') : ''));
  const noRead = KANJI_DECK.filter(k => !k.on.length && !k.kun.length);
  ok(noRead.length === 0, 'fiches kanji : au moins une lecture on ou kun');
  const first = KANJI_DECK.filter(k => k.n <= 300 && k.ex[1] && ![...k.on.slice(0, 1), ...k.kun.slice(0, 1)].some(r => k.ex[1].replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).includes(norm(r).replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60))) || k.ex[1].includes(r.split('(')[0])));
  ok(first.length < 40, `fiches kanji N5-N4 : la lecture mise en avant sert dans l'exemple (${first.length} exceptions < 40)`);
  const { GRAMMAR_HTML } = await imp('data/grammar.js');
  ok(/<details[^>]*>\s*<summary[^>]*>[^<]*Plus tard \(N4\)/.test(GRAMMAR_HTML) && !/Biiru wo/.test(GRAMMAR_HTML), 'grammaire : bloc « Plus tard (N4) » replié, を = o');
}
process.exit(fails ? 1 : 0);
