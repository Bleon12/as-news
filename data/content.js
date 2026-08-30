const sq = {
  ui: {
    tickerLabel: 'Lajme të Fundit',
    logoTagline: 'Gazeta e Aurora Sallahu',
    nav: { home: 'Kryefaqja', news: 'Lajme', politics: 'Politikë', economy: 'Ekonomi', culture: 'Kulturë', sport: 'Sport', opinion: 'Opinion', live: 'Live' },
    heroLoading: 'Duke ngarkuar...',
    heroAlt: 'Lajme kryesore',
    authorPrefix: 'Nga',
    focusTitle: 'Në Fokus',
    mainNewsTitle: 'Lajmet Kryesore',
    latestNewsTitle: 'Lajmet e Fundit',
    seeAllNews: 'Shiko të gjitha →',
    editorsPickTitle: 'Zgjedhja e Redaksisë',
    editorsPickSub: 'Artikuj të përzgjedhur me kujdes nga Aurora Sallahu',
    readArticle: 'Lexo artikullin →',
    readMore: 'Lexo →',
    newsTitle: 'Lajmet e Ditës',
    filterAll: 'Të Gjitha',
    loadMore: 'Shfaq më shumë lajme',
    opinionTitle: 'Opinion & Kolumne',
    opinionSub: 'Zëra të lirë, ide të guximshme',
    newsletterTitle: 'Burimi i Ditës',
    newsletterSub: 'Merr çdo mëngjes përmbledhjen elegante të lajmeve — kurated by AS NEWS.',
    emailPlaceholder: 'Email adresa juaj',
    subscribe: 'Abonohu',
    footerDesc: 'Gazeta digjitale që sjell lajme me elegancë, thellësi dhe integritet — duke ndriçuar çdo ditë me informacion të besueshëm.',
    footerSections: 'Seksionet',
    footerAbout: 'Rreth Nesh',
    footerLegal: 'Ligjore',
    footerHistory: 'Historia',
    footerEditorial: 'Redaksia',
    footerCareers: 'Karriera',
    footerContact: 'Kontakt',
    footerPrivacy: 'Privatësia',
    footerTerms: 'Kushtet',
    footerCookies: 'Cookies',
    footerRights: '© 2026 AS NEWS — Gazeta e Aurora Sallahu. Të gjitha të drejtat e rezervuara.',
    footerMotto: '"Si aurora, ndriçojmë çdo agim."',
    searchAria: 'Kërko',
    menuAria: 'Meny',
    liveBadge: 'LIVE',
    liveTitle: 'AS NEWS Live',
    liveSub: 'Transmetim i drejtpërdrejtë — lajme, analiza dhe intervista',
    liveWatch: 'Shiko Live',
    liveViewers: 'shikues',
    liveNow: 'Tani në transmetim',
    liveUpcoming: 'Programi i ardhshëm',
    liveOffline: 'Transmetimi fillon së shpejti',
    liveOfflineSub: 'Qendro me ne — programi live nis në ora 20:00',
    toastSubscribeOk: 'Faleminderit! Do të merrni Burimin e Ditës çdo mëngjes.',
    toastSubscribeErr: 'Gabim gjatë abonimit.',
    toastServerErr: 'Nuk u lidh me serverin. Provo përsëri.',
    toastLoadErr: 'Gabim gjatë ngarkimit të lajmeve.'
  },

  ticker: [
    'Kryeprokurori Isufaj në veri të Kosovës: identifikimi i të gjeturve merr kohë',
    'KDI i bën thirrje Kurtit të propozojë kandidatin për kryetar të Kuvendit',
    'Kosova bëhet donator i IDA-s së Bankës Botërore',
    'Kombëtarja e Kosovës mposht Islandën 3-1 dhe ngjitet në Ligën B'
  ],

  featured: {
    id: 'hero-1',
    category: 'politike',
    catLabel: 'Kosovë',
    title: 'Kryeprokurori i Shtetit Isufaj në Zubin Potok: Procesi i identifikimit mund të zgjasë',
    excerpt: 'Kryeprokurori Albin Isufaj vizitoi verin e Kosovës duke folur për procesin delikat të identifikimit të të gjeturve. Autoritetet theksojnë se çdo hap po bëhet me kujdes maksimal dhe në bashkëpunim me familjarët.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80',
    date: '10 Gusht 2026',
    dateIso: '2026-08-10',
    time: '17:45',
    author: 'Aurora Sallahu',
    readTime: '6 min lexim'
  },

  topStories: [
    {
      id: 'top-1',
      catLabel: 'Politikë',
      title: 'KDI thirr Kurtin të propozojë kandidatin për kryetar të Kuvendit',
      excerpt: 'Instituti Demokratik i Kosovës kërkon vazhdim të dialogut politik dhe propozim të menjëhershëm të emrit për kryetar.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
      date: '10 Gusht 2026',
      time: '16:59'
    },
    {
      id: 'top-2',
      catLabel: 'Ekonomi',
      title: 'Pagat minimale në Kosovë — debati VV vs. opozita vazhdon',
      excerpt: 'Rrahmani: paga duhet të ishte 450 euro. Murati e quan kundërshtimin e papërgjegjshëm.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
      date: '10 Gusht 2026',
      time: '15:30'
    }
  ],

  focus: [
    { id: 'focus-1', catLabel: 'Sport', title: 'Kosova mposht Islandën 3-1 dhe kalon në Ligën B të Nations League', date: '9 Gusht', time: '22:15', image: 'https://images.unsplash.com/photo-1579952363873-27f3dade9f55?w=400&q=80' },
    { id: 'focus-2', catLabel: 'Ekonomi', title: 'Kosova bëhet donator i IDA-s — hap të ri në marrëdhëniet me Bankën Botërore', date: '9 Gusht', time: '14:20', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80' },
    { id: 'focus-3', catLabel: 'Politikë', title: 'Abdixhiku kandidat i LDK-së për president? VV: nuk kemi marrë asnjë emër', date: '8 Gusht', time: '12:00', image: 'https://images.unsplash.com/photo-1523961131990-585ea670c2ce?w=400&q=80' },
    { id: 'focus-4', catLabel: 'Kulturë', title: 'Ndriçohet objekti i Qeverisë me ngjyrat e flamurit LGBT — reagime të ndryshme', date: '8 Gusht', time: '10:45', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80' }
  ],

  editorsPick: [
    { id: 'pick-1', featured: true, catLabel: 'Analizë', title: 'TVSH-ja në Kosovë më e lartë se në shumë shtete të zhvilluara — çfarë thonë ekspertët', excerpt: 'Analizë e thelluar mbi barrën tatimore dhe ndikimin e saj në bizneset e vogla dhe familjarët kosovarë.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80' },
    { id: 'pick-2', featured: false, catLabel: 'Veri', title: 'Situata në veri — protesta në Vjenë mbështetje për Kosovën', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80' },
    { id: 'pick-3', featured: false, catLabel: 'Opinion', title: 'Kush është presidenti në detyrë sot dhe me çfarë baze?', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' }
  ],

  opinions: [
    { id: 'op-1', initials: 'AS', quote: 'Gazetaria nuk është vetëm informim — është dritë që ndriçon rrugën drejt të vërtetës.', cite: 'Aurora Sallahu, Themeluese' },
    { id: 'op-2', initials: 'MK', quote: 'Demokracia lulëzon aty ku qytetarët lexojnë, pyesin dhe mendojnë kritikisht.', cite: 'Dr. Mira Krasniqi, Analiste Politike' },
    { id: 'op-3', initials: 'AG', quote: 'Në Kosovë, TVSH-ja më e lartë se në shtetet e zhvilluara — duhet reformë e mençur.', cite: 'Ardian Gjini, Ekonomist' }
  ],

  news: [
    { id: 1, category: 'politike', catLabel: 'Kosovë', title: 'Kryeprokurori Isufaj në Zubin Potok: procesi mund të zgjasë', excerpt: 'Vizita në veri thekson nevojën për durim në procesin e identifikimit dhe bashkëpunim me familjarët.', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80', date: '10 Gusht 2026', time: '17:45', author: 'Aurora Sallahu', readTime: '6 min' },
    { id: 2, category: 'politike', catLabel: 'Politikë', title: 'KDI thirr Kurtin të propozojë kandidatin për kryetar të Kuvendit', excerpt: 'Instituti Demokratik kërkon vazhdim të dialogut dhe propozim të menjëhershëm të emrit.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', date: '10 Gusht 2026', time: '16:59', author: 'Arben Hoxha', readTime: '5 min' },
    { id: 3, category: 'ekonomi', catLabel: 'Ekonomi', title: 'VV: paga minimale duhet të ishte 450 euro — debati intensifikohet', excerpt: 'Rrahmani dhe Murati shkëmbejnë akuza në Kuvend rreth politikës së pagave.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', date: '10 Gusht 2026', time: '15:30', author: 'Elira Leka', readTime: '4 min' },
    { id: 4, category: 'sport', catLabel: 'Sport', title: 'Kosova mposht Islandën 3-1 — kalon në Ligën B', excerpt: 'Kombëtarja shënon fitore historike dhe siguron ngjitje në Nations League.', image: 'https://images.unsplash.com/photo-1579952363873-27f3dade9f55?w=600&q=80', date: '9 Gusht 2026', time: '22:15', author: 'Genti Rama', readTime: '3 min' },
    { id: 5, category: 'ekonomi', catLabel: 'Ekonomi', title: 'Kosova bëhet donator i IDA-s së Bankës Botërore', excerpt: 'Hap i rëndësishëm në marrëdhëniet ekonomike ndërkombëtare të vendit.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80', date: '9 Gusht 2026', time: '14:20', author: 'Mira Krasniqi', readTime: '5 min' },
    { id: 6, category: 'politike', catLabel: 'Politikë', title: 'Abdixhiku kandidat i LDK-së për president?', excerpt: 'VV në Pressing: nuk kemi marrë asnjë emër zyrtar nga opozita.', image: 'https://images.unsplash.com/photo-1523961131990-585ea670c2ce?w=600&q=80', date: '8 Gusht 2026', time: '12:00', author: 'Aurora Sallahu', readTime: '4 min' },
    { id: 7, category: 'kulture', catLabel: 'Kulturë', title: 'Objekti i Qeverisë ndriçohet me ngjyrat e flamurit LGBT', excerpt: 'Veprim simbolik që shkakton reagime të ndryshme në opinionin publik.', image: 'https://images.unsplash.com/photo-1460661414781-efabcd8835c1?w=600&q=80', date: '8 Gusht 2026', time: '10:45', author: 'Drita Shehu', readTime: '3 min' },
    { id: 8, category: 'politike', catLabel: 'Rajon', title: 'Sudani njeh zyrtarisht Kosovën si shtet të pavarur', excerpt: 'Një tjetër hap diplomatik për Kosovën në skenën ndërkombëtare.', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', date: '7 Gusht 2026', time: '09:30', author: 'Arben Hoxha', readTime: '4 min' },
    { id: 9, category: 'sport', catLabel: 'Sport', title: '18 vjet nga raporti i Ahtisaarit për pavarësinë e Kosovës', excerpt: 'Kujtim për ditën historike kur u dorëzua raporti që çoi në pavarësi.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80', date: '7 Gusht 2026', time: '08:00', author: 'Anila Berisha', readTime: '5 min' },
    { id: 10, category: 'politike', catLabel: 'Veri', title: 'Protesta në Vjenë mbështetje për Kosovën dhe situatën në veri', excerpt: 'Qindra persona mblidhen para ambasadës duke kërkuar mbështetje ndërkombëtare.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', date: '6 Gusht 2026', time: '18:00', author: 'Aurora Sallahu', readTime: '4 min' }
  ]
};

const en = {
  ui: {
    tickerLabel: 'Breaking News',
    logoTagline: 'Aurora Sallahu\'s Newspaper',
    nav: { home: 'Home', news: 'News', politics: 'Politics', economy: 'Economy', culture: 'Culture', sport: 'Sport', opinion: 'Opinion', live: 'Live' },
    heroLoading: 'Loading...',
    heroAlt: 'Top story',
    authorPrefix: 'By',
    focusTitle: 'In Focus',
    mainNewsTitle: 'Top Stories',
    latestNewsTitle: 'Latest News',
    seeAllNews: 'See all →',
    editorsPickTitle: 'Editor\'s Pick',
    editorsPickSub: 'Handpicked articles by Aurora Sallahu',
    readArticle: 'Read article →',
    readMore: 'Read →',
    newsTitle: 'Today\'s News',
    filterAll: 'All',
    loadMore: 'Show more news',
    opinionTitle: 'Opinion & Columns',
    opinionSub: 'Free voices, bold ideas',
    newsletterTitle: 'Daily Brief',
    newsletterSub: 'Get an elegant morning roundup of the news — curated by AS NEWS.',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    footerDesc: 'A digital newspaper delivering news with elegance, depth and integrity — illuminating every day with trusted information.',
    footerSections: 'Sections',
    footerAbout: 'About Us',
    footerLegal: 'Legal',
    footerHistory: 'History',
    footerEditorial: 'Editorial',
    footerCareers: 'Careers',
    footerContact: 'Contact',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerCookies: 'Cookies',
    footerRights: '© 2026 AS NEWS — Aurora Sallahu\'s Newspaper. All rights reserved.',
    footerMotto: '"Like the aurora, we illuminate every dawn."',
    searchAria: 'Search',
    menuAria: 'Menu',
    liveBadge: 'LIVE',
    liveTitle: 'AS NEWS Live',
    liveSub: 'Live broadcast — news, analysis and interviews',
    liveWatch: 'Watch Live',
    liveViewers: 'viewers',
    liveNow: 'Now broadcasting',
    liveUpcoming: 'Upcoming schedule',
    liveOffline: 'Broadcast starting soon',
    liveOfflineSub: 'Stay with us — live program starts at 8:00 PM',
    toastSubscribeOk: 'Thank you! You will receive the Daily Brief every morning.',
    toastSubscribeErr: 'Subscription error.',
    toastServerErr: 'Could not connect to server. Please try again.',
    toastLoadErr: 'Error loading news.'
  },

  ticker: [
    'Chief Prosecutor Isufaj in northern Kosovo: identification process may take time',
    'KDI calls on Kurti to propose candidate for Assembly Speaker',
    'Kosovo becomes IDA donor to the World Bank',
    'Kosovo national team beats Iceland 3-1 and advances to League B'
  ],

  featured: {
    id: 'hero-1',
    category: 'politike',
    catLabel: 'Kosovo',
    title: 'Chief Prosecutor Isufaj in Zubin Potok: Identification process may take time',
    excerpt: 'Chief Prosecutor Albin Isufaj visited northern Kosovo to discuss the delicate process of identifying the deceased. Authorities emphasize every step is being taken with maximum care and in cooperation with families.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80',
    date: 'August 10, 2026',
    dateIso: '2026-08-10',
    time: '17:45',
    author: 'Aurora Sallahu',
    readTime: '6 min read'
  },

  topStories: [
    {
      id: 'top-1',
      catLabel: 'Politics',
      title: 'KDI calls on Kurti to propose candidate for Assembly Speaker',
      excerpt: 'The Kosovo Democratic Institute calls for continued political dialogue and an immediate nomination.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
      date: 'August 10, 2026',
      time: '16:59'
    },
    {
      id: 'top-2',
      catLabel: 'Economy',
      title: 'Minimum wage in Kosovo — VV vs opposition debate continues',
      excerpt: 'Rrahmani: wage should have been €450. Murati calls the objection reckless.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
      date: 'August 10, 2026',
      time: '15:30'
    }
  ],

  focus: [
    { id: 'focus-1', catLabel: 'Sport', title: 'Kosovo beats Iceland 3-1 and advances to Nations League B', date: 'Aug 9', time: '22:15', image: 'https://images.unsplash.com/photo-1579952363873-27f3dade9f55?w=400&q=80' },
    { id: 'focus-2', catLabel: 'Economy', title: 'Kosovo becomes IDA donor — new chapter with World Bank', date: 'Aug 9', time: '14:20', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80' },
    { id: 'focus-3', catLabel: 'Politics', title: 'Abdixhiku LDK presidential candidate? VV: we haven\'t received any name', date: 'Aug 8', time: '12:00', image: 'https://images.unsplash.com/photo-1523961131990-585ea670c2ce?w=400&q=80' },
    { id: 'focus-4', catLabel: 'Culture', title: 'Government building lit with LGBT rainbow flag colours', date: 'Aug 8', time: '10:45', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80' }
  ],

  editorsPick: [
    { id: 'pick-1', featured: true, catLabel: 'Analysis', title: 'VAT in Kosovo higher than many developed states — what experts say', excerpt: 'An in-depth look at the tax burden and its impact on small businesses and Kosovo families.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80' },
    { id: 'pick-2', featured: false, catLabel: 'North', title: 'Northern situation — Vienna protests in support of Kosovo', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80' },
    { id: 'pick-3', featured: false, catLabel: 'Opinion', title: 'Who is the acting president today and on what basis?', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' }
  ],

  opinions: [
    { id: 'op-1', initials: 'AS', quote: 'Journalism is not just information — it is light illuminating the path to truth.', cite: 'Aurora Sallahu, Founder' },
    { id: 'op-2', initials: 'MK', quote: 'Democracy flourishes where citizens read, question and think critically.', cite: 'Dr. Mira Krasniqi, Political Analyst' },
    { id: 'op-3', initials: 'AG', quote: 'In Kosovo, VAT is higher than in developed states — smart reform is needed.', cite: 'Ardian Gjini, Economist' }
  ],

  news: [
    { id: 1, category: 'politike', catLabel: 'Kosovo', title: 'Chief Prosecutor Isufaj in Zubin Potok: process may take time', excerpt: 'Northern visit emphasizes need for patience in identification process and cooperation with families.', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80', date: 'August 10, 2026', time: '17:45', author: 'Aurora Sallahu', readTime: '6 min' },
    { id: 2, category: 'politike', catLabel: 'Politics', title: 'KDI calls on Kurti to propose Assembly Speaker candidate', excerpt: 'Democratic Institute calls for continued dialogue and immediate nomination.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', date: 'August 10, 2026', time: '16:59', author: 'Arben Hoxha', readTime: '5 min' },
    { id: 3, category: 'ekonomi', catLabel: 'Economy', title: 'VV: minimum wage should have been €450 — debate intensifies', excerpt: 'Rrahmani and Murati exchange accusations in Assembly over wage policy.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', date: 'August 10, 2026', time: '15:30', author: 'Elira Leka', readTime: '4 min' },
    { id: 4, category: 'sport', catLabel: 'Sport', title: 'Kosovo beats Iceland 3-1 — advances to League B', excerpt: 'National team records historic victory and secures Nations League promotion.', image: 'https://images.unsplash.com/photo-1579952363873-27f3dade9f55?w=600&q=80', date: 'August 9, 2026', time: '22:15', author: 'Genti Rama', readTime: '3 min' },
    { id: 5, category: 'ekonomi', catLabel: 'Economy', title: 'Kosovo becomes World Bank IDA donor', excerpt: 'Important step in the country\'s international economic relations.', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80', date: 'August 9, 2026', time: '14:20', author: 'Mira Krasniqi', readTime: '5 min' },
    { id: 6, category: 'politike', catLabel: 'Politics', title: 'Abdixhiku LDK presidential candidate?', excerpt: 'VV at Pressing: we have not received any official name from opposition.', image: 'https://images.unsplash.com/photo-1523961131990-585ea670c2ce?w=600&q=80', date: 'August 8, 2026', time: '12:00', author: 'Aurora Sallahu', readTime: '4 min' },
    { id: 7, category: 'kulture', catLabel: 'Culture', title: 'Government building lit with LGBT rainbow flag colours', excerpt: 'Symbolic act that draws mixed reactions from the public.', image: 'https://images.unsplash.com/photo-1460661414781-efabcd8835c1?w=600&q=80', date: 'August 8, 2026', time: '10:45', author: 'Drita Shehu', readTime: '3 min' },
    { id: 8, category: 'politike', catLabel: 'Region', title: 'Sudan officially recognizes independent Kosovo', excerpt: 'Another diplomatic step for Kosovo on the international stage.', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', date: 'August 7, 2026', time: '09:30', author: 'Arben Hoxha', readTime: '4 min' },
    { id: 9, category: 'sport', catLabel: 'Sport', title: '18 years since Ahtisaari report on Kosovo independence', excerpt: 'Remembering the historic day when the report leading to independence was submitted.', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80', date: 'August 7, 2026', time: '08:00', author: 'Anila Berisha', readTime: '5 min' },
    { id: 10, category: 'politike', catLabel: 'North', title: 'Vienna protests in support of Kosovo and northern situation', excerpt: 'Hundreds gather demanding international support for Kosovo.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', date: 'August 6, 2026', time: '18:00', author: 'Aurora Sallahu', readTime: '4 min' }
  ]
};

const live = {
  isLive: true,
  streamUrl: 'https://www.youtube.com/embed/21X5lGlDOfg?autoplay=0&mute=1',
  poster: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
  viewers: 1847,
  currentShow: {
    sq: 'Lajmet e Mbrëmjes — AS NEWS',
    en: 'Evening News — AS NEWS'
  },
  schedule: [
    { time: '08:00', title: { sq: 'Agimi — Lajmet e Mëngjesit', en: 'Dawn — Morning News' } },
    { time: '14:00', title: { sq: 'Fokus Ekonomik', en: 'Economic Focus' } },
    { time: '20:00', title: { sq: 'Lajmet e Mbrëmjes', en: 'Evening News' } },
    { time: '22:30', title: { sq: 'Opinion Live', en: 'Opinion Live' } }
  ]
};

function getLocale(lang) {
  return lang === 'en' ? en : sq;
}

function resolveLang(lang) {
  return lang === 'en' ? 'en' : 'sq';
}

module.exports = { getLocale, resolveLang, live, supportedLangs: ['sq', 'en'] };
