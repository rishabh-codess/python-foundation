/* ═══════════════════════════════════════════════════════════════════════════
   RISHABH IS GETTING OLDER. UNFORTUNATELY.  ·  script.js
   Vanilla JS. No frameworks, no dependencies, no CDN.
   ─────────────────────────────────────────────────────────────────────────
   EVERYTHING YOU'LL WANT TO CHANGE LIVES IN THE `CONFIG` OBJECT BELOW.
   Photos live in /images — see README.md for the exact filenames.
   ═══════════════════════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────────────────────────────────────────
   1 · CONFIG  —  change the date, time, venue and links here, nowhere else
   ───────────────────────────────────────────────────────────────────────── */
const CONFIG = {
  rishabh: {
    name: 'Rishabh Kumar',
    firstName: 'Rishabh',
    /* the little line under the hero buttons — edit freely */
    heroNote: 'Age undisclosed. He is being dramatic about it.'
  },

  event: {
    /* Keep the format EXACTLY YYYY-MM-DDTHH:mm (24h, local time).
       This one value drives the .ics calendar file. */
    dateISO: '2026-12-12T20:00',
    durationHours: 3.5,

    /* the human-readable strings shown on the invitation card */
    dateShort:   '12 December',
    dateDisplay: 'Saturday, 12 December',
    timeDisplay: '8:00 PM onwards',
    venue:       'The Rooftop, [Restaurant Name], [City]',
    dressCode:   '\u201cCome looking decent. I have standards.\u201d',

    /* used on the calendar entry + the share sheet */
    calendarTitle: "Rishabh's Birthday Dinner \ud83c\udf82",
    calendarNote:  'Dinner\u2019s on me. You bring the return gift. Bring it.'
  },

  music: {
    /* Drop an mp3 at this path. If the file is missing, the music
       button simply never appears — nothing breaks. */
    src: 'assets/music.mp3',
    volume: 0.45
  },

  rsvp: {
    /* Leave blank to run in local-only mode (saves in the guest's browser).
       To actually collect responses, paste a Google Apps Script Web App URL
       or a Supabase Edge Function URL here. See README.md.
       NEVER put a private API key in this file. */
    endpoint: '',
    localKey: 'rishabh-birthday-rsvp-v1'
  },

  share: {
    title: "Rishabh is getting older. Unfortunately. \ud83c\udf82",
    text:  'I\u2019m invited to Rishabh\u2019s birthday dinner. You eat, he pays, you bring a return gift. Seems fair.',
    /* leave blank to use the current page URL */
    url: ''
  },

  gate: {
    /* true  = the entrance screen only plays once per browser session
       false = it plays on every single visit (more annoying, more funny) */
    rememberInSession: true
  }
};
/* ─────────────────────────────────────────────────────────────────────────
   2 · PHOTOS
   `file` must match a real file in /images. If it isn't there yet, the tile
   renders a designed placeholder instead of a broken image icon.
   `ar` = aspect ratio for the masonry grid.  `download` = saved filename.
   ───────────────────────────────────────────────────────────────────────── */
const PHOTOS = [
  /* 🔥 best look */
  { file:'best-look-1.jpg', cat:'best-look', ar:'4 / 5', download:'rishabh-birthday-01.jpg',
    alt:'Rishabh in a dark shirt, looking unnecessarily sharp',
    caption:'Suited up. Zero complaints received.' },
  { file:'best-look-2.jpg', cat:'best-look', ar:'3 / 4', download:'rishabh-birthday-best-look.jpg',
    alt:'Rishabh in golden hour light, doing his best serious face',
    caption:'Golden hour did most of the work. I helped a bit.' },
  { file:'best-look-3.jpg', cat:'best-look', ar:'1 / 1', download:'rishabh-birthday-03.jpg',
    alt:'Rishabh, camera-ready and clearly aware of it',
    caption:'This is the one you post. I checked.' },

  /* 🏋️ gym */
  { file:'gym-1.jpg', cat:'gym', ar:'4 / 5', download:'rishabh-birthday-gym.jpg',
    alt:'Rishabh after a workout, pretending that was easy',
    caption:'Post-gym. Do not ask how long I was actually there.' },
  { file:'gym-2.jpg', cat:'gym', ar:'3 / 4', download:'rishabh-birthday-gym-2.jpg',
    alt:'Rishabh in the gym mirror, lighting suspiciously perfect',
    caption:'Yes, the lighting is strategic.' },
  { file:'gym-3.jpg', cat:'gym', ar:'4 / 5', download:'rishabh-birthday-gym-3.jpg',
    alt:'Rishabh mid set, looking like he regrets the last rep',
    caption:'One more set. It is always one more set.' },

  /* 😂 chaotic */
  { file:'chaotic-1.jpg', cat:'chaotic', ar:'4 / 5', download:'rishabh-birthday-chaotic.jpg',
    alt:'Rishabh mid-laugh in a photo nobody can explain',
    caption:'No context. No notes.' },
  { file:'chaotic-2.jpg', cat:'chaotic', ar:'1 / 1', download:'rishabh-birthday-08.jpg',
    alt:'Rishabh caught mid-blink at a party',
    caption:'I have no memory of this photo being taken.' },
  { file:'chaotic-3.jpg', cat:'chaotic', ar:'3 / 4', download:'rishabh-birthday-09.jpg',
    alt:'Rishabh doing something unexplained with a group of friends',
    caption:'Energy: unhinged. Regret: zero.' },

  /* 🧒 throwback */
  { file:'throwback-1.jpg', cat:'throwback', ar:'4 / 5', download:'rishabh-birthday-throwback.jpg',
    alt:'A much younger Rishabh staring confidently at the camera',
    caption:'Small Rishabh. Same confidence, fewer responsibilities.' },
  { file:'throwback-2.jpg', cat:'throwback', ar:'1 / 1', download:'rishabh-birthday-throwback-2.jpg',
    alt:'Childhood photo of Rishabh wearing an outfit that was a bold choice',
    caption:'The outfit was a choice and I stand by it.' },
  { file:'throwback-3.jpg', cat:'throwback', ar:'3 / 4', download:'rishabh-birthday-12.jpg',
    alt:'Young Rishabh at a family function, mid-expression',
    caption:'Proof I have always been exactly like this.' },

  /* ❤️ wholesome */
  { file:'wholesome-1.jpg', cat:'wholesome', ar:'4 / 5', download:'rishabh-birthday-wholesome.jpg',
    alt:'Rishabh laughing with people he clearly likes a lot',
    caption:'Caught being nice. Rare footage.' },
  { file:'wholesome-2.jpg', cat:'wholesome', ar:'3 / 4', download:'rishabh-birthday-14.jpg',
    alt:'Rishabh smiling in a warm, well-lit photo',
    caption:'The smile is genuine. Shocking, I know.' },
  { file:'wholesome-3.jpg', cat:'wholesome', ar:'4 / 5', download:'rishabh-birthday-15.jpg',
    alt:'Rishabh with friends around a table full of food',
    caption:'Good day. Good people. Questionable quantities of food.' }
];

/* gallery filter chips — id must match a photo `cat` */
const CATEGORIES = [
  { id:'all',       emoji:'\u2728',        label:'Everything' },
  { id:'best-look', emoji:'\ud83d\udd25',   label:'Best Look' },
  { id:'gym',       emoji:'\ud83c\udfcb\ufe0f', label:'Gym Rishabh' },
  { id:'chaotic',   emoji:'\ud83d\ude02',   label:'Chaotic Rishabh' },
  { id:'throwback', emoji:'\ud83e\uddd2',   label:'Throwback' },
  { id:'wholesome', emoji:'\u2764\ufe0f',   label:'Wholesome' }
];

/* caption generator — add or remove freely */
const CAPTIONS = [
  'Happy Birthday Rishabh \u2764\ufe0f',
  'Happy Birthday bro! Stay crazy \ud83d\ude02',
  'Another year, same Rishabh.',
  'Happy Birthday to one of my favourite people \ud83c\udf82',
  'Happy Birthday to the guy who made an entire website about it \ud83d\udc40'
];

/* the "I'M NOT SURE 🤨" script, revealed one line at a time */
const GATE_SCRIPT = [
  { text:'Hmm\u2026' },
  { text:'That\u2019s concerning.' },
  { text:'Let\u2019s pretend you belong here. \ud83d\ude02', punch:true }
];

/* the three RSVP states + how they read back on the receipt */
const ATTENDANCE = {
  yes:   { label:'Confirmed \u2705',                  short:'Confirmed', emoji:'\ud83c\udf89' },
  maybe: { label:'Pending \ud83d\udc40',               short:'Pending',   emoji:'\ud83d\udc40' },
  no:    { label:'Absent, unfortunately \ud83d\ude2d', short:'Absent',    emoji:'\ud83d\ude2d' }
};
/* ─────────────────────────────────────────────────────────────────────────
   3 · TINY HELPERS
   ───────────────────────────────────────────────────────────────────────── */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.prototype.slice.call(root.querySelectorAll(sel));
const on = (el, ev, fn, opts) => { if (el) el.addEventListener(ev, fn, opts); return el; };

/* is the visitor asking us to calm down? */
const prefersReduced = () => window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* scroll behaviour that respects reduced-motion */
const motion = () => (prefersReduced() ? 'auto' : 'smooth');

/* every reveal lands instantly for reduced-motion users */
const stagger = (i, step, max) =>
  (prefersReduced() ? 0 : Math.min(i * step, max));

/* — toast ————————————————————————————————————————————————— */
let toastTimer = null;
function toast(message, ms) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add('is-on'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('is-on');
    setTimeout(() => { el.hidden = true; }, 420);
  }, ms || 3400);
}

/* — modal / lightbox scroll lock ————————————————————————— */
let overlayCount = 0;
function lockScroll(lock) {
  overlayCount = Math.max(0, overlayCount + (lock ? 1 : -1));
  document.body.classList.toggle('has-overlay', overlayCount > 0);
}

/* — keep keyboard focus inside an open dialog ————————————— */
function trapFocus(container) {
  const SELECTOR = 'a[href],button:not([disabled]),input:not([disabled]),' +
                   'select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const previous = document.activeElement;

  function onKeydown(e) {
    if (e.key !== 'Tab') return;
    const items = $$(SELECTOR, container).filter(el => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  container.addEventListener('keydown', onKeydown);
  return function release() {
    container.removeEventListener('keydown', onKeydown);
    if (previous && typeof previous.focus === 'function') previous.focus();
  };
}

/* — clipboard, with a fallback for older mobile browsers ——— */
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) { /* fall through to the legacy path */ }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (err) {
    return false;
  }
}

/* — flip a button into a "done" state for a moment ——————— */
function flashButton(btn, label, ms) {
  if (!btn) return;
  if (!btn.dataset.originalLabel) btn.dataset.originalLabel = btn.textContent;
  btn.classList.add('is-done');
  btn.textContent = label;
  clearTimeout(btn._flashTimer);
  btn._flashTimer = setTimeout(() => {
    btn.classList.remove('is-done');
    btn.textContent = btn.dataset.originalLabel;
  }, ms || 2600);
}

/* — designed placeholder for a photo that isn't uploaded yet —— */
function makePlaceholder(label, file, opts) {
  opts = opts || {};
  const box = document.createElement('div');
  box.className = 'ph' + (opts.fill ? ' ph--fill' : '');
  box.setAttribute('aria-hidden', 'true');
  if (opts.ar && !opts.fill) box.style.setProperty('--ar', opts.ar);

  const tag = document.createElement('span');
  tag.className = 'ph__tag';
  tag.textContent = label || 'Photo coming soon';

  const name = document.createElement('span');
  name.className = 'ph__file';
  name.textContent = file ? 'images/' + file : '';

  box.append(tag, name);
  return box;
}

/* — date helpers (all local time, no timezone surprises) ——— */
function parseLocalISO(iso) {
  const parts = String(iso).split('T');
  const ymd = (parts[0] || '').split('-').map(Number);
  const hm = (parts[1] || '00:00').split(':').map(Number);
  return new Date(ymd[0] || 1970, (ymd[1] || 1) - 1, ymd[2] || 1,
                  hm[0] || 0, hm[1] || 0, 0, 0);
}
const pad2 = n => String(n).padStart(2, '0');
/* floating (local) ICS stamp — correct for a birthday dinner */
const icsStamp = d => `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}` +
                      `T${pad2(d.getHours())}${pad2(d.getMinutes())}00`;
const icsEscape = s => String(s || '')
  .replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
/* ─────────────────────────────────────────────────────────────────────────
   4 · PUSH CONFIG INTO THE PAGE
   Any element with data-cfg="event.venue" gets filled from CONFIG.
   ───────────────────────────────────────────────────────────────────────── */
function getPath(obj, path) {
  return path.split('.').reduce((acc, key) =>
    (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
}

function bindConfig() {
  $$('[data-cfg]').forEach(el => {
    const value = getPath(CONFIG, el.dataset.cfg);
    if (typeof value === 'string' && value.length) el.textContent = value;
  });

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(parseLocalISO(CONFIG.event.dateISO).getFullYear());

  const noteEl = $('#heroNote');
  if (noteEl && CONFIG.rishabh.heroNote) noteEl.textContent = CONFIG.rishabh.heroNote;

  document.title = `${CONFIG.rishabh.firstName} is getting older. Unfortunately. \ud83c\udf82`;
}

/* ─────────────────────────────────────────────────────────────────────────
   5 · MISSING-IMAGE FALLBACKS
   Every <img> with data-fallback becomes a designed placeholder tile if the
   file hasn't been uploaded yet — never a broken-image icon.
   ───────────────────────────────────────────────────────────────────────── */
function watchImage(img) {
  function swap() {
    if (img.dataset.failedImage === '1') return;
    img.dataset.failedImage = '1';

    const src = img.getAttribute('src') || '';
    const file = src.split('/').pop();
    const ph = makePlaceholder(img.dataset.fallback, file, {
      fill: img.dataset.fill === '1',
      ar: img.dataset.ar || '4 / 5'
    });
    /* keep the sizing + hover behaviour of the element we're replacing */
    if (img.classList.contains('tile__media')) ph.classList.add('tile__media');

    img.replaceWith(ph);
    if (typeof img.onFallbackSwap === 'function') img.onFallbackSwap(ph);
    return ph;
  }

  img.addEventListener('error', swap, { once: true });
  /* catches images that already failed before this script ran */
  if (img.complete && img.naturalWidth === 0) swap();

  return { swap };
}

function initImageFallbacks() {
  $$('img[data-fallback]').forEach(img => {
    if (img.dataset.ar) img.style.setProperty('--ar', img.dataset.ar);
    watchImage(img);
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   6 · CONFETTI  (hand-written, ~70 lines, no library)
   Used sparingly: terms accepted, RSVP confirmed, easter egg found.
   ───────────────────────────────────────────────────────────────────────── */
const CONFETTI_COLORS = ['#ff8f2e', '#ffc861', '#ff6a1f', '#ffd89b', '#f6f3ef'];
let confettiPieces = [];
let confettiRaf = null;

function confettiMetrics() {
  const canvas = $('#confetti');
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;                 /* canvas blocked? just skip confetti */
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  const bw = Math.round(w * dpr);
  const bh = Math.round(h * dpr);
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw;
    canvas.height = bh;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h, dpr };
}

function confettiBurst(opts) {
  opts = opts || {};
  if (prefersReduced()) return;
  const m = confettiMetrics();
  if (!m) return;

  const count = opts.count || 90;
  const power = opts.power || 1;
  const spread = opts.spread || 0.85;
  const ox = (opts.x === undefined ? 0.5 : opts.x) * m.w;
  const oy = (opts.y === undefined ? 0.44 : opts.y) * m.h;

  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * spread;
    const speed = (4.5 + Math.random() * 7) * power;
    confettiPieces.push({
      x: ox, y: oy,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 3,
      vy: Math.sin(angle) * speed,
      w: 4 + Math.random() * 7,
      h: 7 + Math.random() * 11,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      life: 0,
      ttl: 110 + Math.random() * 90,
      round: Math.random() < 0.22
    });
  }
  if (!confettiRaf) confettiRaf = requestAnimationFrame(stepConfetti);
}

function stepConfetti() {
  const m = confettiMetrics();
  if (!m) { confettiRaf = null; return; }
  const ctx = m.ctx;
  ctx.clearRect(0, 0, m.w, m.h);

  const alive = [];
  for (let i = 0; i < confettiPieces.length; i++) {
    const p = confettiPieces[i];
    p.life++;
    p.vy += 0.17;      /* gravity */
    p.vx *= 0.992;     /* drag */
    p.vy *= 0.996;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;

    const fade = Math.min(1, (p.ttl - p.life) / 28);
    const onScreen = p.y < m.h + 70 && p.x > -90 && p.x < m.w + 90;

    if (p.life < p.ttl && onScreen && fade > 0) {
      alive.push(p);
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }
  }

  confettiPieces = alive;
  if (confettiPieces.length) {
    confettiRaf = requestAnimationFrame(stepConfetti);
  } else {
    ctx.clearRect(0, 0, m.w, m.h);
    confettiRaf = null;
  }
}
/* ─────────────────────────────────────────────────────────────────────────
   7 · THE GATE  ("Wait… 👀  Are you actually invited?")
   Without JS the gate stays hidden (html.no-js) and the site is readable.
   ───────────────────────────────────────────────────────────────────────── */
function initGate() {
  const gate = $('#gate');
  const KEY = 'rishabh-birthday-entered';

  if (!gate) { document.body.classList.add('is-entered'); return; }

  let releaseTrap = null;
  let sessionTaken = false;
  if (CONFIG.gate.rememberInSession) {
    try { sessionTaken = sessionStorage.getItem(KEY) === '1'; } catch (err) { /* private mode */ }
  }

  function finish(instant) {
    if (CONFIG.gate.rememberInSession) {
      try { sessionStorage.setItem(KEY, '1'); } catch (err) { /* ignore */ }
    }
    document.body.classList.add('is-entered');
    document.body.classList.remove('is-locked');
    if (releaseTrap) { releaseTrap(); releaseTrap = null; }
    if (instant || prefersReduced()) { gate.remove(); return; }
    gate.classList.add('is-leaving');
    setTimeout(() => gate.remove(), 800);
  }

  /* returning within the same session: skip straight in */
  if (sessionTaken) { finish(true); return; }

  document.body.classList.add('is-locked');
  gate.hidden = false;
  releaseTrap = trapFocus(gate);

  const yesBtn = $('#gateYes');
  const unsureBtn = $('#gateUnsure');
  const enterBtn = $('#gateEnter');

  on(yesBtn, 'click', () => finish(false));
  on(enterBtn, 'click', () => finish(false));

  on(unsureBtn, 'click', () => {
    const step1 = $('#gateStep1');
    const step2 = $('#gateStep2');
    const lines = $('#gateLines');
    if (step1) step1.hidden = true;
    if (step2) step2.hidden = false;
    if (!lines) return;

    if (unsureBtn) unsureBtn.disabled = true;   /* stop double-taps mid-script */
    const step = prefersReduced() ? 80 : 740;

    GATE_SCRIPT.forEach((line, i) => {
      setTimeout(() => {
        const p = document.createElement('p');
        p.className = 'gate__line' + (line.punch ? ' gate__line--punch' : '');
        p.textContent = line.text;
        lines.appendChild(p);
        requestAnimationFrame(() => p.classList.add('is-on'));

        if (i === GATE_SCRIPT.length - 1 && enterBtn) {
          enterBtn.hidden = false;
          try { enterBtn.focus({ preventScroll: true }); } catch (err) { enterBtn.focus(); }
        }
      }, step * i);
    });
  });

  /* Esc must not be an escape hatch from the gate */
  on(gate, 'keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); }
  });

  if (yesBtn) setTimeout(() => {
    try { yesBtn.focus({ preventScroll: true }); } catch (err) { yesBtn.focus(); }
  }, 400);
}

/* ─────────────────────────────────────────────────────────────────────────
   8 · SCROLL REVEALS
   .reveal elements fade + slide up once. data-d="120" sets a delay in ms.
   ───────────────────────────────────────────────────────────────────────── */
function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  items.forEach(el => {
    if (el.dataset.d) el.style.setProperty('--d', el.dataset.d + 'ms');
  });

  if (prefersReduced() || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -7% 0px', threshold: 0.1 });

  items.forEach(el => io.observe(el));
}
/* ─────────────────────────────────────────────────────────────────────────
   9 · HERO PARTICLES + CURSOR SPOTLIGHT
   One canvas, ~40 dots, plus a soft warm glow that follows the pointer on
   devices that actually have a pointer. Pauses when off-screen or hidden.
   ───────────────────────────────────────────────────────────────────────── */
function initParticles() {
  const canvas = $('#particles');
  const hero = $('#hero');
  if (!canvas || !hero || prefersReduced()) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;                       /* no canvas support — skip the flourish */
  const finePointer = window.matchMedia
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  let dots = [];
  let raf = null;
  let visible = true;
  let w = 0;
  let h = 0;
  const pointer = { x: -999, y: -999, active: false };

  function seed() {
    const count = Math.max(16, Math.min(56, Math.round(w / 24)));
    dots = [];
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.05 + Math.random() * 0.2),
        tw: Math.random() * Math.PI * 2,
        ts: 0.008 + Math.random() * 0.02,
        warm: Math.random() < 0.55
      });
    }
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth || hero.clientWidth || window.innerWidth;
    h = canvas.clientHeight || hero.clientHeight || window.innerHeight;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    if (pointer.active) {
      const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 190);
      glow.addColorStop(0, 'rgba(255,143,46,.10)');
      glow.addColorStop(1, 'rgba(255,143,46,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(pointer.x - 200, pointer.y - 200, 400, 400);
    }

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx;
      d.y += d.vy;
      d.tw += d.ts;

      if (d.y < -12) { d.y = h + 8; d.x = Math.random() * w; }
      if (d.x < -12) d.x = w + 8;
      if (d.x > w + 12) d.x = -8;

      const a = 0.2 + Math.abs(Math.sin(d.tw)) * 0.5;
      ctx.beginPath();
      ctx.fillStyle = d.warm
        ? 'rgba(255,171,84,' + a + ')'
        : 'rgba(246,243,239,' + (a * 0.78) + ')';
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();

      if (d.r > 1.5) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,143,46,' + (a * 0.11) + ')';
        ctx.arc(d.x, d.y, d.r * 4.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    raf = requestAnimationFrame(frame);
  }

  function start() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  if (finePointer) {
    on(hero, 'pointermove', e => {
      const box = canvas.getBoundingClientRect();
      pointer.x = e.clientX - box.left;
      pointer.y = e.clientY - box.top;
      pointer.active = true;
    }, { passive: true });
    on(hero, 'pointerleave', () => { pointer.active = false; });
  }

  resize();
  start();

  let resizeTimer;
  on(window, 'resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { stop(); resize(); start(); }, 180);
  });
  on(document, 'visibilitychange', () => (document.hidden ? stop() : start()));

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0 }).observe(hero);
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   10 · PARALLAX + SCROLL PROGRESS BAR
   rAF-batched, transform-only, and completely off for reduced-motion users.
   ───────────────────────────────────────────────────────────────────────── */
function initScrollFx() {
  const bar = $('#progressBar');
  const media = $('.hero__media');
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;

    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0).toFixed(2) + '%';
    }
    if (media && !prefersReduced()) {
      media.style.setProperty('--py', Math.min(y * 0.15, 140).toFixed(1) + 'px');
    }
  }

  function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  on(window, 'scroll', request, { passive: true });
  on(window, 'resize', request);
  update();
}
/* ─────────────────────────────────────────────────────────────────────────
   11 · RETURN GIFT CLAUSE (the fake legal agreement)
   ───────────────────────────────────────────────────────────────────────── */
function initTerms() {
  const btn = $('#acceptTerms');
  if (!btn) return;

  const check = $('#termsCheck');
  const verdict = $('#termsVerdict');
  const nudge = $('#termsNudge');

  on(check, 'change', () => {
    if (check.checked && nudge) nudge.textContent = '';
  });

  on(btn, 'click', () => {
    if (check && !check.checked) {
      if (nudge) nudge.textContent = 'Tick the box. I\u2019m not running a lawless dinner here.';
      btn.classList.remove('is-shaking');
      void btn.offsetWidth;                 /* force the shake to replay */
      btn.classList.add('is-shaking');
      try { check.focus({ preventScroll: true }); } catch (err) { check.focus(); }
      return;
    }

    if (nudge) nudge.textContent = '';
    if (verdict) verdict.hidden = false;
    btn.disabled = true;
    btn.textContent = 'TERMS ACCEPTED \u2713';

    confettiBurst({ count: 26, power: 0.8, spread: 1.15, y: 0.55 });

    if (verdict && !verdict.dataset.shown) {
      verdict.dataset.shown = '1';
      setTimeout(() => verdict.scrollIntoView({ behavior: motion(), block: 'nearest' }), 140);
    }
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   12 · RSVP — read, validate, store, submit
   ───────────────────────────────────────────────────────────────────────── */

function readRsvpForm() {
  const nameEl = $('#rsvpName');
  const relEl = $('#rsvpRelation');
  const giftEl = $('#rsvpGift');
  const checked = $$('input[name="attendance"]').filter(r => r.checked)[0];
  return {
    name: nameEl ? nameEl.value.trim() : '',
    relationship: relEl ? relEl.value : '',
    attendance: checked ? checked.value : '',
    returnGift: giftEl ? giftEl.value.trim() : ''
  };
}

function validateRsvp(data) {
  const errors = {};
  if (!data.name) {
    errors.name = 'I need a name. Any name. Even the one your mum uses.';
  } else if (data.name.length < 2) {
    errors.name = 'Two letters minimum. I believe in you.';
  }
  if (!data.relationship) {
    errors.relationship = 'Pick one. \u201cIt\u2019s complicated\u201d isn\u2019t an option here.';
  }
  if (!data.attendance) {
    errors.attendance = 'Yes, maybe or no. Three options, all very generous of me.';
  }
  /* the return gift is only skippable if you\u2019re not coming at all */
  if (!data.returnGift && data.attendance && data.attendance !== 'no') {
    errors.gift = data.attendance === 'yes'
      ? 'An empty box? Bold. Put something in it.'
      : 'Ambitious. You haven\u2019t even confirmed and you\u2019re already empty-handed.';
  }
  return errors;
}

const RSVP_ERROR_SLOTS = {
  name: 'errName',
  relationship: 'errRelation',
  attendance: 'errAttendance',
  gift: 'errGift'
};

function clearRsvpErrors() {
  Object.keys(RSVP_ERROR_SLOTS).forEach(key => {
    const el = $('#' + RSVP_ERROR_SLOTS[key]);
    if (el) el.textContent = '';
  });
  $$('#rsvpForm .field').forEach(field => field.classList.remove('has-error'));
}

function showRsvpErrors(errors) {
  let firstField = null;
  Object.keys(errors).forEach(key => {
    const el = $('#' + RSVP_ERROR_SLOTS[key]);
    if (!el) return;
    el.textContent = errors[key];
    const field = el.closest('.field');
    if (field) {
      field.classList.add('has-error');
      if (!firstField) firstField = field;
    }
  });
  if (firstField) {
    const focusable = firstField.querySelector('input, select');
    if (focusable) {
      try { focusable.focus({ preventScroll: true }); } catch (err) { focusable.focus(); }
    }
    firstField.scrollIntoView({ behavior: motion(), block: 'center' });
  }
}
/* the exact shape handed to whatever backend you plug in later */
function buildRSVPPayload(data) {
  return {
    name: data.name,
    relationship: data.relationship,
    attendance: data.attendance,
    returnGift: data.returnGift,
    submittedAt: new Date().toISOString(),
    source: 'birthday-invite'
  };
}

function saveRSVPLocally(payload) {
  const key = CONFIG.rsvp.localKey;
  if (!key) return false;
  try {
    let list = [];
    try { list = JSON.parse(localStorage.getItem(key) || '[]') || []; } catch (err) { list = []; }
    if (!Array.isArray(list)) list = [];
    list.push(payload);
    localStorage.setItem(key, JSON.stringify(list));
    localStorage.setItem(key + ':last', JSON.stringify(payload));
    return true;
  } catch (err) {
    console.warn('[RSVP] Could not save locally (storage blocked or full):', err);
    return false;
  }
}

function loadLastRSVP() {
  const key = CONFIG.rsvp.localKey;
  if (!key) return null;
  try {
    const raw = localStorage.getItem(key + ':last');
    return raw ? JSON.parse(raw) : null;
  } catch (err) { return null; }
}

/**
 * submitRSVP — the single function to swap when you wire up a real backend.
 * Saves locally FIRST, so the guest's confirmation never depends on the
 * network. With CONFIG.rsvp.endpoint empty it stays local-only and just
 * logs a hint in the console.
 */
async function submitRSVP(payload) {
  const savedLocally = saveRSVPLocally(payload);
  const endpoint = String(CONFIG.rsvp.endpoint || '').trim();

  if (!endpoint) {
    console.info(
      '[RSVP] Saved in this browser only.\n' +
      'To collect responses centrally, set CONFIG.rsvp.endpoint in script.js.\n' +
      'README.md has a ready-to-paste Google Apps Script + Supabase example.'
    );
    return { ok: true, stored: 'local', savedLocally: savedLocally };
  }

  try {
    /* text/plain keeps this a "simple request" so the browser doesn't fire a
       CORS preflight that Google Apps Script cannot answer */
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return { ok: true, stored: 'remote', savedLocally: savedLocally };
  } catch (err) {
    console.warn('[RSVP] Endpoint unreachable — kept locally instead.', err);
    return {
      ok: true,
      stored: 'local',
      savedLocally: savedLocally,
      error: String((err && err.message) || err)
    };
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   13 · SUCCESS SCREEN + CALENDAR + SHARE
   ───────────────────────────────────────────────────────────────────────── */
function showRsvpSuccess(data) {
  const card = $('#rsvpCard');
  const success = $('#rsvpSuccess');
  if (card) card.hidden = true;
  if (!success) return;

  const state = ATTENDANCE[data.attendance] || ATTENDANCE.maybe;

  const nameOut = $('#outName');
  if (nameOut) nameOut.textContent = data.name || 'Anonymous legend';

  const statusOut = $('#outStatus');
  if (statusOut) statusOut.textContent = state.label;

  const giftOut = $('#outGift');
  if (giftOut) {
    if (data.returnGift) giftOut.textContent = data.returnGift;
    else if (data.attendance === 'no') giftOut.textContent = 'Nothing. Rude, but noted.';
    else giftOut.textContent = 'Mystery box. Suspicious.';
  }

  success.hidden = false;
  confettiBurst({ count: 120, power: 1.05, y: 0.4 });

  setTimeout(() => {
    success.scrollIntoView({ behavior: motion(), block: 'center' });
  }, 90);
}

function buildICS() {
  const start = parseLocalISO(CONFIG.event.dateISO);
  const end = new Date(start.getTime() + (CONFIG.event.durationHours || 3) * 3600000);
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//' + CONFIG.rishabh.name + '//Birthday Dinner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:rishabh-birthday-' + icsStamp(start) + '@birthday-invite',
    'DTSTAMP:' + stamp,
    'DTSTART:' + icsStamp(start),
    'DTEND:' + icsStamp(end),
    'SUMMARY:' + icsEscape(CONFIG.event.calendarTitle),
    'LOCATION:' + icsEscape(CONFIG.event.venue),
    'DESCRIPTION:' + icsEscape(CONFIG.event.calendarNote),
    'BEGIN:VALARM',
    'TRIGGER:-PT6H',
    'ACTION:DISPLAY',
    'DESCRIPTION:' + icsEscape('Birthday dinner tonight. Do not forget the return gift.'),
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

function downloadCalendar(btn) {
  try {
    const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rishabh-birthday-dinner.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 6000);
    flashButton(btn, 'ADDED \u2713');
    toast('Calendar file saved. Now actually look at your calendar.');
  } catch (err) {
    console.warn('[Calendar] Could not build the .ics', err);
    toast('Could not build the calendar file. Just remember it. It\u2019s one dinner.');
  }
}

async function shareInvitation(btn) {
  const url = CONFIG.share.url || window.location.href;
  const payload = { title: CONFIG.share.title, text: CONFIG.share.text, url: url };

  if (navigator.share) {
    try {
      await navigator.share(payload);
      flashButton(btn, 'SHARED \u2713');
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return;   /* user closed the sheet */
    }
  }

  const copied = await copyText(CONFIG.share.text + ' ' + url);
  flashButton(btn, copied ? 'LINK COPIED' : 'COPY FAILED');
  toast(copied
    ? 'Copied. Send it to someone who owes me a gift.'
    : 'Copying is blocked here — just read the URL out loud like it\u2019s 2009.');
}
function initRsvp() {
  const form = $('#rsvpForm');
  if (!form) return;

  const giftEl = $('#rsvpGift');
  const card = $('#rsvpCard');
  const success = $('#rsvpSuccess');

  /* the gift field changes personality depending on the RSVP answer */
  function syncGiftField() {
    const checked = $$('input[name="attendance"]').filter(r => r.checked)[0];
    const value = checked ? checked.value : '';
    const field = $('#giftField');
    const label = $('#giftLabel');
    const hint = $('#giftHint');
    if (!field) return;

    const optional = (value === 'no');
    field.classList.toggle('is-optional', optional);

    if (label) label.textContent = optional
      ? 'FINE. WHAT ARE YOU MISSING OUT ON?'
      : 'WHAT ARE YOU PLANNING TO BRING ME?';

    if (giftEl) giftEl.placeholder = optional
      ? 'Optional. But I\u2019m judging you quietly.'
      : 'Be honest. I can already tell when you\u2019re lying.';

    if (hint) hint.textContent = optional
      ? 'Not required. Your absence is punishment enough.'
      : 'Popular choices below, if you\u2019re feeling unoriginal.';
  }

  /* if they've RSVP'd before in this browser, quietly refill the form */
  const previous = loadLastRSVP();
  if (previous) {
    const nameEl = $('#rsvpName');
    const relEl = $('#rsvpRelation');
    if (nameEl && previous.name) nameEl.value = previous.name;
    if (relEl && previous.relationship) relEl.value = previous.relationship;
    if (giftEl && previous.returnGift) giftEl.value = previous.returnGift;
    if (previous.attendance) {
      const radio = $$('input[name="attendance"]')
        .filter(r => r.value === previous.attendance)[0];
      if (radio) radio.checked = true;
    }
  }

  $$('input[name="attendance"]').forEach(radio => on(radio, 'change', () => {
    syncGiftField();
    const err = $('#errAttendance');
    if (err) {
      err.textContent = '';
      const field = err.closest('.field');
      if (field) field.classList.remove('has-error');
    }
  }));
  syncGiftField();

  on(form, 'submit', async (event) => {
    event.preventDefault();

    const data = readRsvpForm();
    clearRsvpErrors();
    const errors = validateRsvp(data);

    if (Object.keys(errors).length) {
      showRsvpErrors(errors);
      return;
    }

    const submitBtn = $('#rsvpSubmit');
    if (submitBtn) {
      submitBtn.disabled = true;
      if (!submitBtn.dataset.originalLabel) {
        submitBtn.dataset.originalLabel = submitBtn.textContent;
      }
      submitBtn.textContent = 'SENDING\u2026';
    }

    await submitRSVP(buildRSVPPayload(data));

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalLabel || 'SEND IT \u2192';
    }
    showRsvpSuccess(data);
  });

  on($('#addCalendar'), 'click', () => downloadCalendar($('#addCalendar')));
  on($('#shareInvite'), 'click', () => shareInvitation($('#shareInvite')));

  on($('#editRsvp'), 'click', () => {
    if (success) success.hidden = true;
    if (card) card.hidden = false;
    if (card) card.scrollIntoView({ behavior: motion(), block: 'center' });
    const nameEl = $('#rsvpName');
    if (nameEl) setTimeout(() => {
      try { nameEl.focus({ preventScroll: true }); } catch (err) { nameEl.focus(); }
    }, 260);
  });
}
/* ─────────────────────────────────────────────────────────────────────────
   14 · GALLERY  —  masonry grid, filters, download, share, lightbox
   ───────────────────────────────────────────────────────────────────────── */
const GALLERY = {
  filter: 'all',
  tiles: [],
  visible: [],
  index: 0,
  lastFocus: null,
  releaseTrap: null
};

/* files we know are missing, so download/share can say something useful */
const MISSING_FILES = Object.create(null);

function photoByFile(file) {
  for (let i = 0; i < PHOTOS.length; i++) {
    if (PHOTOS[i].file === file) return PHOTOS[i];
  }
  return null;
}

function categoryOf(id) {
  for (let i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id === id) return CATEGORIES[i];
  }
  return CATEGORIES[0];
}

function photoSrc(photo) { return 'images/' + photo.file; }

function triggerDownload(href, filename) {
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function createTile(photo, i) {
  const cat = categoryOf(photo.cat);

  const tile = document.createElement('figure');
  tile.className = 'tile';
  tile.dataset.cat = photo.cat;
  tile.dataset.file = photo.file;
  tile.style.setProperty('--i', stagger(i, 45, 520) + 'ms');

  const open = document.createElement('button');
  open.type = 'button';
  open.className = 'tile__open';
  open.setAttribute('aria-label', 'Open larger photo — ' + photo.caption);

  const img = document.createElement('img');
  img.className = 'tile__media';
  img.src = photoSrc(photo);
  img.alt = photo.alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.dataset.fallback = cat.label;
  img.dataset.ar = photo.ar;
  img.style.setProperty('--ar', photo.ar);
  img.onFallbackSwap = () => { MISSING_FILES[photo.file] = true; };

  const badge = document.createElement('span');
  badge.className = 'tile__badge';
  badge.textContent = cat.emoji + ' ' + cat.label;

  const zoom = document.createElement('span');
  zoom.className = 'tile__zoom';
  zoom.setAttribute('aria-hidden', 'true');
  zoom.textContent = '\u2922';

  const caption = document.createElement('span');
  caption.className = 'tile__cap';
  caption.textContent = photo.caption;

  open.append(img, badge, zoom, caption);

  const acts = document.createElement('div');
  acts.className = 'tile__acts';

  const dl = document.createElement('button');
  dl.type = 'button';
  dl.className = 'tile__act';
  dl.textContent = '\u2193 Download';

  const sh = document.createElement('button');
  sh.type = 'button';
  sh.className = 'tile__act';
  sh.textContent = 'Share';

  on(dl, 'click', () => downloadPhoto(photo, dl));
  on(sh, 'click', () => sharePhoto(photo, sh));
  on(open, 'click', () => {
    const idx = GALLERY.visible.indexOf(tile);
    if (idx < 0) return;
    GALLERY.index = idx;
    openLightbox();
  });

  acts.append(dl, sh);
  tile.append(open, acts);
  watchImage(img);

  return tile;
}

async function downloadPhoto(photo, btn) {
  if (MISSING_FILES[photo.file]) {
    toast('Add images/' + photo.file + ' first — there\u2019s nothing to download yet.');
    return;
  }
  const filename = photo.download || ('rishabh-birthday-' + photo.file);
  const src = photoSrc(photo);

  try {
    const res = await fetch(src, { cache: 'force-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
    setTimeout(() => URL.revokeObjectURL(url), 6000);
    flashButton(btn, 'SAVED \u2713');
    toast('Saved as ' + filename + '. Now go post it. \ud83d\ude0c');
  } catch (err) {
    /* file:// or an older browser — a plain download link still works */
    triggerDownload(src, filename);
    flashButton(btn, 'SAVED \u2713');
    toast('Download started: ' + filename);
  }
}

async function sharePhoto(photo, btn) {
  const src = photoSrc(photo);
  const pageUrl = CONFIG.share.url || window.location.href;
  const text = photo.caption + ' \u2014 ' + CONFIG.rishabh.firstName + '\u2019s birthday';

  if (navigator.share) {
    /* try to share the actual image file first (mobile) */
    if (navigator.canShare && !MISSING_FILES[photo.file]) {
      try {
        const res = await fetch(src);
        const blob = await res.blob();
        const file = new File([blob], photo.download || photo.file,
                              { type: blob.type || 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: text + ' ' + pageUrl });
          flashButton(btn, 'SHARED \u2713');
          return;
        }
      } catch (inner) { /* fall through to a text share */ }
    }
    try {
      await navigator.share({ title: CONFIG.share.title, text: text, url: pageUrl });
      flashButton(btn, 'SHARED \u2713');
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
  }

  const copied = await copyText(text + ' ' + pageUrl);
  flashButton(btn, copied ? 'LINK COPIED' : 'COPY FAILED');
  toast(copied
    ? 'Caption and link copied. Paste it wherever you post.'
    : 'Long-press the photo to save it, then post it the old-fashioned way.');
}
function buildGallery() {
  const grid = $('#galleryGrid');
  const filterBar = $('#filters');
  if (!grid) return;

  if (filterBar) {
    CATEGORIES.forEach(cat => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.dataset.filter = cat.id;
      chip.setAttribute('aria-pressed', String(cat.id === 'all'));
      chip.textContent = cat.emoji + ' ' + cat.label;
      on(chip, 'click', () => applyFilter(cat.id, false, false));
      filterBar.appendChild(chip);
    });
  }

  const frag = document.createDocumentFragment();
  PHOTOS.forEach((photo, i) => {
    const tile = createTile(photo, i);
    GALLERY.tiles.push(tile);
    frag.appendChild(tile);
  });
  grid.appendChild(frag);

  applyFilter('all', false, true);
}

function applyFilter(id, scrollToGallery, initial) {
  GALLERY.filter = id;
  const visible = [];

  GALLERY.tiles.forEach(tile => {
    const show = (id === 'all') || (tile.dataset.cat === id);
    tile.classList.toggle('is-hidden', !show);
    if (!show) return;

    visible.push(tile);

    if (!initial) {
      /* re-run the entrance animation so the switch feels deliberate */
      tile.style.setProperty('--i', stagger(visible.length, 40, 460) + 'ms');
      tile.classList.remove('is-shown');
      void tile.offsetWidth;
      tile.classList.add('is-shown');
    }
  });

  GALLERY.visible = visible;

  $$('#filters .chip').forEach(chip => {
    chip.setAttribute('aria-pressed', String(chip.dataset.filter === id));
  });
  $$('#personas .persona').forEach(persona => {
    persona.classList.toggle('is-active', persona.dataset.filter === id);
  });

  const count = $('#galleryCount');
  if (count) {
    const cat = categoryOf(id);
    count.textContent = visible.length
      ? visible.length + (visible.length === 1 ? ' photo' : ' photos') + ' \u00b7 ' + cat.label
      : 'Nothing in here yet \u2014 drop the files into /images and they\u2019ll appear.';
  }

  if (scrollToGallery) {
    const gallery = $('#gallery');
    if (gallery) gallery.scrollIntoView({ behavior: motion(), block: 'start' });
  }
}

function observeTiles() {
  if (prefersReduced() || !('IntersectionObserver' in window)) {
    GALLERY.tiles.forEach(tile => tile.classList.add('is-shown'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-shown');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });

  GALLERY.tiles.forEach(tile => io.observe(tile));
}

/* ── lightbox ─────────────────────────────────────────────────────────── */
function currentPhoto() {
  const tile = GALLERY.visible[GALLERY.index];
  return tile ? photoByFile(tile.dataset.file) : null;
}

function paintLightbox() {
  const lb = $('#lightbox');
  const photo = currentPhoto();
  if (!lb || !photo) return;

  const img = $('#lbImg');
  const cap = $('#lbCap');
  const meta = $('#lbMeta');
  const cat = categoryOf(photo.cat);
  const existingPh = $('.ph', lb);

  if (MISSING_FILES[photo.file]) {
    if (img) img.hidden = true;
    const ph = makePlaceholder(cat.label, photo.file, { ar: '4 / 5' });
    if (existingPh) existingPh.replaceWith(ph);
    else if (img && img.parentElement) img.parentElement.insertBefore(ph, img);
  } else {
    if (existingPh) existingPh.remove();
    if (img) {
      img.hidden = false;
      img.src = photoSrc(photo);
      img.alt = photo.alt;
    }
  }

  if (cap) cap.textContent = photo.caption;
  if (meta) {
    meta.textContent = (GALLERY.index + 1) + ' / ' + GALLERY.visible.length + ' \u00b7 ' + cat.label;
  }
}

function openLightbox() {
  const lb = $('#lightbox');
  if (!lb || !GALLERY.visible.length) return;

  GALLERY.index = Math.max(0, Math.min(GALLERY.index, GALLERY.visible.length - 1));
  GALLERY.lastFocus = document.activeElement;
  lb.hidden = false;
  lockScroll(true);
  paintLightbox();
  GALLERY.releaseTrap = trapFocus(lb);

  const closeBtn = $('.iconbtn--x', lb);
  if (closeBtn) setTimeout(() => {
    try { closeBtn.focus({ preventScroll: true }); } catch (err) { closeBtn.focus(); }
  }, 60);
}

function closeLightbox() {
  const lb = $('#lightbox');
  if (!lb || lb.hidden) return;
  lb.hidden = true;
  lockScroll(false);
  if (GALLERY.releaseTrap) {
    const release = GALLERY.releaseTrap;
    GALLERY.releaseTrap = null;
    release();
  }
}

function stepLightbox(delta) {
  if (!GALLERY.visible.length) return;
  const total = GALLERY.visible.length;
  GALLERY.index = (GALLERY.index + delta + total) % total;
  paintLightbox();
}
function initGallery() {
  buildGallery();
  observeTiles();

  const lb = $('#lightbox');
  if (!lb) return;

  $$('[data-lb-close]', lb).forEach(el => on(el, 'click', closeLightbox));
  on($('#lbPrev'), 'click', () => stepLightbox(-1));
  on($('#lbNext'), 'click', () => stepLightbox(1));
  on($('#lbDownload'), 'click', () => {
    const photo = currentPhoto();
    if (photo) downloadPhoto(photo, $('#lbDownload'));
  });
  on($('#lbShare'), 'click', () => {
    const photo = currentPhoto();
    if (photo) sharePhoto(photo, $('#lbShare'));
  });

  /* swipe between photos on touch devices */
  const stage = $('.lightbox__stage', lb);
  let startX = 0;
  let startY = 0;
  on(stage, 'touchstart', e => {
    const t = e.changedTouches[0];
    startX = t.clientX;
    startY = t.clientY;
  }, { passive: true });
  on(stage, 'touchend', e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) {
      stepLightbox(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  on(document, 'keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
    else if (e.key === 'ArrowLeft') stepLightbox(-1);
    else if (e.key === 'ArrowRight') stepLightbox(1);
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   15 · "WHICH RISHABH ARE YOU POSTING?"
   ───────────────────────────────────────────────────────────────────────── */
function initPersonas() {
  $$('#personas .persona').forEach(persona => on(persona, 'click', () => {
    applyFilter(persona.dataset.filter, true, false);
  }));
}

/* ─────────────────────────────────────────────────────────────────────────
   16 · CAPTION GENERATOR
   ───────────────────────────────────────────────────────────────────────── */
function initCaptions() {
  const list = $('#captionList');
  if (!list) return;

  CAPTIONS.forEach((text, i) => {
    const li = document.createElement('li');
    li.className = 'caption';

    const p = document.createElement('p');
    p.className = 'caption__text';
    p.textContent = text;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'caption__btn';
    btn.textContent = 'Copy caption';

    on(btn, 'click', async () => {
      const copied = await copyText(text);
      flashButton(btn, copied ? 'Copied! \ud83d\udccb' : 'Try again', 2200);
      if (copied) toast('Copied! \ud83d\udccb Paste it in your story.');
    });

    li.append(p, btn);
    list.appendChild(li);
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   17 · EASTER EGG  🎁  (tucked into the last paragraph of the page)
   ───────────────────────────────────────────────────────────────────────── */
function initEasterEgg() {
  const btn = $('#easterEggBtn');
  const modal = $('#eggModal');
  if (!btn || !modal) return;

  let releaseTrap = null;

  function open() {
    modal.hidden = false;
    lockScroll(true);
    btn.classList.add('is-found');

    const box = btn.getBoundingClientRect();
    confettiBurst({
      count: 22,
      power: 0.6,
      x: (box.left + box.width / 2) / Math.max(1, window.innerWidth),
      y: Math.max(0.08, box.top / Math.max(1, window.innerHeight))
    });

    releaseTrap = trapFocus(modal);
    const closeBtn = $('.modal__x', modal);
    if (closeBtn) setTimeout(() => {
      try { closeBtn.focus({ preventScroll: true }); } catch (err) { closeBtn.focus(); }
    }, 60);
  }

  function close() {
    if (modal.hidden) return;
    modal.hidden = true;
    lockScroll(false);
    if (releaseTrap) { releaseTrap(); releaseTrap = null; }
  }

  on(btn, 'click', open);
  $$('[data-close]', modal).forEach(el => on(el, 'click', close));
  on(document, 'keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) { e.preventDefault(); close(); }
  });
}
/* ─────────────────────────────────────────────────────────────────────────
   18 · BACKGROUND MUSIC  (never autoplays, remembers the choice per session)
   The button only appears if the audio file actually loads.
   ───────────────────────────────────────────────────────────────────────── */
function initMusic() {
  const wrap = $('#musicWrap');
  const btn = $('#musicBtn');
  const audio = $('#music');
  const label = $('#musicLabel');
  if (!wrap || !btn || !audio || !CONFIG.music.src) return;

  const KEY = 'rishabh-birthday-music';
  let available = false;
  let playing = false;

  audio.src = CONFIG.music.src;
  audio.preload = 'metadata';
  audio.volume = typeof CONFIG.music.volume === 'number' ? CONFIG.music.volume : 0.45;

  function setUi(on) {
    playing = on;
    btn.setAttribute('aria-pressed', String(on));
    if (label) label.textContent = on ? 'Music ON \ud83d\udd0a' : 'Music OFF \ud83d\udd07';
  }

  function remember(on) {
    try { sessionStorage.setItem(KEY, on ? 'on' : 'off'); } catch (err) { /* ignore */ }
  }

  async function play() {
    try {
      await audio.play();
      setUi(true);
      remember(true);
    } catch (err) {
      setUi(false);
      toast('Your browser is being shy about audio. Tap once more.');
    }
  }

  function pause() {
    audio.pause();
    setUi(false);
    remember(false);
  }

  on(audio, 'loadedmetadata', () => {
    available = true;
    wrap.hidden = false;

    let wanted = null;
    try { wanted = sessionStorage.getItem(KEY); } catch (err) { /* ignore */ }

    if (wanted === 'on') {
      /* honour last choice — some browsers will need a fresh tap, that's fine */
      audio.play().then(() => setUi(true)).catch(() => setUi(false));
    } else {
      setUi(false);
    }
  }, { once: true });

  on(audio, 'error', () => { wrap.hidden = true; }, { once: true });

  on(btn, 'click', () => { if (playing) pause(); else play(); });

  setUi(false);
  audio.load();

  /* no music file? the control quietly disappears. Nothing breaks. */
  setTimeout(() => { if (!available) wrap.hidden = true; }, 3200);
}

/* ─────────────────────────────────────────────────────────────────────────
   19 · SCROLL TARGETS  (VIEW INVITATION, JUST LET ME RSVP, I'M COMING 🎉)
   ───────────────────────────────────────────────────────────────────────── */
function initScrollTargets() {
  $$('[data-scroll]').forEach(el => on(el, 'click', () => {
    const target = $(el.dataset.scroll);
    if (!target) return;

    target.scrollIntoView({ behavior: motion(), block: 'start' });

    if (el.dataset.scroll === '#rsvp') {
      const success = $('#rsvpSuccess');
      if (success && !success.hidden) {
        toast('You\u2019re already on the list. Relax.');
        return;
      }
      const nameEl = $('#rsvpName');
      if (nameEl) setTimeout(() => {
        try { nameEl.focus({ preventScroll: true }); } catch (err) { nameEl.focus(); }
      }, prefersReduced() ? 80 : 720);
    }
  }));
}

/* ─────────────────────────────────────────────────────────────────────────
   20 · GO
   ───────────────────────────────────────────────────────────────────────── */
function init() {
  bindConfig();
  initImageFallbacks();   /* hero + easter egg photos first, so nothing flashes */
  initGate();             /* straight after, so the entrance appears instantly */
  initReveal();
  initScrollFx();
  initParticles();
  initTerms();
  initRsvp();
  initGallery();
  initPersonas();
  initCaptions();
  initEasterEgg();
  initMusic();
  initScrollTargets();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
