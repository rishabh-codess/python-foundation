 /* throwaway build check — deleted after validation */
const fs = require('fs');
const path = require('path');
const root = __dirname;

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

const errors = [];
const warnings = [];

/* ── pull the config literals straight out of script.js ── */
function extractLiteral(name, closer) {
  const start = js.indexOf('const ' + name + ' = ');
  if (start === -1) throw new Error('could not find const ' + name);
  const openIdx = js.indexOf('=', start) + 1;
  const endIdx = js.indexOf('\n' + closer, openIdx);
  if (endIdx === -1) throw new Error('could not find end of ' + name);
  /* slice INCLUDING the object's own closing brace/bracket */
  const literal = js.slice(openIdx, endIdx + closer.length);
  return new Function('return (' + literal + ');')();
}

const CONFIG = extractLiteral('CONFIG', '};');
const PHOTOS = extractLiteral('PHOTOS', '];');
const CATEGORIES = extractLiteral('CATEGORIES', '];');
const CAPTIONS = extractLiteral('CAPTIONS', '];');

/* ── 1 · HTML ids: unique + collect ── */
const htmlIds = [];
const idRegex = /\sid="([^"]+)"/g;
let m;
while ((m = idRegex.exec(html))) htmlIds.push(m[1]);
const idSet = new Set(htmlIds);

const dupes = htmlIds.filter((id, i) => htmlIds.indexOf(id) !== i);
if (dupes.length) errors.push('duplicate HTML ids: ' + dupes.join(', '));

/* ── 2 · every id script.js looks up must exist in index.html ── */
const jsIds = new Set();
const selRegex = /\$\$?\('#([A-Za-z0-9_-]+)'\)/g;
while ((m = selRegex.exec(js))) jsIds.add(m[1]);
const slotBlock = js.match(/const RSVP_ERROR_SLOTS = \{([\s\S]*?)\};/);
if (slotBlock) {
  (slotBlock[1].match(/'([A-Za-z0-9_-]+)'/g) || [])
    .forEach(v => jsIds.add(v.replace(/'/g, '')));
}
const missingIds = [...jsIds].filter(id => !idSet.has(id));
if (missingIds.length) errors.push('script.js looks for ids index.html lacks: ' + missingIds.join(', '));

/* ── 3 · data-scroll targets ── */
const scrollRegex = /data-scroll="#([A-Za-z0-9_-]+)"/g;
while ((m = scrollRegex.exec(html))) {
  if (!idSet.has(m[1])) errors.push('data-scroll="#" points at a missing id: #' + m[1]);
}

/* ── 4 · label / aria / datalist references ── */
[/\sfor="([^"]+)"/g, /aria-labelledby="([^"]+)"/g, /\slist="([^"]+)"/g].forEach(rx => {
  let r;
  while ((r = rx.exec(html))) {
    if (!idSet.has(r[1])) errors.push('dangling reference to id "' + r[1] + '"');
  }
});

/* ── 5 · data-cfg paths must resolve inside CONFIG ── */
const getPath = (o, p) => p.split('.').reduce((a, k) => (a && a[k] !== undefined ? a[k] : undefined), o);
const cfgRegex = /data-cfg="([^"]+)"/g;
while ((m = cfgRegex.exec(html))) {
  if (typeof getPath(CONFIG, m[1]) !== 'string') {
    errors.push('data-cfg="' + m[1] + '" does not resolve to a string in CONFIG');
  }
}
/* ── 6 · photo + category integrity ── */
const files = new Set(PHOTOS.map(p => p.file));
if (files.size !== PHOTOS.length) errors.push('duplicate filenames in PHOTOS');
const catIds = new Set(CATEGORIES.map(c => c.id));
PHOTOS.forEach(p => {
  if (!catIds.has(p.cat)) errors.push('photo "' + p.file + '" uses unknown category "' + p.cat + '"');
  if (!/^\d+ \/ \d+$/.test(p.ar)) errors.push('photo "' + p.file + '" has a bad aspect ratio: ' + p.ar);
  if (!p.alt) errors.push('photo "' + p.file + '" is missing alt text');
  if (!p.caption) errors.push('photo "' + p.file + '" is missing a caption');
  if (!/^[a-z0-9-]+\.jpg$/.test(p.file)) errors.push('photo "' + p.file + '" is not a kebab-case .jpg');
  if (!/^rishabh-birthday-[a-z0-9-]+\.jpg$/.test(p.download)) {
    errors.push('photo "' + p.file + '" download name is off-spec: ' + p.download);
  }
});
CATEGORIES.filter(c => c.id !== 'all').forEach(c => {
  if (!PHOTOS.filter(p => p.cat === c.id).length) {
    warnings.push('category "' + c.id + '" has no photos — its filter will look empty');
  }
});
if (!CAPTIONS.length) errors.push('CAPTIONS is empty');

/* ── 7 · static <img> sources ── */
const imgRegex = /<img[^>]+src="(images\/[^"]+)"/g;
while ((m = imgRegex.exec(html))) {
  const base = m[1].replace('images/', '');
  if (base !== 'hero.jpg' && base !== 'easter-egg.jpg') {
    warnings.push('index.html references an unexpected static image: ' + m[1]);
  }
}

/* ── 8 · classes script.js toggles must exist in style.css ── */
const toggleClasses = [
  'tile', 'tile__open', 'tile__media', 'tile__badge', 'tile__zoom', 'tile__cap',
  'tile__acts', 'tile__act', 'ph', 'ph--fill', 'ph__tag', 'ph__file', 'chip',
  'caption', 'caption__text', 'caption__btn', 'gate__line', 'gate__line--punch',
  'is-on', 'is-done', 'is-shown', 'is-hidden', 'has-error', 'is-optional',
  'is-active', 'is-entered', 'is-locked', 'has-overlay', 'is-leaving',
  'is-found', 'is-shaking'
];
toggleClasses.forEach(cls => {
  if (!css.includes('.' + cls)) errors.push('script.js toggles .' + cls + ' but style.css never defines it');
});

/* ── 9 · CSS brace balance ── */
const opens = (css.match(/\{/g) || []).length;
const closes = (css.match(/\}/g) || []).length;
if (opens !== closes) errors.push('style.css brace mismatch: ' + opens + ' { vs ' + closes + ' }');

/* ── 10 · leftover markers ── */
['index.html', 'style.css', 'script.js'].forEach((name, i) => {
  const body = [html, css, js][i];
  if (body.includes('@@SLOT')) errors.push(name + ' still contains an @@SLOT@@ marker');
});

/* ── 11 · nothing remote except Google Fonts ── */
(html.match(/https?:\/\/[^"')\s]+/g) || []).forEach(u => {
  if (!/fonts\.googleapis\.com|fonts\.gstatic\.com|www\.w3\.org/.test(u)) {
    warnings.push('unexpected remote URL in index.html: ' + u);
  }
});

/* ── 12 · every function script.js CALLS must actually exist ── */
/* a real char-by-char scanner: comments and string contents are dropped, so
   prose can never look like a function call (regexes get this wrong) */
function codeOnly(src) {
  let out = '';
  let i = 0;
  let mode = 'code';
  let quote = '';
  while (i < src.length) {
    const ch = src[i];
    const nx = src[i + 1];
    if (mode === 'code') {
      if (ch === '/' && nx === '*') { mode = 'block'; i += 2; continue; }
      if (ch === '/' && nx === '/') { mode = 'line'; i += 2; continue; }
      if (ch === '"' || ch === "'" || ch === '`') {
        quote = ch; mode = 'str'; out += '\u0001'; i++; continue;
      }
      out += ch; i++; continue;
    }
    if (mode === 'block') {
      if (ch === '*' && nx === '/') { mode = 'code'; i += 2; continue; }
      i++; continue;
    }
    if (mode === 'line') {
      if (ch === '\n') { mode = 'code'; out += '\n'; }
      i++; continue;
    }
    /* mode === 'str' */
    if (ch === '\\') { i += 2; continue; }
    if (ch === quote) { mode = 'code'; i++; continue; }
    i++;
  }
  return out;
}

const stripped = codeOnly(js);

const GLOBALS = new Set([
  'document', 'window', 'console', 'Math', 'Object', 'Array', 'JSON', 'String',
  'Number', 'Boolean', 'Promise', 'Date', 'RegExp', 'Error', 'Set', 'Map',
  'parseInt', 'parseFloat', 'isNaN', 'setTimeout', 'clearTimeout', 'setInterval',
  'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame', 'fetch',
  'Blob', 'URL', 'File', 'navigator', 'location', 'localStorage', 'sessionStorage',
  'getComputedStyle', 'structuredClone', 'queueMicrotask', 'Function',
  'IntersectionObserver', 'ResizeObserver', 'MutationObserver', 'MediaQueryList',
  'if', 'for', 'while', 'switch', 'catch', 'return', 'typeof', 'function', 'new',
  'await', 'do', 'else', 'delete', 'in', 'of', 'void', 'yield', 'async', 'case',
  'with', 'finally', 'import'
]);

const defined = new Set();
[/function\s+([A-Za-z_$][\w$]*)\s*\(/g,
 /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g
].forEach(rx => {
  let r;
  while ((r = rx.exec(stripped))) defined.add(r[1]);
});

const called = new Set();
const callRx = /(?<![.\w$])([A-Za-z_$][\w$]*)\s*\(/g;
let c;
while ((c = callRx.exec(stripped))) called.add(c[1]);

const undefinedCalls = [...called].filter(n => !defined.has(n) && !GLOBALS.has(n));
if (undefinedCalls.length) {
  errors.push('script.js calls names that are never defined: ' + undefinedCalls.join(', '));
}

/* ── 13 · dead code: declared functions nobody references ── */
const declared = [];
const declRx = /^function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
let d;
while ((d = declRx.exec(stripped))) declared.push(d[1]);
const unused = declared.filter(name => {
  const hits = stripped.match(new RegExp('\\b' + name + '\\b', 'g')) || [];
  return hits.length < 2;
});
if (unused.length) warnings.push('declared but never used: ' + unused.join(', '));

/* ── 14 · class + attribute selectors used in script.js must resolve ── */
const classSelRx = /\$\$?\('\.([A-Za-z0-9_-]+)'/g;
let sc;
while ((sc = classSelRx.exec(js))) {
  const cls = sc[1];
  const inHtml = new RegExp('class="[^"]*\\b' + cls + '\\b').test(html);
  const inCss = css.includes('.' + cls);
  if (!inHtml && !inCss) {
    errors.push('script.js queries .' + cls + ' but it exists in neither HTML nor CSS');
  }
}

const attrSelRx = /\$\$?\('\[([a-z-]+)\]'/g;
let ac;
while ((ac = attrSelRx.exec(js))) {
  if (!html.includes(ac[1])) errors.push('script.js queries [' + ac[1] + '] but index.html never sets it');
}

/* ── report ── */
console.log('extracted: ' + PHOTOS.length + ' photos, ' + CATEGORIES.length +
            ' categories, ' + CAPTIONS.length + ' captions, ' + htmlIds.length +
            ' html ids, ' + jsIds.size + ' js id lookups\n');
if (warnings.length) {
  console.log('WARNINGS (' + warnings.length + ')');
  warnings.forEach(w => console.log('  ! ' + w));
  console.log('');
}
if (errors.length) {
  console.log('ERRORS (' + errors.length + ')');
  errors.forEach(e => console.log('  x ' + e));
  process.exit(1);
}
console.log('PASS - HTML / CSS / JS cross-references all line up.');

