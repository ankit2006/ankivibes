import { LIVE_GAMES, RECORDS, SPORTS } from './data.js';

const STORAGE_KEY = 'sportsArena.interests.v1';
const SELECTED_SPORT_KEY = 'sportsArena.selectedSport.v1';

// Background images per sport (Unsplash direct links). Values are plain URLs (no url()).
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
    const badge = el('span', `badge ${g.status.state === 'live' ? 'live' : 'upcoming'}`, g.status.state.toUpperCase());
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
  uniqueSports().forEach(s => {
    const label = el('label', 'interest-item');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = s;
    input.checked = saved.has(s);
    const span = el('span', null, s);
    label.appendChild(input);
    label.appendChild(span);
    list.appendChild(label);
  });
  dialog.showModal();
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
  const saveInterestsBtn = document.getElementById('saveInterestsBtn');
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

  function updateHeroBackground(sport) {
    if (!heroMediaEl) return;
    const primaryUrl = heroImageForSport(sport);
    const fallbackUrl = (sport && sport !== 'All') ? (LIVE_GAMES.find(g => g.sport === sport && g.image)?.image || SPORT_BG.All) : SPORT_BG.All;

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
