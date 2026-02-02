# Sports Arena

A lightweight sports portal demo: gorgeous landing page, live games section with filters, and a personalized feed that prioritizes your favorite sports. Includes a Records & Milestones gallery. Uses static HTML/CSS/JS with dummy data.

## Run Locally

- Option 1: VS Code Live Server
  1. Open this folder in VS Code.
  2. Install the "Live Server" extension.
  3. Right-click `index.html` → Open with Live Server.

- Option 2: Python

```powershell
cd "C:\Users\jaanki\OneDrive - Microsoft\Documents\vibe"
py -m http.server 5500
# or: python -m http.server 5500
```
Open http://localhost:5500/index.html

- Option 3: Node

```powershell
cd "C:\Users\jaanki\OneDrive - Microsoft\Documents\vibe"
npx http-server -p 5500
# or: npx serve -l 5500 .
```
Open http://localhost:5500/index.html

## Features
- Hero section with large stadium imagery and CTA.
- Live games grid with filter chips by sport.
- First-time interest selection modal; stored in localStorage to prioritize your sports.
- Records & Milestones gallery with big visuals.
 - Game Center page with per-game details (open a card):
   - Cricket: Scorecard, Commentary, Partnerships, Playing XI
  - Other sports: Overview, Lineups
- Responsive, accessible UI with ARIA and semantic structure.

## Structure
- `index.html` — Landing page and sections.
- `game.html` — Game Center detail page (query param `?game=<id>`).
- `assets/styles.css` — Styles and layout.
- `assets/data.js` — Dummy data: `SPORTS`, `LIVE_GAMES`, `RECORDS`.
- `assets/app.js` — Rendering, filtering, personalization, card navigation.
- `assets/game.js` — Game Center rendering logic.

## Notes
- Images use Unsplash URLs; replace with your own assets for production.
- All data is static. Hook up real APIs for live feeds.

## Deploy / Share

This is a static site (HTML/CSS/JS). You can host it easily:

### GitHub Pages (fast + free)
1. Create a new GitHub repo and push this folder.
2. In the repo Settings → Pages → Build and deployment: Source = `Deploy from a branch`; Branch = `main` (root).
3. Your site will be available at `https://<your-user>.github.io/<repo>/`.

Quick commands:

```powershell
git init
git add -A
git commit -m "Initial publish"
git branch -M main
git remote add origin https://github.com/<your-user>/<repo>.git
git push -u origin main
```

### Vercel (CI deploys, preview links)
1. Install CLI and deploy:

```powershell
npx vercel
# or: vercel deploy --prod
```
2. Accept defaults (project root is the current folder). Vercel gives you a shareable URL.

### Netlify (drag‑and‑drop or CLI)
1. Drag the folder onto Netlify’s dashboard, or use CLI:

```powershell
npm i -g netlify-cli
netlify deploy --prod --dir .
```

### Azure Static Web Apps (enterprise + auth)
1. In Azure Portal, create "Static Web App" → source `GitHub`, app folder `.`.
2. Azure sets up a GitHub Action; pushes to `main` auto-deploy to a global URL.

### S3 + CloudFront (custom domains)
1. Enable static website hosting on an S3 bucket and upload files.
2. Front with CloudFront for HTTPS + CDN.

Tips:
- Ensure the start file is `index.html` and links are relative.
- For `game.html` deep links, hosts that support SPA routing aren’t required here (multi‑page works). If needed, configure a 404 redirect to `index.html`.
