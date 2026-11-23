// ---------- Système XP / bilan de session ----------
// XP attribué à chaque action significative. Pas de barre de niveau visible
// (trop de pression) : juste un décompte de session affiché en fin de programme du jour.
import { meta, saveMeta, todayStr } from './storage.js';

const XP_TABLE = {
  kana_quiz_ok:    5,
  kana_lesson:    20,
  kanji_new:      10,
  kanji_review:    3,
  phrase_ok:       4,
  phrase_easy:     6,
  conv_done:      15,
  challenge_ok:   10,
  lesson_done:    12,
  error_fixed:     8,
};

function todayLog(){
  if(!meta.xpLog) meta.xpLog = {};
  if(!meta.xpLog[todayStr()]) meta.xpLog[todayStr()] = { xp:0, details:{} };
  return meta.xpLog[todayStr()];
}

export function addXp(action, n = 1){
  const log = todayLog();
  const pts = (XP_TABLE[action] || 0) * n;
  if(!pts) return;
  log.xp = (log.xp || 0) + pts;
  log.details[action] = (log.details[action] || 0) + n;
  // Nettoyage : on garde seulement les 90 derniers jours pour éviter de gonfler meta.
  const keys = Object.keys(meta.xpLog).sort();
  if(keys.length > 90) keys.slice(0, keys.length - 90).forEach(k => delete meta.xpLog[k]);
  saveMeta(false);
}

export function todayXp(){
  return (meta.xpLog && meta.xpLog[todayStr()]) ? meta.xpLog[todayStr()].xp : 0;
}

export function todayDetails(){
  return (meta.xpLog && meta.xpLog[todayStr()]) ? meta.xpLog[todayStr()].details : {};
}

export function totalXp(){
  if(!meta.xpLog) return 0;
  return Object.values(meta.xpLog).reduce((s, d) => s + (d.xp || 0), 0);
}

// ---------- Bilan de session : HTML affiché à la fin du programme du jour ----------
export function sessionBilanHtml(extraKanjiAnchored = 0){
  const xp = todayXp();
  const det = todayDetails();
  const streak = meta.streak || 0;
  const rows = [];
  if(det.kana_lesson)   rows.push({ icon:'あ', label:`${det.kana_lesson} leçon${det.kana_lesson>1?'s':''} de kana`, xp: det.kana_lesson * XP_TABLE.kana_lesson });
  if(det.kanji_new)     rows.push({ icon:'漢', label:`${det.kanji_new} kanji nouveau${det.kanji_new>1?'x':''}`, xp: det.kanji_new * XP_TABLE.kanji_new });
  if(det.kanji_review)  rows.push({ icon:'🔁', label:`${det.kanji_review} révision${det.kanji_review>1?'s':''} de kanji`, xp: det.kanji_review * XP_TABLE.kanji_review });
  if(det.phrase_ok || det.phrase_easy){
    const n = (det.phrase_ok||0)+(det.phrase_easy||0);
    rows.push({ icon:'💬', label:`${n} phrase${n>1?'s':''} revue${n>1?'s':''}`, xp: (det.phrase_ok||0)*XP_TABLE.phrase_ok + (det.phrase_easy||0)*XP_TABLE.phrase_easy });
  }
  if(det.conv_done)     rows.push({ icon:'🗣️', label:`${det.conv_done} dialogue${det.conv_done>1?'s':''} terminé${det.conv_done>1?'s':''}`, xp: det.conv_done * XP_TABLE.conv_done });
  if(det.challenge_ok)  rows.push({ icon:'🎯', label:`Défi du jour réussi`, xp: XP_TABLE.challenge_ok });
  if(det.lesson_done)   rows.push({ icon:'📘', label:`Leçon de grammaire`, xp: XP_TABLE.lesson_done });
  if(det.error_fixed)   rows.push({ icon:'❗', label:`${det.error_fixed} erreur${det.error_fixed>1?'s':''} retravaillée${det.error_fixed>1?'s':''}`, xp: det.error_fixed * XP_TABLE.error_fixed });

  if(!rows.length && !xp) return '';

  const streakBit = streak >= 2
    ? `<div class="sb-streak">🔥 Série : <b>${streak} jour${streak>1?'s':''} d'affilée</b></div>`
    : '';

  const rowsHtml = rows.map(r =>
    `<div class="sb-row"><span class="sb-icon">${r.icon}</span><span class="sb-label">${r.label}</span><span class="sb-pts">+${r.xp} XP</span></div>`
  ).join('');

  return `<div class="session-bilan" aria-label="Bilan de session">
    <div class="sb-top">
      <span class="sb-emoji">⭐</span>
      <div><div class="sb-total"><b>${xp}</b> XP aujourd'hui</div><div class="sb-sub">Session terminée</div></div>
    </div>
    ${rowsHtml ? `<div class="sb-rows">${rowsHtml}</div>` : ''}
    ${streakBit}
  </div>`;
}
