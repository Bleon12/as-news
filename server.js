const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { getLocale, resolveLang } = require('./data/content');

const app = express();
const PORT = process.env.PORT || 12345;
const CONTACTS_FILE = path.join(__dirname, 'data', 'contacts.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readContacts() {
  try {
    if (fs.existsSync(CONTACTS_FILE)) {
      return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    }
  } catch { return []; }
  return [];
}

function saveContacts(list) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

function langFromReq(req) {
  return resolveLang(req.query.lang);
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', name: 'Arber Mjekiqi Portfolio API' });
});

app.get('/api/ui', (req, res) => {
  res.json(getLocale(langFromReq(req)).ui);
});

app.get('/api/profile', (req, res) => {
  res.json(getLocale(langFromReq(req)).profile);
});

app.get('/api/ticker', (req, res) => {
  res.json(getLocale(langFromReq(req)).ticker);
});

app.get('/api/services', (req, res) => {
  res.json(getLocale(langFromReq(req)).services);
});

app.get('/api/projects', (req, res) => {
  res.json(getLocale(langFromReq(req)).projects);
});

app.get('/api/cv', (req, res) => {
  const locale = getLocale(langFromReq(req));
  res.json({
    education: locale.education,
    experience: locale.experience,
    skills: locale.skills,
    certifications: locale.certifications
  });
});

app.get('/api/testimonials', (req, res) => {
  res.json(getLocale(langFromReq(req)).testimonials);
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message, lang } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      error: lang === 'en' ? 'Name, email and message are required.' : 'Emri, email dhe mesazhi janë të detyrueshëm.'
    });
  }

  const contacts = readContacts();
  if (contacts.some((c) => c.email === email.toLowerCase() && c.message === message)) {
    return res.status(409).json({
      error: lang === 'en' ? 'Message already sent.' : 'Mesazhi është dërguar tashmë.'
    });
  }

  contacts.push({
    name,
    email: email.toLowerCase(),
    phone: phone || '',
    message,
    lang: lang || 'sq',
    date: new Date().toISOString()
  });
  saveContacts(contacts);

  res.json({
    message: lang === 'en'
      ? 'Thank you! I will contact you within 24 hours.'
      : 'Faleminderit! Do t\'ju kontaktoj brenda 24 orëve.'
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Arber Mjekiqi Portfolio → http://localhost:${PORT}`);
});
