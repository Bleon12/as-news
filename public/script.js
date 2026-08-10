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

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = getNested(ui, el.dataset.i18n);
    if (val) el.textContent = val;
  });

  document.title = currentLang === 'en'
    ? 'Aurora Lumina | Digital Newspaper'
    : 'Aurora Lumina | Gazeta Digjitale';
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
    <article class="news-card fade-in" data-category="${item.category}" style="animation-delay: ${i * 0.08}s">
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
    loadNews()
  ]);
}

function initLangSwitch() {
  setLang(currentLang);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (btn.dataset.lang === currentLang) return;
      setLang(btn.dataset.lang);
      try {
        await reloadAll();
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

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
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

function showToast(message) {
  document.querySelector('.toast')?.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 32px; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #3d3a38; color: #faf8f5;
    padding: 14px 28px; border-radius: 30px;
    font-size: 0.9rem; font-family: 'Outfit', sans-serif;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    z-index: 1000; opacity: 0; transition: all 0.4s ease;
  `;

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

document.addEventListener('DOMContentLoaded', async () => {
  initLangSwitch();
  initFilters();
  initLoadMore();
  initMobileMenu();
  initNewsletter();
  document.getElementById('livePlayBtn')?.addEventListener('click', startLiveStream);

  try {
    await reloadAll();
  } catch (err) {
    console.error(err);
    showToast(ui.toastLoadErr || 'Error');
  }
});
