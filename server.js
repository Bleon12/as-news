const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { getLocale, resolveLang, live } = require('./data/content');

const app = express();
const PORT = process.env.PORT || 12345;
const SUBSCRIBERS_FILE = path.join(__dirname, 'data', 'subscribers.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'));
    }
  } catch {
    return [];
  }
  return [];
}

function saveSubscribers(list) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

function langFromReq(req) {
  return resolveLang(req.query.lang);
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', name: 'AS NEWS API' });
});

app.get('/api/ui', (req, res) => {
  const lang = langFromReq(req);
  res.json(getLocale(lang).ui);
});

app.get('/api/ticker', (req, res) => {
  res.json(getLocale(langFromReq(req)).ticker);
});

app.get('/api/featured', (req, res) => {
  res.json(getLocale(langFromReq(req)).featured);
});

app.get('/api/focus', (req, res) => {
  res.json(getLocale(langFromReq(req)).focus);
});

app.get('/api/top-stories', (req, res) => {
  res.json(getLocale(langFromReq(req)).topStories);
});

app.get('/api/latest', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const items = getLocale(langFromReq(req)).news.slice(0, limit);
  res.json(items);
});

app.get('/api/editors-pick', (req, res) => {
  res.json(getLocale(langFromReq(req)).editorsPick);
});

app.get('/api/opinions', (req, res) => {
  res.json(getLocale(langFromReq(req)).opinions);
});

app.get('/api/cv', (req, res) => {
  res.json(getLocale(langFromReq(req)).cv);
});

app.get('/api/live', (req, res) => {
  const lang = langFromReq(req);
  res.json({
    isLive: live.isLive,
    streamUrl: live.streamUrl,
    poster: live.poster,
    viewers: live.viewers,
    currentShow: live.currentShow[lang],
    schedule: live.schedule.map((item) => ({
      time: item.time,
      title: item.title[lang]
    }))
  });
});

app.get('/api/news', (req, res) => {
  const { category, limit, offset } = req.query;
  let items = [...getLocale(langFromReq(req)).news];

  if (category && category !== 'all') {
    items = items.filter((n) => n.category === category);
  }

  const start = parseInt(offset, 10) || 0;
  const count = parseInt(limit, 10) || items.length;
  const slice = items.slice(start, start + count);

  res.json({ total: items.length, items: slice });
});

app.get('/api/news/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const article = getLocale(langFromReq(req)).news.find((n) => n.id === id);

  if (!article) {
    const err = langFromReq(req) === 'en' ? 'Article not found' : 'Artikulli nuk u gjet';
    return res.status(404).json({ error: err });
  }

  res.json(article);
});

app.post('/api/newsletter', (req, res) => {
  const lang = resolveLang(req.body.lang);
  const ui = getLocale(lang).ui;
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const err = lang === 'en' ? 'Invalid email' : 'Email i pavlefshëm';
    return res.status(400).json({ error: err });
  }

  const subscribers = readSubscribers();

  if (subscribers.some((s) => s.email === email.toLowerCase())) {
    const err = lang === 'en' ? 'This email is already subscribed' : 'Ky email është tashmë i abonuar';
    return res.status(409).json({ error: err });
  }

  subscribers.push({
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString()
  });

  saveSubscribers(subscribers);

  res.status(201).json({
    message: ui.toastSubscribeOk,
    total: subscribers.length
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ✦ AS NEWS`);
  console.log(`  Gazeta e Aurora Sallahu`);
  console.log(`  → http://localhost:${PORT}\n`);
});
