# CLAUDE.md — Jedi Jiu-Jitsu Site

Instructions for Claude Code when working on this codebase.

---

## What this is

A homepage redesign for **Jedi Jiu-Jitsu**, a Brazilian Jiu-Jitsu / Judo / Muay Thai academy in Tulsa, OK. It's a Carlos Machado affiliate run by **Jamie Mickle**. Nick Giles (repo owner) trains there and instructs Kids Kickboxing; he's leading the website refresh as a favor to Jamie.

**Live site:** https://www.jjjtulsajiu-jitsu.com (10+ year-old Squarespace, cluttered nav, screenshot reviews, etc.)

**Hosting:** Squarespace 7.0 (Bedford template family). Jamie is keeping it there — he needs to be able to maintain it. This repo is the source of truth; final HTML/CSS/JS is **copy-pasted** into Squarespace's three injection points. There is no build step, no deploy pipeline, no framework.

---

## Design decisions (do not undo without reason)

- **Aesthetic:** bright, aggressive, fight-card. White background, deep black, electric red (`#E5141A`) accent. Big Shoulders Display for headlines, Barlow for body, Barlow Condensed for labels. This came out of Jamie explicitly rejecting an earlier "editorial cream" direction as too soft.
- **No frameworks.** Vanilla HTML/CSS/JS only. Squarespace Code Blocks don't like build tooling and Jamie has to be able to maintain this himself long-term.
- **No inline data.** Coach bios, schedule, and programs live in `/src/data/*.js` as `const` arrays. Never hardcode content into `scripts.js` or `homepage.html`.
- **Modals over new pages** for coach bios, program details, and About. Faster browsing on mobile; existing Squarespace subpages remain live as SEO anchors linked from each modal ("View Full Bio Page →").
- **Placeholder blocks are intentional.** For programs where the existing site has no real copy (Muay Thai, Private Sessions, Kids Competition Training), the modal shows a red-dashed placeholder inviting Jamie to write fresh copy. Do NOT fabricate program bios to fill these in.

---

## Content integrity rules

**The single biggest failure mode is hallucinating content.** In an earlier iteration, invented testimonial quotes were attributed to real reviewers, and a fabricated weekly schedule was presented as real. Both were caught in review.

Rules going forward:

1. **Never invent quotes, testimonials, credentials, class times, or bios.** Every factual claim must come from either the existing live site or a source Nick has confirmed with Jamie.
2. **If you don't know it, mark it as placeholder** with the same red-dashed treatment used for empty programs. Being obviously incomplete is better than being confidently wrong.
3. **Coach bios are pulled verbatim from the existing site.** If a bio changes, update `coaches.js` — do not paraphrase or "improve" the writing without Jamie's explicit signoff.
4. **Schedule times come from Jamie's printed weekly schedule** (see `docs/schedule-reference.png` if it exists). Coach assignments per class are educated defaults with a "Subject to change — coverage rotates" disclaimer built into the class modal. Do not change assignments without Jamie's input.

---

## Repo structure

```
src/                       ← source of truth (edit these)
  homepage.html              structural markup + external file refs
  styles.css                 all CSS (goes verbatim into Squarespace Custom CSS)
  scripts.js                 render + modal + interaction logic
  data/
    coaches.js               COACHES array — bios, roles, URLs
    schedule.js              SCHEDULE_DATA — weekly classes with coaches
    programs.js              PROGRAMS array — real copy or placeholder flag
    reviews.js               REVIEWS array — reviewer names + quotes (placeholder until real text confirmed)

squarespace/               ← auto-generated deploy targets (do not hand-edit)
  custom-css.css             identical to src/styles.css
  header-injection.html      Google Fonts <link> tags
  homepage-code-block.html   self-contained single-file bundle for the Code Block
  README.md                  which file goes where

docs/
  CLAUDE.md                  you are here
  update-workflow.md         how to make changes and get them onto the live site
  migration-notes.md         Squarespace injection quirks
```

**Local preview:** open `src/homepage.html` in a browser. All external file references are relative and resolve correctly.

---

## The build workflow

There isn't one — but there's a **repackage** step. When you change files in `/src`, `/squarespace/` needs to be regenerated. Two options:

**Option A — write a small `build.sh` script** that:
1. Copies `src/styles.css` → `squarespace/custom-css.css`
2. Inlines `data/*.js` + `scripts.js` into `src/homepage.html` and writes the result to `squarespace/homepage-code-block.html`
3. Leaves `header-injection.html` alone (rarely changes)

**Option B — do it by hand** when you push a change. Slower, more error-prone, but fine if changes are infrequent.

I'd recommend Option A. See `docs/update-workflow.md` for the target script if it hasn't been written yet.

---

## Squarespace-specific constraints (important)

1. **Custom CSS panel strips `<link>` tags.** Google Fonts must be loaded from the Header Code Injection (see `squarespace/header-injection.html`).
2. **Code Blocks execute JavaScript** but can't import external files. Everything must be inlined in `homepage-code-block.html`.
3. **Squarespace wraps Code Blocks in its own container div.** Our CSS is defensively scoped to specific classes (`.hero`, `.coach`, `.sched-day-card`, etc.) — don't add rules on `body`, `html`, or generic tags without prefixing.
4. **Squarespace 7.0 does not have a drag-to-resize content editor.** Code Block width is governed by the section's column layout in the classic editor. If the section is changed to a two-column layout, our fixed-width `.wrap` will overflow. This is a Squarespace issue, not ours.
5. **Auto-formatting.** Squarespace sometimes re-encodes special characters (curly quotes, em-dashes). If output looks wrong, check the source in the Code Block editor for `’` → `'` substitutions.

---

## Feature inventory (as of v7)

- **Hero** — condensed display type, action-shot placeholder, dual CTAs
- **Marquee** — red banner, scrolling verified claims
- **Stats** — 5★ / 7 / 7 / ∞
- **About** — 2-column copy + feature list + "Read Our Full Story →" button opens **About modal**
- **Programs** — 6 fight-card rows; each opens a **program modal** with real copy (Adults, Kids, Judo) or placeholder block (Muay Thai, Private Sessions, Kids Competition Training)
- **Schedule** — animated day cards, filter buttons (All / BJJ / Judo / Muay Thai / Kids / Homeschool), day expand with stagger, class detail modal with coach cross-link. Data in `schedule.js`.
- **Coaches** — 7-card grid (flexbox, last row centered); each opens **coach modal** with real bio + credentials + link to existing subpage.
- **Instagram** — horizontal-scroll carousel of placeholder tiles; production version pulls from `@jedi.jiujitsu` via Behold or Elfsight widget embedded here.
- **Reviews** — dashed placeholder for Google Reviews feed (Elfsight recommended).
- **Visit** — red CTA section with phone, address, book-a-trial.
- **Footer** — programs / visit / connect columns (merch removed).
- **Nav** — sticky header, smooth-scroll to sections, Current News link that goes to `/current-news` with a fade transition, mobile hamburger.

---

## What Jamie still owes us

- Real photography (hero action shot + 8 coach portraits + IG feed content)
- Real copy for **Muay Thai / Private Sessions / Kids Competition Training** program modals
- Confirmation of per-class coach assignments in `schedule.js`
- Real Google Reviews widget install (Elfsight $10/mo or free tier)
- Real Instagram feed widget install (Behold $0–$8/mo)

None of these block the design — they're production dependencies for going live.

---

## Tone when working with Nick

Nick is technical (IT/SecOps background, builds his own tools, writes music, trains BJJ 5x/week). He wants direct feedback, not sugar-coating. If something is a bad idea, say so and explain why. If a request is achievable but has real tradeoffs, surface them before building. He'd rather hear "here's why this is worse than you think" than get a polished version of a mistake.

He's also doing this as a favor to Jamie, not a paid gig — respect that by keeping scope tight and pushing back when things drift.

---

## Squarespace 7.0 (Bedford) facts

Confirmed from a live DOM dump of the site. These are facts, not inferences.

- **Template:** Bedford family. `templateVersion: 7`, `templateId: 52e96934e4b0ea14d0f64568`.
- **Homepage type:** Index page. Body classes include `expand-homepage-index-links` and `index-section-separation-alternating-background`.
- **Blog collection:** URL `/current-news`, collection id `5b4f7ca36d2a7339a29e52e3`, collection type `blog`.
- **Blog body class scoping hooks:**
  - `collection-current-news` — present on both index and post detail pages
  - `view-list` — blog index only
  - `view-item` — post detail only
  - Use these to scope blog CSS without affecting other pages.
- **Blog index markup:** `.blog-list > article.entry.h-entry.hentry > header.entry-header` (containing `h1.entry-title.entry-title-list`) `+ .entry-content + footer.entry-footer`
- **Blog post markup:** `.blog-item > article.entry.clearfix > header.entry-header` (containing `h1.entry-title.entry-title-item`) `+ .entry-content.e-content + footer.entry-footer + .author-profile`, followed by `.p-comment` and `nav.pagination`
- **Header markup:** `#header > .header-inner`, containing `.title-logo-wrapper`, `.desktop-nav-wrapper > .nav-wrapper`, `.header-controls`, `.mobile-nav-toggle-box`. Mobile nav is a separate `nav#mobileNavigation`.
- **Footer:** `#footer > .footer-inner`. There is also a pre-footer: `.pre-footer-content-custom > .pre-footer-inner`.
- **Inherited styles we must override:**
  - Font: everything is Raleway (we replace with Big Shoulders Display / Barlow)
  - Body background: `rgb(23, 23, 23)` dark (our Code Block section supplies its own white bg)
  - Nav links: `rgba(255, 255, 255, 0.7)` white on dark
  - Post body text: `rgba(0, 0, 0, 0.5)` low-contrast on white
- **CRITICAL — transparent header:** Body has class `transparent-header`. Nav link text is white. Any page we make white-background will render the nav invisible until the nav is restyled. **Nav restyling is a prerequisite for blog/page styling, not a follow-up task.**

---

## Do not do this

**Squarespace Developer Mode is off-limits.** It is technically available on 7.0, but we are deliberately not using it for the following reasons:
- Enabling Developer Mode is **irreversible** — there is no way to go back to the standard editor.
- It **disables all template updates** and **blocks template switching** permanently.
- There is **no staging environment** — every change is live immediately.
- It requires learning JSON-T (Squarespace's template language), making Claude or Nick the permanent maintainer of infrastructure Jamie needs to own.

Our approach remains: Custom CSS panel + Header Code Injection + Code Block. No exceptions.

---

## DOM dumps are the source of truth

Raw DOM snapshots of the live site live in:
- `docs/dom-blog-index.txt`
- `docs/dom-blog-post.txt`
- `docs/dom-header-footer.txt`

**Do not guess at Squarespace class names or element structure.** Read the relevant dump first. Squarespace 7.0's Bedford template has its own naming conventions that differ from what you might find in 7.1 documentation online.
