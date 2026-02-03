// Dummy data for live games and records
export const SPORTS = [
  'Soccer', 'Basketball', 'Baseball', 'Tennis', 'Cricket', 'American Football', 'Hockey', 'Rugby', 'F1'
];

export const LIVE_GAMES = [
  {
    id: 's1',
    sport: 'Soccer',
    league: 'LaLiga',
    homeTeam: 'Real Sociedad',
    awayTeam: 'Barcelona',
    status: { state: 'live', clock: "72'", period: '2H' },
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 's2',
    sport: 'Basketball',
    league: 'NBA',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    status: { state: 'live', clock: 'Q3 05:24', period: 'Q3' },
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 's3',
    sport: 'Cricket',
    league: 'IPL',
    homeTeam: 'Mumbai',
    awayTeam: 'Chennai',
    status: { state: 'upcoming', clock: 'Today 19:30', period: null },
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 's4',
    sport: 'Tennis',
    league: 'Grand Slam',
    homeTeam: 'S. Williams',
    awayTeam: 'N. Osaka',
    status: { state: 'live', clock: 'Set 2 4-3', period: 'S2' },
    image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=1976&auto=format&fit=crop',
  },
  {
    id: 's5',
    sport: 'American Football',
    league: 'NFL',
    homeTeam: 'Eagles',
    awayTeam: 'Cowboys',
    status: { state: 'upcoming', clock: 'Sun 16:25', period: null },
    image: 'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 's6',
    sport: 'Hockey',
    league: 'NHL',
    homeTeam: 'Maple Leafs',
    awayTeam: 'Canadiens',
    status: { state: 'live', clock: '3rd 11:12', period: 'P3' },
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 's7',
    sport: 'Baseball',
    league: 'MLB',
    homeTeam: 'Yankees',
    awayTeam: 'Red Sox',
    status: { state: 'upcoming', clock: 'Tonight 19:05', period: null },
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 's8',
    sport: 'Rugby',
    league: 'Six Nations',
    homeTeam: 'England',
    awayTeam: 'France',
    status: { state: 'live', clock: 'H2 23:38', period: 'H2' },
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 's9',
    sport: 'F1',
    league: 'World Championship',
    homeTeam: 'Grand Prix',
    awayTeam: '—',
    status: { state: 'live', clock: 'Lap 34/57', period: 'Race' },
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1974&auto=format&fit=crop',
  },
];

export const RECORDS = [
  {
    id: 'r1',
    sport: 'Soccer',
    title: 'Most Goals in a Calendar Year',
    description: 'A modern-era benchmark that redefined scoring consistency across club and country.',
    image: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'r2',
    sport: 'Basketball',
    title: 'All-Time 3-Point Record',
    description: 'A revolution in spacing and pace, redefining perimeter offense.',
    image: 'https://images.unsplash.com/photo-1516744096552-aec945acef07?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'r3',
    sport: 'Cricket',
    title: 'Fastest ODI Century',
    description: 'Explosive batting that changed the blueprint for limited-overs chases.',
    image: 'https://images.unsplash.com/photo-1495451338850-6f4dbe0d812f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'r4',
    sport: 'Tennis',
    title: 'Most Grand Slam Singles Titles',
    description: 'Longevity and consistency on every surface across eras.',
    image: 'https://images.unsplash.com/photo-1521417531039-96a1761dc9a3?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'r5',
    sport: 'American Football',
    title: 'Most Career Passing Yards',
    description: 'Precision and durability at the sport’s most demanding position.',
    image: 'https://images.unsplash.com/photo-1529864896617-714e8b16d9a0?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'r6',
    sport: 'Hockey',
    title: 'Single-Season Goals Record',
    description: 'A prolific scoring pace that remains a gold standard.',
    image: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?q=80&w=1974&auto=format&fit=crop',
  }
];

// Detailed game data by id
export const GAME_DETAILS = {
  // Cricket example (T20-style)
  s3: {
    info: {
      venue: 'Wankhede Stadium, Mumbai',
      toss: 'Mumbai won the toss and elected to bat',
      result: 'Mumbai won by 6 runs',
      umpires: ['Nitin Menon', 'Anil Chaudhary'],
      referee: 'Match Referee: R. Iyer',
      timings: 'Evening match',
    },
    // Player of the Match metadata
    playerOfTheMatch: {
      name: 'J. Bumrah',
      team: 'Mumbai',
      stats: '3/28 (4.0)'
    },
    // Two innings, each with batting, extras, total, fall of wickets, and opposition bowling
    innings: [
      {
        team: 'Mumbai',
        runs: 182,
        wickets: 6,
        overs: 20.0,
        batting: [
          { name: 'R. Sharma (C)', dismissal: 'c deep mid-wicket b Chahar', runs: 54, balls: 38, fours: 6, sixes: 2, sr: 142.1 },
          { name: 'I. Kishan (WK)', dismissal: 'b Theekshana', runs: 22, balls: 16, fours: 3, sixes: 1, sr: 137.5 },
          { name: 'S. Yadav', dismissal: 'c long-off b Jadeja', runs: 42, balls: 25, fours: 5, sixes: 2, sr: 168.0 },
          { name: 'T. Varma', dismissal: 'run out (direct)', runs: 18, balls: 12, fours: 2, sixes: 1, sr: 150.0 },
          { name: 'H. Pandya', dismissal: 'not out', runs: 24, balls: 16, fours: 1, sixes: 2, sr: 150.0 },
          { name: 'T. David', dismissal: 'not out', runs: 12, balls: 9, fours: 1, sixes: 0, sr: 133.3 },
        ],
        didNotBat: ['P. Chawla', 'J. Bumrah', 'A. Madhwal', 'R. Shepherd', 'K. Kartikeya'],
        extras: { b: 0, lb: 4, w: 12, nb: 0, p: 0 },
        total: { runs: 182, wickets: 6, overs: 20.0 },
        fallOfWickets: [
          { score: '49-1', over: '6.1', player: 'I. Kishan' },
          { score: '96-2', over: '11.4', player: 'R. Sharma' },
          { score: '124-3', over: '14.2', player: 'S. Yadav' },
          { score: '142-4', over: '16.1', player: 'T. Varma' },
        ],
        bowling: [
          { name: 'D. Chahar', overs: 4, maidens: 0, runs: 36, wickets: 1, econ: 9.0 },
          { name: 'M. Theekshana', overs: 4, maidens: 0, runs: 34, wickets: 2, econ: 8.5 },
          { name: 'R. Jadeja', overs: 4, maidens: 0, runs: 28, wickets: 1, econ: 7.0 },
          { name: 'T. Deshpande', overs: 4, maidens: 0, runs: 42, wickets: 0, econ: 10.5 },
        ],
      },
      {
        team: 'Chennai',
        runs: 176,
        wickets: 8,
        overs: 20.0,
        batting: [
          { name: 'R. Gaikwad (C)', dismissal: 'c point b Bumrah', runs: 48, balls: 34, fours: 5, sixes: 1, sr: 141.2 },
          { name: 'D. Conway', dismissal: 'lbw b Chawla', runs: 35, balls: 28, fours: 4, sixes: 1, sr: 125.0 },
          { name: 'S. Dube', dismissal: 'c long-on b Shepherd', runs: 22, balls: 15, fours: 1, sixes: 2, sr: 146.7 },
          { name: 'M. Ali', dismissal: 'b Bumrah', runs: 11, balls: 9, fours: 1, sixes: 0, sr: 122.2 },
          { name: 'R. Jadeja', dismissal: 'not out', runs: 27, balls: 18, fours: 2, sixes: 1, sr: 150.0 },
          { name: 'M. Dhoni (WK)', dismissal: 'c deep mid b Bumrah', runs: 10, balls: 6, fours: 1, sixes: 0, sr: 166.7 },
        ],
        didNotBat: ['D. Chahar', 'M. Theekshana', 'T. Deshpande', 'M. Santner'],
        extras: { b: 0, lb: 6, w: 12, nb: 1, p: 0 },
        total: { runs: 176, wickets: 8, overs: 20.0 },
        fallOfWickets: [
          { score: '54-1', over: '6.5', player: 'D. Conway' },
          { score: '101-2', over: '12.2', player: 'R. Gaikwad' },
          { score: '118-3', over: '14.1', player: 'S. Dube' },
          { score: '141-4', over: '16.5', player: 'M. Ali' },
        ],
        bowling: [
          { name: 'J. Bumrah', overs: 4, maidens: 0, runs: 28, wickets: 3, econ: 7.0 },
          { name: 'P. Chawla', overs: 4, maidens: 0, runs: 30, wickets: 1, econ: 7.5 },
          { name: 'R. Shepherd', overs: 4, maidens: 0, runs: 36, wickets: 1, econ: 9.0 },
          { name: 'A. Madhwal', overs: 4, maidens: 0, runs: 40, wickets: 0, econ: 10.0 },
        ],
      },
    ],
    commentary: [
      '19.6: Yorker! Mumbai seal it by 6 runs.',
      '18.2: Slower ball deceives the batter, dot ball.',
      '16.5: Bowled him! Stumps disturbed. Momentum with Mumbai.',
      '15.0: Strategic time-out. CSK need 48 off 30.',
    ],
    // Structured commentary by over (demo sample)
    commentaryOvers: [
      {
        over: 19,
        summary: 'End of over 19',
        totalRuns: 8,
        symbols: ['1','1','6','0','0','0'],
        striker: { name: 'R. Jadeja', summary: '27* (18)' },
        nonStriker: { name: 'M. Dhoni', summary: '10 (6)' },
        bowler: { name: 'J. Bumrah', summary: '3/28 (4.0)' },
        highlights: [
          { type: 'milestone', title: '3 wicket haul', subtitle: 'J. Bumrah 3/28 (4.0)', color: 'blue', player: 'J. Bumrah' }
        ],
        balls: [
          { ball: '18.1', symbol: '1', text: 'Bumrah to Jadeja, back of a length, steered behind point for a single.' },
          { ball: '18.2', symbol: '1', text: 'Full on middle, Jadeja flicks to deep square for one.' },
          { ball: '18.3', symbol: '6', text: 'Slower bumper, Jadeja picks it and dispatches over mid-wicket for a biggie!' },
          { ball: '18.4', symbol: '•', text: 'Good yorker, squeezed back to the bowler. Dot.' },
          { ball: '18.5', symbol: '•', text: 'Another pinpoint yorker, Jadeja can’t get it away.' },
          { ball: '18.6', symbol: '•', text: 'Wide yorker attempted, legal and dots it out.' }
        ],
        footer: '10:17 pm  Bumrah closes out brilliantly. Chennai need 10 off the last over.'
      }
    ],
    partnerships: [
      // Mumbai innings partnerships
      { team: 'Mumbai', players: ['R. Sharma', 'I. Kishan'], runs: 49, balls: 39 },
      { team: 'Mumbai', players: ['R. Sharma', 'S. Yadav'], runs: 76, balls: 52 },
      { team: 'Mumbai', players: ['S. Yadav', 'T. Varma'], runs: 28, balls: 16 },
      { team: 'Mumbai', players: ['H. Pandya', 'T. David'], runs: 22, balls: 14 },
      { team: 'Mumbai', players: ['T. David', 'P. Chawla'], runs: 7, balls: 6 },

      // Chennai innings partnerships
      { team: 'Chennai', players: ['R. Gaikwad', 'D. Conway'], runs: 61, balls: 44 },
      { team: 'Chennai', players: ['R. Gaikwad', 'S. Dube'], runs: 21, balls: 15 },
      { team: 'Chennai', players: ['S. Dube', 'M. Ali'], runs: 13, balls: 12 },
      { team: 'Chennai', players: ['R. Jadeja', 'M. Dhoni'], runs: 22, balls: 14 },
      { team: 'Chennai', players: ['R. Jadeja', 'Tail'], runs: 18, balls: 10 },
    ],
    // Per-over cumulative runs (worm) for each innings (T20: 20 overs)
    worm: {
      // Roughly matches totals: Mumbai 182, Chennai 176
      Mumbai: [6, 18, 27, 38, 49, 62, 78, 92, 105, 116, 128, 138, 148, 156, 162, 168, 173, 177, 180, 182],
      Chennai: [7, 16, 27, 36, 49, 61, 74, 88, 99, 110, 122, 133, 142, 151, 158, 164, 168, 171, 174, 176]
    },
    // Short highlight videos (CC0 placeholders)
    videos: [
      {
        id: 'v1',
        title: 'Bumrah yorker montage',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        thumb: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
        duration: '0:30'
      },
      {
        id: 'v2',
        title: 'Rohit powerplay boundaries',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        thumb: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop',
        duration: '0:22'
      },
      {
        id: 'v3',
        title: 'Jadeja fielding highlights',
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        thumb: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop',
        duration: '0:18'
      }
    ],
    // Optional per-player wagon splits (8 slices, sum = runs)
    wagonSplits: {
      'R. Sharma': [8, 7, 6, 10, 7, 6, 5, 5],
      'S. Yadav': [5, 6, 4, 7, 5, 5, 5, 5],
      'R. Gaikwad': [6, 5, 7, 8, 5, 6, 5, 6],
      'R. Jadeja': [3, 4, 4, 3, 3, 4, 3, 3]
    },
    squads: {
      Mumbai: ['R. Sharma (C)', 'I. Kishan (WK)', 'S. Yadav', 'T. Varma', 'H. Pandya', 'T. David', 'P. Chawla', 'J. Bumrah', 'A. Madhwal', 'R. Shepherd', 'K. Kartikeya'],
      Chennai: ['R. Gaikwad (C)', 'D. Conway', 'A. Rayudu', 'S. Dube', 'M. Ali', 'R. Jadeja', 'M. Dhoni (WK)', 'D. Chahar', 'M. Theekshana', 'T. Deshpande', 'M. Santner'],
    },
    // Optional player roles to enrich Playing XI
    playerRoles: {
      // Mumbai
      'R. Sharma': 'Batter (Opener)',
      'I. Kishan': 'WK-Batter (Opener)',
      'S. Yadav': 'Batter (Top order)',
      'T. Varma': 'Batter (Middle order)',
      'H. Pandya': 'All-rounder',
      'T. David': 'Batter (Finisher)',
      'P. Chawla': 'Bowler (Spin)',
      'J. Bumrah': 'Bowler (Pace)',
      'A. Madhwal': 'Bowler (Pace)',
      'R. Shepherd': 'All-rounder',
      'K. Kartikeya': 'Bowler (Spin)',

      // Chennai
      'R. Gaikwad': 'Batter (Opener)',
      'D. Conway': 'Batter (Opener)',
      'A. Rayudu': 'Batter (Middle order)',
      'S. Dube': 'All-rounder',
      'M. Ali': 'All-rounder (Spin)',
      'R. Jadeja': 'All-rounder (Spin)',
      'M. Dhoni': 'WK-Batter',
      'D. Chahar': 'Bowler (Pace)',
      'M. Theekshana': 'Bowler (Spin)',
      'T. Deshpande': 'Bowler (Pace)',
      'M. Santner': 'Bowler (Spin)'
    },
    // Optional per-team logo URLs (SVG/PNG). Keys match team names here.
    teamLogos: {
      // Use Wikipedia's Special:FilePath to resolve to the raw SVG asset.
      Mumbai: 'https://en.wikipedia.org/wiki/Special:FilePath/Mumbai_Indians_Logo.svg',
      Chennai: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/500px-Chennai_Super_Kings_Logo.svg.png'
    },
    // Optional image map for players (keys should be names without (C)/(WK))
    playerImages: {
      'R. Sharma': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Prime_Minister_Of_Bharat_Shri_Narendra_Damodardas_Modi_with_Shri_Rohit_Gurunath_Sharma_%28Cropped%29.jpg/500px-Prime_Minister_Of_Bharat_Shri_Narendra_Damodardas_Modi_with_Shri_Rohit_Gurunath_Sharma_%28Cropped%29.jpg',
      'I. Kishan': 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'S. Yadav': 'https://images.unsplash.com/photo-1542300051-2db408c0a31b?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'T. Varma': 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'H. Pandya': 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'T. David': 'https://images.unsplash.com/photo-1527980965255-8bacc20a862e?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'P. Chawla': 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'J. Bumrah': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Jasprit_Bumrah_in_PMO_New_Delhi.jpg/500px-Jasprit_Bumrah_in_PMO_New_Delhi.jpg',
      'A. Madhwal': 'https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'R. Shepherd': 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'K. Kartikeya': 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',

      'R. Gaikwad': 'https://documents.iplt20.com/ipl/IPLHeadshot2024/102.png',
      'D. Conway': 'https://images.unsplash.com/photo-1527980965255-8bacc20a862e?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'A. Rayudu': 'https://images.unsplash.com/photo-1527980965255-3c830dcef7c2?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'S. Dube': 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'M. Ali': 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'R. Jadeja': 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'M. Dhoni': 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'D. Chahar': 'https://images.unsplash.com/photo-1542300051-2db408c0a31b?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'M. Theekshana': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'T. Deshpande': 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&auto=format&fit=crop&crop=faces&w=240&h=240',
      'M. Santner': 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&auto=format&fit=crop&crop=faces&w=240&h=240'
    },
  },
  // Soccer example (LaLiga-style)
  s1: {
    info: {
      venue: 'Reale Arena, San Sebastián',
      referee: 'Referee: Alejandro Hernández',
      timings: 'Kickoff 20:00 local',
      result: ''
    },
    soccer: {
      score: { home: 1, away: 2, minute: 72, phase: '2H' },
      goals: [
        { team: 'Barcelona', player: 'R. Lewandowski', minute: 34 },
        { team: 'Real Sociedad', player: 'M. Oyarzabal', minute: 51 },
        { team: 'Barcelona', player: 'Pedri', minute: 68 }
      ],
      cards: [
        { team: 'Real Sociedad', player: 'I. Zubeldia', minute: 42, type: 'yellow' },
        { team: 'Barcelona', player: 'Gavi', minute: 59, type: 'yellow' }
      ]
    },
    stats: {
      possession: { home: 47, away: 53 },
      shots: { home: 12, away: 15 },
      shotsOnTarget: { home: 5, away: 7 },
      passes: { home: 412, away: 476 },
      corners: { home: 6, away: 5 },
      fouls: { home: 10, away: 8 },
      yellow: { home: 2, away: 3 },
      red: { home: 0, away: 0 }
    },
    lineups: {
      'Real Sociedad': {
        formation: '4-3-3',
        players: [
          'A. Remiro (GK)', 'A. Elustondo', 'R. Le Normand', 'I. Zubeldia', 'A. Muñoz',
          'M. Merino', 'B. Méndez', 'T. Kubo', 'M. Oyarzabal (C)', 'A. Sorloth', 'O. Sadiq'
        ]
      },
      'Barcelona': {
        formation: '4-3-3',
        players: [
          'M. ter Stegen (GK)', 'J. Koundé', 'R. Araújo', 'I. Martínez', 'A. Balde',
          'F. de Jong', 'Gavi', 'Pedri', 'Raphinha', 'R. Lewandowski (C)', 'Ferran Torres'
        ]
      }
    },
    commentaryTimeline: [
      { minute: 5, text: 'Early pressure from Barcelona, corner won.' },
      { minute: 21, text: 'Shot from Oyarzabal, saved by ter Stegen.' },
      { minute: 34, text: 'GOAL! Lewandowski finishes low to the far post.' },
      { minute: 51, text: 'GOAL! Oyarzabal equalizes with a curled finish.' },
      { minute: 68, text: 'GOAL! Pedri taps in after a cutback from Raphinha.' },
      { minute: 72, text: 'Substitution: Ferran Torres on for Raphinha.' }
    ],
    teamLogos: {
      'Real Sociedad': 'https://upload.wikimedia.org/wikipedia/en/1/1e/Real_Sociedad_logo.svg',
      'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg'
    }
  },
};
