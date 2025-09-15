# Portfolio

Modernized static portfolio for Mohamed Ebrahem (Junior Odoo Developer).

## What's New
- Improved SEO meta, Open Graph, and Twitter cards
- Clean, accessible navbar with sticky behavior and smooth scroll
- Dynamic projects loaded from `projects.json`
- Back-to-top UX, intersection-based animations
- Light/Dark theme toggle with persistence

## Structure
- `index.html`: Main site markup
- `styles.css`: Site styles, responsive and theme variables
- `script.js`: Interactions (menu, smooth scroll, active nav, theme, dynamic projects)
- `projects.json`: Project data source
- `real_estate/`, `todo/`, `gym/`, `hospital/`: Demo modules

## Editing Projects
Edit `projects.json` to add, remove, or change projects. Fields:
```json
{
  "title": "Project Title",
  "description": "Short description",
  "image": "relative/path.png",
  "github": "https://... (optional)",
  "link": "relative/page.html (optional)"
}
```

## Run Locally
Use any static server or open `index.html` directly. For fetch of `projects.json`, prefer a local server:
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`.

## Customize
- Update name/logo text in `index.html`
- Adjust colors in CSS variables (`.theme-dark` / `.theme-light`)
- Tweak skills section percentages in `index.html`