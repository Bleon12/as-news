/**
 * Aurora Lumina — Frontend (Static Netlify + Express API)
 */

const API = '/api';
const LANG_KEY = 'aurora-lang';

let currentLang = localStorage.getItem(LANG_KEY) || 'sq';
let ui = {};
let newsData = [];
let totalNews = 0;
let visibleCount = 6;
let activeFilter = 'all';
let liveStarted = false;
let staticMode = null;
let staticLocale = null;
let staticLive = null;
let cvData = null;

function langParam() {
  return `lang=${currentLang}`;
}

async function detectStaticMode() {
  if (staticMode !== null) return staticMode;

  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (isLocal) {
    try {
      const health = await fetch('/api/health');
      if (health.ok) {
        staticMode = false;
        return false;
      }
    } catch {
      /* fall through to static check */
    }
  }

  try {
    const res = await fetch('/data/sq.json', { method: 'HEAD' });
    staticMode = res.ok;
  } catch {
    staticMode = false;
  }
  return staticMode;
}

async function loadStaticBundle() {
  if (staticLocale && staticLive && staticLocale._lang === currentLang) {
    return { locale: staticLocale, live: staticLive };
  }
  const [locale, live] = await Promise.all([
    fetch(`/data/${currentLang}.json`).then((r) => {
      if (!r.ok) throw new Error('Static locale missing');
      return r.json();
    }),
    fetch(`/data/live.${currentLang}.json`).then((r) => {
      if (!r.ok) throw new Error('Static live missing');
      return r.json();
    })
  ]);
  locale._lang = currentLang;
  staticLocale = locale;
  staticLive = live;
  return { locale, live };
}

function resolveStaticApi(url) {
  const d = staticLocale;
  const path = url.split('?')[0];
  const params = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '');

  if (path.endsWith('/ui')) return d.ui;
  if (path.endsWith('/ticker')) return d.ticker;
  if (path.endsWith('/featured')) return d.featured;
  if (path.endsWith('/top-stories')) return d.topStories;
  if (path.endsWith('/focus')) return d.focus;
  if (path.endsWith('/editors-pick')) return d.editorsPick;
  if (path.endsWith('/opinions')) return d.opinions;
  if (path.endsWith('/cv')) return d.cv;
  if (path.endsWith('/live')) return staticLive;

  if (path.endsWith('/latest')) {
    const limit = parseInt(params.get('limit'), 10) || 10;
    return d.news.slice(0, limit);
  }

  if (path.endsWith('/news')) {
    let items = [...d.news];
    const category = params.get('category');
    if (category && category !== 'all') {
      items = items.filter((n) => n.category === category);
    }
    const start = parseInt(params.get('offset'), 10) || 0;
    const count = parseInt(params.get('limit'), 10) || items.length;
    return { total: items.length, items: items.slice(start, start + count) };
  }

  throw new Error(`Unknown static endpoint: ${url}`);
}

async function fetchJSON(url) {
  if (await detectStaticMode()) {
    await loadStaticBundle();
    return resolveStaticApi(url.replace(`${API}`, '/api'));
  }

  const sep = url.includes('?') ? '&' : '?';
  const res = await fetch(`${url}${sep}${langParam()}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function getNested(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function applyUI() {
  document.getElementById('tickerLabel').textContent = ui.tickerLabel;
  document.getElementById('logoTagline').textContent = ui.logoTagline;
  document.getElementById('footerTagline').textContent = ui.logoTagline;
  document.getElementById('mainNewsTitle').textContent = ui.mainNewsTitle;
  document.getElementById('latestNewsTitle').textContent = ui.latestNewsTitle;
  document.getElementById('seeAllNews').textContent = ui.seeAllNews;
  document.getElementById('editorsPickTitle').textContent = ui.editorsPickTitle;
  document.getElementById('editorsPickSub').textContent = ui.editorsPickSub;
  document.getElementById('newsTitle').textContent = ui.newsTitle;
  document.getElementById('loadMore').textContent = ui.loadMore;
  document.getElementById('opinionTitle').textContent = ui.opinionTitle;
  document.getElementById('opinionSub').textContent = ui.opinionSub;
  document.getElementById('newsletterTitle').textContent = ui.newsletterTitle;
  document.getElementById('newsletterSub').textContent = ui.newsletterSub;
  document.getElementById('emailInput').placeholder = ui.emailPlaceholder;
  document.getElementById('subscribeBtn').textContent = ui.subscribe;
  document.getElementById('footerDesc').textContent = ui.footerDesc;
  document.getElementById('footerSections').textContent = ui.footerSections;
  document.getElementById('footerAbout').textContent = ui.footerAbout;
  document.getElementById('footerLegal').textContent = ui.footerLegal;
  document.getElementById('footerHistory').textContent = ui.footerHistory;
  document.getElementById('footerEditorial').textContent = ui.footerEditorial;
  document.getElementById('footerCareers').textContent = ui.footerCareers;
  document.getElementById('footerContact').textContent = ui.footerContact;
  document.getElementById('footerPrivacy').textContent = ui.footerPrivacy;
  document.getElementById('footerTerms').textContent = ui.footerTerms;
  document.getElementById('footerCookies').textContent = ui.footerCookies;
  document.getElementById('footerRights').textContent = ui.footerRights;
  document.getElementById('footerMotto').textContent = ui.footerMotto;
  document.getElementById('searchBtn').ariaLabel = ui.searchAria;
  document.getElementById('menuToggle').ariaLabel = ui.menuAria;
  document.getElementById('liveTitle').textContent = ui.liveTitle;
  document.getElementById('liveSub').textContent = ui.liveSub;
  document.getElementById('liveBadgeText').textContent = ui.liveBadge;
  document.querySelector('.viewers-label').textContent = ui.liveViewers;
  document.getElementById('liveNowLabel').textContent = ui.liveNow;
  document.getElementById('liveScheduleTitle').textContent = ui.liveUpcoming;
  document.getElementById('liveOfflineText').textContent = ui.liveOffline;
  document.getElementById('livePlayBtn').ariaLabel = ui.liveWatch;
  document.getElementById('cvModalClose').ariaLabel = ui.cvClose;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = getNested(ui, el.dataset.i18n);
    if (val) el.textContent = val;
  });

  document.title = currentLang === 'en'
    ? 'AS NEWS | Digital Newspaper'
    : 'AS NEWS | Gazeta Digjitale';
}

async function loadUI() {
  ui = await fetchJSON(`${API}/ui`);
  applyUI();
}

async function loadTicker() {
  const items = await fetchJSON(`${API}/ticker`);
  const el = document.getElementById('tickerContent');
  if (!el) return;
  const html = items.map((text) => `<span>${text}</span><span>•</span>`).join('');
  el.innerHTML = html + html;
}

async function loadFeatured() {
  const data = await fetchJSON(`${API}/featured`);

  document.getElementById('heroImage').src = data.image;
  document.getElementById('heroImage').alt = data.title;
  document.getElementById('heroCategory').textContent = data.catLabel;
  document.getElementById('heroDate').textContent = data.date;
  document.getElementById('heroDate').dateTime = data.dateIso;
  document.getElementById('heroTitle').textContent = data.title;
  document.getElementById('heroExcerpt').textContent = data.excerpt;
  document.getElementById('heroAuthor').textContent = `${ui.authorPrefix} ${data.author}`;
  document.getElementById('heroReadTime').textContent = data.readTime;
  const timeEl = document.getElementById('heroTime');
  if (timeEl) timeEl.textContent = data.time || '';
}

async function loadTopStories() {
  const items = await fetchJSON(`${API}/top-stories`);
  const el = document.getElementById('topStoriesGrid');
  if (!el) return;

  el.innerHTML = items.map((item) => `
    <article class="top-secondary-card">
      <div class="top-secondary-image">
        <img src="${item.image}" alt="${item.title}">
        <span class="category-badge soft">${item.catLabel}</span>
      </div>
      <div class="top-secondary-body">
        <div class="top-meta">
          <time>${item.date}</time>
          <span class="top-time">${item.time || ''}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.excerpt || ''}</p>
      </div>
    </article>
  `).join('');
}

async function loadLatest() {
  const items = await fetchJSON(`${API}/latest?limit=10`);
  const el = document.getElementById('latestNewsList');
  if (!el) return;

  el.innerHTML = items.map((item, i) => `
    <li class="latest-item${i === 0 ? ' latest-item-first' : ''}">
      <span class="latest-time">${item.time || ''}</span>
      <div class="latest-content">
        <span class="latest-cat">${item.catLabel}</span>
        <a href="#" class="latest-link">${item.title}</a>
      </div>
    </li>
  `).join('');
}

async function loadTopNewsRow() {
  const items = await fetchJSON(`${API}/focus`);
  const el = document.getElementById('topNewsRow');
  if (!el) return;

  el.innerHTML = items.map((item) => `
    <article class="top-row-card">
      <div class="top-row-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="top-row-body">
        <span class="cat">${item.catLabel}</span>
        <h4>${item.title}</h4>
        <time>${item.date}${item.time ? ` · ${item.time}` : ''}</time>
      </div>
    </article>
  `).join('');
}

async function loadFocus() {
  await loadTopNewsRow();
}

async function loadEditorsPick() {
  const items = await fetchJSON(`${API}/editors-pick`);
  const el = document.getElementById('pickGrid');
  if (!el) return;

  el.innerHTML = items.map((item) => {
    if (item.featured) {
      return `
        <article class="pick-card featured-pick">
          <div class="pick-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="pick-body">
            <span class="category-badge soft">${item.catLabel}</span>
            <h3>${item.title}</h3>
            <p>${item.excerpt || ''}</p>
            <a href="#" class="read-more">${ui.readArticle}</a>
          </div>
        </article>
      `;
    }
    return `
      <article class="pick-card">
        <div class="pick-image small">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="pick-body">
          <span class="category-badge soft">${item.catLabel}</span>
          <h3>${item.title}</h3>
          <a href="#" class="read-more">${ui.readMore}</a>
        </div>
      </article>
    `;
  }).join('');
}

async function loadOpinions() {
  const items = await fetchJSON(`${API}/opinions`);
  const el = document.getElementById('opinionGrid');
  if (!el) return;

  el.innerHTML = items.map((item) => `
    <article class="opinion-card">
      <div class="opinion-avatar">${item.initials}</div>
      <blockquote>"${item.quote}"</blockquote>
      <cite>— ${item.cite}</cite>
    </article>
  `).join('');
}

let liveStreamUrl = '';

function startLiveStream() {
  if (liveStarted || !liveStreamUrl) return;
  liveStarted = true;
  const iframe = document.getElementById('liveIframe');
  const placeholder = document.getElementById('livePlaceholder');
  iframe.src = liveStreamUrl + (liveStreamUrl.includes('?') ? '&' : '?') + 'autoplay=1';
  placeholder.classList.add('hidden');
  iframe.classList.remove('hidden');
}

async function loadCV() {
  cvData = await fetchJSON(`${API}/cv`);
}

function renderCVModal() {
  if (!cvData) return;
  const el = document.getElementById('cvModalContent');
  if (!el) return;

  el.innerHTML = `
    <div class="cv-modal-header">
      <div class="cv-modal-photo">
        <img src="${cvData.image}" alt="${cvData.name}">
      </div>
      <div class="cv-modal-intro">
        <h2 id="cvModalTitle">${cvData.name}</h2>
        <p class="cv-modal-role">${cvData.title}</p>
        <p class="cv-modal-summary">${cvData.summary}</p>
        <div class="cv-modal-contact">
          <span>📍 ${cvData.location}</span>
          <a href="mailto:${cvData.email}">✉ ${cvData.email}</a>
        </div>
      </div>
    </div>
    <div class="cv-modal-sections">
      <section class="cv-modal-block">
        <h3>${ui.cvEducation}</h3>
        ${cvData.education.map((e) => `
          <div class="cv-entry">
            <span class="cv-period">${e.period}</span>
            <h4>${e.title}</h4>
            <p class="cv-place">${e.place}</p>
            <p class="cv-desc">${e.desc}</p>
          </div>
        `).join('')}
      </section>
      <section class="cv-modal-block">
        <h3>${ui.cvExperience}</h3>
        ${cvData.experience.map((e) => `
          <div class="cv-entry">
            <span class="cv-period">${e.period}</span>
            <h4>${e.title}</h4>
            <p class="cv-place">${e.place}</p>
            <p class="cv-desc">${e.desc}</p>
          </div>
        `).join('')}
      </section>
      <section class="cv-modal-block cv-modal-skills">
        <h3>${ui.cvSkills}</h3>
        <div class="cv-skills">
          ${cvData.skills.map((s) => `<span class="cv-skill">${s}</span>`).join('')}
        </div>
      </section>
    </div>
  `;
}

function openCVModal() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  renderCVModal();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('cv-open');
}

function closeCVModal() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cv-open');
}

function closeMobileNav() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('menuToggle');
  const backdrop = document.getElementById('navBackdrop');
  nav?.classList.remove('open');
  toggle?.classList.remove('active');
  backdrop?.classList.remove('open');
  document.body.classList.remove('nav-open');
}

function openMobileNav() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('menuToggle');
  const backdrop = document.getElementById('navBackdrop');
  nav?.classList.add('open');
  toggle?.classList.add('active');
  backdrop?.classList.add('open');
  document.body.classList.add('nav-open');
}

function initCVModal() {
  document.querySelectorAll('[data-cv-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
      openCVModal();
    });
  });

  document.getElementById('cvModalClose')?.addEventListener('click', closeCVModal);
  document.getElementById('cvModalBackdrop')?.addEventListener('click', closeCVModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCVModal();
  });
}

async function loadLive() {
  const data = await fetchJSON(`${API}/live`);
  const badge = document.getElementById('liveBadge');
  const placeholder = document.getElementById('livePlaceholder');
  const iframe = document.getElementById('liveIframe');
  const poster = document.getElementById('livePoster');

  poster.src = data.poster;
  poster.alt = data.currentShow;
  document.querySelector('.viewers-count').textContent = data.viewers.toLocaleString();
  document.getElementById('liveShowTitle').textContent = data.currentShow;

  const scheduleEl = document.getElementById('scheduleList');
  scheduleEl.innerHTML = data.schedule.map((item) => `
    <li class="schedule-item">
      <span class="schedule-time">${item.time}</span>
      <span class="schedule-title">${item.title}</span>
    </li>
  `).join('');

  if (data.isLive) {
    badge.classList.remove('offline');
    liveStreamUrl = data.streamUrl;
  } else {
    badge.classList.add('offline');
    liveStreamUrl = '';
    document.getElementById('liveOfflineText').textContent = ui.liveOfflineSub;
  }
}

async function loadNews() {
  const params = new URLSearchParams({ limit: visibleCount, offset: 0 });
  if (activeFilter !== 'all') params.set('category', activeFilter);

  const data = await fetchJSON(`${API}/news?${params}`);
  newsData = data.items;
  totalNews = data.total;
  renderNews();
}

function renderNews() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  grid.innerHTML = newsData.map((item, i) => `
    <article class="news-card fade-in" data-category="${item.category}" style="animation-delay: ${i * 0.12}s">
      <div class="news-card-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="news-card-body">
        <span class="cat">${item.catLabel}</span>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <div class="news-card-footer">
          <span>${item.author}</span>
          <span>${item.date} · ${item.readTime}</span>
        </div>
      </div>
    </article>
  `).join('');

  const loadBtn = document.getElementById('loadMore');
  if (loadBtn) {
    loadBtn.style.display = visibleCount >= totalNews ? 'none' : 'inline-block';
  }
}

async function reloadAll() {
  liveStarted = false;
  staticLocale = null;
  staticLive = null;
  cvData = null;
  document.getElementById('livePlaceholder')?.classList.remove('hidden');
  document.getElementById('liveIframe')?.classList.add('hidden');
  document.getElementById('liveIframe').src = '';

  await loadUI();
  await Promise.all([
    loadTicker(),
    loadFeatured(),
    loadTopStories(),
    loadLatest(),
    loadTopNewsRow(),
    loadLive(),
    loadEditorsPick(),
    loadOpinions(),
    loadNews(),
    loadCV()
  ]);
}

function initLangSwitch() {
  setLang(currentLang);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (btn.dataset.lang === currentLang) return;
      setLang(btn.dataset.lang);
      closeCVModal();
      document.querySelectorAll('.reveal').forEach((el) => el.classList.remove('revealed'));
      try {
        await reloadAll();
        initScrollReveal();
      } catch {
        showToast(ui.toastLoadErr);
      }
    });
  });
}

function initFilters() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      visibleCount = 6;
      loadNews();
    });
  });
}

function initLoadMore() {
  document.getElementById('loadMore')?.addEventListener('click', () => {
    visibleCount += 3;
    loadNews();
  });
}

const BG_SLIDES = [
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80',
  'https://images.unsplash.com/photo-1586892478167-f19877ac8611?w=1920&q=80',
  'https://images.unsplash.com/photo-1504711432789-3849292768d0?w=1920&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1920&q=80',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&q=80',
  'https://images.unsplash.com/photo-1516321497487-e488888be753?w=1920&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e0?w=1920&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80'
];

function initBackgroundSlideshow() {
  const container = document.getElementById('pageBgSlideshow');
  if (!container) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  BG_SLIDES.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = `bg-slide${i === 0 ? ' active' : ''}`;
    slide.style.backgroundImage = `url('${url}')`;
    container.appendChild(slide);
  });

  const slides = container.querySelectorAll('.bg-slide');
  if (slides.length < 2 || reduced) return;

  let current = 0;
  const interval = window.innerWidth <= 768 ? 7000 : 5500;

  setInterval(() => {
    slides[current].classList.remove('active');
    slides[current].classList.add('exit');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    slides[current].classList.remove('exit');

    const prev = (current - 1 + slides.length) % slides.length;
    setTimeout(() => slides[prev].classList.remove('exit'), 2800);
  }, interval);
}

function initParallaxBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const slideshow = document.getElementById('pageBgSlideshow');
  const mesh = document.querySelector('.page-bg-mesh');
  if (!slideshow || window.innerWidth <= 768) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      slideshow.style.transform = `translateY(${y * 0.12}px) scale(1.02)`;
      if (mesh) mesh.style.transform = `translateY(${y * 0.06}px)`;
      ticking = false;
    });
  }, { passive: true });
}

function initBackgroundVideo() {
  const video = document.getElementById('pageBgVideo');
  const fallback = document.querySelector('.page-bg-fallback');
  if (!video) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const useFallback = () => {
    video.pause();
    video.classList.add('is-hidden');
    if (fallback) fallback.classList.add('is-active');
  };

  if (motionQuery.matches || navigator.connection?.saveData) {
    useFallback();
    return;
  }

  video.addEventListener('error', useFallback);

  const tryPlay = () => {
    video.play().catch(useFallback);
  };

  if (video.readyState >= 2) tryPlay();
  else video.addEventListener('loadeddata', tryPlay, { once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (!video.classList.contains('is-hidden')) tryPlay();
  });

  motionQuery.addEventListener('change', (e) => {
    if (e.matches) useFallback();
  });
}

function initMobileBottomNav() {
  const nav = document.getElementById('mobileBottomNav');
  if (!nav) return;

  const items = nav.querySelectorAll('.mob-nav-item');
  const sectionMap = [
    { id: 'live', href: '#live' },
    { id: 'lajme', href: '#lajme' }
  ];

  const setActive = (href) => {
    items.forEach((item) => {
      const itemHref = item.getAttribute('href');
      const isHome = itemHref === '#';
      item.classList.toggle('active', href === itemHref || (isHome && (!href || href === '#')));
    });
  };

  nav.querySelector('[href="#"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActive('#');
  });

  items.forEach((item) => {
    if (item.hasAttribute('data-cv-open')) return;
    if (item.getAttribute('href') === '#') return;
    item.addEventListener('click', () => setActive(item.getAttribute('href')));
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const match = sectionMap.find((s) => s.id === visible.target.id);
    if (match) setActive(match.href);
  }, { threshold: [0.15, 0.35, 0.55], rootMargin: '-30% 0px -35% 0px' });

  sectionMap.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.scrollY < 120) setActive('#');
    }, 80);
  }, { passive: true });
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const backdrop = document.getElementById('navBackdrop');
  const closeBtn = document.getElementById('navClose');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('open')) closeMobileNav();
    else openMobileNav();
  });

  backdrop?.addEventListener('click', closeMobileNav);
  closeBtn?.addEventListener('click', closeMobileNav);

  nav.querySelectorAll('.nav-link:not([data-cv-open])').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const email = input.value.trim();
    if (!email) return;

    if (await detectStaticMode()) {
      const key = 'aurora-newsletter';
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      if (saved.includes(email.toLowerCase())) {
        showToast(currentLang === 'en' ? 'This email is already subscribed' : 'Ky email është tashmë i abonuar');
        return;
      }
      saved.push(email.toLowerCase());
      localStorage.setItem(key, JSON.stringify(saved));
      input.value = '';
      showToast(ui.toastSubscribeOk);
      return;
    }

    try {
      const res = await fetch(`${API}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang: currentLang })
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || ui.toastSubscribeErr);
        return;
      }

      input.value = '';
      showToast(data.message || ui.toastSubscribeOk);
    } catch {
      showToast(ui.toastServerErr);
    }
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.revealed)');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.querySelectorAll('.news-card, .latest-item').forEach((child, i) => {
          child.style.animationDelay = `${i * 0.07}s`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => observer.observe(el));
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function showToast(message) {
  document.querySelector('.toast')?.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

document.addEventListener('DOMContentLoaded', async () => {
  initLangSwitch();
  initFilters();
  initLoadMore();
  initMobileMenu();
  initCVModal();
  initMobileBottomNav();
  initBackgroundSlideshow();
  initBackgroundVideo();
  initParallaxBackground();
  initNewsletter();
  initHeaderScroll();
  document.getElementById('livePlayBtn')?.addEventListener('click', startLiveStream);

  try {
    await reloadAll();
    initScrollReveal();
  } catch (err) {
    console.error(err);
    showToast(ui.toastLoadErr || 'Error');
  }
});
