import { LIVE_GAMES, RECORDS, SPORTS } from './data.js';

const STORAGE_KEY = 'sportsArena.interests.v1';
const SELECTED_SPORT_KEY = 'sportsArena.selectedSport.v1';
const THEME_KEY = 'sportsArena.theme.v1';

// Background images per sport (Unsplash direct links). Values are plain URLs (no url()).
const SPORT_BG = {
  All: 'https://th.bing.com/th/id/OIP.V4xg8zeAWuB1u0OGS5uC0QAAAA?w=259&h=180&c=7&r=0&o=7&dpr=2.1&pid=1.7&rm=3',
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

// Helper: curated collage set for the "All" view
const COLLAGE_SPORTS = ['Soccer','Basketball','Cricket','Tennis','American Football','Hockey','Baseball','Rugby','F1'];

function getInterests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}
function setInterests(sports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sports));
}

function getSelectedSport() {
  try {
    const s = localStorage.getItem(SELECTED_SPORT_KEY);
    return s || 'All';
  } catch { return 'All'; }
}
function setSelectedSport(sport) {
  try { localStorage.setItem(SELECTED_SPORT_KEY, sport); } catch {}
}

function uniqueSports() {
  const set = new Set(LIVE_GAMES.map(g => g.sport));
  SPORTS.forEach(s => set.add(s));
  return Array.from(set);
}

function sortGames(games, interests, selected) {
  const interestSet = new Set(interests);
  return games
    .filter(g => selected === 'All' || g.sport === selected)
    .sort((a, b) => {
      const aLive = a.status.state === 'live' ? 0 : 1;
      const bLive = b.status.state === 'live' ? 0 : 1;
      if (aLive !== bLive) return aLive - bLive;
      const aFav = interestSet.has(a.sport) ? 0 : 1;
      const bFav = interestSet.has(b.sport) ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;
      return a.sport.localeCompare(b.sport);
    });
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

// Theme utilities
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

function renderFilters(container, sports, selected) {
  container.innerHTML = '';
  const allChip = el('button', 'filter-chip');
  allChip.type = 'button';
  allChip.setAttribute('role', 'tab');
  allChip.dataset.sport = 'All';
  allChip.setAttribute('aria-selected', String(selected === 'All'));
  allChip.textContent = 'All';
  container.appendChild(allChip);

  sports.forEach(s => {
    const chip = el('button', 'filter-chip');
    chip.type = 'button';
    chip.setAttribute('role', 'tab');
    chip.dataset.sport = s;
    chip.setAttribute('aria-selected', String(selected === s));
    chip.textContent = s;
    container.appendChild(chip);
  });
}

function setSelectedChip(container, selected) {
  const chips = container.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.setAttribute('aria-selected', chip.dataset.sport === selected ? 'true' : 'false');
  });
}

function renderGames(container, games) {
  container.innerHTML = '';
  if (!games.length) {
    const empty = el('div', 'muted', 'No games match your filters right now.');
    empty.style.padding = '16px';
    container.appendChild(empty);
    return;
  }
  games.forEach(g => {
    const card = el('article', 'card');
    card.dataset.id = g.id;
    card.dataset.sport = g.sport;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${g.sport} ${g.homeTeam} vs ${g.awayTeam}`);
    const media = el('div', 'card-media');
    media.style.backgroundImage = `url(${g.image})`;
    const state = (g.status && g.status.state) || 'upcoming';
    const stateClass = state === 'live' ? 'live' : (state === 'final' ? 'final' : 'upcoming');
    const badge = el('span', `badge ${stateClass}`, state.toUpperCase());
    media.appendChild(badge);
    const body = el('div', 'card-body');
    const title = el('h3', 'card-title', `${g.homeTeam} vs ${g.awayTeam}`);
    const meta = el('div', 'card-meta');
    meta.appendChild(el('span', null, g.sport));
    meta.appendChild(el('span', null, '•'));
    meta.appendChild(el('span', null, g.league));
    meta.appendChild(el('span', null, '•'));
    meta.appendChild(el('span', null, g.status.clock));

    body.appendChild(title);
    body.appendChild(meta);
    card.appendChild(media);
    card.appendChild(body);
    container.appendChild(card);
  });
}

function renderRecords(container, records) {
  container.innerHTML = '';
  records.forEach(r => {
    const rec = el('article', 'record');
    const media = el('div', 'record-media');
    media.style.backgroundImage = `url(${r.image})`;
    const body = el('div', 'record-body');
    const title = el('h3', 'record-title', r.title);
    const meta = el('div', 'card-meta');
    meta.appendChild(el('span', null, r.sport));
    const desc = el('p', 'muted', r.description);
    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(desc);
    rec.appendChild(media);
    rec.appendChild(body);
    container.appendChild(rec);
  });
}

function openInterestsModal() {
  const dialog = document.getElementById('interestsModal');
  const list = document.getElementById('interestsList');
  list.innerHTML = '';
  const saved = new Set(getInterests());
  // If first-time user, preselect top sports by presence in LIVE_GAMES
  let preselect = new Set();
  if (saved.size === 0) {
    const counts = new Map();
    LIVE_GAMES.forEach(g => counts.set(g.sport, (counts.get(g.sport) || 0) + 1));
    const sports = uniqueSports().slice().sort((a, b) => (counts.get(b) || 0) - (counts.get(a) || 0));
    preselect = new Set(sports.slice(0, 3));
  }
  uniqueSports().forEach(s => {
    const label = el('label', 'interest-item');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = s;
    input.checked = saved.has(s) || preselect.has(s);
    const span = el('span', null, s);
    label.appendChild(input);
    label.appendChild(span);
    list.appendChild(label);
  });
  dialog.showModal();
  // Focus first control for accessibility
  const firstInput = list.querySelector('input[type="checkbox"]');
  if (firstInput) firstInput.focus();
}

function saveInterestsFromModal() {
  const dialog = document.getElementById('interestsModal');
  const boxes = dialog.querySelectorAll('input[type="checkbox"]');
  const chosen = Array.from(boxes).filter(b => b.checked).map(b => b.value);
  if (!chosen.length) {
    alert('Pick at least one sport to personalize your feed.');
    return false;
  }
  setInterests(chosen);
  dialog.close();
  return true;
}

function init() {
  const filtersEl = document.getElementById('filters');
  const liveGridEl = document.getElementById('liveGrid');
  const recordsGridEl = document.getElementById('recordsGrid');
  const editBtn = document.getElementById('editInterestsBtn');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const dialog = document.getElementById('interestsModal');
  const themeBtn = document.getElementById('themeToggleBtn');
    // Theme: apply from preference and wire toggle
    applyTheme(getTheme());
    if (themeBtn) {
      themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const next = (document.documentElement.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
        setTheme(next);
      });
    }
  const saveInterestsBtn = document.getElementById('saveInterestsBtn');
  const selectAllBtn = document.getElementById('selectAllInterestsBtn');
  const clearBtn = document.getElementById('clearInterestsBtn');
  const heroMediaEl = document.querySelector('.hero-media');
  // Ensure fade overlay exists for cross-fade transitions
  let fadeLayer = heroMediaEl ? heroMediaEl.querySelector('.fade-bg') : null;
  if (heroMediaEl && !fadeLayer) {
    fadeLayer = document.createElement('div');
    fadeLayer.className = 'fade-bg';
    heroMediaEl.appendChild(fadeLayer);
  }

  let selectedSport = getSelectedSport();
  let interests = getInterests();

  // Ensure selected sport is valid; otherwise fallback to All
  const available = new Set(['All', ...uniqueSports()]);
  if (!available.has(selectedSport)) selectedSport = 'All';

  function heroImageForSport(sport) {
    // Prefer curated SPORT_BG mapping to avoid unexpected photos
    if (SPORT_BG[sport]) return SPORT_BG[sport];
    if (sport && sport !== 'All') {
      const fromLive = LIVE_GAMES.find(g => g.sport === sport && g.image);
      if (fromLive) return fromLive.image;
    }
    return SPORT_BG.All;
  }

  function composeBg(url) {
    return `linear-gradient(to bottom, rgba(11,14,20,0.6), rgba(11,14,20,0.9)), url('${url}')`;
  }

  function composeGradientOnly() {
    return 'linear-gradient(to bottom, rgba(11,14,20,0.6), rgba(11,14,20,0.9))';
  }

  function buildHeroCollage(urls) {
    if (!heroMediaEl) return;
    let collage = heroMediaEl.querySelector('.hero-collage');
    if (!collage) {
      collage = document.createElement('div');
      collage.className = 'hero-collage';
      collage.setAttribute('aria-hidden', 'true');
      heroMediaEl.appendChild(collage);
    }
    collage.innerHTML = '';
    const tiles = urls.slice(0, 6);
    tiles.forEach((u, i) => {
      const t = document.createElement('div');
      t.className = `tile t${i+1}`;
      t.style.backgroundImage = `url(${u})`;
      collage.appendChild(t);
    });
    // Ensure gradient-only base behind collage for readability
    heroMediaEl.style.backgroundImage = composeGradientOnly();
    heroMediaEl.style.backgroundPosition = 'center';
    heroMediaEl.style.backgroundSize = 'cover';
    heroMediaEl.style.backgroundRepeat = 'no-repeat';
    if (fadeLayer) fadeLayer.style.opacity = '0';
  }

  function removeHeroCollage() {
    if (!heroMediaEl) return;
    const collage = heroMediaEl.querySelector('.hero-collage');
    if (collage) collage.remove();
  }

  function updateHeroBackground(sport) {
    if (!heroMediaEl) return;
    // For "All", use the provided single-image background
    if (sport === 'All') {
      removeHeroCollage();
    }

    const primaryUrl = heroImageForSport(sport);
    const fallbackUrl = LIVE_GAMES.find(g => g.sport === sport && g.image)?.image || SPORT_BG.All;

    const applyBg = (url) => {
      // If fade layer exists, cross-fade
      if (fadeLayer) {
        // Set new image on fade layer and bring it in
        fadeLayer.style.backgroundImage = composeBg(url);
        // force reflow to ensure transition triggers
        // eslint-disable-next-line no-unused-expressions
        fadeLayer.offsetHeight;
        fadeLayer.style.opacity = '1';
        const done = () => {
          fadeLayer.removeEventListener('transitionend', done);
          // Commit image to base and hide overlay
          heroMediaEl.style.backgroundImage = composeBg(url);
          heroMediaEl.style.backgroundPosition = 'center';
          heroMediaEl.style.backgroundSize = 'cover';
          heroMediaEl.style.backgroundRepeat = 'no-repeat';
          fadeLayer.style.opacity = '0';
        };
        fadeLayer.addEventListener('transitionend', done, { once: true });
      } else {
        heroMediaEl.style.backgroundImage = composeBg(url);
        heroMediaEl.style.backgroundPosition = 'center';
        heroMediaEl.style.backgroundSize = 'cover';
        heroMediaEl.style.backgroundRepeat = 'no-repeat';
      }
      try { heroMediaEl.setAttribute('aria-label', `${sport === 'All' ? 'Stadium crowd' : sport} background`); } catch {}
    };

    const testImg = new Image();
    testImg.onload = () => applyBg(primaryUrl);
    testImg.onerror = () => applyBg(fallbackUrl);
    testImg.src = primaryUrl;
  }

  renderFilters(filtersEl, uniqueSports(), selectedSport);
  setSelectedChip(filtersEl, selectedSport);
  filtersEl.addEventListener('click', (e) => {
    e.preventDefault();
    const chip = (e.target && typeof e.target.closest === 'function') ? e.target.closest('.filter-chip') : null;
    if (!chip || !filtersEl.contains(chip)) return;
    const sport = chip.dataset.sport || 'All';
    try { console.debug('[filters] select', sport); } catch {}
    selectedSport = sport;
    setSelectedSport(selectedSport);
    setSelectedChip(filtersEl, selectedSport);
    const next = sortGames(LIVE_GAMES, interests, selectedSport);
    try { console.debug('[filters] games', selectedSport, next.length); } catch {}
    renderGames(liveGridEl, next);
    updateHeroBackground(selectedSport);
  });
  renderGames(liveGridEl, sortGames(LIVE_GAMES, interests, selectedSport));
  renderRecords(recordsGridEl, RECORDS);
  updateHeroBackground(selectedSport);

  // Card navigation: click and keyboard activate to open game center
  function openGameCenterByEvent(ev) {
    const target = ev.target;
    const card = (target && typeof target.closest === 'function') ? target.closest('.card') : null;
    if (!card || !liveGridEl.contains(card)) return;
    const id = card.dataset.id;
    if (!id) return;
    window.location.href = `game.html?game=${encodeURIComponent(id)}`;
  }

  liveGridEl.addEventListener('click', openGameCenterByEvent);
  liveGridEl.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      openGameCenterByEvent(ev);
    }
  });

  if (!interests.length) {
    // Nudge on first visit
    setTimeout(() => openInterestsModal(), 400);
  }

  editBtn.addEventListener('click', openInterestsModal);
  getStartedBtn.addEventListener('click', openInterestsModal);

  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const dialog = document.getElementById('interestsModal');
      const boxes = dialog.querySelectorAll('input[type="checkbox"]');
      boxes.forEach(b => { b.checked = true; });
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const dialog = document.getElementById('interestsModal');
      const boxes = dialog.querySelectorAll('input[type="checkbox"]');
      boxes.forEach(b => { b.checked = false; });
    });
  }

  saveInterestsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const ok = saveInterestsFromModal();
    if (ok) {
      interests = getInterests();
      renderGames(liveGridEl, sortGames(LIVE_GAMES, interests, selectedSport));
    }
  });

  dialog.addEventListener('close', () => {
    interests = getInterests();
    renderGames(liveGridEl, sortGames(LIVE_GAMES, interests, selectedSport));
  });
}

window.addEventListener('DOMContentLoaded', init);
