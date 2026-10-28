# 4488888.com — Phase-wise Build Prompts

Use these prompts in order with any capable AI coding assistant. Each phase is self-contained. Global constraints apply to every phase.

## Global constraints (paste at the top of every phase)

```
Project: 4488888.com — "Lucky Numbers Lab". Static site (HTML/CSS/vanilla JS + Jekyll layout) hosted free on GitHub Pages, repo WEBWORKSA1/4488888-com.
- Put this exact AdSense code in <head> of every page:
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>
- ads.txt at root: google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0
- On top of every page, a bar: "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership" linking to https://web.works/contact
- All forms and email links route to ONE private inbox. The address must never appear in HTML, visible text, or as a plain string in JS; assemble it at runtime from an encoded array and post via a form relay (FormSubmit AJAX).
- No lottery/gambling predictions. Educational framing. Original text only. No trademark use of "4488888"; include a trademark/copyright disclosure page.
- Mobile-first, accessible (labels, focus states, no zoom lock), light/dark theme, fast (no frameworks).
```

## Phase 1 — Foundation & design system
```
Create _config.yml (baseurl-aware), _layouts/default.html and assets/css/style.css.
Layout: top contact bar, sticky nav (Analyzer, Calculators, Meanings, Markets, Guides, Videos, Support, gold "Free Valuation" CTA), theme toggle, mobile burger, pre-footer valuation CTA, 5-column footer with newsletter form, cookie notice, legal links, trademark line.
Design: dark luxe (#0b0b0d) with gold (#e9b949) and jade accents; Fraunces headlines, Manrope body, JetBrains Mono for digits. Light theme via [data-theme]. Components: cards, tool-card, tabs, tables, score ring, bars, digit chips, multi-step form, tiers, video facade, ticker, FAQ details.
```

## Phase 2 — Number engine (the moat)
```
Write assets/js/main.js with a deterministic multi-culture scoring engine:
- Chinese prosperity (38%): per-digit homophone weights (8 +3, 6 +2, 9 +2, 4 −3…), phrase combos (168, 518, 520, 1314, 666, 888, 28, 18; negatives 14, 24, 74, 54, 44, 49, 250), de-duplicate overlapping 8-runs, ending bonus/penalty, 1314 exempts its 4.
- Pattern & recall (34%): unique-digit ratio, longest run, sequences, palindrome, mirrored halves, length.
- Numerology root (16%): Pythagorean reduction keeping 11/22/33; Vedic planet mapping.
- Japanese (12%): 4 and 9 negative, 7 and 8 positive, 49 penalty.
Output 0–100 + tier (S/A/B/C/D), digit-by-digit colouring, combos list, context advice (phone/domain/plate/address/price/date), "Get expert valuation" deep link (?n=), shareable link, compare-two-numbers table.
```

## Phase 3 — Tools pages
```
analyzer.html: analyzer form (autorun from ?n=), quick-try chips, compare tool, "how the score works" explainer + tier table.
numerology.html: tabbed tools with hash deep links — Life Path, Name number (Pythagorean + Chaldean + soul urge/personality), Personal Year, Phone Checker, Auspicious Date Finder (ranks next 30–365 days by root/8/4 and occasion), Compatibility, Lucky Number Generator. Each result shows its method.
meanings.html: filterable 0–9 table (Chinese, Japanese, Vedic, Western), combo cards, 4488888 case study.
markets.html: filterable record-sales table with sources, price-driver cards, marketplace categories, scam warning.
```

## Phase 4 — Lead generation (highest revenue per visitor)
```
valuation.html: 3-step form (intent: sell / value / find / broker → asset type → number, market, budget, timeline, ownership, notes → name, email, WhatsApp/WeChat, consent, newsletter opt-in), progress bar, 4 stat cards, how-it-works, FAQ. Prefill number from ?n=.
Add a quick-valuation form on the home page and a valuation CTA in every footer and analyzer result.
```

## Phase 5 — Community & funding
```
support.html: 4 tiers ($8 / $28 monthly / $168 / $888), amount picker, frequency, purpose (operations, research, promotion/marketing, hiring, contests), payment preference, supporter credit; allocation table; non-deductible note.
contests.html: monthly 8th-Day contest (judged 8th, 08:08 UTC, live countdown), 3 skill categories, prizes, rules (no purchase necessary, 18+, void where prohibited, skill-judged), entry form.
careers.html: filterable roles (writer, translators ZH/HI/AR, researcher, data analyst, front-end dev, SEO, broker, video creator) + application form.
advertise.html: sponsorship tiers (newsletter, tool sponsor, contest sponsor, partnership), audience, inquiry form incl. "acquire this website/domain".
```

## Phase 6 — Content for AdSense approval
```
Write 6+ original, sourced guides (700–1,000 words each) under /guides/ with TOC, internal links to tools, and source lines: why 8 is lucky; tetraphobia; numerology basics (Pythagorean/Chaldean/Vedic, Lo Shu); numeric domains; vanity phone numbers; licence plate auctions. Guides index with search filter.
videos.html: verified YouTube IDs as click-to-load facades (youtube-nocookie), search filter.
About, Contact (form + hidden-address mailto button), Privacy (AdSense cookie disclosure, opt-out links, CMP note), Terms (contests, contributions), Disclaimer (no gambling, independence), Cookies, Trademark & Copyright, 404.
```

## Phase 7 — SEO, compliance, deploy
```
Add canonical, OG/Twitter tags, WebSite + FAQPage JSON-LD, sitemap.xml, robots.txt (allow Mediapartners-Google), web manifest, favicon/OG SVG.
Audit: address never present in any file; AdSense script on every page; every form has honeypot + consent; no broken internal links.
Push to WEBWORKSA1/4488888-com (main). Enable GitHub Pages (main, root). Point 4488888.com DNS to GitHub Pages, add CNAME, set baseurl "" — then apply to AdSense and enable Google's certified CMP for EEA/UK.
```

## Phase 8 — Growth (post-approval)
```
Programmatic pages for numbers 0–999 and famous combos; Chinese/Hindi/Arabic translations; weekly "notable sales" post; newsletter; affiliate links to marketplaces; paid PDF number reports; optional LLM-written narrative on top of the deterministic score.
```
