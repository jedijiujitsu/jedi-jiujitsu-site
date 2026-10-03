// Jedi Jiu-Jitsu — homepage interactivity
// Depends on: coaches.js, schedule.js, programs.js, reviews.js (loaded before this file)
// Sections handled here:
//   - Coach grid rendering + modal
//   - Schedule rendering + filters + day expand + class modal
//   - Program rendering + modal (with placeholder handling)
//   - About modal
//   - Instagram feed (Elfsight widget or placeholder tiles)
//   - Reviews (Elfsight widget or hand-rolled carousel from reviews.js)
//   - Cross-page fade transition
//   - Mobile menu toggle

// ---------------------------------------------------------------------------
// CONFIG — Elfsight widget IDs. Set to null to show placeholders instead.
// Both widgets share a single platform.js loader (see loadElfsight below).
// ---------------------------------------------------------------------------
const ELFSIGHT_REVIEWS_ID   = "09d422a8-bfdc-4066-97a3-e4ddaeda2cdb";
const ELFSIGHT_INSTAGRAM_ID = "12f19c05-8ebb-4ee4-8f0c-26d3bb349a81";

// Shared Elfsight loader — injects platform.js exactly once regardless of
// how many widgets are on the page. Checks for an existing script tag first
// so the build can safely inline this alongside a header-injection fallback.
function loadElfsight() {
  const PLATFORM_SRC = 'https://elfsightcdn.com/platform.js';
  if (document.querySelector('script[src="' + PLATFORM_SRC + '"]')) return;
  const s = document.createElement('script');
  s.src = PLATFORM_SRC;
  s.defer = true;
  document.head.appendChild(s);
}

// Gymdesk trial signup — centralized so every CTA points to the same place.
// If the URL changes, update it here AND in squarespace/nav-injection.html
// and squarespace/footer-block.html (those files can't read JS constants).
const TRIAL_URL = "https://jedi-jiu-jitsu.gymdesk.com/signup/v/l4040";

// Base URL for images. Empty string = relative paths (local preview).
// Set to the GitHub Pages URL for the Squarespace build.
const IMAGE_BASE = "https://jedijiujitsu.github.io/jedi-jiujitsu-site/src/";

// Maximum photos shown in the coach modal carousel.
// All paths are stored in coaches.js; rendering slices to this cap.
const MAX_CAROUSEL_PHOTOS = 6;

const DISC = { bjj:'BJJ', judo:'Judo', muaythai:'Muay Thai', kids:'Kids', homeschool:'Homeschool', private:'Private' };

/* Coach grid */
const coachGrid = document.getElementById('coach-grid');
COACHES.forEach((c, i) => {
  const btn = document.createElement('button');
  btn.className = 'coach' + (c.head ? ' head' : '');
  const hasPhoto = c.images && c.images.length > 0;
  btn.innerHTML = `
    <div class="coach-bg"></div>
    ${hasPhoto ? `<img class="coach-tile-img" src="${IMAGE_BASE}${c.images[0]}" alt="${c.name}" loading="lazy">` : ''}
    ${(c.head && hasPhoto) ? '<div class="coach-head-overlay"></div>' : ''}
    <div class="coach-grain"></div>
    <div class="coach-content">
      <div class="coach-top">
        <span class="coach-num">${String(i+1).padStart(2,'0')}</span>
        ${c.badge ? `<span class="coach-badge">${c.badge}</span>` : ''}
      </div>
      <div>
        <div class="coach-name">${c.name.split(' ').join('<br>')}</div>
        <div class="coach-role">${c.role}</div>
      </div>
      <div class="coach-hint">Tap to read bio →</div>
    </div>`;
  btn.addEventListener('click', () => openCoachModal(c, i+1));
  coachGrid.appendChild(btn);
});

/* Schedule */
const schedDays = document.getElementById('sched-days');

function buildSchedule(filter='all') {
  schedDays.innerHTML = '';
  SCHEDULE_DATA.forEach(day => {
    const visible = filter === 'all' ? day.classes : day.classes.filter(c => c.discipline === filter);

    // Skip day if filter hides everything
    if (filter !== 'all' && visible.length === 0) return;

    const summary = filter === 'all'
      ? Array.from(new Set(day.classes.map(c => DISC[c.discipline]))).join(' · ')
      : `${visible.length} ${DISC[filter]} class${visible.length === 1 ? '' : 'es'}`;

    const card = document.createElement('div');
    card.className = 'sched-day-card';
    card.innerHTML = `
      <button class="sched-day-header" type="button">
        <div class="sched-day-name">${day.short}</div>
        <div class="sched-day-summary">${day.day} · ${summary}</div>
        <div class="sched-day-count">${visible.length} class${visible.length === 1 ? '' : 'es'}</div>
        <div class="sched-chevron">▾</div>
      </button>
      <div class="sched-day-body">
        <div class="sched-day-body-inner">
          ${visible.map((cl, idx) => `
            <button class="sched-class" type="button" data-class-idx="${idx}">
              <div class="sched-class-time${cl.flexTime ? ' flex' : ''}">${cl.time}</div>
              <div class="sched-class-info">
                <div class="sched-class-name">${cl.name}</div>
              </div>
              <div class="sched-class-disc" data-disc="${cl.discipline}">${DISC[cl.discipline]}</div>
            </button>
          `).join('')}
        </div>
      </div>`;
    schedDays.appendChild(card);

    card.querySelector('.sched-day-header').addEventListener('click', () => card.classList.toggle('open'));
    card.querySelectorAll('.sched-class').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.classIdx, 10);
        openClassModal(visible[idx], day.day);
      });
    });
  });
}

document.querySelectorAll('.sched-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sched-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildSchedule(btn.dataset.filter);
  });
});
buildSchedule();

/* =========================================================
   PROGRAMS — render list, open program modal on click
   ========================================================= */
const programsList = document.getElementById('programs-list');
PROGRAMS.forEach((p) => {
  const btn = document.createElement('button');
  btn.className = 'program';
  btn.type = 'button';
  btn.innerHTML = `
    <div class="program-num">${p.num}</div>
    <div class="program-name">${p.name}</div>
    <div class="program-blurb">${p.summary}</div>
    <div class="program-tag">${p.tag}</div>
    <div class="program-arrow">→</div>`;
  btn.addEventListener('click', () => openProgramModal(p));
  programsList.appendChild(btn);
});

function openProgramModal(p) {
  modalContent.className = 'modal program-modal';

  // Real copy with sections (e.g. Kids — Self-Defense + Sports/Tournament)
  let bodyHtml = '';
  if (p.hasRealCopy) {
    if (p.bio) bodyHtml += `<div class="modal-bio">${p.bio.map(t => `<p>${t}</p>`).join('')}</div>`;
    if (p.sections) {
      p.sections.forEach(sec => {
        bodyHtml += `<div class="program-modal-subhead">${sec.title}</div>`;
        bodyHtml += `<div class="modal-bio">${sec.body.map(t => `<p>${t}</p>`).join('')}</div>`;
      });
    }
  } else {
    // Placeholder block — visibly marked for Jamie to write fresh copy
    bodyHtml = `
      <div class="program-placeholder">
        <div class="program-placeholder-label">/Needs Copy — Placeholder</div>
        <div class="program-placeholder-title">${p.name}: Tell Your Story</div>
        <div class="program-placeholder-body">
          <p>This program doesn't have its own write-up on the current site yet. Jamie — this is your space.</p>
          <p>A few sentences works: who the program is for, what students get out of it, and what makes it different from a generic ${p.name.toLowerCase()} class elsewhere. The personality of the academy comes through in the copy more than anywhere else.</p>
        </div>
      </div>`;
  }

  modalContent.innerHTML = `
    <button class="modal-close" aria-label="Close">×</button>
    <div class="modal-body">
      <div class="modal-eyebrow">Program · ${p.num}</div>
      <h2 class="modal-name">${p.name}</h2>
      <div class="modal-role">${p.tag}</div>
      ${bodyHtml}
      <a href="${TRIAL_URL}" class="btn-red-lg" target="_blank" rel="noopener" style="margin-top:8px;align-self:flex-start;">Try a Free Class →</a>
      <a href="${p.url}" class="modal-link" target="_blank" rel="noopener">View Full Program Page</a>
    </div>`;
  openModal();
}

/* =========================================================
   ABOUT modal — expanded story + mission
   ========================================================= */
const aboutBtn = document.getElementById('about-more-btn');
if (aboutBtn) {
  aboutBtn.addEventListener('click', () => {
    modalContent.className = 'modal about-modal';
    modalContent.innerHTML = `
      <button class="modal-close" aria-label="Close">×</button>
      <div class="modal-body">
        <div class="modal-eyebrow">About</div>
        <h2 class="modal-name">Jedi Jiu-Jitsu.</h2>
        <div class="modal-role">A Carlos Machado Affiliate · Tulsa, Oklahoma</div>

        <div class="modal-bio">
          <p>Our location has had the honor of being a Carlos Machado Affiliate since the inception of our organization. In addition to our martial arts programs, we offer private lessons and instructional seminars led by Jiujiteiro Legends such as Carlos Machado, Rafael Lovato, and many more.</p>
          <p>Private lessons for both youth and adults are available with any of our instructors. Each lesson that is taken with the Lead Instructor is accompanied with extra amenities you won't find at other gyms.</p>
        </div>

        <div class="modal-creds-title">Our Mission</div>
        <div class="about-modal-quote">
          A community where everyone is <span class="red">welcomed, appreciated, and respected.</span>
        </div>
        <div class="modal-bio">
          <p>Our mission is to create an environment here at Jedi Jiu-Jitsu where anyone training at our academy can achieve their goals, regardless of gender or activity level. We foster an atmosphere where a serious student can become a World Champion; where a student in their early teens can experience all the benefits of a martial arts lifestyle; where a hobbyist can enjoy themselves while exercising and learning; where everyone comes together in support of one another.</p>
          <p style="font-family:'Big Shoulders Display',sans-serif;font-weight:900;font-size:24px;text-transform:uppercase;color:var(--red);">Come and join our family.</p>
        </div>

        <a href="${TRIAL_URL}" class="btn-red-lg" target="_blank" rel="noopener" style="margin-top:8px;align-self:flex-start;">Schedule Your First Class →</a>
      </div>`;
    openModal();
  });
}

/* =========================================================
   Cross-page fade transition (for blog / current news link)
   ========================================================= */
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href) return;
  // Only intercept same-origin links that are NOT hash links or the trial-class CTAs
  const isExternal = /^https?:\/\//i.test(href) && !href.includes('jjjtulsajiu-jitsu.com');
  const isHash = href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:');
  if (isExternal || isHash) return;
  // Open in same tab with fade-out transition
  a.addEventListener('click', (e) => {
    // Skip if user is opening in new tab (cmd/ctrl click, middle click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1 || a.target === '_blank') return;
    e.preventDefault();
    document.body.classList.add('page-fading');
    setTimeout(() => { window.location.href = href; }, 320);
  });
});

/* Modal */
const backdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');

function openCoachModal(c, num) {
  const comingSoon = c.bio[0].startsWith('[BIO COMING SOON');
  const bioHtml = comingSoon
    ? `<div class="program-placeholder">
        <div class="program-placeholder-label">/Bio Coming Soon — do not publish until replaced</div>
        <div class="program-placeholder-title">${c.name}</div>
        <div class="program-placeholder-body"><p>This instructor's bio hasn't been written yet. Jamie — please send copy for ${c.name.split(' ')[0]} so we can publish their full profile.</p></div>
       </div>`
    : `<div class="modal-bio">${c.bio.map(p => `<p>${p}</p>`).join('')}</div>
       ${c.creds && c.creds.length ? `
         <div class="modal-creds-title">Credentials</div>
         <ul class="modal-creds">${c.creds.map(cr => `<li>${cr}</li>`).join('')}</ul>
       ` : ''}`;

  // Photo panel: 0 = gradient placeholder, 1 = single img, 2+ = carousel (capped at MAX_CAROUSEL_PHOTOS)
  const photos = (c.images || []).slice(0, MAX_CAROUSEL_PHOTOS);
  let photoHtml;
  if (photos.length === 0) {
    // Unchanged placeholder — gradient + /Photo label + number
    photoHtml = `
      <div class="modal-photo ${c.head ? 'head' : ''}">
        <div class="modal-photo-grain"></div>
        <span class="modal-photo-tag">/Photo</span>
        <div class="modal-photo-num">${String(num).padStart(2,'0')}</div>
      </div>`;
  } else if (photos.length === 1) {
    // Single image — no carousel chrome
    photoHtml = `
      <div class="modal-carousel-panel">
        <img class="mc-single-img" src="${IMAGE_BASE}${photos[0]}" alt="${c.name}" loading="eager">
      </div>`;
  } else {
    // Multi-image carousel
    const slides = photos.map((src, i) => `
      <div class="mc-slide${i === 0 ? ' active' : ''}">
        <img src="${IMAGE_BASE}${src}" alt="${c.name}, photo ${i+1}" loading="${i === 0 ? 'eager' : 'lazy'}">
      </div>`).join('');
    const dots = photos.map((_, i) => `
      <button class="mc-dot${i === 0 ? ' active' : ''}" aria-label="Photo ${i+1}"></button>`).join('');
    photoHtml = `
      <div class="modal-carousel-panel" data-carousel>
        <div class="mc-wrap">
          ${slides}
        </div>
        <div class="mc-ui">
          <button class="mc-btn mc-prev" aria-label="Previous photo" disabled>&#8249;</button>
          <div class="mc-dots">${dots}</div>
          <button class="mc-btn mc-next" aria-label="Next photo">&#8250;</button>
        </div>
      </div>`;
  }

  modalContent.className = 'modal';
  modalContent.innerHTML = `
    <button class="modal-close" aria-label="Close">×</button>
    <div class="modal-grid">
      ${photoHtml}
      <div class="modal-body">
        <div class="modal-eyebrow">${c.head ? 'Head Instructor' : 'Coach'}</div>
        <h2 class="modal-name">${c.name}</h2>
        <div class="modal-role">${c.role}</div>
        ${bioHtml}
        ${c.url ? `<a href="${c.url}" class="modal-link" target="_blank" rel="noopener">View Full Bio Page</a>` : ''}
      </div>
    </div>`;

  // Wire carousel controls fresh each time (innerHTML wipes previous listeners)
  if (photos.length >= 2) {
    initCarousel(modalContent.querySelector('[data-carousel]'), photos);
  }

  openModal();
}

function initCarousel(panel, photos) {
  let current = 0;
  const wrap = panel.querySelector('.mc-wrap');
  const slideEls = panel.querySelectorAll('.mc-slide');
  const prevBtn = panel.querySelector('.mc-prev');
  const nextBtn = panel.querySelector('.mc-next');
  const dotBtns = panel.querySelectorAll('.mc-dot');

  function goTo(idx) {
    if (idx === current) return;

    // Lock current height as px value so CSS transition has a start point
    const h0 = wrap.offsetHeight;
    if (h0 > 0) wrap.style.height = h0 + 'px';

    // Swap active slide and dot
    slideEls[current].classList.remove('active');
    dotBtns[current].classList.remove('active');
    current = idx;
    slideEls[current].classList.add('active');
    dotBtns[current].classList.add('active');

    // Update arrow states
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === photos.length - 1;

    // Animate wrap height to match new slide
    // If image already decoded, measure immediately; otherwise wait for load.
    const newImg = slideEls[current].querySelector('img');
    function setNewHeight() {
      requestAnimationFrame(() => {
        const newH = slideEls[current].offsetHeight;
        if (newH > 0) wrap.style.height = newH + 'px';
      });
    }
    if (newImg.complete && newImg.naturalHeight > 0) {
      setNewHeight();
    } else {
      newImg.addEventListener('load', setNewHeight, { once: true });
    }
  }

  prevBtn.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  nextBtn.addEventListener('click', () => { if (current < photos.length - 1) goTo(current + 1); });
  dotBtns.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}

function openClassModal(cl, day) {
  // Private/custom lesson — special handling
  if (cl.discipline === 'private') {
    modalContent.className = 'modal class-modal';
    modalContent.innerHTML = `
      <button class="modal-close" aria-label="Close">×</button>
      <div class="modal-body">
        <div class="modal-eyebrow">${day}</div>
        <div class="class-modal-time">${cl.time}</div>
        <h2 class="modal-name">${cl.name}</h2>
        <div class="modal-role">Private · One-on-One</div>
        ${cl.note ? `<p class="class-modal-note">${cl.note}</p>` : ''}
        <p style="font-size:15px;line-height:1.6;color:#2a2a2a;">Each lesson that is taken with the Lead Instructor is accompanied with extra amenities you won't find at other gyms.</p>
        <div style="padding:16px;background:var(--bone);border-left:3px solid var(--red);">
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:var(--red);">Available With</div>
          <div style="font-family:'Big Shoulders Display',sans-serif;font-weight:800;font-size:24px;margin-top:6px;line-height:1.1;">Any Instructor</div>
        </div>
        <a href="https://www.jjjtulsajiu-jitsu.com/private-sessions" class="btn-red-lg" style="margin-top:8px;align-self:flex-start;">Book a Private Session →</a>
      </div>`;
    openModal();
    return;
  }

  modalContent.className = 'modal class-modal';
  modalContent.innerHTML = `
    <button class="modal-close" aria-label="Close">×</button>
    <div class="modal-body">
      <div class="modal-eyebrow">${day}</div>
      <div class="class-modal-time">${cl.time}</div>
      <h2 class="modal-name">${cl.name}</h2>
      <div class="modal-role">Discipline · ${DISC[cl.discipline]}</div>
      ${cl.note ? `<p class="class-modal-note">${cl.note}</p>` : ''}
      <a href="${TRIAL_URL}" class="btn-red-lg" target="_blank" rel="noopener" style="margin-top:8px;align-self:flex-start;">Try This Class — Free</a>
    </div>`;
  openModal();
}


function openModal() {
  backdrop.classList.add('open');
  document.body.classList.add('modal-open');
}
function closeModal() {
  backdrop.classList.remove('open');
  document.body.classList.remove('modal-open');
}
backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop || e.target.classList.contains('modal-close')) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* =========================================================
   INSTAGRAM — controlled by ELFSIGHT_INSTAGRAM_ID at top of file.
   • null: renders placeholder tiles + arrow nav exactly as before
   • string: injects Elfsight widget div into the scroller wrap + loads
     platform.js; hides our arrow nav (Elfsight has its own controls).
   The @jedi.jiujitsu badge and section header render either way.
   ========================================================= */
if (ELFSIGHT_INSTAGRAM_ID) {
  // Elfsight widget mode — replace scroller with the widget div
  const igScrollerWrap = document.querySelector('.ig-scroller-wrap');
  igScrollerWrap.innerHTML = `<div class="elfsight-app-${ELFSIGHT_INSTAGRAM_ID}" data-elfsight-app-lazy></div>`;
  loadElfsight();

  // Elfsight renders its own controls; hide our arrow nav + placeholder note.
  const igNavEl = document.querySelector('.ig-nav');
  if (igNavEl) igNavEl.style.display = 'none';
  const igNote = document.querySelector('.ig-placeholder-note');
  if (igNote) igNote.style.display = 'none';

} else {
  // Placeholder tile mode — behavior identical to original
  const IG_TILES = [
    { caption: 'Adult BJJ — Monday Night',          gradient: 'linear-gradient(135deg, #1a1a1a 0%, #E5141A 130%)' },
    { caption: 'Kids Kickboxing w/ Coach Nick',     gradient: 'linear-gradient(135deg, #2a1a1a 0%, #8C2A1F 100%)' },
    { caption: 'Open Mat Friday',                    gradient: 'linear-gradient(45deg, #0A0A0A 0%, #3a1010 100%)' },
    { caption: 'Belt Promotion',                     gradient: 'linear-gradient(180deg, #E5141A 0%, #1a1a1a 100%)' },
    { caption: 'Adult Judo',                          gradient: 'linear-gradient(135deg, #1a1a2a 0%, #0A0A0A 100%)' },
    { caption: 'Muay Thai — Coach Lester',           gradient: 'linear-gradient(225deg, #2a1a0a 0%, #B70F14 100%)' },
    { caption: 'Tournament Recap',                   gradient: 'linear-gradient(135deg, #E5141A 0%, #0A0A0A 100%)' },
    { caption: 'Homeschool Class',                   gradient: 'linear-gradient(45deg, #1a1a1a 0%, #6b1a1a 100%)' },
    { caption: 'Carlos Machado Seminar',             gradient: 'linear-gradient(180deg, #1a0a0a 0%, #E5141A 130%)' },
    { caption: 'Grapple Chapel',                     gradient: 'linear-gradient(135deg, #2a2a2a 0%, #0A0A0A 100%)' },
  ];

  const igScroller = document.getElementById('ig-scroller');
  IG_TILES.forEach((tile, i) => {
    const a = document.createElement('a');
    a.href = 'https://www.instagram.com/jedi.jiujitsu/';
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'ig-tile';
    a.innerHTML = `
      <div class="ig-tile-bg" style="background:${tile.gradient};"></div>
      <div class="ig-tile-grain"></div>
      <span class="ig-tile-tag">/Photo</span>
      <div class="ig-tile-overlay">
        <div class="ig-tile-top">
          <span class="ig-tile-num">${String(i+1).padStart(2,'0')}</span>
          <svg class="ig-tile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </div>
        <div class="ig-tile-label">${tile.caption}</div>
      </div>`;
    igScroller.appendChild(a);
  });

  // Carousel arrow nav
  const igPrev = document.getElementById('ig-prev');
  const igNext = document.getElementById('ig-next');
  function igScrollBy(dir) {
    const tile = igScroller.querySelector('.ig-tile');
    if (!tile) return;
    const step = tile.offsetWidth + 8; // tile width + gap
    igScroller.scrollBy({ left: step * dir * 2, behavior: 'smooth' });
  }
  igPrev.addEventListener('click', () => igScrollBy(-1));
  igNext.addEventListener('click', () => igScrollBy(1));

  function updateIgNav() {
    const max = igScroller.scrollWidth - igScroller.clientWidth;
    igPrev.disabled = igScroller.scrollLeft <= 4;
    igNext.disabled = igScroller.scrollLeft >= max - 4;
  }
  igScroller.addEventListener('scroll', updateIgNav);
  window.addEventListener('resize', updateIgNav);
  updateIgNav();
}

/* =========================================================
   REVIEWS — controlled by ELFSIGHT_REVIEWS_ID at top of file.
   • string: injects Elfsight Google Reviews widget, hides our
     hand-rolled carousel and nav arrows.
   • null: falls back to horizontal-scroll carousel from REVIEWS
     data. Cards whose quote starts with "[PASTE" render a
     red-dashed placeholder instead of the quote.
   ========================================================= */
if (ELFSIGHT_REVIEWS_ID) {
  // Elfsight widget mode — replace scroller with the widget div
  const reviewsWrap = document.querySelector('.reviews-scroller-wrap');
  if (reviewsWrap) {
    reviewsWrap.innerHTML = `<div class="elfsight-app-${ELFSIGHT_REVIEWS_ID}" data-elfsight-app-lazy></div>`;
    loadElfsight();

    // Hide our arrow nav — Elfsight supplies its own controls.
    const reviewsNavEl = document.querySelector('.reviews-nav');
    if (reviewsNavEl) reviewsNavEl.style.display = 'none';
  }
} else {
  const reviewsScroller = document.getElementById('reviews-scroller');
  if (reviewsScroller) {
    const starPath = 'M12 2 14.9 8.6 22 9.3l-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.3l7.1-.7Z';
    REVIEWS.forEach(r => {
      const isPlaceholder = r.quote.startsWith('[PASTE');
      const card = document.createElement('div');
      card.className = 'review-card' + (isPlaceholder ? ' placeholder' : '');
      const stars = Array(r.stars).fill(null).map(() =>
        `<svg class="review-star" viewBox="0 0 24 24"><path d="${starPath}"/></svg>`
      ).join('');
      card.innerHTML = `
        ${isPlaceholder
          ? `<div class="review-placeholder-text">/Needs real review text — paste from Google Maps before publishing</div>`
          : `<div class="review-quote">${r.quote}</div>`
        }
        <div class="review-footer">
          <div class="review-stars">${stars}</div>
          <div class="review-name">${r.name}</div>
          <div class="review-source">${r.source === 'google' ? 'Google Review' : r.source}</div>
        </div>`;
      reviewsScroller.appendChild(card);
    });

    // Arrow nav — mirrors IG scroller pattern
    const reviewsPrev = document.getElementById('reviews-prev');
    const reviewsNext = document.getElementById('reviews-next');
    function reviewsScrollBy(dir) {
      const card = reviewsScroller.querySelector('.review-card');
      if (!card) return;
      const step = card.offsetWidth + 8;
      reviewsScroller.scrollBy({ left: step * dir * 2, behavior: 'smooth' });
    }
    reviewsPrev.addEventListener('click', () => reviewsScrollBy(-1));
    reviewsNext.addEventListener('click', () => reviewsScrollBy(1));

    function updateReviewsNav() {
      const max = reviewsScroller.scrollWidth - reviewsScroller.clientWidth;
      reviewsPrev.disabled = reviewsScroller.scrollLeft <= 4;
      reviewsNext.disabled = reviewsScroller.scrollLeft >= max - 4;
    }
    reviewsScroller.addEventListener('scroll', updateReviewsNav);
    window.addEventListener('resize', updateReviewsNav);
    updateReviewsNav();
  }
}

// Mobile menu toggle — guarded because on Squarespace the nav is injected
// separately via Code Injection and these elements won't be in the Code Block.
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
document.getElementById('instructor-count').textContent = COACHES.length;
