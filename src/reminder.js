import { meta, saveMeta, todayStr } from './storage.js';

// ---------- Rappel quotidien ----------
// Une appli web ne peut PAS réveiller le téléphone quand elle est fermée sans serveur de notifications.
// Deux solutions honnêtes : (1) un événement de calendrier quotidien avec alarme (fichier .ics) :
// c'est le plus fiable, il marche appli fermée ; (2) une notification tant que l'appli est ouverte.
const SITE = 'https://sraniry.github.io/jpn101/';
const cfg = () => Object.assign({ time: '19:00', notif: false, notifiedOn: '' }, meta.reminder || {});

export function reminderHtml(){
  const c = cfg();
  const canNotif = 'Notification' in window;
  return `<div class="rm-box"><h4>⏰ Rappel quotidien</h4>
    <p>Choisis une heure. Le plus fiable : ajoute-la à ton calendrier (iPhone, Mac, Google Agenda). Tu auras une alarme chaque jour, même appli fermée.</p>
    <div class="rm-row"><label>Heure : <input type="time" id="rmTime" value="${c.time}"></label>
      <button class="continue-btn" id="rmIcs">📅 Ajouter à mon calendrier</button></div>
    ${canNotif ? `<label class="rm-notif"><input type="checkbox" id="rmNotif" ${c.notif ? 'checked' : ''}> Aussi une notification quand l'appli est ouverte et que tu n'as pas encore étudié</label>` : ''}
    <p class="rm-small">Fichier .ics : touche-le sur iPhone, ou double-clique sur Mac, puis « Ajouter ». L'événement se répète tous les jours ; tu peux le supprimer dans ton calendrier.</p>
  </div>`;
}

function icsFor(time){
  const [h, m] = time.split(':');
  const d = new Date(); const p = n => String(n).padStart(2, '0');
  const day = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z/, 'Z');
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nihongo Kyoto//FR', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    'UID:nihongo-quotidien@sraniry.github.io', `DTSTAMP:${stamp}`, `DTSTART:${day}T${p(h)}${p(m)}00`, 'DURATION:PT45M', 'RRULE:FREQ=DAILY',
    'SUMMARY:日本語 : programme du jour', 'DESCRIPTION:Kanji\\, révisions\\, dialogue et défi du jour (45 min). ' + SITE, `URL:${SITE}`,
    'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:日本語の時間 !', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}

export function wireReminder(root){
  const t = root.querySelector('#rmTime'); if(!t) return;
  t.addEventListener('change', () => { meta.reminder = Object.assign(cfg(), { time: t.value || '19:00' }); saveMeta(); });
  root.querySelector('#rmIcs').addEventListener('click', () => {
    const time = t.value || '19:00'; meta.reminder = Object.assign(cfg(), { time }); saveMeta();
    const blob = new Blob([icsFor(time)], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'rappel-japonais.ics'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  });
  const n = root.querySelector('#rmNotif');
  if(n) n.addEventListener('change', async () => {
    if(n.checked){
      let perm = Notification.permission;
      if(perm === 'default') perm = await Notification.requestPermission();
      if(perm !== 'granted'){ n.checked = false; alert('Les notifications sont bloquées pour ce site dans ton navigateur.'); return; }
    }
    meta.reminder = Object.assign(cfg(), { notif: n.checked }); saveMeta();
  });
}

// Vérifie chaque minute (appli ouverte uniquement).
export function initReminderLoop(){
  setInterval(async () => {
    const c = cfg();
    if(!c.notif || !('Notification' in window) || Notification.permission !== 'granted') return;
    const now = new Date(), today = todayStr();
    if(c.notifiedOn === today || meta.lastStudyDate === today) return;
    const [h, m] = c.time.split(':').map(Number);
    if(now.getHours() < h || (now.getHours() === h && now.getMinutes() < m)) return;
    meta.reminder = Object.assign(c, { notifiedOn: today }); saveMeta();
    const opts = { body: 'Ton programme du jour t\'attend : 6 kanji, un dialogue, un défi.', icon: 'icon-192.png', tag: 'nihongo-daily' };
    try{ const reg = await navigator.serviceWorker?.getRegistration(); if(reg) reg.showNotification('日本語の時間 !', opts); else new Notification('日本語の時間 !', opts); }
    catch(e){ try{ new Notification('日本語の時間 !', opts); }catch(_){} }
  }, 60000);
}
