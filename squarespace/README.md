# Squarespace Deploy Cheat Sheet

Three files. Three places in Squarespace. Copy-paste in this order.

---

## 1. `custom-css.css` → Design → Custom CSS

**Path in Squarespace:** `Design` (left sidebar) → `Custom CSS`

**What to do:**
1. Open `custom-css.css` in your editor
2. Select all (`Cmd+A` / `Ctrl+A`)
3. Copy
4. In Squarespace, paste into the Custom CSS panel (replacing any existing content — save a backup first)
5. Click Save

**Notes:**
- Squarespace will strip any `<link>` tags or `<style>` wrappers. Our file has none — pure CSS only.
- Custom CSS applies to every page site-wide, which is what we want (nav, footer, and shared components must look right on the blog page and coach subpages too).
- If Jamie has existing Custom CSS he wants to preserve, paste ours **above** his so ours defines the baseline and his overrides it.

---

## 2. `header-injection.html` → Settings → Advanced → Code Injection → Header

**Path in Squarespace:** `Settings` → `Advanced` → `Code Injection` → `HEADER` field

**What to do:**
1. Open `header-injection.html`
2. Copy everything **between** (not including) the outer HTML comments at the very top and bottom
3. **Replace the entire contents** of the HEADER field with the copied code
4. Click Save

**IMPORTANT — this file contains third-party tracking code:**
- **Google Analytics** (`UA-133381493-1`) — Jamie's site analytics
- **Tracking pixel** (`sitetracking.xyz`) — ad/campaign tracking
- **Google Fonts** — our custom font stack

This repo file is the **single source of truth** for what belongs in the Header Code Injection field. Pasting only the fonts (or any partial version) will silently break analytics and ad tracking. If Jamie adds new tracking snippets in Squarespace, they must also be added to this file so the next paste doesn't overwrite them.

**Notes:**
- Do NOT paste into the FOOTER field — fonts must load before content or you'll see a flash of unstyled text (FOUT).
- Do NOT modify, reformat, or "clean up" the GA or pixel code. Copy it verbatim.

---

## 3. `homepage-code-block.html` → Homepage → Code Block

**Path in Squarespace:** Homepage → `Edit` → find or add a Code Block

**What to do:**
1. On the homepage, click `Edit`
2. Delete the existing hero section (the one that says "Welcome to the Family")
3. Add a new blank section
4. Inside the section, add a **Code Block** (not a Markdown block, not a Text block)
5. Open `homepage-code-block.html`
6. Copy everything **between** (not including) the outer HTML comments at the top
7. Paste into the Code Block
8. Click Apply

**Notes:**
- Code Blocks in Squarespace 7.0 are found under: `+ Add Block` → `More` → `Code`.
- Squarespace may show a "Display Source" toggle inside the Code Block. Leave it OFF for production so users see the rendered site, not the raw HTML.
- The section wrapping the Code Block should be set to **full-width** and have **no background**. Our HTML supplies its own backgrounds section by section.

---

## Verifying the install

After all three files are pasted, load the homepage in a private/incognito browser window. You should see:

- White background, red accent color, condensed uppercase headlines
- Sticky nav at top; clicking `Programs` smooth-scrolls to the programs section
- Programs section shows 6 rows; clicking any opens a centered modal
- Coaches section shows 8 cards; clicking any opens a coach bio modal
- Schedule expands day cards with a smooth animation
- Instagram section shows a horizontal-scroll carousel of placeholder tiles
- Footer at the bottom with programs / visit / connect columns (merch removed)

If any of these look broken:
- **Fonts are wrong (Times New Roman appearing):** header injection not saved
- **No layout, everything left-aligned:** custom-css.css not saved to Custom CSS panel
- **Empty section where hero should be:** Code Block content missing or Display Source toggle is ON

---

## Making updates later

Never edit these files directly. The `squarespace/` folder is **generated** from `src/`. When Jamie wants a change:

1. Edit the relevant file in `src/` (coaches.js, schedule.js, programs.js, styles.css, etc.)
2. Run the repackage script (see `docs/update-workflow.md`) to regenerate `squarespace/*`
3. Re-paste the changed Squarespace file(s) using the steps above

For small changes (one schedule time, one bio update), only re-paste the file that changed. You don't need to re-do all three every time.
