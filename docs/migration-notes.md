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

## 3. Elfsight widgets (Instagram feed + Google Reviews)

Both widgets use the **same loader script** (`https://elfsightcdn.com/platform.js`). The `loadElfsight()` helper in `scripts.js` injects it once — it checks for an existing `<script>` tag before adding one.

### App IDs

| Widget          | Constant in scripts.js      | App ID                                 |
|-----------------|-----------------------------|-----------------------------------------|
| Google Reviews  | `ELFSIGHT_REVIEWS_ID`       | `09d422a8-bfdc-4066-97a3-e4ddaeda2cdb` |
| Instagram Feed  | `ELFSIGHT_INSTAGRAM_ID`     | `12f19c05-8ebb-4ee4-8f0c-26d3bb349a81` |

Setting either constant to `null` disables the widget and renders the hand-rolled placeholder instead (reviews carousel from `reviews.js`, or gradient placeholder tiles for Instagram).

### How it works

When a constant is set, `scripts.js`:
1. Replaces the scroller container's `innerHTML` with `<div class="elfsight-app-{ID}" data-elfsight-app-lazy></div>`
2. Calls `loadElfsight()` to inject `platform.js` (once)
3. Hides our custom arrow nav (Elfsight supplies its own controls)

### Watch out for CSP

Squarespace's default Content Security Policy allows most third-party embeds, but if `platform.js` fails to load in production, check:

- Browser console for CSP violations
- Squarespace `Settings → Advanced → Security` for any restrictive rules

If blocked, move the `<script src="https://elfsightcdn.com/platform.js" defer></script>` tag to `squarespace/header-injection.html` (which has fewer restrictions than Code Block embeds). The widget `<div>` elements stay in the Code Block — only the loader script moves.

### Previous approach (Behold) — superseded

The original plan used Behold (`w.behold.so/widget.js`) for Instagram. This was replaced with Elfsight before either widget went live. All Behold code (`BEHOLD_FEED_ID`, `<behold-widget>`, Behold script loading) has been removed from `scripts.js`. If Behold is ever revisited, check their current embed docs — the old integration is no longer in the codebase.

---

## Things NOT covered here (and why)

- **Header, footer, marquee, hero, stats, about, programs list rendering** — all "just work" as pasted. No Squarespace conflicts.
- **Smooth-scroll nav** — Squarespace's Custom CSS respects `scroll-behavior: smooth` on `html`. No workaround needed.
- **Google Reviews** — handled by Elfsight widget, see section 3 above.
- **Merch links in footer** — removed from the site entirely. The Merch footer column has been cut; may return someday but is not currently linked from the homepage.

If something else breaks after paste, first suspect is z-index or a Squarespace container adding padding/margin. Second suspect is font loading order. Third is CSP.
