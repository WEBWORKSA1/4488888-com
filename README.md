# 4488888.com — Lucky Numbers Lab

Static Jekyll site for GitHub Pages (free plan). Multi-culture lucky-number analyzer, numerology calculators, premium-number market data, valuation lead desk, donations, contests, careers and sponsorships. AdSense publisher `ca-pub-6620975821265271` (Auto ads).

## Structure
- `_layouts/default.html` — shared head (AdSense), contact bar, nav, footer, cookie notice
- `assets/css/style.css`, `assets/js/main.js` (scoring engine, calculators, forms)
- Pages: index, analyzer, numerology, meanings, markets, valuation, videos, support, contests, careers, advertise, about, contact, privacy, terms, disclaimer, cookies, trademark, 404, guides/*
- `ads.txt`, `robots.txt`, `sitemap.xml`, `site.webmanifest`
- `RESEARCH.md` (research + idea), `BUILD-PROMPTS.md` (phase-wise prompts)

## Forms
All forms post to a FormSubmit AJAX endpoint whose address is assembled at runtime; it never appears in the source as plain text. **First submission triggers a one-time FormSubmit activation email — click it once.**

## Going live on 4488888.com
1. Settings → Pages → Source: *Deploy from a branch*, `main` / `(root)` (if not already live).
2. DNS at registrar: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `webworksa1.github.io`.
3. Settings → Pages → Custom domain: `4488888.com`, enable *Enforce HTTPS*.
4. In `_config.yml` set `baseurl: ""` and `url: "https://4488888.com"`.
5. AdSense: add site 4488888.com, verify `ads.txt`, enable Auto ads and the Google-certified CMP (Privacy & messaging) for EEA/UK.
