# Update Workflow

When Jamie sends a change, here's how to get it live without rebuilding the world.

---

## Change classification

| Type of change | Files to edit in `src/` | Files to re-paste in Squarespace |
|---|---|---|
| Coach bio text | `data/coaches.js` | `homepage-code-block.html` |
| Add / remove coach | `data/coaches.js` | `homepage-code-block.html` |
| Class time / new class | `data/schedule.js` | `homepage-code-block.html` |
| Coach assignment for a class | `data/schedule.js` | `homepage-code-block.html` |
| Program copy filled in | `data/programs.js` | `homepage-code-block.html` |
| Fill in a real review quote | `data/reviews.js` | `homepage-code-block.html` |
| Styling tweak (color, spacing) | `styles.css` | `custom-css.css` |
| New nav link or section | `homepage.html` + `styles.css` + maybe `scripts.js` | `homepage-code-block.html` + `custom-css.css` + `nav-injection.html` + `footer-block.html` |
| Nav link change | `homepage.html` + `nav-injection.html` | `nav-injection.html` (hand-maintained) |
| Footer content change | `homepage.html` + `footer-block.html` | `footer-block.html` (hand-maintained) |
| Font change | Header injection + `styles.css` | `header-injection.html` + `custom-css.css` |
| Add Google Reviews widget | Replace `.reviews-placeholder` block in `homepage.html` | `homepage-code-block.html` |
| Add real Instagram feed | Replace `#ig-scroller` render in `scripts.js` with widget embed code | `homepage-code-block.html` |

---

## The repackage step

`squarespace/` files are **generated** from `src/`. After any edit to `src/`, regenerate the deploy files:

```bash
# Mac/Linux
./build.sh

# Windows PowerShell
.\build.ps1
```

Both scripts do the same thing:

1. Copy `src/styles.css` → `squarespace/custom-css.css`
2. Extract `<body>` from `src/homepage.html`
3. **Strip content between `SQUARESPACE-STRIP` markers** (nav and footer — see below)
4. Inline `data/*.js` + `scripts.js` as a single `<script>` block
5. Write the result to `squarespace/homepage-code-block.html`

### The SQUARESPACE-STRIP mechanism

`src/homepage.html` contains the full page (nav, content, footer) for local preview. But on Squarespace, the nav and footer are delivered separately (via Code Injection and the footer block). The build script strips them from the Code Block output using comment markers:

```html
<!-- SQUARESPACE-STRIP-START: nav -->
<header class="nav" id="nav">
  ... entire nav markup ...
</header>
<!-- SQUARESPACE-STRIP-END: nav -->
```

The regex `<!-- SQUARESPACE-STRIP-START: \w+ -->...<!-- SQUARESPACE-STRIP-END: \w+ -->` removes everything between matching markers (including the markers themselves).

**Rules:**
- Marker names must be a single word (`nav`, `footer`). The `\w+` pattern enforces this.
- Never nest strip markers inside each other.
- If you add a new marker pair, both the START and END comments must be present or the regex won't match and the content will leak into the Code Block.
- `src/homepage.html` keeps the full markup for local preview — only the generated Code Block strips it.

Currently two sections are stripped:
- `nav` — the `<header class="nav">` block (delivered via `squarespace/nav-injection.html`)
- `footer` — the `<footer>` block (delivered via `squarespace/footer-block.html`)

---

## Common change recipes

### "Jamie changed a class time"

1. Open `src/data/schedule.js`
2. Find the day + class (e.g. Monday, 6:00 PM Fundamentals)
3. Change the `time` field
4. Run `./build.sh`
5. In Squarespace, open the homepage Code Block, select all, paste in the new `squarespace/homepage-code-block.html` contents
6. Save

Total time: 2 minutes.

### "New coach joined"

1. Open `src/data/coaches.js`
2. Copy an existing coach object as a template
3. Fill in id / name / role / url / bio[] / creds[]
4. Add them to the array in the right position (position determines their number badge, 01–08)
5. If they teach specific classes, update `schedule.js` too
6. Run `./build.sh`
7. Re-paste the homepage Code Block

**Note:** the coach grid is styled as 4 columns × 2 rows on desktop. Adding a 9th coach adds a row of 4 with only 1 filled — visually awkward. If Jamie adds a coach, we should either bump to 3×3 or accept the gap.

### "Jamie sent bio copy for Muay Thai"

1. Open `src/data/programs.js`
2. Find the `muaythai` entry
3. Change `hasRealCopy: false` → `hasRealCopy: true`
4. Add a `bio: ["paragraph 1", "paragraph 2"]` array with his copy
5. Delete `placeholder: true`
6. Run `./build.sh`
7. Re-paste the homepage Code Block

The red-dashed placeholder block will disappear automatically and the real copy will render in its place.

### "Schedule changed"

Two things must be updated together:

1. Edit `src/data/schedule.js` with the new class times / names / coaches
2. Replace `src/images/schedule/weekly-schedule.jpg` with the updated flyer (same filename)
3. In `src/scripts.js`, bump `SCHEDULE_FLYER_VERSION` (e.g. `"1"` → `"2"`) so browsers don't show the cached old copy
4. Commit, push, wait for GitHub Pages to deploy the new image
5. Run `.\build.ps1` and re-paste `squarespace/homepage-code-block.html` into the Squarespace Code Block

### "Fill in a real review quote"

The Reviews section now renders from `src/data/reviews.js`. Any card whose quote starts with `[PASTE` shows a red-dashed placeholder — the site will visibly be broken in preview until real text is in.

1. Open Google Maps, search "Jedi Jiu-Jitsu Tulsa", go to Reviews
2. Find the reviewer by name (Ash Etwardo, Chris Massie, etc.)
3. Copy their review verbatim — do not paraphrase
4. Open `src/data/reviews.js`, find the matching `name` entry
5. Replace the `[PASTE REAL REVIEW TEXT...]` string with the copied quote
6. Run `.\build.ps1` (Windows) or `./build.sh` (Mac/Linux)
7. Re-paste `squarespace/homepage-code-block.html` into the Squarespace Code Block

Repeat per reviewer. Only publish when all six cards are filled.

### "Replace Reviews carousel with a live Elfsight widget"

Do this instead of filling in quotes if Jamie prefers auto-updating reviews.

1. Sign up at Elfsight → Google Reviews widget → configure → grab the embed snippet
2. Open `src/homepage.html`
3. Find `<div class="reviews-scroller-wrap">` and delete it plus its contents
4. Also delete the `<div class="reviews-nav">` block inside the `section-head`
5. Paste the Elfsight snippet in place of the scroller wrap, wrapped in:
   ```html
   <div style="border: 2px solid var(--ink);">
     <!-- paste Elfsight snippet here -->
   </div>
   ```
6. In `src/scripts.js`, delete the `/* REVIEWS */` block (the `if (reviewsScroller)` section)
7. Run `.\build.ps1` and re-paste the homepage Code Block

### "Add the real Instagram feed"

Same pattern as Reviews, but for the `#ig-scroller` div in `scripts.js`. Behold's carousel snippet drops in cleanly. Delete the `IG_TILES` array and the `.forEach` block that renders placeholder tiles, and put the widget embed in the `#ig-scroller` container.

---

## Version control practice

- Commit `src/` changes with a descriptive message: `git commit -m "coaches: update Nick Giles bio with 2026 credentials"`
- Commit `squarespace/` changes as a separate follow-up: `git commit -m "build: regenerate squarespace/ for coach bio update"`
- This makes it easy to see what changed vs. what was regenerated
- Tag releases when you push to production: `git tag squarespace-2026-07-08 && git push --tags`

If something breaks on the live site, `git log squarespace/` shows exactly what changed and when.

---

## What NOT to do

- **Don't hand-edit files in `/squarespace/`.** They're regenerated from `/src/` on every build. Your edits will be lost.
- **Don't inline images as base64 in the Code Block.** Squarespace has its own image system — upload images to Squarespace's asset library and reference them by their `static1.squarespace-cdn.com` URLs.
- **Don't fetch data from third-party APIs directly in `scripts.js`.** Squarespace's CSP may block it. Use widget embeds instead.
- **Don't commit Squarespace login credentials, API keys, or Google Places API keys to the repo.** If any of these end up needed, use environment variables + a `.gitignored` `.env` file.
