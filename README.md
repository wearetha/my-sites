# my-sites

A collection of 10 standalone, deployable one-page websites for small businesses in Horwich, Bolton (BL6).

## Structure

Each site lives in its own completely standalone folder under `sites/site-{N}/`. Every folder contains everything needed to deploy — just upload the folder contents to any static host (Vercel, Netlify, GitHub Pages, etc.).

| Folder | Business | Service | Phone | Domain |
|--------|----------|---------|-------|--------|
| `sites/site-1/` | Mucky Maids | Domestic Cleaning | 07526 233922 | TBC |
| `sites/site-2/` | Polish and Press | Home Cleaning & Ironing | 07708 211364 | TBC |
| `sites/site-3/` | Waggy Walkers Horwich | Dog Walking | 07732 864397 | TBC |
| `sites/site-4/` | Kingdom Kare Pet Services | Pet Services | 07785 375369 | TBC |
| `sites/site-5/` | SM Garden Maintenance | Gardening | 07305 108189 | TBC |
| `sites/site-6/` | Harrison Barnes Garden Maintenance | Gardening & Landscaping | 07901 500807 | TBC |
| `sites/site-7/` | Green Team Grounds Maintenance | Grounds Maintenance | 07895 052342 | TBC |
| `sites/site-8/` | Decreased Ironing Services | Ironing | 07989 787811 | TBC |
| `sites/site-9/` | Smartie Pants Ironing | Ironing | 07974 157618 | TBC |
| `sites/site-10/` | Pooches & Purrs | Dog Walking & Pet Care | 07498 322749 | TBC |

## Files Per Site

Each `site-N/` folder contains:

- `index.html` — Complete one-page website with full SEO (title, meta description, keywords, OG tags, Twitter cards, canonical, favicon)
- `styles.css` — All styles with unique colour palette, responsive breakpoints, and `prefers-reduced-motion` support
- `main.js` — GSAP + ScrollTrigger + Lenis animations, magnetic buttons, custom cursor, form handling, mobile menu
- `robots.txt` — Search engine crawler rules

## SEO Checklist Per Site

- [x] Unique `<title>` with location keywords
- [x] Meta description (150–160 chars)
- [x] Meta keywords
- [x] Open Graph tags (title, description, type, url, image, locale)
- [x] Twitter Card tags
- [x] Canonical URL
- [x] Favicon (inline SVG)
- [x] Semantic HTML5 structure
- [x] `robots.txt`

## Deployment

1. Replace `https://REPLACE-ME.com` in each `index.html` and `robots.txt` with the actual domain
2. Replace `YOUR_ENDPOINT` in each contact form with your Formspree endpoint
3. Upload the contents of any `sites/site-N/` folder to your static host
4. No build step required — pure HTML, CSS, and JS

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JavaScript
- [GSAP](https://greensock.com/gsap/) + ScrollTrigger for scroll animations
- [Lenis](https://lenis.studiofreight.com/) for smooth scrolling
- [Formspree](https://formspree.io/) for form handling (replace `YOUR_ENDPOINT`)
- [Unsplash](https://unsplash.com/) for placeholder imagery

## Security

- No API keys or secrets committed
- Form endpoints use placeholder values — must be configured before deployment
- No dynamic content that requires escaping
- All external links use `rel="noopener"` for security

## Accessibility

- `prefers-reduced-motion` media query supported
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- `aria-label` and `aria-hidden` attributes where appropriate
- Skip-to-content link
- No-JS fallbacks — all content is visible without JavaScript
