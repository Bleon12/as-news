const fs = require('fs');
const path = require('path');
const { getLocale, live } = require('../data/content');

const outDir = path.join(__dirname, '../public/data');
fs.mkdirSync(outDir, { recursive: true });

['sq', 'en'].forEach((lang) => {
  const locale = getLocale(lang);
  fs.writeFileSync(
    path.join(outDir, `${lang}.json`),
    JSON.stringify(locale, null, 2),
    'utf8'
  );

  const livePayload = {
    isLive: live.isLive,
    streamUrl: live.streamUrl,
    poster: live.poster,
    viewers: live.viewers,
    currentShow: live.currentShow[lang],
    schedule: live.schedule.map((item) => ({
      time: item.time,
      title: item.title[lang]
    }))
  };

  fs.writeFileSync(
    path.join(outDir, `live.${lang}.json`),
    JSON.stringify(livePayload, null, 2),
    'utf8'
  );
});

console.log('✓ Static data generated in public/data/');
