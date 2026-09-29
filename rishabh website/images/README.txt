PUT RISHABH'S PHOTOS IN THIS FOLDER
===================================

Use these EXACT filenames. The website looks them up by name, so a typo means
the photo silently shows a designed placeholder tile instead.

Any file that is missing is replaced by an on-brand placeholder — the site
never shows a broken-image icon, so it's totally fine to add these gradually.

------------------------------------------------------------------
HERO  (the big full-screen photo — a portrait/vertical shot works best)
------------------------------------------------------------------
  hero.jpg

------------------------------------------------------------------
GALLERY — 3 per category (mix portrait + landscape for a nice masonry)
------------------------------------------------------------------
  best-look-1.jpg
  best-look-2.jpg
  best-look-3.jpg

  gym-1.jpg
  gym-2.jpg
  gym-3.jpg

  chaotic-1.jpg
  chaotic-2.jpg
  chaotic-3.jpg

  throwback-1.jpg
  throwback-2.jpg
  throwback-3.jpg

  wholesome-1.jpg
  wholesome-2.jpg
  wholesome-3.jpg

------------------------------------------------------------------
EASTER EGG  (the embarrassing one nobody was supposed to see)
------------------------------------------------------------------
  easter-egg.jpg

------------------------------------------------------------------
TIPS
------------------------------------------------------------------
- Keep photos under ~400 KB each. Around 1400-1600px on the long edge is
  plenty — phones are the target, not 4K monitors.
- .jpg is assumed. If you'd rather use .png or .webp, change the `file`
  values in the PHOTOS array at the top of script.js to match.
- Want a different crop in the grid? Each photo has an `ar` (aspect ratio)
  value in script.js. Try '4 / 5', '3 / 4', '1 / 1' or '3 / 2'.
- Downscale with any free tool (Squoosh, TinyPNG, or Preview → Export).
  Big files are the number one reason a site like this feels slow.
