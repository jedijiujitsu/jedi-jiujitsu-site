# Migration Notes — Squarespace Injection Quirks

Everything in v7 works when you preview `src/homepage.html` locally. Squarespace introduces some friction. Here are the three pieces that need attention and the workarounds.

---

## 1. Modals (coaches, programs, About, class detail)

### The problem

Our modal system uses:
- A fixed-position `.modal-backdrop` with `z-index: 100`
- `document.body.classList.add('modal-open')` to lock background scrolling
- Modal content injected via `innerHTML` from JS

**Squarespace fights us on two things:**

1. **Their nav bar sits at `z-index: 9999`.** Even at our `z-index: 100`, their nav will render on top of our backdrop unless we escalate.
2. **`body.modal-open` doesn't always prevent scroll** because Squarespace wraps the entire page in its own scroll container (`#page`, `#content.main-content`) that has its own scroll context.

### The fix

In `styles.css`, bump modal z-index to beat Squarespace's nav:

```css
.modal-backdrop { z-index: 10000; }  /* was 100 */
```

And apply the `overflow: hidden` to the Squarespace containers too, not just body:

```css
body.modal-open,
body.modal-open #page,
body.modal-open #content.main-content { overflow: hidden; }
```

These are the confirmed Bedford 7.0 wrappers (from `docs/dom-header-footer.txt`). Bedford's header is `#header` with class-driven behavior controlled by body classes such as `transparent-header` and `homepage-index-nav-show-on-scroll` — it does not scroll with the page and does not need an overflow rule. If additional scroll containers appear, check the DOM dump before guessing selector names.

### Testing checklist

- Open a coach modal → backdrop should completely cover the Squarespace nav
- Try to scroll the background → should not move
- Rotate device to landscape while modal is open → should still be centered and scrollable inside
- Close with `Esc`, close with backdrop click, close with the × button

---

## 2. Schedule animation

### The situation

The animated day expand uses `max-height` transitions with a large upper bound (`max-height: 2000px`). Squarespace 7.0 (Bedford) does **not** inject inline `height` styles on sections, so this approach works without interference.

The staggered class fade-in uses `animation-delay` per `nth-child` and has not shown ordering issues on 7.0.

### The fix

Scope the schedule rules to the container class so our specificity beats Bedford's stylesheet:

```css
.schedule-section .sched-day-body { max-height: 0; }
.schedule-section .sched-day-card.open .sched-day-body { max-height: 2000px; }
```

`!important` is not required on 7.0 — Bedford does not inject competing inline heights on sections. Only add it back if a specific override fight is confirmed in the browser.

For the stagger: it's already `nth-child(N)` scoped to `.sched-day-card.open .sched-class`, which is specific enough. Verified working in testing.

### If the animation feels laggy

The `max-height` approach animates the container's box, which triggers layout on every frame. On low-end mobile (older Androids especially), you may see jank. If Jamie flags this:

Swap to `grid-template-rows: 0fr / 1fr` transition (modern CSS, GPU-accelerated). Requires wrapping the body-inner in another div; not currently done because browser support was still thin as of the initial build. Check caniuse.com/interpolable-grid — if support has crossed 95%, this is a straightforward swap.

---

## 3. Instagram feed

### The problem

The current `scripts.js` renders 10 placeholder tiles from a hardcoded `IG_TILES` array. In production, we need real posts from `@jedi.jiujitsu`. Three options were discussed earlier — the picks are:

- **Behold** ($0–$8/mo): recommended for the horizontal carousel look
- **Elfsight** ($0–$10/mo): more layout options, higher polish
- **Squarespace native IG block** (free): grid layout only, requires OAuth reconnects every few months

### The fix for Behold (recommended path)

1. Sign up at [behold.so](https://behold.so), connect the `@jedi.jiujitsu` Instagram Business account.
2. Choose the **Carousel** layout, pick square tiles, disable Behold branding if on paid plan.
3. Copy the embed snippet Behold gives you. It looks like:
   ```html
   <script defer src="https://w.behold.so/widget.js" type="module"></script>
   <behold-widget feed-id="XXXXXXXXX"></behold-widget>
   ```
4. In `src/homepage.html`, find the Instagram section:
   ```html
   <div class="ig-scroller" id="ig-scroller"></div>
   ```
5. Replace with:
   ```html
   <div class="ig-scroller-behold">
     <script defer src="https://w.behold.so/widget.js" type="module"></script>
     <behold-widget feed-id="XXXXXXXXX"></behold-widget>
   </div>
   ```
6. In `scripts.js`, delete the entire `IG_TILES` array and the `.forEach` block that renders tiles.
7. In `styles.css`, add:
   ```css
   .ig-scroller-behold { --behold-tile-size: 280px; }
   /* Behold uses CSS custom properties for styling — check their docs for the current list */
   ```
8. Run `./build.sh` and re-paste to Squarespace.

### Watch out for CSP

Squarespace's default Content Security Policy allows most third-party embeds, but if Behold's script fails to load in production, check:

- Browser console for CSP violations
- Squarespace `Settings → Advanced → Security` for any restrictive rules

If blocked, the workaround is to load Behold's widget via `header-injection.html` instead (which has fewer restrictions than Code Block embeds). Move the `<script>` tag there, keep only the `<behold-widget>` element in the homepage Code Block.

### Fallback if Behold isn't approved

Use Squarespace's native IG block. It renders as a grid, not a carousel, so it won't match ATT's look — but it's free and requires no third-party sign-up. Add it as a separate Squarespace section below the Code Block, then style it with:

```css
.sqs-block-instagram { /* Squarespace's native class */
  display: flex !important;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 8px;
}
.sqs-block-instagram .sqs-gallery-design-grid-slide {
  flex: 0 0 280px;
  scroll-snap-align: start;
}
```

Not a perfect carousel (native block doesn't have arrows, just scroll), but it's a working fallback that costs nothing.

---

## Things NOT covered here (and why)

- **Header, footer, marquee, hero, stats, about, programs list rendering** — all "just work" as pasted. No Squarespace conflicts.
- **Smooth-scroll nav** — Squarespace's Custom CSS respects `scroll-behavior: smooth` on `html`. No workaround needed.
- **Google Reviews placeholder** — same pattern as the Instagram fix (drop in Elfsight's embed, delete our placeholder markup).
- **Merch links in footer** — removed from the site entirely. The Merch footer column has been cut; may return someday but is not currently linked from the homepage.

If something else breaks after paste, first suspect is z-index or a Squarespace container adding padding/margin. Second suspect is font loading order. Third is CSP.
