# Squarespace Deploy Cheat Sheet

Five files. Five places in Squarespace. Copy-paste in this order.

---

## 1. `custom-css.css` → Website Tools → Custom CSS

**Path in Squarespace:** `Design` (left sidebar) → `Custom CSS`

**What to do:**
1. Open `custom-css.css` in your editor
2. Select all (`Cmd+A` / `Ctrl+A`)
3. Copy
4. In Squarespace, paste into the Custom CSS panel (replacing any existing content)
5. Click Save

**Notes:**
- Custom CSS was empty before this migration — there is nothing to preserve.
- Squarespace will strip any `<link>` tags or `<style>` wrappers. Our file has none — pure CSS only.
- Custom CSS applies to every page site-wide: homepage, blog, coach subpages, etc.
- This file now includes Bedford override rules (hiding `#header`, `nav#mobileNavigation`, etc.) that are critical for the nav injection to work correctly.

---

## 2. `header-injection.html` → Website Tools → Code Injection → HEADER

**Path in Squarespace:** `Settings` → `Advanced` → `Code Injection` → `HEADER` field

**What to do:**
1. Open `header-injection.html`
2. Copy everything
3. **Replace the entire contents** of the HEADER field with the copied code
4. Click Save

**IMPORTANT — this file contains third-party tracking code that must be preserved:**
- **Google Analytics** (`UA-133381493-1`) — Jamie's site analytics
- **Tracking pixel** (`sitetracking.xyz`) — ad/campaign tracking
- **Google Fonts** — our custom font stack (Big Shoulders Display, Barlow, Barlow Condensed)

If Jamie adds new tracking snippets in Squarespace, they must also be added to this file so the next paste doesn't overwrite them.

---

## 3. `nav-injection.html` → Website Tools → Code Injection → FOOTER

**Path in Squarespace:** `Settings` → `Advanced` → `Code Injection` → `FOOTER` field

**What to do:**
1. Open `nav-injection.html`
2. Copy everything
3. Paste into the **FOOTER** Code Injection field (NOT the Header field — the Header field is inside `<head>` where visible HTML cannot render)
4. Click Save

**Why FOOTER?** The Footer Code Injection field renders visible HTML at the bottom of `</body>`. Our nav uses `position: fixed` to pin itself to the top of the viewport despite being at the bottom of the DOM. This is the only way to inject site-wide visible HTML without Developer Mode.

**BEFORE PASTING:** You must upload the logo SVG to Squarespace's asset library and replace the placeholder `src` in the `<img>` tag. The file contains a clearly marked comment block explaining this. The current `src="REPLACE-WITH-SQUARESPACE-CDN-URL/jedi-logo.svg"` will not work until replaced with the real CDN path.

**Notes:**
- All section links are root-relative (`/#programs`, `/#schedule`, etc.) so they work from any page, not just the homepage.
- Includes inline JS for the mobile menu toggle and cross-page fade transition.
- Bedford's native nav is hidden via CSS in `custom-css.css` — if the CSS is not installed, you'll see two nav bars.

---

## 4. `homepage-code-block.html` → Welcome page → Code Block

**Path in Squarespace:** Pages → `Welcome` (the homepage Index page) → Edit

**What to do:**
1. On the Welcome page, click `Edit`
2. The current section is named "Home" — it contains the old site content. **Do not delete it yet.**
3. Add a new section above or below "Home"
4. Inside the new section, add a **Code Block** (`+ Add Block` → `More` → `Code`)
5. Open `homepage-code-block.html`
6. Copy everything
7. Paste into the Code Block
8. Click Apply, then Save
9. Once verified, delete the old "Home" section

**Notes:**
- This file no longer contains the `<header class="nav">` or `<footer>` — those are delivered site-wide via steps 3 and 5 above.
- The section wrapping the Code Block should be **full-width** with **no background**.
- Leave "Display Source" toggle OFF so users see the rendered site.

---

## 5. `footer-block.html` → Footer editable HTML block

**Path in Squarespace:** Any page → scroll to footer → click the pencil icon on the footer area → edit the HTML block in `#footerBlocks`

**What to do:**
1. Open `footer-block.html`
2. Copy everything between (not including) the top comment block
3. In the Squarespace footer editor, add or edit an HTML block (not a Text block)
4. Paste and save

**Notes:**
- Bedford's `#siteInfo` block (configured in Settings → Business Information) already displays the address, phone, and email. Our footer repeats this in a branded layout. See the comment in `footer-block.html` for options on handling the duplication.
- Links are root-relative (`/adults`, `/current-news`, etc.).
- Includes inline JS to auto-fill the copyright year.

---

## Verifying the install

After all five files are installed, load the homepage in a private/incognito browser window:

- White background, red accent color, condensed uppercase headlines
- **One** sticky nav at top (ours) — Bedford's default nav should be hidden
- Clicking `Programs` smooth-scrolls to the programs section
- Programs section shows 6 rows; clicking any opens a centered modal
- Coaches section shows 8 cards; clicking any opens a coach bio modal
- Schedule expands day cards with a smooth animation
- Footer at the bottom shows the branded Jedi Jiu-Jitsu block

Then navigate to `/current-news` (the blog page):
- The same nav should appear at the top
- The same footer should appear at the bottom
- Nav links like `Programs` should navigate back to `/#programs` on the homepage

**If something looks broken:**
- **Two nav bars:** `custom-css.css` not installed (Bedford's native nav isn't hidden)
- **No nav at all:** `nav-injection.html` not pasted into Footer Code Injection
- **Fonts are wrong (Times New Roman):** `header-injection.html` not installed
- **No layout, everything left-aligned:** `custom-css.css` not installed
- **Empty section where hero should be:** Code Block content missing or Display Source is ON
- **Logo broken (broken image icon):** Logo SVG path not replaced with Squarespace CDN URL

---

## Making updates later

Never edit files in `/squarespace/` directly. They are generated from or based on `/src/`.

- **`custom-css.css`** — auto-generated by `build.ps1` / `build.sh` from `src/styles.css`
- **`homepage-code-block.html`** — auto-generated by the build script from `src/homepage.html` + `src/data/*.js` + `src/scripts.js`. The build script strips content between `<!-- SQUARESPACE-STRIP-START -->` and `<!-- SQUARESPACE-STRIP-END -->` markers (nav and footer).
- **`header-injection.html`** — hand-maintained (rarely changes)
- **`nav-injection.html`** — hand-maintained (change when nav links change)
- **`footer-block.html`** — hand-maintained (change when footer content changes)

For small changes (one schedule time, one bio update), only re-paste the file that changed.
