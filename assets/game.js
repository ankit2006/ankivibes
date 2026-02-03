import { GAME_DETAILS, LIVE_GAMES } from './data.js';

// Curated sport backgrounds (match app.js for consistency)
const SPORT_BG = {
  All: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000&auto=format&fit=crop',
  Soccer: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=2000&auto=format&fit=crop',
  Basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2000&auto=format&fit=crop',
  Cricket: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop',
  Tennis: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2000&auto=format&fit=crop',
  'American Football': 'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?q=80&w=2000&auto=format&fit=crop',
  Hockey: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop',
  Baseball: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop',
  Rugby: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2000&auto=format&fit=crop',
  F1: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop',
};

function qs(name) {
  const m = new URLSearchParams(window.location.search).get(name);
  return m || '';
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

// Theme utilities (duplicated minimal set for game page)
const THEME_KEY = 'sportsArena.theme.v1';
function getTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === 'light' || t === 'dark') return t;
  } catch {}
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}
function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    const isDark = theme === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    const icon = btn.querySelector('.icon');
    const label = btn.querySelector('.label');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }
}
function setTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch {}
  applyTheme(theme);
}

function avatarUrl(name, size = 64) {
  const clean = (name || '').replace(/\s*\((C|WK)\)/g, '').trim();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(clean)}&background=1a2130&color=e6e9ef&size=${size}&bold=true`;
}

// Team badge colors (expand as needed)
const TEAM_COLORS = {
  Mumbai: { bg: '#0a5dc4', fg: '#ffffff' },
  Chennai: { bg: '#f9d208', fg: '#5a3c00' },
};

function teamInitials(team) {
  const parts = (team || '').split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function createTeamBadge(team, size = 'md') {
  const span = document.createElement('span');
  span.className = 'badge-team' + (size === 'sm' ? ' sm' : '');
  const { bg, fg } = TEAM_COLORS[team] || { bg: '#2a3346', fg: '#e6e9ef' };
  span.style.setProperty('--badge-bg', bg);
  span.style.setProperty('--badge-fg', fg);
  span.textContent = teamInitials(team);
  span.title = team;
  return span;
}

function teamLogoDataUrl(team, size = 96) {
  const initials = teamInitials(team);
  const { bg, fg } = TEAM_COLORS[team] || { bg: '#2a3346', fg: '#e6e9ef' };
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 100 100'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${bg}' stop-opacity='1'/>
      <stop offset='100%' stop-color='${bg}' stop-opacity='0.85'/>
    </linearGradient>
  </defs>
  <circle cx='50' cy='50' r='48' fill='url(#g)' stroke='${fg}' stroke-opacity='0.15' stroke-width='2'/>
  <text x='50' y='56' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='42' font-weight='800' fill='${fg}'>${initials}</text>
</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function teamLogoUrl(gameId, team) {
  const map = GAME_DETAILS[gameId]?.teamLogos || {};
  return map[team] || '';
}

function createTeamLogoImg(gameId, team, size = 36) {
  const img = document.createElement('img');
  img.className = 'team-logo';
  img.alt = `${team} logo`;
  const explicitLogo = teamLogoUrl(gameId, team);
  img.src = explicitLogo || teamLogoDataUrl(team, size * 2);
  img.width = size;
  img.height = size;
  return img;
}

function slug(text) {
  return (text || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

function findGame(id) {
  return LIVE_GAMES.find(g => g.id === id);
}

function heroImageForSport(sport, fallback) {
  if (SPORT_BG[sport]) return SPORT_BG[sport];
  return fallback || SPORT_BG.All;
}

function renderTabs(container, sport) {
  container.innerHTML = '';
  const tabs = [];
  if (sport === 'Cricket') {
    tabs.push('Captains', 'Scorecard', 'Commentary', 'Videos', 'Worm', 'Run Rate', 'Partnerships', 'Playing XI', 'Info');
  } else if (sport === 'Soccer') {
    tabs.push('Overview', 'Stats', 'Commentary', 'Lineups', 'Videos', 'Info');
  } else {
    tabs.push('Overview', 'Lineups');
  }
  tabs.forEach((t, i) => {
    const chip = el('button', 'filter-chip');
    chip.type = 'button';
    chip.setAttribute('role', 'tab');
    chip.dataset.tab = t;
    chip.dataset.target = slug(t);
    chip.setAttribute('aria-selected', String(i === 0));
    chip.textContent = t;
    container.appendChild(chip);
  });
}

function setSelectedTab(container, name) {
  container.querySelectorAll('.filter-chip').forEach(c => {
    c.setAttribute('aria-selected', c.dataset.tab === name ? 'true' : 'false');
  });
}

function renderInningsScorecard(block, id, inn) {
  block.innerHTML = '';
  block.appendChild(el('h3', null, `${inn.team} — ${inn.runs}/${inn.wickets} (${inn.overs} ov)`));

  // Batting table
  const batTable = document.createElement('table');
  batTable.className = 'gc-table';
  batTable.innerHTML = `
    <thead>
      <tr><th>Batter</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr>
    </thead>
    <tbody></tbody>
  `;
  const tb = batTable.querySelector('tbody');
  inn.batting.forEach(p => {
    const tr = document.createElement('tr');
    const tdPlayer = document.createElement('td');
    tdPlayer.style.position = 'relative';
    const wrap = el('div', 'player');
    const img = document.createElement('img');
    img.className = 'avatar';
    img.alt = `${p.name} avatar`;
    img.src = playerImageUrl(id, p.name, 64);
    const meta = el('div', 'player-meta');
    const nameRow = el('div', 'player-name-row');
    const nameEl = document.createElement('strong');
    nameEl.textContent = p.name;
    const wagon = createWagonIcon(id, p);
    nameRow.appendChild(nameEl);
    nameRow.appendChild(wagon);
    meta.appendChild(nameRow);
    meta.appendChild(el('div', 'gc-subtle', p.dismissal));
    wrap.appendChild(img);
    wrap.appendChild(meta);
    tdPlayer.appendChild(wrap);

    tr.appendChild(tdPlayer);
    tr.appendChild(el('td', null, String(p.runs)));
    tr.appendChild(el('td', null, String(p.balls)));
    tr.appendChild(el('td', null, String(p.fours)));
    tr.appendChild(el('td', null, String(p.sixes)));
    tr.appendChild(el('td', null, fmt2(p.sr)));
    tb.appendChild(tr);
  });
  // Extras + Total
  const extrasTotal = document.createElement('tr');
  const ext = inn.extras || { b:0, lb:0, w:0, nb:0, p:0 };
  const extText = `b ${ext.b}, lb ${ext.lb}, w ${ext.w}, nb ${ext.nb}, p ${ext.p}`;
  extrasTotal.innerHTML = `<td><strong>Extras</strong><div class="gc-subtle">${extText}</div></td><td colspan="5">${(ext.b+ext.lb+ext.w+ext.nb+ext.p)}</td>`;
  tb.appendChild(extrasTotal);
  const totalTr = document.createElement('tr');
  totalTr.innerHTML = `<td><strong>Total</strong><div class="gc-subtle">${inn.wickets} wickets, ${inn.overs} overs</div></td><td colspan="5">${inn.runs}</td>`;
  tb.appendChild(totalTr);
  if (inn.didNotBat?.length) {
    const dnb = document.createElement('tr');
    dnb.innerHTML = `<td colspan="6" class="gc-subtle">Did not bat: ${inn.didNotBat.join(', ')}</td>`;
    tb.appendChild(dnb);
  }
  block.appendChild(batTable);

  // Fall of wickets
  if (inn.fallOfWickets?.length) {
    const fow = el('div');
    fow.appendChild(el('h4', null, 'Fall of wickets'));
    fow.appendChild(el('p', 'muted', inn.fallOfWickets.map(x => `${x.score} (${x.player}, ${x.over} ov)`).join('; ')));
    block.appendChild(fow);
  }

  // Bowling table
  if (inn.bowling?.length) {
    const bowlTable = document.createElement('table');
    bowlTable.className = 'gc-table';
    bowlTable.innerHTML = `
      <thead>
        <tr><th>Bowler</th><th>O</th><th>M</th><th>R</th><th>W</th><th>Econ</th></tr>
      </thead>
      <tbody></tbody>
    `;
    const bt = bowlTable.querySelector('tbody');
    inn.bowling.forEach(b => {
      const tr = document.createElement('tr');
      const econ = fmt2(b.econ);
      tr.innerHTML = `
        <td>${b.name}</td>
        <td>${b.overs}</td>
        <td>${b.maidens}</td>
        <td>${b.runs}</td>
        <td>${b.wickets}</td>
        <td>${econ}</td>
      `;
      bt.appendChild(tr);
    });
    block.appendChild(bowlTable);
  }
}

function createWagonIcon(gameId, player) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wagon-icon';
  btn.title = 'Show wagon wheel';
  btn.setAttribute('aria-label', `Wagon wheel for ${player.name}`);
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>`;

  let tip;
  const show = () => {
    if (tip) return;
    tip = buildWagonTooltip(gameId, player);
    // attach to nearest td (positioned)
    const td = btn.closest('td');
    if (!td) return;
    td.appendChild(tip);
  };
  const hide = () => {
    if (!tip) return;
    try { tip.remove(); } catch {}
    tip = null;
  };
  btn.addEventListener('mouseenter', show);
  btn.addEventListener('focus', show);
  btn.addEventListener('mouseleave', hide);
  btn.addEventListener('blur', hide);
  return btn;
}

function getWagonSplits(gameId, playerName, runs) {
  const clean = cleanName(playerName);
  const map = GAME_DETAILS[gameId]?.wagonSplits || {};
  const arr = map[clean];
  if (Array.isArray(arr) && arr.length === 8) return arr;
  // Fallback: even-ish distribution across 8 slices
  const base = Math.floor((runs || 0) / 8);
  const rem = (runs || 0) % 8;
  const out = new Array(8).fill(base);
  for (let i = 0; i < rem; i++) out[i] += 1;
  return out;
}

function buildWagonTooltip(gameId, player) {
  const tip = el('div', 'wagon-tooltip');
  const name = cleanName(player.name);
  const title = el('div', 'wagon-title', name);
  const sub = el('div', 'gc-subtle', `Fours: ${player.fours} • Sixes: ${player.sixes}`);

  // Left: segmented wheel
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'wagon-svg');
  svg.setAttribute('viewBox', '0 0 100 100');

  // Yellow base like screenshot
  const base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  base.setAttribute('cx', '50'); base.setAttribute('cy', '50'); base.setAttribute('r', '46');
  base.setAttribute('fill', '#fde047'); // amber-300
  base.setAttribute('stroke', '#e5e7eb'); base.setAttribute('stroke-width', '1');
  svg.appendChild(base);

  // White slice dividers at 0/45/90/... degrees
  const addLine = (angDeg) => {
    const ang = (angDeg - 90) * Math.PI / 180; // start at top
    const x2 = 50 + 46 * Math.cos(ang);
    const y2 = 50 + 46 * Math.sin(ang);
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', '50'); l.setAttribute('y1', '50'); l.setAttribute('x2', String(x2)); l.setAttribute('y2', String(y2));
    l.setAttribute('stroke', '#ffffff'); l.setAttribute('stroke-width', '1'); l.setAttribute('stroke-opacity', '0.9');
    svg.appendChild(l);
  };
  [0,45,90,135,180,225,270,315].forEach(addLine);

  // Pitch rectangle in center
  const pitch = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  pitch.setAttribute('x', '44'); pitch.setAttribute('y', '34'); pitch.setAttribute('width', '12'); pitch.setAttribute('height', '32');
  pitch.setAttribute('rx', '2'); pitch.setAttribute('fill', '#a3e635'); // lime-400
  pitch.setAttribute('stroke', '#86efac');
  svg.appendChild(pitch);

  // Slice run numbers
  const splits = getWagonSplits(gameId, name, player.runs || 0);
  for (let i = 0; i < 8; i++) {
    const start = i * 45;
    const mid = (start + 22.5 - 90) * Math.PI / 180; // mid-angle, rotated
    const r = 32; // radius for text placement
    const tx = 50 + r * Math.cos(mid);
    const ty = 50 + r * Math.sin(mid);
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', String(tx));
    t.setAttribute('y', String(ty));
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'middle');
    t.setAttribute('font-size', '8');
    t.setAttribute('font-weight', '800');
    t.setAttribute('fill', '#1f2937');
    t.textContent = String(splits[i] || 0);
    svg.appendChild(t);
  }

  // Right side info
  const side = el('div', 'wagon-side');
  const total = el('div', null, `${player.runs} total runs`);
  total.style.fontWeight = '800';
  total.style.fontSize = '18px';
  const labels = el('div', 'gc-subtle', 'Off-side • Leg-side');
  const badges = el('div', 'wagon-badges');
  const b4 = el('span', 'wagon-badge blue', String(player.fours || 0));
  const b6 = el('span', 'wagon-badge red', String(player.sixes || 0));
  badges.appendChild(b4); badges.appendChild(b6);
  side.appendChild(total);
  side.appendChild(labels);
  side.appendChild(badges);

  // Compose
  tip.appendChild(title);
  tip.appendChild(sub);
  tip.appendChild(svg);
  tip.appendChild(side);
  return tip;
}

function renderScorecard(root, id) {
  const d = GAME_DETAILS[id];
    // Theme toggle wiring
    applyTheme(getTheme());
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const next = (document.documentElement.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
        setTheme(next);
      });
    }
  const inns = d?.innings || [];
  if (!inns.length) return root.appendChild(el('div', 'muted', 'No scorecard available.'));

  // Subtabs for innings
  const tabs = el('div', 'filters subtabs');
  tabs.setAttribute('role', 'tablist');
  const content = el('div');
  root.appendChild(tabs);
  root.appendChild(content);

  function setSelectedSubtab(name) {
    tabs.querySelectorAll('.filter-chip').forEach(chip => {
      chip.setAttribute('aria-selected', chip.dataset.innings === name ? 'true' : 'false');
    });
  }

  function showInn(name) {
    const inn = inns.find(i => i.team === name) || inns[0];
    content.innerHTML = '';
    const block = el('div');
    renderInningsScorecard(block, id, inn);
    content.appendChild(block);
  }

  inns.forEach((inn, i) => {
    const chip = el('button', 'filter-chip');
    chip.type = 'button';
    chip.setAttribute('role', 'tab');
    chip.dataset.innings = inn.team;
    chip.setAttribute('aria-selected', String(i === 0));
    chip.textContent = inn.team;
    tabs.appendChild(chip);
  });

  setSelectedSubtab(inns[0].team);
  showInn(inns[0].team);

  tabs.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    const name = chip.dataset.innings;
    setSelectedSubtab(name);
    showInn(name);
  });
}

function renderCommentary(root, id) {
  const d = GAME_DETAILS[id];
  const overs = d?.commentaryOvers || [];
  if (overs.length) {
    const wrap = el('div', 'comm');
    overs.forEach(ov => {
      const overEl = el('div', 'comm-over');

      // Header
      const head = el('div', 'comm-head');
      const title = el('div', 'comm-title');
      title.appendChild(el('strong', null, `${ov.summary}`));
      const sub = el('div', 'gc-subtle', `${ov.totalRuns} Runs · ${ov.symbols.join(' ')}`);
      title.appendChild(sub);

      const meta = el('div', 'comm-meta');
      meta.appendChild(el('span', null, `${ov.striker?.name || ''} ${ov.striker?.summary || ''}`));
      const sep = el('span', 'gc-subtle', ' vs ');
      meta.appendChild(sep);
      meta.appendChild(el('span', null, `${ov.bowler?.name || ''} ${ov.bowler?.summary || ''}`));

      head.appendChild(title);
      head.appendChild(meta);
      overEl.appendChild(head);

      // Highlights
      if (ov.highlights?.length) {
        ov.highlights.forEach(h => {
          const card = el('div', `comm-card ${h.color === 'blue' ? 'comm-card-blue' : 'comm-card-dark'}`);
          const left = el('div', 'comm-card-text');
          left.appendChild(el('div', 'comm-card-title', h.title));
          if (h.subtitle) left.appendChild(el('div', 'gc-subtle', h.subtitle));
          card.appendChild(left);
          const avatar = document.createElement('img');
          avatar.className = 'avatar-lg';
          avatar.alt = `${h.player || ''} avatar`;
          avatar.src = playerImageUrl(id, h.player || '', 96);
          card.appendChild(avatar);
          overEl.appendChild(card);
        });
      }

      // Balls
      if (ov.balls?.length) {
        ov.balls.forEach(b => {
          const row = el('div', 'comm-ball');
          const badge = el('span', 'comm-badge');
          const sym = (b.symbol || '').toUpperCase();
          badge.textContent = sym;
          if (sym === 'W') badge.classList.add('w');
          else if (sym === '6') badge.classList.add('s6');
          else if (sym === '4') badge.classList.add('s4');
          else if (sym === '•' || sym === 'DOT') badge.classList.add('dot');
          row.appendChild(badge);
          const text = el('div', 'comm-text');
          text.appendChild(el('span', 'comm-ballnum', b.ball));
          text.appendChild(el('span', null, `: ${b.text}`));
          row.appendChild(text);
          overEl.appendChild(row);
        });
      }

      if (ov.footer) {
        const note = el('div', 'comm-note muted', ov.footer);
        overEl.appendChild(note);
      }

      wrap.appendChild(overEl);
    });
    root.appendChild(wrap);
    return;
  }
  // Fallback: simple list
  const list = d?.commentary || [];
  if (!list.length) return root.appendChild(el('div', 'muted', 'No commentary yet.'));
  const box = el('div');
  list.forEach(line => box.appendChild(el('p', null, line)));
  root.appendChild(box);
}

function renderPartnerships(root, id) {
  const d = GAME_DETAILS[id];
  const list = d?.partnerships || [];
  if (!list.length) return root.appendChild(el('div', 'muted', 'No partnership data.'));

  // Determine innings order from detailed innings if available, else from partnerships list
  const inningsOrder = (d?.innings || []).map(i => i.team);
  const teams = inningsOrder.length ? inningsOrder : Array.from(new Set(list.map(p => p.team)));

  // Build sub-tab pills for innings
  const tabs = el('div', 'filters subtabs');
  tabs.setAttribute('role', 'tablist');
  const content = el('div');
  root.appendChild(tabs);
  root.appendChild(content);

  function setSelectedSubtab(name) {
    tabs.querySelectorAll('.filter-chip').forEach(chip => {
      chip.setAttribute('aria-selected', chip.dataset.team === name ? 'true' : 'false');
    });
  }

  function renderTableForTeam(teamName) {
    content.innerHTML = '';
    const items = list.filter(p => p.team === teamName);
    if (!items.length) {
      content.appendChild(el('div', 'muted', 'No partnerships recorded for this innings.'));
      return;
    }
    const maxRunsLocal = Math.max(...items.map(p => p.runs));
    const table = document.createElement('table');
    table.className = 'gc-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Partnership</th>
          <th>Runs</th>
          <th>Balls</th>
          <th>RR</th>
          <th>Overs</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tb = table.querySelector('tbody');
    items.forEach(p => {
      const tr = document.createElement('tr');
      const pair = el('td');
      const title = el('div');
      title.appendChild(el('strong', null, p.players.join(' + ')));
      const sub = el('div', 'gc-subtle', `${p.runs} runs in ${p.balls} balls`);
      pair.appendChild(title);
      pair.appendChild(sub);

      const runs = document.createElement('td');
      runs.textContent = String(p.runs);
      const bar = document.createElement('div');
      bar.className = 'stat-bar';
      const fill = document.createElement('span');
      const pct = Math.max(6, Math.round((p.runs / (maxRunsLocal || 1)) * 100));
      fill.style.width = pct + '%';
      bar.appendChild(fill);
      runs.appendChild(bar);

      const balls = el('td', null, String(p.balls));
      const rr = p.balls ? (p.runs * 6) / p.balls : 0;
      const rrTd = el('td', null, rr.toFixed(1));
      const oversTd = el('td', null, (p.balls / 6).toFixed(1));

      tr.appendChild(pair);
      tr.appendChild(runs);
      tr.appendChild(balls);
      tr.appendChild(rrTd);
      tr.appendChild(oversTd);
      tb.appendChild(tr);
    });
    content.appendChild(table);
  }

  // Create pills
  teams.forEach((team, i) => {
    const chip = el('button', 'filter-chip');
    chip.type = 'button';
    chip.setAttribute('role', 'tab');
    chip.dataset.team = team;
    chip.setAttribute('aria-selected', String(i === 0));
    chip.textContent = team;
    tabs.appendChild(chip);
  });

  // Default render first team
  const firstTeam = teams[0];
  setSelectedSubtab(firstTeam);
  renderTableForTeam(firstTeam);

  tabs.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    const team = chip.dataset.team;
    setSelectedSubtab(team);
    renderTableForTeam(team);
  });
}

function renderWorm(root, id) {
  const d = GAME_DETAILS[id];
  const worm = d?.worm;
  const inns = d?.innings || [];
  const teams = inns.map(i => i.team);
  if (!worm || !teams.length) {
    root.appendChild(el('div', 'muted', 'No worm data available.'));
    return;
  }
  const series = teams.map(team => ({ team, values: worm[team] || [] })).filter(s => s.values.length);
  if (!series.length) {
    root.appendChild(el('div', 'muted', 'No worm data available.'));
    return;
  }

  const W = 800, H = 280, pad = 32;
  const maxOvers = Math.max(...series.map(s => s.values.length));
  const maxRuns = Math.max(...series.map(s => s.values[s.values.length - 1] || 0));
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'chart-worm');

  // Index 0 corresponds to end of over 1.0
  const gx = (i) => pad + (i / Math.max(1, maxOvers - 1)) * (W - pad * 2);
  const gxOver = (overFloat) => {
    const idx = Math.max(0, Math.min(maxOvers - 1, overFloat - 1));
    return gx(idx);
  };
  const gy = (v) => H - pad - (v / Math.max(1, maxRuns)) * (H - pad * 2);
  const yAt = (vals, overFloat) => {
    const ov = Math.max(1, Math.min(maxOvers, overFloat));
    const base = Math.floor(ov) - 1;
    const frac = ov - Math.floor(ov);
    const v0 = vals[base] ?? vals[vals.length - 1] ?? 0;
    const v1 = vals[Math.min(base + 1, vals.length - 1)] ?? v0;
    const v = v0 + (v1 - v0) * frac;
    return gy(v);
  };

  // Grid
  const grid = document.createElementNS(svg.namespaceURI, 'g');
  grid.setAttribute('opacity', '0.4');
  const vSteps = 5;
  for (let i = 0; i <= vSteps; i++) {
    const y = pad + ((H - pad * 2) * i) / vSteps;
    const line = document.createElementNS(svg.namespaceURI, 'line');
    line.setAttribute('x1', String(pad));
    line.setAttribute('x2', String(W - pad));
    line.setAttribute('y1', String(H - y));
    line.setAttribute('y2', String(H - y));
    line.setAttribute('stroke', 'var(--ring)');
    line.setAttribute('stroke-width', '1');
    grid.appendChild(line);
  }
  // X markers at every 5 overs
  for (let i = 0; i < maxOvers; i += 5) {
    const x = gx(i);
    const line = document.createElementNS(svg.namespaceURI, 'line');
    line.setAttribute('x1', String(x));
    line.setAttribute('x2', String(x));
    line.setAttribute('y1', String(pad));
    line.setAttribute('y2', String(H - pad));
    line.setAttribute('stroke', 'var(--ring)');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('opacity', '0.5');
    grid.appendChild(line);
  }
  svg.appendChild(grid);

  // Axes labels (simple)
  const label = (text, x, y, anchor = 'middle') => {
    const t = document.createElementNS(svg.namespaceURI, 'text');
    t.textContent = text;
    t.setAttribute('x', String(x));
    t.setAttribute('y', String(y));
    t.setAttribute('fill', 'var(--muted)');
    t.setAttribute('font-size', '12');
    t.setAttribute('text-anchor', anchor);
    return t;
  };
  svg.appendChild(label('Overs', W / 2, H - 6));
  svg.appendChild(label('Runs', 8, pad, 'start'));

  // Lines per team
  series.forEach(s => {
    const color = (TEAM_COLORS[s.team]?.bg) || '#65d6ff';
    const points = s.values.map((v, i) => `${gx(i)},${gy(v)}`).join(' ');
    const poly = document.createElementNS(svg.namespaceURI, 'polyline');
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', color);
    poly.setAttribute('stroke-width', '3');
    poly.setAttribute('points', points);
    poly.setAttribute('stroke-linejoin', 'round');
    poly.setAttribute('stroke-linecap', 'round');
    svg.appendChild(poly);

    // End marker with value
    const lastIdx = s.values.length - 1;
    if (lastIdx >= 0) {
      const cx = gx(lastIdx), cy = gy(s.values[lastIdx]);
      const dot = document.createElementNS(svg.namespaceURI, 'circle');
      dot.setAttribute('cx', String(cx));
      dot.setAttribute('cy', String(cy));
      dot.setAttribute('r', '4');
      dot.setAttribute('fill', color);
      svg.appendChild(dot);
    }
  });

  // Fall of wickets markers
  const fowGroup = document.createElementNS(svg.namespaceURI, 'g');
  series.forEach(s => {
    const inn = (d.innings || []).find(i => i.team === s.team);
    if (!inn?.fallOfWickets?.length) return;
    inn.fallOfWickets.forEach(f => {
      const m = String(f.over || '').split('.');
      const ov = parseInt(m[0] || '0', 10);
      const balls = parseInt(m[1] || '0', 10);
      const overFloat = ov + (isFinite(balls) ? (balls / 6) : 0);
      const x = gxOver(overFloat);
      const y = yAt(s.values, overFloat);
      const mark = document.createElementNS(svg.namespaceURI, 'circle');
      mark.setAttribute('cx', String(x));
      mark.setAttribute('cy', String(y));
      mark.setAttribute('r', '5');
      mark.setAttribute('fill', 'none');
      mark.setAttribute('stroke', '#bf1e2e');
      mark.setAttribute('stroke-width', '2');
      const title = document.createElementNS(svg.namespaceURI, 'title');
      title.textContent = `${s.team} ${f.score} (${f.over} ov) – ${f.player}`;
      mark.appendChild(title);
      fowGroup.appendChild(mark);
    });
  });
  svg.appendChild(fowGroup);

  const wrap = el('div', 'worm-wrap');
  const legend = el('div', 'worm-legend');
  series.forEach(s => {
    const item = el('div', 'worm-legend-item');
    const sw = el('span', 'swatch');
    sw.style.background = (TEAM_COLORS[s.team]?.bg) || '#65d6ff';
    item.appendChild(sw);
    item.appendChild(el('span', null, `${s.team}`));
    legend.appendChild(item);
  });
  // Wickets swatch
  const wk = el('div', 'worm-legend-item');
  const wkSw = el('span', 'swatch');
  wkSw.style.background = '#bf1e2e';
  wk.appendChild(wkSw);
  wk.appendChild(el('span', null, 'Wickets'));
  legend.appendChild(wk);
  wrap.appendChild(svg);
  wrap.appendChild(legend);
  root.appendChild(wrap);
}

function renderRunRate(root, id) {
  const d = GAME_DETAILS[id];
  const worm = d?.worm;
  const inns = d?.innings || [];
  const teams = inns.map(i => i.team);
  if (!worm || teams.length < 2) {
    root.appendChild(el('div', 'muted', 'No runs-per-over data available.'));
    return;
  }

  const content = el('div');
  root.appendChild(content);

  // Series per over
  const cumulA = worm[teams[0]] || [];
  const cumulB = worm[teams[1]] || [];
  const n = Math.max(cumulA.length, cumulB.length);
  const perA = Array.from({ length: n }, (_, i) => (i === 0 ? (cumulA[i] || 0) : ((cumulA[i] || 0) - (cumulA[i - 1] || 0))));
  const perB = Array.from({ length: n }, (_, i) => (i === 0 ? (cumulB[i] || 0) : ((cumulB[i] || 0) - (cumulB[i - 1] || 0))));

  function wicketEvents(team) {
    const inn = inns.find(i => i.team === team);
    const arr = Array.from({ length: n }, () => []);
    (inn?.fallOfWickets || []).forEach(f => {
      const parts = String(f.over).split('.');
      const ov = Math.max(1, parseInt(parts[0] || '1', 10));
      const idx = Math.min(n - 1, ov - 1);
      const batter = f.player;
      const batEntry = (inn?.batting || []).find(p => p.name.startsWith(batter));
      let bowler = '';
      const dism = batEntry?.dismissal || '';
      const m = dism.match(/\bb\s+([A-Z]\.\s*[A-Za-z]+)/i);
      if (m) bowler = m[1];
      const info = [
        `Over ${ov}`,
        `FOW ${f.score}`,
        `Out: ${batter}`,
        bowler ? `Bowler: ${bowler}` : undefined,
      ].filter(Boolean).join(' • ');
      arr[idx].push(info);
    });
    return arr;
  }
  const wA = wicketEvents(teams[0]);
  const wB = wicketEvents(teams[1]);

  const W = 920, H = 320, padL = 56, padR = 24, padB = 60, padT = 20;
  const maxRuns = Math.max(24, Math.max(...perA, ...perB));
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('class', 'chart-bars');

  const barSpace = (W - padL - padR) / n;
  const gap = Math.min(12, Math.max(6, barSpace * 0.25));
  const clusterW = barSpace - gap;
  const barW = Math.max(6, (clusterW - 6) / 2);
  const xCluster = i => padL + i * barSpace + (barSpace - clusterW) / 2;
  const y = v => H - padB - (v / maxRuns) * (H - padT - padB);

  // Grid and axes
  const grid = document.createElementNS(svg.namespaceURI, 'g');
  for (let tick = 0; tick <= maxRuns; tick += 4) {
    const gy = y(tick);
    const line = document.createElementNS(svg.namespaceURI, 'line');
    line.setAttribute('x1', String(padL));
    line.setAttribute('x2', String(W - padR));
    line.setAttribute('y1', String(gy));
    line.setAttribute('y2', String(gy));
    line.setAttribute('stroke', 'var(--ring)');
    line.setAttribute('stroke-width', '1');
    grid.appendChild(line);
    const lbl = document.createElementNS(svg.namespaceURI, 'text');
    lbl.textContent = String(tick);
    lbl.setAttribute('x', String(padL - 10));
    lbl.setAttribute('y', String(gy + 4));
    lbl.setAttribute('fill', 'var(--muted)');
    lbl.setAttribute('font-size', '10');
    lbl.setAttribute('text-anchor', 'end');
    grid.appendChild(lbl);
  }
  svg.appendChild(grid);

  const colorA = (TEAM_COLORS[teams[0]]?.bg) || '#1b72ff';
  const colorB = (TEAM_COLORS[teams[1]]?.bg) || '#ff8a00';
  const bars = document.createElementNS(svg.namespaceURI, 'g');

  for (let i = 0; i < n; i++) {
    const x0 = xCluster(i);
    const drawBar = (val, color, offset, wicketArr) => {
      const h = Math.max(1, (val / maxRuns) * (H - padT - padB));
      const rx = x0 + offset;
      const ry = H - padB - h;
      const rect = document.createElementNS(svg.namespaceURI, 'rect');
      rect.setAttribute('x', String(rx));
      rect.setAttribute('y', String(ry));
      rect.setAttribute('width', String(barW));
      rect.setAttribute('height', String(h));
      rect.setAttribute('fill', color);
      rect.setAttribute('fill-opacity', '0.9');
      rect.setAttribute('rx', '3');
      const title = document.createElementNS(svg.namespaceURI, 'title');
      title.textContent = `Over ${i + 1}: ${val} runs`;
      rect.appendChild(title);
      bars.appendChild(rect);
      const events = wicketArr[i] || [];
      events.forEach((info, k) => {
        const frac = (k + 1) / (events.length + 1);
        const cy = ry + h * (1 - frac);
        const dot = document.createElementNS(svg.namespaceURI, 'circle');
        dot.setAttribute('cx', String(rx + barW / 2));
        dot.setAttribute('cy', String(cy));
        dot.setAttribute('r', '4');
        dot.setAttribute('fill', '#bf1e2e');
        const tt = document.createElementNS(svg.namespaceURI, 'title');
        tt.textContent = info;
        dot.appendChild(tt);
        bars.appendChild(dot);
      });
    };
    drawBar(perA[i] || 0, colorA, 0, wA);
    drawBar(perB[i] || 0, colorB, barW + 6, wB);
  }
  svg.appendChild(bars);

  // Axis labels
  const label = (text, x0, y0, anchor = 'middle') => {
    const t = document.createElementNS(svg.namespaceURI, 'text');
    t.textContent = text;
    t.setAttribute('x', String(x0));
    t.setAttribute('y', String(y0));
    t.setAttribute('fill', 'var(--muted)');
    t.setAttribute('font-size', '12');
    t.setAttribute('text-anchor', anchor);
    return t;
  };
  svg.appendChild(label('OVERS', W / 2, H - 8));
  const runsLbl = document.createElementNS(svg.namespaceURI, 'text');
  runsLbl.textContent = 'RUNS PER OVER';
  const yMid = H / 2;
  const xLeft = 18;
  runsLbl.setAttribute('x', String(xLeft));
  runsLbl.setAttribute('y', String(yMid));
  runsLbl.setAttribute('fill', 'var(--muted)');
  runsLbl.setAttribute('font-size', '12');
  runsLbl.setAttribute('font-weight', '700');
  runsLbl.setAttribute('text-anchor', 'middle');
  runsLbl.setAttribute('transform', `rotate(-90 ${xLeft} ${yMid})`);
  svg.appendChild(runsLbl);

  // X labels
  const xlabels = document.createElementNS(svg.namespaceURI, 'g');
  for (let i = 0; i < n; i++) {
    const lx = document.createElementNS(svg.namespaceURI, 'text');
    const cx = xCluster(i) + clusterW / 2;
    const cy = H - padB + 18;
    lx.textContent = String(i + 1);
    lx.setAttribute('x', String(cx));
    lx.setAttribute('y', String(cy));
    lx.setAttribute('fill', 'var(--muted)');
    lx.setAttribute('font-size', '10');
    lx.setAttribute('text-anchor', 'middle');
    lx.setAttribute('dominant-baseline', 'middle');
    lx.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
    xlabels.appendChild(lx);
  }
  svg.appendChild(xlabels);

  const wrap = el('div', 'bars-wrap');
  const legend = el('div', 'worm-legend');
  [
    { team: teams[0], color: colorA },
    { team: teams[1], color: colorB },
    { team: 'Wickets', color: '#bf1e2e' }
  ].forEach(s => {
    const item = el('div', 'worm-legend-item');
    const sw = el('span', 'swatch');
    sw.style.background = s.color;
    item.appendChild(sw);
    item.appendChild(el('span', null, `${s.team}`));
    legend.appendChild(item);
  });

  wrap.appendChild(svg);
  wrap.appendChild(legend);
  content.appendChild(wrap);
}
function renderPlayingXI(root, id) {
  const d = GAME_DETAILS[id];
  const teams = d?.squads || {};
  const rolesMap = d?.playerRoles || {};
  const box = el('div', 'gc-grid two');
  Object.entries(teams).forEach(([team, players]) => {
    const card = el('article', 'record no-media');
    const body = el('div', 'record-body');
    const titleRow = el('div', 'record-title-row');
    // Keep compact header: team badge + title (no logo image)
    titleRow.appendChild(createTeamBadge(team));
    const h = el('h3', 'record-title', team);
    titleRow.appendChild(h);
    body.appendChild(titleRow);
    const list = el('div');
    list.style.display = 'grid';
    list.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
    list.style.gap = '10px';

    // Group players by role category
    function categoryFor(name) {
      const clean = cleanName(name);
      const role = rolesMap[clean] || '';
      if (/WK/i.test(role) || /\(WK\)/.test(name)) return 'Wicket-Keeper';
      if (/All-?rounder/i.test(role)) return 'All-rounders';
      if (/Bowler/i.test(role)) return 'Bowlers';
      return 'Batters';
    }
    const groups = {
      'Batters': [],
      'All-rounders': [],
      'Bowlers': [],
      'Wicket-Keeper': [],
    };
    players.forEach(n => { groups[categoryFor(n)].push(n); });

    function rolePill(name) {
      const clean = cleanName(name);
      const full = rolesMap[clean] || '';
      let cls = 'role-batter';
      if (/WK/i.test(full) || /\(WK\)/.test(name)) cls = 'role-wk';
      else if (/All-?rounder/i.test(full)) cls = 'role-allrounder';
      else if (/Bowler/i.test(full)) cls = 'role-bowler';
      const span = el('span', `role-pill ${cls}`, full || 'Player');
      return span;
    }

    function renderGroup(title, arr) {
      if (!arr.length) return;
      const gt = el('div', 'group-title', title);
      gt.style.gridColumn = '1 / -1';
      list.appendChild(gt);
      arr.forEach(name => {
        const chip = el('div', 'player-chip');
        const img = document.createElement('img');
        img.className = 'avatar';
        img.alt = `${name} avatar`;
        img.src = playerImageUrl(id, name, 64);
        const txtWrap = el('div');
        const titleEl = document.createElement('strong');
        titleEl.textContent = name.replace(/\s*\((C|WK)\)/g, '');
        txtWrap.appendChild(titleEl);
        // Role shorthand badges
        const badges = [];
        if (/\(C\)/.test(name)) badges.push('C');
        if (/\(WK\)/.test(name)) badges.push('WK');
        if (badges.length) txtWrap.appendChild(el('span', 'role', badges.join(' • ')));
        chip.appendChild(img);
        chip.appendChild(txtWrap);
        chip.appendChild(rolePill(name));
        list.appendChild(chip);
      });
    }

    renderGroup('Batters', groups['Batters']);
    renderGroup('All-rounders', groups['All-rounders']);
    renderGroup('Bowlers', groups['Bowlers']);
    renderGroup('Wicket-Keeper', groups['Wicket-Keeper']);

    body.appendChild(list);
    card.appendChild(body);
    box.appendChild(card);
  });
  root.appendChild(box);
}

function renderInfo(root, id) {
  const info = GAME_DETAILS[id]?.info;
  if (!info) return root.appendChild(el('div', 'muted', 'No match info available.'));
  const box = el('div');
  box.appendChild(el('p', null, `Venue: ${info.venue}`));
  box.appendChild(el('p', null, `Toss: ${info.toss}`));
  if (info.result) box.appendChild(el('p', null, `Result: ${info.result}`));
  if (info.umpires) box.appendChild(el('p', null, `Umpires: ${info.umpires.join(', ')}`));
  if (info.referee) box.appendChild(el('p', null, info.referee));
  if (info.timings) box.appendChild(el('p', null, info.timings));
  root.appendChild(box);
}

function renderOverview(root, g) {
  const d = GAME_DETAILS[g.id]?.overview;
  const box = el('div');
  if (d) {
    box.appendChild(el('p', null, `Venue: ${d.venue}`));
    box.appendChild(el('p', null, d.toss));
    box.appendChild(el('p', null, `Umpires: ${d.umpires?.join(', ')}`));
  } else {
    box.appendChild(el('p', 'muted', 'No additional details available.'));
  }
  root.appendChild(box);
}

function renderLineups(root, g) {
  const d = GAME_DETAILS[g.id]?.squads;
  const box = el('div');
  if (d) {
    Object.entries(d).forEach(([team, players]) => {
      const teamWrap = el('div');
      teamWrap.appendChild(el('h3', null, team));
      players.forEach(p => teamWrap.appendChild(el('p', 'muted', p)));
      box.appendChild(teamWrap);
    });
  } else {
    box.appendChild(el('p', 'muted', 'Lineups will appear here.'));
  }
  root.appendChild(box);
}

function composeBg(url) {
  return `linear-gradient(to bottom, rgba(11,14,20,0.6), rgba(11,14,20,0.9)), url('${url}')`;
}

function updateHero(g) {
  const hero = document.querySelector('.hero-media');
  if (!hero) return;
  let fade = hero.querySelector('.fade-bg');
  if (!fade) {
    fade = document.createElement('div');
    fade.className = 'fade-bg';
    hero.appendChild(fade);
  }
  const target = heroImageForSport(g.sport, g.image);
  const apply = (url) => {
    fade.style.backgroundImage = composeBg(url);
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    fade.offsetHeight;
    fade.style.opacity = '1';
    const done = () => {
      fade.removeEventListener('transitionend', done);
      hero.style.backgroundImage = composeBg(url);
      hero.style.backgroundPosition = 'center';
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundRepeat = 'no-repeat';
      fade.style.opacity = '0';
    };
    fade.addEventListener('transitionend', done, { once: true });
  };
  const img = new Image();
  img.onload = () => apply(target);
  img.onerror = () => apply(SPORT_BG.All);
  img.src = target;
}

function buildSection(root, id, title) {
  const section = document.createElement('section');
  section.className = 'gc-section';
  section.id = id;
  const h = el('h2', null, title);
  section.appendChild(h);
  root.appendChild(section);
  return section;
}

function renderAllSections(contentEl, game) {
  contentEl.innerHTML = '';
  if (game.sport === 'Cricket') {
    const potm = buildSection(contentEl, slug('Player of the Match'), 'Player of the Match');
    renderPlayerOfTheMatch(potm, game.id);
    // Move Videos right after Player of the Match
    const vids = buildSection(contentEl, slug('Videos'), 'Videos');
    renderVideos(vids, game.id);
    const caps = buildSection(contentEl, slug('Captains'), 'Captains');
    renderCaptains(caps, game.id);
    const sc = buildSection(contentEl, slug('Scorecard'), 'Scorecard');
    renderScorecard(sc, game.id);

    const comm = buildSection(contentEl, slug('Commentary'), 'Commentary');
    renderCommentary(comm, game.id);

    const worm = buildSection(contentEl, slug('Worm'), 'Worm');
    renderWorm(worm, game.id);
    const rpo = buildSection(contentEl, slug('Run Rate'), 'Run Rate');
    renderRunRate(rpo, game.id);

    const part = buildSection(contentEl, slug('Partnerships'), 'Partnerships');
    renderPartnerships(part, game.id);

    const xi = buildSection(contentEl, slug('Playing XI'), 'Playing XI');
    renderPlayingXI(xi, game.id);

    const info = buildSection(contentEl, slug('Info'), 'Info');
    renderInfo(info, game.id);
  } else if (game.sport === 'Soccer') {
    const ov = buildSection(contentEl, slug('Overview'), 'Overview');
    renderOverview(ov, game);
    const stats = buildSection(contentEl, slug('Stats'), 'Stats');
    renderSoccerStats(stats, game.id);
    const comm = buildSection(contentEl, slug('Commentary'), 'Commentary');
    renderSoccerCommentary(comm, game.id);
    const lu = buildSection(contentEl, slug('Lineups'), 'Lineups');
    renderSoccerLineups(lu, game.id);
    const vids = buildSection(contentEl, slug('Videos'), 'Videos');
    renderVideos(vids, game.id);
    const info = buildSection(contentEl, slug('Info'), 'Info');
    renderInfo(info, game.id);
  } else {
    const ov = buildSection(contentEl, slug('Overview'), 'Overview');
    renderOverview(ov, game);
    const lu = buildSection(contentEl, slug('Lineups'), 'Lineups');
    renderLineups(lu, game);
  }
}

function renderVideos(root, id) {
  const list = GAME_DETAILS[id]?.videos || [];
  if (!list.length) {
    root.appendChild(el('div', 'muted', 'No videos available.'));
    return;
  }
  const wrap = el('div', 'video-carousel');
  const track = el('div', 'video-track');
  wrap.appendChild(track);

  list.forEach(v => {
    const item = el('article', 'video-item');
    const media = el('div', 'video-media');
    const video = document.createElement('video');
    video.src = v.src;
    video.poster = v.thumb;
    video.preload = 'metadata';
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('controls', '');
    media.appendChild(video);
    const body = el('div', 'video-body');
    const title = el('div', 'video-title', v.title);
    const meta = el('div', 'gc-subtle', v.duration || '');
    body.appendChild(title);
    body.appendChild(meta);
    item.appendChild(media);
    item.appendChild(body);
    track.appendChild(item);
  });

  const prev = el('button', 'video-nav prev');
  prev.type = 'button'; prev.setAttribute('aria-label', 'Previous'); prev.textContent = '‹';
  const next = el('button', 'video-nav next');
  next.type = 'button'; next.setAttribute('aria-label', 'Next'); next.textContent = '›';
  wrap.appendChild(prev);
  wrap.appendChild(next);

  const scrollBy = () => {
    const item = track.querySelector('.video-item');
    const dx = item ? item.getBoundingClientRect().width + 12 : 320;
    return dx;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollBy(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollBy(), behavior: 'smooth' }));

  root.appendChild(wrap);
}

function renderSoccerStats(root, id) {
  const d = GAME_DETAILS[id];
  const s = d?.stats;
  if (!s) { root.appendChild(el('div', 'muted', 'No stats available.')); return; }
  const grid = el('div', 'soc-stats');
  function card(title, leftVal, rightVal, isPercent = false) {
    const c = el('div', 'stat-card');
    c.appendChild(el('div', 'stat-title', title));
    const rows = el('div', 'stat-bars');
    const row = el('div', 'stat-row');
    const l = el('div', null, String(isPercent ? leftVal + '%' : leftVal));
    const bar = el('div', 'bar');
    const span = el('span');
    const pct = isPercent ? leftVal : (leftVal / Math.max(1, leftVal + rightVal)) * 100;
    span.style.width = Math.max(5, Math.min(100, Math.round(pct))) + '%';
    bar.appendChild(span);
    const r = el('div', null, String(isPercent ? rightVal + '%' : rightVal));
    row.appendChild(l); row.appendChild(bar); row.appendChild(r);
    rows.appendChild(row);
    c.appendChild(rows);
    return c;
  }
  grid.appendChild(card('Possession', s.possession.home, s.possession.away, true));
  grid.appendChild(card('Shots', s.shots.home, s.shots.away));
  grid.appendChild(card('On Target', s.shotsOnTarget.home, s.shotsOnTarget.away));
  grid.appendChild(card('Passes', s.passes.home, s.passes.away));
  grid.appendChild(card('Corners', s.corners.home, s.corners.away));
  grid.appendChild(card('Fouls', s.fouls.home, s.fouls.away));
  grid.appendChild(card('Yellow Cards', s.yellow.home, s.yellow.away));
  grid.appendChild(card('Red Cards', s.red.home, s.red.away));
  root.appendChild(grid);
}

function renderSoccerCommentary(root, id) {
  const list = GAME_DETAILS[id]?.commentaryTimeline || [];
  if (!list.length) { root.appendChild(el('div', 'muted', 'No commentary yet.')); return; }
  const box = el('div', 'soc-timeline');
  list.forEach(ev => {
    const item = el('div', 'soc-event');
    item.appendChild(el('div', 'soc-minute', `${ev.minute}'`));
    item.appendChild(el('div', null, ev.text));
    box.appendChild(item);
  });
  root.appendChild(box);
}

function renderSoccerLineups(root, id) {
  const lu = GAME_DETAILS[id]?.lineups;
  if (!lu) { root.appendChild(el('div', 'muted', 'Lineups will appear here.')); return; }
  const grid = el('div', 'soc-lineups');
  Object.entries(lu).forEach(([team, data]) => {
    const card = el('div', 'soc-lineup-card');
    const head = el('div', 'record-title-row');
    head.appendChild(createTeamBadge(team));
    const h = el('h3', 'record-title', team);
    head.appendChild(h);
    card.appendChild(head);
    card.appendChild(el('div', 'soc-formation', `Formation: ${data.formation}`));
    const list = el('div', 'soc-players');
    (data.players || []).forEach(p => {
      const row = el('div', 'soc-player');
      const img = document.createElement('img'); img.className = 'avatar'; img.alt = `${p} avatar`; img.src = playerImageUrl(id, p, 64);
      const name = document.createElement('strong'); name.textContent = p;
      row.appendChild(img); row.appendChild(name);
      list.appendChild(row);
    });
    card.appendChild(list);
    grid.appendChild(card);
  });
  root.appendChild(grid);
}

function renderCaptains(root, id) {
  const squads = GAME_DETAILS[id]?.squads || {};
  const box = el('div', 'gc-captains');
  Object.entries(squads).forEach(([team, players]) => {
    const captain = (players || []).find(n => /(\(C\))/.test(n));
    if (!captain) return;
    const card = el('div', 'captain-card');
    const img = document.createElement('img');
    img.className = 'avatar-lg';
    img.alt = `${captain.replace(/\s*\(C\)/, '')} photo`;
    img.src = playerImageUrl(id, captain, 96);
    const meta = el('div', 'meta');
    meta.appendChild(el('strong', null, captain.replace(/\s*\(C\)/, '')));
    const teamRow = el('div', 'team-row');
    teamRow.appendChild(createTeamBadge(team, 'sm'));
    teamRow.appendChild(el('span', 'gc-subtle', `${team} • Captain`));
    meta.appendChild(teamRow);
    card.appendChild(img);
    card.appendChild(meta);
    box.appendChild(card);
  });
  if (box.children.length) root.appendChild(box); else root.appendChild(el('div', 'muted', 'Captain info unavailable.'));
}

function formatOvers(overs) {
  // Ensure 20 vs 20.0 looks tidy
  const s = String(overs);
  return s.endsWith('.0') ? s.slice(0, -2) : s;
}

function computeFinalScore(id) {
  const inns = GAME_DETAILS[id]?.innings || [];
  if (inns.length < 2) return '';
  const a = inns[0];
  const b = inns[1];
  const aStr = `${a.team} ${a.runs}/${a.wickets} (${formatOvers(a.overs)})`;
  const bStr = `${b.team} ${b.runs}/${b.wickets} (${formatOvers(b.overs)})`;
  return `${aStr} — ${bStr}`;
}

function renderHeaderScoreCard(game) {
  const heroInner = document.querySelector('.hero-inner');
  if (!heroInner) return;
  const d = GAME_DETAILS[game.id] || {};
  const card = el('div', 'score-card');

  if (game.sport === 'Cricket') {
    const inns = d.innings || [];
    if (!inns.length) return;
    const teamBlock = (teamName, logoRight = false) => {
      const inn = inns.find(i => i.team === teamName) || { team: teamName, runs: '-', wickets: '-', overs: '-' };
      const wrap = el('div', 'score-team' + (logoRight ? ' right' : ''));
      const logo = createTeamLogoImg(game.id, inn.team);
      const meta = el('div', 'score-meta');
      meta.appendChild(el('div', 'score-name', inn.team));
      const line = el('div', 'score-line');
      const strong = el('strong', null, `${inn.runs}/${inn.wickets}`);
      line.appendChild(strong);
      meta.appendChild(line);
      const overs = el('div', 'score-overs gc-subtle', `(${formatOvers(inn.overs)})`);
      meta.appendChild(overs);
      if (logoRight) { wrap.appendChild(meta); wrap.appendChild(logo); }
      else { wrap.appendChild(logo); wrap.appendChild(meta); }
      return wrap;
    };
    card.appendChild(teamBlock(game.homeTeam, false));
    card.appendChild(el('div', 'score-sep', '—'));
    card.appendChild(teamBlock(game.awayTeam, true));
    const result = d.info?.result;
    if (result) card.appendChild(el('div', 'score-result gc-subtle', result));
  } else if (game.sport === 'Soccer') {
    const sc = d.soccer || {};
    const teamBlock = (teamName, goals, logoRight = false) => {
      const wrap = el('div', 'score-team' + (logoRight ? ' right' : ''));
      const logo = createTeamLogoImg(game.id, teamName);
      const meta = el('div', 'score-meta');
      meta.appendChild(el('div', 'score-name', teamName));
      const line = el('div', 'score-line');
      line.appendChild(el('strong', null, String(goals ?? '-')));
      meta.appendChild(line);
      if (logoRight) { wrap.appendChild(meta); wrap.appendChild(logo); }
      else { wrap.appendChild(logo); wrap.appendChild(meta); }
      return wrap;
    };
    card.appendChild(teamBlock(game.homeTeam, sc?.score?.home));
    card.appendChild(el('div', 'score-sep', '—'));
    card.appendChild(teamBlock(game.awayTeam, sc?.score?.away, true));
    const minute = sc?.score?.minute; const phase = sc?.score?.phase || '';
    const result = d.info?.result || (minute ? `${minute}' ${phase}` : '');
    if (result) card.appendChild(el('div', 'score-result gc-subtle', result));
  }

  heroInner.appendChild(card);
}

function renderPlayerOfTheMatch(root, id) {
  const potm = GAME_DETAILS[id]?.playerOfTheMatch;
  if (!potm) {
    root.appendChild(el('div', 'muted', 'Not awarded'));
    return;
  }
  const card = el('div', 'captain-card potm-card');
  const img = document.createElement('img');
  img.className = 'avatar-lg';
  img.alt = `${cleanName(potm.name)} photo`;
  img.src = playerImageUrl(id, potm.name, 96);
  const meta = el('div', 'meta');
  // Use a shorter display name on very small screens
  const shortName = (full) => {
    const clean = cleanName(full);
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}. ${parts[parts.length - 1]}`; // R. Sharma
    return clean;
  };
  const display = (window.matchMedia && window.matchMedia('(max-width: 480px)').matches)
    ? shortName(potm.name)
    : cleanName(potm.name);
  meta.appendChild(el('strong', null, display));
  const teamRow = el('div', 'team-row');
  teamRow.appendChild(createTeamBadge(potm.team, 'sm'));
  const subtitle = ['Player of the Match', potm.stats].filter(Boolean).join(' • ');
  teamRow.appendChild(el('span', 'gc-subtle', subtitle));
  meta.appendChild(teamRow);
  card.appendChild(img);
  card.appendChild(meta);
  root.appendChild(card);
}

function cleanName(name) {
  return (name || '').replace(/\s*\((C|WK)\)/g, '').trim();
}

function fmt2(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : String(v ?? '');
}

function playerImageUrl(gameId, name, size = 96) {
  const clean = cleanName(name);
  const map = GAME_DETAILS[gameId]?.playerImages || {};
  const url = map[clean];
  return url || avatarUrl(clean, size);
}

function observeSections(tabsEl) {
  const chips = Array.from(tabsEl.querySelectorAll('.filter-chip'));
  const map = new Map(chips.map(c => [c.dataset.target, c]));
  const sections = document.querySelectorAll('.gc-section');
  const headerOffset = 72; // approx sticky header height
  const observer = new IntersectionObserver((entries) => {
    // Pick the entry nearest to top that's intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) {
      const id = visible[0].target.id;
      const chip = map.get(id);
      if (chip) setSelectedTab(tabsEl, chip.dataset.tab);
    }
  }, { root: null, rootMargin: `-${headerOffset}px 0px -60% 0px`, threshold: [0, 0.25, 0.5, 1] });

  sections.forEach(s => observer.observe(s));
  return observer;
}

function init() {
  const id = qs('game');
  const game = findGame(id);
  const title = document.getElementById('gcTitle');
  const subtitle = document.getElementById('gcSubtitle');
  const tabsEl = document.getElementById('gcTabs');
  const contentEl = document.getElementById('gcContent');

  if (!game) {
    title.textContent = 'Game not found';
    subtitle.textContent = 'Return to Live Games to pick another match.';
    return;
  }

  title.textContent = `${game.homeTeam} vs ${game.awayTeam}`;
  const leaguePart = game.league ? ` • ${game.league}` : '';
  subtitle.textContent = `${game.sport}${leaguePart} • Completed`;
  updateHero(game);
  renderHeaderScoreCard(game);
  renderTabs(tabsEl, game.sport);

  let sectionObserver = null;
  function enterSectionsMode(scrollTargetId) {
    contentEl.innerHTML = '';
    renderAllSections(contentEl, game);
    if (sectionObserver) { try { sectionObserver.disconnect(); } catch {} }
    sectionObserver = observeSections(tabsEl);
    if (scrollTargetId) {
      const section = document.getElementById(scrollTargetId);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function enterCommentaryMode() {
    contentEl.innerHTML = '';
    if (sectionObserver) { try { sectionObserver.disconnect(); } catch {} }
    sectionObserver = null;
    const comm = buildSection(contentEl, slug('Commentary'), 'Commentary');
    renderCommentary(comm, game.id);
  }

  // Default: sections mode
  enterSectionsMode();

  // Set initial selected to first tab
  const first = tabsEl.querySelector('.filter-chip');
  if (first) setSelectedTab(tabsEl, first.dataset.tab);

  // Top-level tab clicks
  tabsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    const tab = chip.dataset.tab;
    setSelectedTab(tabsEl, tab);
    if (tab === 'Commentary') {
      enterCommentaryMode();
      try { history.replaceState(null, '', '#commentary'); } catch {}
      return;
    }
    // Ensure sections mode then scroll
    const id = chip.dataset.target;
    enterSectionsMode(id);
    try { history.replaceState(null, '', `#${id}`); } catch {}
  });

  // If URL has a hash, route accordingly
  if (window.location.hash && window.location.hash.length > 1) {
    const targetId = window.location.hash.slice(1);
    const chip = tabsEl.querySelector(`.filter-chip[data-target="${targetId}"]`) ||
                 (targetId === 'commentary' ? tabsEl.querySelector(`.filter-chip[data-tab="Commentary"]`) : null);
    if (targetId === 'commentary') {
      enterCommentaryMode();
      if (chip) setSelectedTab(tabsEl, 'Commentary');
    } else {
      enterSectionsMode(targetId);
      if (chip) setSelectedTab(tabsEl, chip.dataset.tab);
    }
  }
}

window.addEventListener('DOMContentLoaded', init);
