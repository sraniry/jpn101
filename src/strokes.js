// ---------- Ordre des traits : animation à partir de KanjiVG ----------
// Tracés : KanjiVG (Ulrich Apel et contributeurs), licence CC BY-SA 3.0, kanjivg.tagaini.net.
let DATA = null, loading = null;
export function loadStrokes(){
  if(DATA) return Promise.resolve(DATA);
  if(!loading) loading = fetch('data/kanji-strokes.json').then(r => { if(!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).then(d => (DATA = d)).catch(e => { loading = null; throw e; });
  return loading;
}

const NS = 'http://www.w3.org/2000/svg';
const startOf = d => { const m = d.match(/^M\s*(-?[\d.]+)[ ,]\s*(-?[\d.]+)/); return m ? [parseFloat(m[1]), parseFloat(m[2])] : [0, 0]; };

// Monte le widget dans `box`. Renvoie une fonction d'arrêt.
export async function mountStrokes(box, k){
  box.innerHTML = '<div class="kj-stroke-load">Chargement du tracé…</div>';
  let data;
  try{ data = await loadStrokes(); }catch(e){ box.innerHTML = '<div class="kj-stroke-load">Tracé indisponible hors ligne pour l\'instant.</div>'; return () => {}; }
  const paths = (data[k] || '').split('|').filter(Boolean);
  if(!paths.length){ box.innerHTML = '<div class="kj-stroke-load">Pas de tracé pour ce kanji.</div>'; return () => {}; }
  box.innerHTML = `<div class="kj-stroke-wrap">
    <svg class="kj-svg" viewBox="0 0 109 109" aria-label="Ordre des traits de ${k}"></svg>
    <div class="kj-stroke-ctl">
      <button type="button" data-a="replay" title="Rejouer l'animation">▶ Rejouer</button>
      <button type="button" data-a="prev" title="Trait précédent">◀</button>
      <span class="kj-stroke-n"></span>
      <button type="button" data-a="next" title="Trait suivant">▶</button>
      <button type="button" data-a="all" title="Tout afficher">Tout</button>
    </div></div>`;
  const svg = box.querySelector('svg'), label = box.querySelector('.kj-stroke-n');
  const mk = (n, attrs) => { const e = document.createElementNS(NS, n); Object.entries(attrs).forEach(([a, v]) => e.setAttribute(a, v)); return e; };
  svg.appendChild(mk('line', { x1: 54.5, y1: 0, x2: 54.5, y2: 109, class: 'kj-guide' }));
  svg.appendChild(mk('line', { x1: 0, y1: 54.5, x2: 109, y2: 54.5, class: 'kj-guide' }));
  const els = paths.map((d, i) => {
    const p = mk('path', { d, class: 'kj-stroke', pathLength: 1 });
    p.style.strokeDasharray = 1; p.style.strokeDashoffset = 1; svg.appendChild(p); return p;
  });
  const nums = paths.map((d, i) => { const [x, y] = startOf(d); const t = mk('text', { x: x - 3, y: y - 2, class: 'kj-snum' }); t.textContent = i + 1; t.style.opacity = 0; svg.appendChild(t); return t; });

  let raf = null, token = 0;
  const N = els.length;
  const setState = (shown, cur) => { // shown : nb de traits entièrement tracés ; cur : trait en cours (0..1)
    els.forEach((p, i) => {
      p.classList.toggle('is-current', i === shown);
      p.style.strokeDashoffset = i < shown ? 0 : (i === shown ? 1 - cur : 1);
      nums[i].style.opacity = i < shown || (i === shown && cur > 0.05) ? 1 : 0;
    });
    label.textContent = shown >= N ? `${N} traits` : `Trait ${Math.min(shown + 1, N)} / ${N}`;
  };
  const stop = () => { token++; if(raf) cancelAnimationFrame(raf); raf = null; };
  const play = () => {
    stop(); const my = token; let i = 0, t0 = performance.now();
    const dur = Math.max(450, 650); setState(0, 0);
    const tick = now => {
      if(my !== token) return;
      const c = Math.min(1, (now - t0) / dur);
      setState(i, c);
      if(c >= 1){ i++; t0 = now + 180; if(i >= N){ setState(N, 0); return; } }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  };
  let shown = 0;
  box.querySelector('.kj-stroke-ctl').addEventListener('click', e => {
    const a = e.target.dataset && e.target.dataset.a; if(!a) return; e.stopPropagation();
    if(a === 'replay'){ shown = 0; play(); return; }
    stop();
    if(a === 'next') shown = Math.min(N, shown + 1);
    if(a === 'prev') shown = Math.max(0, shown - 1);
    if(a === 'all') shown = N;
    setState(shown, 0);
    if(shown > 0 && shown < N) els[shown - 1].classList.remove('is-current');
  });
  play();
  return stop;
}

// Branche tous les boutons ✍️ d'un conteneur.
export function wireStrokeButtons(root){
  root.querySelectorAll('.kj-stroke-btn').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const box = b.nextElementSibling;
    if(box.dataset.open){ box.innerHTML = ''; delete box.dataset.open; b.textContent = '✍️ Ordre des traits'; return; }
    box.dataset.open = '1'; b.textContent = '✖ Masquer le tracé';
    mountStrokes(box, b.dataset.k);
  }));
}
