# 🎂 Rishabh is getting older. Unfortunately.

A personal birthday microsite. Not a registration form, not a template — an
interactive experience with a joke inside it.

Built with plain **HTML + CSS + JavaScript**. No build step, no npm install,
no frameworks, no CDN scripts, no dependencies at all.

---

## Run it locally

Double-clicking `index.html` works, **but** photo downloads and the clipboard
need a real server. Do this instead:

```powershell
cd "c:\Users\hp\Desktop\rishabh website"
python -m http.server 8080
```

Then open **http://localhost:8080**

Any static server works (`npx serve`, VS Code Live Server, etc.).

---

## The 6 things you'll actually want to change

Almost everything lives in the `CONFIG` object at the very top of `script.js`.

### 1. The date, time and venue

```js
event: {
  dateISO:     '2026-12-12T20:00',              // YYYY-MM-DDTHH:mm  ← drives the calendar file
  durationHours: 3.5,
  dateShort:   '12 December',                   // used in the small eyebrow labels
  dateDisplay: 'Saturday, 12 December',         // the invitation card
  timeDisplay: '8:00 PM onwards',
  venue:       'The Rooftop, [Restaurant Name], [City]',
  dressCode:   '\u201cCome looking decent. I have standards.\u201d'
}
```

> `dateISO` must keep the exact `YYYY-MM-DDTHH:mm` format. Everything else is
> free text — write it however you'd say it out loud.

### 2. Photos
See **`images/README.txt`** for the exact list of filenames. Any file that's
missing renders a designed placeholder instead of a broken image, so you can
add them one at a time.

### 3. Music
See **`assets/README.txt`**. Optional — skip it and the button never appears.

### 4. The gallery captions and categories
`PHOTOS` in `script.js`. Each entry:

```js
{ file:'gym-1.jpg', cat:'gym', ar:'4 / 5', download:'rishabh-birthday-gym.jpg',
  alt:'Rishabh after a workout, pretending that was easy',
  caption:'Post-gym. Do not ask how long I was actually there.' }
```

### 5. The captions in the caption generator
The `CAPTIONS` array. Add or delete freely.

### 6. All the copy
Every line of writing is either in `index.html` (section text) or in the
`CONFIG` / `CATEGORIES` / `CAPTIONS` / `GATE_SCRIPT` / `ATTENDANCE` blocks at the
top of `script.js`. Nothing is buried in the middle of a function.

---

## Where RSVP responses go

Out of the box, responses are saved to the guest's own browser (`localStorage`)
and the success screen works exactly as normal. Nothing is sent anywhere.

To actually collect them, set one value:

```js
rsvp: {
  endpoint: '',   // ← paste your URL here
  localKey: 'rishabh-birthday-rsvp-v1'
}
```

### The data you'll receive

```json
{
  "name": "Aarav",
  "relationship": "College Friend",
  "attendance": "yes",
  "returnGift": "Perfume",
  "submittedAt": "2026-11-30T14:12:07.331Z",
  "source": "birthday-invite"
}
```

`attendance` is always one of `"yes"`, `"maybe"` or `"no"`.

### 🔒 Never put a private API key in this file

Anything in `script.js` is visible to everyone who opens the page. That's why
`submitRSVP()` posts to a **URL** and nothing else. Both options below keep the
secret on the server side, where it belongs.

### Option A — Google Sheets (Apps Script, ~2 minutes)

1. Make a new Google Sheet. Add these headers in row 1:
   `Timestamp | Name | Relationship | Attendance | Return Gift`
2. **Extensions → Apps Script**, paste this, save:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([ new Date(), d.name, d.relationship, d.attendance, d.returnGift ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the `/exec` URL into `CONFIG.rsvp.endpoint`.

The `text/plain` content type in `submitRSVP()` is deliberate: it keeps the
request "simple" so the browser doesn't send a CORS preflight that Apps Script
can't answer. **Don't change it to `application/json`** or it will break.

### Option B — Supabase Edge Function

```ts
// supabase/functions/rsvp/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const body = await req.json()
  const db = createClient(
    Deno.env.get('SUPABASE_URL')!,          // secrets live here, not in your HTML
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  const { error } = await db.from('rsvps').insert({
    name: body.name,
    relationship: body.relationship,
    attendance: body.attendance,
    return_gift: body.returnGift
  })
  return new Response(JSON.stringify({ ok: !error }), {
    headers: { ...cors, 'Content-Type': 'application/json' }
  })
})
```

Deploy it (`supabase functions deploy rsvp`), then paste the function URL into
`CONFIG.rsvp.endpoint`. Set the secrets with `supabase secrets set`.

**Firebase?** Same idea — call a Cloud Function / callable rather than the
database directly, so no keys end up in the browser.

### Where the code lives

| Function | Job |
|---|---|
| `readRsvpForm()` | pulls the four values out of the DOM |
| `validateRsvp(data)` | inline error messages (no `alert()` anywhere) |
| `buildRSVPPayload(data)` | shapes the `{name, relationship, attendance, returnGift}` object |
| `saveRSVPLocally(payload)` | `localStorage`, so the guest keeps their own copy |
| `submitRSVP(payload)` | **← the orchestrator. Swap the internals here for any backend.** |

---

## The full guest journey

```
Gate  "WAIT… 👀  Are you actually invited?"
        ↓  YES, OBVIOUSLY →        or        I'M NOT SURE 🤨 → ENTER →
Hero        RISHABH IS GETTING OLDER. / UNFORTUNATELY. 🎂
Intro       ANOTHER YEAR. → WE'RE CELEBRATING.
Invitation  the card, then "Dinner is on me." … "But there's a catch. 👀"
Clause      YOU EAT. / I PAY. / YOU BRING A RETURN GIFT.
            tick the box → I ACCEPT THESE TERMS → checkmark + confetti
RSVP        name · relationship · status · return gift
Success     YOU'RE ON THE LIST. 🎉 + confetti + calendar + share
Gallery     YOU HAVE ONE JOB. — filter, view, download, share
Personas    WHICH RISHABH ARE YOU POSTING?
Captions    DON'T KNOW WHAT TO WRITE? → Copy caption → Copied! 📋
Easter egg  a 🎁 tucked into the last paragraph
Final       SEE YOU AT DINNER. 🥂 → I'M COMING 🎉 (scrolls back to RSVP)
```

Roughly 2–4 minutes to explore properly. Someone in a rush can hit
**JUST LET ME RSVP** in the hero and be done in 20 seconds.

---

## What's in the files

```
index.html          semantic markup — 11 sections + 3 overlays
style.css           design tokens → base → components → sections → responsive
script.js           CONFIG → content → helpers → 20 small modules → init()
README.md           this file
images/             photos (see images/README.txt)
assets/             music.mp3 (see assets/README.txt)
```

`script.js` is ordered top to bottom and numbered; every module is a single
function, and `init()` at the bottom calls them in order.

### Handy details

- **The entrance screen** plays once per browser session (`CONFIG.gate.rememberInSession`).
  Set it to `false` if you want everyone to see it on every single visit.
- **Reduced motion** is fully respected — `prefers-reduced-motion: reduce`
  removes the parallax, the slow zoom, all reveal animations and every last
  piece of confetti.
- **Confetti** is hand-written (~70 lines, no library) and only fires three
  times: terms accepted, RSVP confirmed, easter egg found.
- **Photos that aren't uploaded yet** render a designed placeholder tile with
  the filename on it, so the gallery never looks broken.
- **The hero** pauses its particle animation when it scrolls off screen or the
  tab is hidden.

---

## Deploying

It's a static folder. Drag it onto [Netlify Drop](https://app.netlify.com/drop),
push it to GitHub Pages, or drop it into Vercel. No build command, no output
directory, no environment variables.

For the WhatsApp/Instagram link preview, add your deployed URL to
`CONFIG.share.url` so the share button always shares the canonical link rather
than whatever weird query string the visitor arrived with.

---

## Accessibility

- Semantic landmarks, one `<h1>`, real `<button>` elements throughout
- Every input properly labelled; attendance cards are real radios in a `radiogroup`
- Focus is trapped inside the entrance screen, the photo viewer and the easter
  egg modal, and restored when they close
- `Esc` closes overlays, `←`/`→` step through photos
- Download and Share are always visible buttons — never hover-only
- Text meets WCAG AA against the dark palette
- A skip-link sits at the top for keyboard users

---

## Notes for future me

- Any `fetch()` on a `file://` page is blocked by the browser. Use
  `python -m http.server` when testing downloads locally.
- `localStorage` key is `rishabh-birthday-rsvp-v1`. To wipe saved test data,
  DevTools → Application → Local Storage → delete it.
- Want to reset the entrance screen while testing?
  DevTools → Application → Session Storage → delete `rishabh-birthday-entered`.

Made for Rishabh's birthday. © Rishabh Kumar

