/**
 * Arber Mjekiqi — Interior Design & Laminate Portfolio
 */

const API = '/api';
const LANG_KEY = 'arber-lang';

let currentLang = localStorage.getItem(LANG_KEY) || 'sq';
let ui = {};
let profile = {};
let projects = [];
let activeFilter = 'all';
let staticMode = null;
let staticLocale = null;

const BG_SLIDES = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80',
  'https://images.unsplash.com/photo-1616486338812-ee8c5824a421?w=1920&q=80',
  'https://images.unsplash.com/photo-1600566753190-17fced7a7440?w=1920&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80'
];

async function detectStaticMode() {
  if (staticMode !== null) return staticMode;
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (isLocal) {
    try {
      const health = await fetch('/api/health');
      if (health.ok) { staticMode = false; return false; }
    } catch { /* static fallback */ }
  }
  try {
    const res = await fetch('/data/sq.json', { method: 'HEAD' });
    staticMode = res.ok;
  } catch { staticMode = false; }
  return staticMode;
}

async function loadStaticBundle() {
  if (staticLocale && staticLocale._lang === currentLang) return staticLocale;
  const locale = await fetch(`/data/${currentLang}.json`).then((r) => {
    if (!r.ok) throw new Error('Static locale missing');
    return r.json();
  });
  locale._lang = currentLang;
  staticLocale = locale;
  return locale;
}

function resolveStaticApi(url) {
  const d = staticLocale;
  const path = url.split('?')[0];
  if (path.endsWith('/ui')) return d.ui;
  if (path.endsWith('/profile')) return d.profile;
  if (path.endsWith('/ticker')) return d.ticker;
  if (path.endsWith('/services')) return d.services;
  if (path.endsWith('/projects')) return d.projects;
  if (path.endsWith('/cv')) return { education: d.education, experience: d.experience, skills: d.skills, certifications: d.certifications };
  if (path.endsWith('/testimonials')) return d.testimonials;
  throw new Error(`Unknown endpoint: ${url}`);
}

async function fetchJSON(url) {
  if (await detectStaticMode()) {
    await loadStaticBundle();
    return resolveStaticApi(url.replace(`${API}`, '/api'));
  }
  const sep = url.includes('?') ? '&' : '?';
  const res = await fetch(`${url}${sep}lang=${currentLang}`);
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
  const ids = {
    tickerLabel: 'tickerLabel', logoTagline: 'logoTagline', footerTagline: 'footerTagline',
    heroBadge: 'heroBadge', heroCta: 'heroCta', heroCta2: 'heroCta2',
    aboutTitle: 'aboutTitle', aboutSub: 'aboutSub',
    servicesTitle: 'servicesTitle', servicesSub: 'servicesSub',
    portfolioTitle: 'portfolioTitle', portfolioSub: 'portfolioSub',
    filterAll: 'filterAll', cvTitle: 'cvTitle', cvSub: 'cvSub',
    eduTitle: 'eduTitle', expTitle: 'expTitle', skillsTitle: 'skillsTitle',
    testimonialsTitle: 'testimonialsTitle', testimonialsSub: 'testimonialsSub',
    contactTitle: 'contactTitle', contactSub: 'contactSub',
    contactSend: 'contactSend', contactCall: 'contactCall',
    footerDesc: 'footerDesc', footerServices: 'footerServices',
    footerLinks: 'footerLinks', footerContact: 'footerContact',
    footerRights: 'footerRights', footerMotto: 'footerMotto',
    headerCta: 'headerCta'
  };
  Object.entries(ids).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el && ui[key]) el.textContent = ui[key];
  });

  document.getElementById('contactName').placeholder = ui.contactName;
  document.getElementById('contactEmail').placeholder = ui.contactEmail;
  document.getElementById('contactPhone').placeholder = ui.contactPhone;
  document.getElementById('contactMessage').placeholder = ui.contactMessage;
  document.getElementById('menuToggle').ariaLabel = ui.menuAria;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = getNested(ui, el.dataset.i18n);
    if (val) el.textContent = val;
  });

  document.title = currentLang === 'en'
    ? 'Arber Mjekiqi | Interior Design & Flooring'
    : 'Arber Mjekiqi | Dizajn i Brendshëm & Laminat';
}

async function loadTicker() {
  const items = await fetchJSON(`${API}/ticker`);
  const el = document.getElementById('tickerContent');
  if (!el) return;
  const html = items.map((t) => `<span>${t}</span><span>•</span>`).join('');
  el.innerHTML = html + html;
}

async function loadProfile() {
  profile = await fetchJSON(`${API}/profile`);
  document.getElementById('heroName').textContent = profile.name;
  document.getElementById('heroTitle').textContent = profile.title;
  document.getElementById('heroBio').textContent = profile.bio;
  document.getElementById('heroImage').src = profile.image;
  document.getElementById('heroImage').alt = profile.name;
  document.getElementById('aboutImage').src = profile.image;
  document.getElementById('aboutImage').alt = profile.name;
  document.getElementById('aboutBio1').textContent = profile.bio;
  document.getElementById('aboutBio2').textContent = profile.bio2;
  document.getElementById('aboutLocation').textContent = profile.location;
  document.getElementById('aboutPhone').textContent = profile.phone;
  document.getElementById('aboutEmail').textContent = profile.email;
  document.getElementById('footerPhone').textContent = profile.phone;
  document.getElementById('footerEmail').textContent = profile.email;
  document.getElementById('footerLocation').textContent = profile.location;
  document.querySelector('.btn-call').href = `tel:${profile.phone.replace(/\s/g, '')}`;

  const statsEl = document.getElementById('heroStats');
  statsEl.innerHTML = profile.stats.map((s) => `
    <div class="stat-item">
      <span class="stat-value">${s.value}</span>
      <span class="stat-label">${s.label}</span>
    </div>
  `).join('');
}

async function loadServices() {
  const items = await fetchJSON(`${API}/services`);
  document.getElementById('servicesGrid').innerHTML = items.map((s) => `
    <article class="service-card">
      <span class="service-icon">${s.icon}</span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>
  `).join('');
}

async function loadProjects() {
  projects = await fetchJSON(`${API}/projects`);
  renderProjects();
}

function renderProjects() {
  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  document.getElementById('portfolioGrid').innerHTML = filtered.map((p) => `
    <article class="project-card">
      <div class="project-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="project-badge">${p.catLabel}</span>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-meta">
          <span>📐 ${p.area}</span>
          <span>⏱ ${p.duration}</span>
        </div>
      </div>
    </article>
  `).join('');
}

async function loadCV() {
  const data = await fetchJSON(`${API}/cv`);

  document.getElementById('educationTimeline').innerHTML = data.education.map((e) => `
    <div class="timeline-item">
      <span class="timeline-period">${e.period}</span>
      <h4>${e.title}</h4>
      <p class="timeline-place">${e.place}</p>
      <p class="timeline-desc">${e.desc}</p>
    </div>
  `).join('');

  document.getElementById('experienceTimeline').innerHTML = data.experience.map((e) => `
    <div class="timeline-item">
      <span class="timeline-period">${e.period}</span>
      <h4>${e.title}</h4>
      <p class="timeline-place">${e.place}</p>
      <p class="timeline-desc">${e.desc}</p>
    </div>
  `).join('');

  document.getElementById('skillsList').innerHTML = data.skills.map((s) =>
    `<span class="skill-tag">${s}</span>`
  ).join('');

  document.getElementById('certsList').innerHTML = data.certifications.map((c) =>
    `<li>${c}</li>`
  ).join('');
}

async function loadTestimonials() {
  const items = await fetchJSON(`${API}/testimonials`);
  document.getElementById('testimonialsGrid').innerHTML = items.map((t) => `
    <article class="testimonial-card">
      <div class="testimonial-avatar">${t.initials}</div>
      <blockquote>"${t.quote}"</blockquote>
      <cite>— ${t.cite}</cite>
    </article>
  `).join('');
}

async function reloadAll() {
  staticLocale = null;
  ui = await fetchJSON(`${API}/ui`);
  applyUI();
  await Promise.all([
    loadTicker(),
    loadProfile(),
    loadServices(),
    loadProjects(),
    loadCV(),
    loadTestimonials()
  ]);
}

function initLangSwitch() {
  setLang(currentLang);
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (btn.dataset.lang === currentLang) return;
      setLang(btn.dataset.lang);
      document.querySelectorAll('.reveal').forEach((el) => el.classList.remove('revealed'));
      try {
        await reloadAll();
        initScrollReveal();
      } catch { showToast(ui.toastLoadErr); }
    });
  });
}

function initFilters() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderProjects();
    });
  });
}

function initContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.querySelector('#contactName').value.trim(),
      email: form.querySelector('#contactEmail').value.trim(),
      phone: form.querySelector('#contactPhone').value.trim(),
      message: form.querySelector('#contactMessage').value.trim(),
      lang: currentLang
    };

    if (await detectStaticMode()) {
      const key = 'arber-contacts';
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      saved.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(saved));
      form.reset();
      showToast(ui.toastContactOk);
      return;
    }

    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) { showToast(result.error || ui.toastContactErr); return; }
      form.reset();
      showToast(result.message || ui.toastContactOk);
    } catch { showToast(ui.toastContactErr); }
  });
}

function initBackgroundSlideshow() {
  const container = document.getElementById('pageBgSlideshow');
  if (!container) return;
  BG_SLIDES.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = `bg-slide${i === 0 ? ' active' : ''}`;
    slide.style.backgroundImage = `url('${url}')`;
    container.appendChild(slide);
  });
  const slides = container.querySelectorAll('.bg-slide');
  if (slides.length < 2) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 6000);
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('active', open);
    document.body.classList.toggle('nav-open', open);
  });
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });
}

function initMobileBottomNav() {
  const nav = document.getElementById('mobileBottomNav');
  if (!nav) return;
  const items = nav.querySelectorAll('.mob-nav-item');
  const sections = [
    { id: 'projekte', href: '#projekte' },
    { id: 'cv', href: '#cv' },
    { id: 'kontakt', href: '#kontakt' }
  ];

  const setActive = (href) => {
    items.forEach((item) => {
      const h = item.getAttribute('href');
      item.classList.toggle('active', href === h || (h === '#' && (!href || href === '#')));
    });
  };

  nav.querySelector('[href="#"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActive('#');
  });

  items.forEach((item) => {
    if (item.getAttribute('href') !== '#') {
      item.addEventListener('click', () => setActive(item.getAttribute('href')));
    }
  });

  const observer = new IntersectionObserver((entries) => {
    const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!vis) return;
    const match = sections.find((s) => s.id === vis.target.id);
    if (match) setActive(match.href);
  }, { threshold: 0.2, rootMargin: '-30% 0px -40% 0px' });

  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) setActive('#');
  }, { passive: true });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.revealed)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => observer.observe(el));
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
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
  initContactForm();
  initMobileMenu();
  initMobileBottomNav();
  initBackgroundSlideshow();
  initHeaderScroll();
  try {
    await reloadAll();
    initScrollReveal();
  } catch (err) {
    console.error(err);
    showToast('Error loading');
  }
});
