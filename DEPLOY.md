# Deploy — Aurora Lumina

## Netlify (review statik — rekomandohet)

1. Ngarko projektin në GitHub
2. Hap [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Zgjidh repozitorin
4. Netlify lexon automatikisht `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `public`
5. Kliko **Deploy**

Pa MongoDB. Lajmet vijnë nga `public/data/*.json`.

---

## Render (backend i plotë + newsletter)

1. Ngarko projektin në GitHub
2. Hap [render.com](https://render.com) → **New Web Service**
3. Lidh repozitorin
4. Render përdor `render.yaml` automatikisht, ose vendos:
   - **Build:** `npm install && npm run build`
   - **Start:** `npm start`
5. Deploy

---

## Lokal

```bash
npm run dev
```

Hap: http://localhost:12345

---

## Ndrysho lajmet

Edito `data/content.js`, pastaj:

```bash
npm run build
```

Netlify ri-deploy automatik pas push në GitHub.
