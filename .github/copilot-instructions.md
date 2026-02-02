# Copilot Instructions for Sports Arena

These instructions guide AI coding agents working on this static web project.

## Architecture & Data Flow
- Static site: `index.html` + `assets/styles.css`, `assets/app.js`, `assets/data.js`.
- `data.js` exports `SPORTS`, `LIVE_GAMES`, `RECORDS` arrays of dummy objects.
- `app.js` is the only script that:
  - Reads user interests from `localStorage` (key: `sportsArena.interests.v1`).
  - Builds filter chips from available sports.
  - Sorts games: live first, then by user interests, then by sport name.
  - Renders Live Games and Records sections into DOM containers.
  - Shows a modal dialog for first-time interest selection.

## Conventions
- Keep vanilla JS, no frameworks. Prefer semantic DOM APIs over libraries.
- Styling is in a single `assets/styles.css` file. Use existing tokens (CSS variables) and classes; avoid utility frameworks.
- Images are remote Unsplash URLs for placeholders. Replace via `image` fields in `data.js`.
- Accessibility: maintain roles/ARIA for filters (`role=tab`, `aria-selected`) and modal (`<dialog>`).

## Key Files
- `index.html`: Structure, sections, and dialog markup.
- `assets/app.js`: Rendering, filtering, interests modal, and sorting logic.
- `assets/data.js`: Seed data. Update here to change sports/games/records.
- `assets/styles.css`: Colors, layout, and component styles (chips, cards, modal).

## Developer Workflows
- Run locally with any static file server:
  - VS Code Live Server (recommended) or `py -m http.server 5500` or `npx http-server -p 5500`.
- No build step required. Keep ES modules in `assets/` and relative imports.
- When adding new sections, follow pattern: container in HTML → renderer in `app.js` → data in `data.js` → styles in `styles.css`.

## Patterns & Examples
- Filtering: see `renderFilters()` and `sortGames()` in `assets/app.js`.
- Personalization: `getInterests()`/`setInterests()` read/write JSON array to localStorage key `sportsArena.interests.v1`.
- Rendering cards: use small helpers (`el(tag, cls, text)`) and grid classes (`cards-grid`, `records-grid`).

## Integrations / Extensibility
- Real-time data: replace `LIVE_GAMES` with API calls, then re-render on interval.
- Persistence: keep using localStorage for lightweight preferences; add backend only if needed.
- Routing: current site is single-page. If adding routes, ensure links stay relative and server supports SPA fallback (not needed now).

## Testing & Quality
- Manual test flows:
  - First visit triggers interests modal; saving updates sort order.
  - Filter chips change the visible set; “All” resets.
  - Live games appear before upcoming; interest sports prioritized.
- Lint/format: not configured; keep consistent styles; avoid large refactors.

## Guardrails
- Don’t introduce heavy frameworks or bundlers unless explicitly requested.
- Preserve existing CSS variables and class naming.
- Avoid storing PII; only localStorage preferences are used.
