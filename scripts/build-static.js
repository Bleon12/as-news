const fs = require('fs');
const path = require('path');
const { getLocale } = require('../data/content');

const outDir = path.join(__dirname, '../public/data');
fs.mkdirSync(outDir, { recursive: true });

['sq', 'en'].forEach((lang) => {
  const locale = getLocale(lang);
  fs.writeFileSync(
    path.join(outDir, `${lang}.json`),
    JSON.stringify(locale, null, 2),
    'utf8'
  );
});

console.log('✓ Static data generated in public/data/');
