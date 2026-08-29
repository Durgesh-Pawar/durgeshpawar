/* ---------------------------------------------------------------------------
   content.js — the only file you edit to change what the CV says.

   Translatable values are objects: { en: "...", no: "..." }
   Language-neutral values (dates, emails, URLs) are plain strings, so they
   cannot drift between the two language versions.

   Anything still marked TODO_NO is untranslated. app.js logs a list of these
   to the browser console on load so nothing ships half-translated.
--------------------------------------------------------------------------- */

const TODO_NO = null; // sentinel: falls back to English and warns in console

const CONTENT = {

  /* --- identity ---------------------------------------------------------- */
  person: {
    name: "Durgesh Pawar",

    // The most-read line on the page. Domain-forward, deliberately.
    tagline: {
      en: "Software engineer — retail lending and collateral services, Norwegian banking",
      no: TODO_NO
    },

    location: { en: "Oslo, Norway", no: "Oslo, Norge" },
    email: "durgeshpawar.official@gmail.com",

    // TODO: fill these in, then they appear automatically.
    linkedin: "",          // e.g. "https://linkedin.com/in/durgeshpawar"
    github: "",            // e.g. "https://github.com/durgeshpawar"
    photo: "assets/photo.jpeg",

    // TODO: 3–4 sentences, written by you. Replace this placeholder.
    profile: {
      en: "PLACEHOLDER — profile paragraph goes here. Three or four sentences: what you know, who you have done it for, and where you are heading.",
      no: TODO_NO
    }
  },

  /* --- experience --------------------------------------------------------
     One employer, three chronological phases. Each phase shows its period
     and title up front; `role` / `summary` / `stack` only show once the
     visitor hovers or clicks that phase's "Details" toggle (see .entry
     --expandable in styles.css and renderExperience() in app.js). The
     summaries below are condensed from the original bullet list, split by
     theme — edit freely, this is a draft, not a placeholder.
  ----------------------------------------------------------------------- */
  experience: [
    {
      employer: "Tata Consultancy Services Limited",
      client: { en: "Client: DNB Bank ASA — Collateral Services", no: TODO_NO },
      note: { en: "On-site Oslo: May 2025 – Oct 2026", no: TODO_NO },
      phases: [
        {
          period: "Oct 2021 – May 2023",
          title: { en: "Legacy application maintenance", no: TODO_NO },
          role: { en: "Software Engineer", no: TODO_NO },
          summary: {
            en: "Maintained and extended a legacy .NET Windows application supporting DNB's collateral operations, delivering new requirements and defect fixes against a stable, business-critical codebase over a mainframe data layer. Owned end-to-end incident diagnosis across the property title registration pipeline spanning DNB, Ambita and Kartverket, and built automated regression testing for the application.",
            no: TODO_NO
          },
          stack: [".NET", "Windows Forms", "Mainframe integration", "SQL"]
        },
        {
          period: "Jun 2023 – Apr 2025",
          title: { en: "Windows-to-cloud modernisation", no: TODO_NO },
          role: { en: "Software Engineer", no: TODO_NO },
          summary: {
            en: "Contributed to modernisation of the legacy desktop application toward a web-based architecture, developing the .NET API layer over the existing mainframe backend.",
            no: TODO_NO
          },
          stack: [".NET API", "REST", "Mainframe integration"]
        },
        {
          period: "May 2025 – present",
          title: { en: "Domain APIs for collateral services", no: TODO_NO },
          role: { en: "Software Engineer", no: TODO_NO },
          summary: {
            en: "Developing domain APIs for core collateral services functionality, enabling multiple modern applications to consume collateral capabilities through a shared interface.",
            no: TODO_NO
          },
          stack: ["REST APIs", "Domain-driven design", ".NET"]
        }
      ]
    }
  ],

  /* --- projects ---------------------------------------------------------
     Shared by the resume (which hides `status: "wip"` entries — no
     "coming soon" placeholders in public) and projects.html (which shows
     every entry, including wip, with a status badge).

     `diagram`: an ordered list of stage labels rendered as a simple
     left-to-right flow on projects.html. Optional — falls back to `stack`
     when omitted, so it never blocks a project from shipping.
  ----------------------------------------------------------------------- */
  projects: [
    {
      name: { en: "Collateral Register API", no: TODO_NO },
      period: "TODO",
      status: "wip",
      summary: { en: "PLACEHOLDER — one paragraph on what it does and why.", no: TODO_NO },
      stack: ["Python", "FastAPI", "PostgreSQL", "Azure"],
      diagram: ["Client apps", "REST API", "PostgreSQL", "Azure"],
      url: "", repo: ""
    },
    {
      name: { en: "Valuation Document Pipeline", no: TODO_NO },
      period: "TODO",
      status: "wip",
      summary: { en: "PLACEHOLDER — one paragraph on what it does and why.", no: TODO_NO },
      stack: ["Python", "Azure Functions", "Document Intelligence"],
      diagram: ["Document upload", "Azure Functions", "Document Intelligence", "Structured output"],
      url: "", repo: ""
    },
    {
      name: { en: "Collateral Intelligence Platform", no: TODO_NO },
      period: "TODO",
      status: "wip",
      summary: { en: "PLACEHOLDER — one paragraph on what it does and why.", no: TODO_NO },
      stack: ["Python", "pgvector", "Azure OpenAI"],
      diagram: ["Data ingestion", "pgvector store", "Azure OpenAI", "Insights"],
      url: "", repo: ""
    }
  ],

  /* --- technical skills ---------------------------------------------------
     `core`: what you'd lead with in an interview.
     `practiced`: every skill you've actually used, each with a one-line
     "what I did with it" — evidence, not just a word in a list.
  ----------------------------------------------------------------------- */
  techSkills: {
    core: ["Python", "C# / .NET", "SQL", "REST API design"],

    practiced: [
      { name: "Python", note: {
        en: "Automation scripts and API prototyping for internal tooling.", no: TODO_NO } },
      { name: "C# / .NET", note: {
        en: "Maintained and extended a legacy Windows desktop app, then built the new API layer over it.", no: TODO_NO } },
      { name: "SQL", note: {
        en: "Diagnosed data issues across a mainframe-backed banking data layer.", no: TODO_NO } },
      { name: "Azure Functions", note: {
        en: "Building serverless pipelines for collateral document processing.", no: TODO_NO } },
      { name: "REST API design", note: {
        en: "Designed domain APIs exposing collateral services to multiple consuming applications.", no: TODO_NO } },
      { name: "Test automation", note: {
        en: "Built automated regression tests for the collateral desktop application.", no: TODO_NO } },
      { name: "Git", note: {
        en: "Daily version control across legacy and modern codebases.", no: TODO_NO } },
      { name: "Docker", note: {
        en: "Containerising services as part of ongoing modernisation work.", no: TODO_NO } }
    ]
  },

  /* --- domain knowledge --------------------------------------------------
     Deliberately first among the capability sections. It is the thing you
     have that other candidates do not.
  ----------------------------------------------------------------------- */
  domain: {
    heading: { en: "Domain", no: "Fagområde" },
    items: {
      en: [
        "Collateral management and secured lending",
        "Property title registration: DNB — Ambita — Kartverket",
        "Mortgage deed handling and register updates",
        "Mainframe-backed banking operations"
      ],
      no: TODO_NO
    }
  },

  /* --- skills ------------------------------------------------------------
     Grouped lists, no proficiency bars. Evidence lives in the projects.
  ----------------------------------------------------------------------- */
  skills: [
    { group: { en: "Languages", no: TODO_NO }, items: ["Python", "C#", ".NET", "SQL"] },
    { group: { en: "Cloud", no: TODO_NO }, items: ["Azure", "Azure Functions", "Static Web Apps"] },
    { group: { en: "Practice", no: TODO_NO }, items: ["REST API design", "Test automation", "Git", "Docker"] }
  ],

  /* --- education --------------------------------------------------------- */
  education: [
    {
      degree: { en: "Bachelor of Engineering, Mechanical Engineering", no: TODO_NO },
      school: "K. K. Wagh Institute of Engineering Education and Research, Nashik",
      detail: { en: "Savitribai Phule Pune University", no: TODO_NO },
      period: "2019"
    }
  ],

  certifications: [
    { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", period: "TODO" }
  ],

  /* --- languages ---------------------------------------------------------
     cefr: one of A1 A2 B1 B2 C1 C2, or native: true for mother tongues.
     TODO: set your real levels for Hindi and English.
  ----------------------------------------------------------------------- */
  languages: [
    { name: { en: "Marathi", no: "Marathi" }, native: true },
    { name: { en: "Hindi", no: "Hindi" }, cefr: "C2" },
    { name: { en: "English", no: "Engelsk" }, cefr: "C1",
      note: { en: "Professional working language", no: TODO_NO } },
    { name: { en: "Norwegian", no: "Norsk" }, cefr: "A1",
      note: { en: "Sitting Norskprøven A1–A2, September 2026", no: TODO_NO } }
  ],

  /* --- about page ---------------------------------------------------------
     Personal side of the site: who you are outside of work, hobbies, this
     year's goals, and links to your profiles. Social entries always render
     (fill in `url` when the profile exists — until then the button links
     nowhere and is visibly muted).
  ----------------------------------------------------------------------- */
  about: {
    tagline: {
      en: "Quiet by nature, cheerful by default.",
      no: TODO_NO
    },

    paragraph: {
      en: "I'm an introvert at heart — quiet, easygoing, and pretty much always cheerful once a conversation gets going. Outside of work you'll find me deep into an anime series, tracking the stock market, chasing a save on some game, or trying to out-think an opponent over a chess board. I like slow travel over checklists, and I'm slowly building an eye for cinematography — noticing how a shot is framed as much as what happens in it.",
      no: TODO_NO
    },

    // Emoji doubles as a small inline illustration — no image assets needed.
    hobbies: [
      { emoji: "🎌", label: { en: "Anime", no: TODO_NO }, link: "anime.html" },
      { emoji: "📈", label: { en: "Stock Market", no: TODO_NO }, link: "stockmarket.html" },
      { emoji: "🎮", label: { en: "Gaming", no: TODO_NO }, link: "games.html" },
      { emoji: "🏋️", label: { en: "Workout", no: TODO_NO }, link: "workout.html" },
      { emoji: "♟️", label: { en: "Chess", no: TODO_NO }, link: "chess.html" },
      { emoji: "✈️", label: { en: "Travel", no: TODO_NO }, link: "travel.html" },
      { emoji: "🎥", label: { en: "Cinematography", no: TODO_NO }, link: "cinematography.html" }
    ],

    // Year-by-year goal sheet. Add a new { year, items } entry each January.
    goals: [
      {
        year: "2026",
        items: [
          { en: "Learn Norwegian", no: TODO_NO },
          { en: "Run a half marathon", no: TODO_NO }
        ]
      }
    ],

    // `key` selects the icon in app.js. Fill in `url` as each profile goes
    // live — the button still renders before that, just visibly muted.
    social: [
      { key: "email",     label: "Email",       url: "mailto:durgeshpawar.official@gmail.com" },
      { key: "github",    label: "GitHub",      url: "https://github.com/Durgesh-Pawar" },
      { key: "linkedin",  label: "LinkedIn",    url: "https://www.linkedin.com/in/durgesh-pawar-5a5333216" },
      { key: "instagram", label: "Instagram",   url: "https://www.instagram.com/durgesh.pawar" },
      { key: "youtube",   label: "YouTube",     url: "https://youtube.com/@durgesh_pawar07" },
      { key: "twitter",   label: "X / Twitter", url: "" },
      { key: "duolingo",  label: "Duolingo",    url: "https://invite.duolingo.com/profile-share/DurgeshPawar07?via=share_profile_qr" },
      { key: "chesscom",  label: "Chess.com",   url: "https://www.chess.com/member/durgesh_p" }
    ]
  },

  /* --- blog -------------------------------------------------------------
     Posts render newest-first — no need to reorder this array by hand,
     app.js sorts by `date`. `date` is a plain "YYYY-MM-DD" string (no
     locale formatting, so it can't drift between en/no).
  ----------------------------------------------------------------------- */
  blog: {
    posts: [
      {
        title: { en: "PLACEHOLDER — first post title", no: TODO_NO },
        date: "2026-08-29",
        body: {
          en: "PLACEHOLDER — write the post here. A paragraph or a few is fine; this renders as plain prose, no markdown.",
          no: TODO_NO
        }
      }
    ]
  },

  /* --- travel ---------------------------------------------------------------
     Drives the world map and flag list on travel.html. `iso3` must match a
     country id in assets/world-map.svg (ISO 3166-1 alpha-3); `iso2` builds
     the flag emoji. `home: true` gets a pin marker instead of the usual ×
     (current residence); `homeCountry: true` is just a note in the flag
     list (country of origin), same × marker as everywhere else.

     Vatican City is too small to appear as its own shape at this map's
     resolution, so it's placed as a fixed point (`cx`/`cy`, in the same
     lon / -lat coordinate space as the map) rather than matched to a path.
  ----------------------------------------------------------------------- */
  travel: {
    visited: [
      { name: "Norway",         iso3: "NOR", iso2: "NO", home: true },
      { name: "Denmark",        iso3: "DNK", iso2: "DK" },
      { name: "Sweden",         iso3: "SWE", iso2: "SE" },
      { name: "Netherlands",    iso3: "NLD", iso2: "NL" },
      { name: "Germany",        iso3: "DEU", iso2: "DE" },
      { name: "France",         iso3: "FRA", iso2: "FR" },
      { name: "Italy",          iso3: "ITA", iso2: "IT" },
      { name: "Vatican City",   iso3: "VAT", iso2: "VA", cx: 12.45, cy: -41.90 },
      { name: "Poland",         iso3: "POL", iso2: "PL" },
      { name: "Belgium",        iso3: "BEL", iso2: "BE" },
      { name: "Czech Republic", iso3: "CZE", iso2: "CZ" },
      { name: "Hungary",        iso3: "HUN", iso2: "HU" },
      { name: "Austria",        iso3: "AUT", iso2: "AT" },
      { name: "India",          iso3: "IND", iso2: "IN", homeCountry: true }
    ]
  },

  /* --- gaming ---------------------------------------------------------------
     Drives games.html. `current` and `played` are both { name, platform,
     note } — note is a one-line "what it's about / why it stuck".
  ----------------------------------------------------------------------- */
  gaming: {
    current: [
      { name: "PLACEHOLDER — game title", platform: "PC", note: { en: "PLACEHOLDER — what you're doing in it right now.", no: TODO_NO } }
    ],
    played: [
      { name: "PLACEHOLDER — game title", platform: "PC", note: { en: "PLACEHOLDER — one line on it.", no: TODO_NO } }
    ]
  },

  /* --- chess ------------------------------------------------------------
     chess.html fetches live rating/record/recent-games straight from
     chess.com's public read-only API using this username — nothing here
     needs updating when your rating changes.
  ----------------------------------------------------------------------- */
  chess: {
    username: "durgesh_p"
  },

  /* --- anime --------------------------------------------------------------
     Crunchyroll has no public API for a personal watch list, so this is a
     plain list you update by hand — same convention as everything else in
     this file. `episode` is optional ("PLACEHOLDER" or e.g. "Ep. 8").
  ----------------------------------------------------------------------- */
  anime: {
    watching: [
      { name: "PLACEHOLDER — anime title", episode: "PLACEHOLDER" }
    ]
  },

  /* --- workout ------------------------------------------------------------
     Drives workout.html. `routine` is your current split/schedule;
     `personalBests` is lift name + your best number — plain strings, no
     unit conversion, so write them exactly how you want them shown.
  ----------------------------------------------------------------------- */
  workout: {
    routine: [
      { day: "PLACEHOLDER — e.g. Push Day", note: { en: "PLACEHOLDER — main lifts / focus for this day.", no: TODO_NO } }
    ],
    personalBests: [
      { lift: "PLACEHOLDER — e.g. Bench Press", value: "PLACEHOLDER — e.g. 80 kg" }
    ]
  },

  /* --- cinematography -------------------------------------------------------
     Drives cinematography.html. `gear` is what you shoot with; `work` is
     recent shots/edits/projects — one line each, photos/video come later
     (same "coming soon" convention as the About page gallery).
  ----------------------------------------------------------------------- */
  cinematography: {
    gear: [
      { name: "PLACEHOLDER — e.g. Camera body", note: { en: "PLACEHOLDER", no: TODO_NO } }
    ],
    work: [
      { name: "PLACEHOLDER — project or shot title", note: { en: "PLACEHOLDER — one line about it.", no: TODO_NO } }
    ]
  },

  /* --- stock market -------------------------------------------------------
     stockmarket.html shows this watchlist as live TradingView chart
     widgets (official embed, no API key) — `symbol` must be a valid
     TradingView symbol, e.g. "NASDAQ:AAPL" or "OSL:EQNR".
  ----------------------------------------------------------------------- */
  stocks: {
    watchlist: [
      { symbol: "NASDAQ:AAPL", note: { en: "PLACEHOLDER — why you're watching it.", no: TODO_NO } }
    ]
  },

  /* --- interface strings ------------------------------------------------- */
  ui: {
    profile:        { en: "Profile",        no: "Om meg" },
    experience:     { en: "Experience",     no: "Erfaring" },
    details:        { en: "Details",        no: "Detaljer" },
    projects:       { en: "Projects",       no: "Prosjekter" },
    skills:         { en: "Skills",         no: "Ferdigheter" },
    education:      { en: "Education",      no: "Utdanning" },
    certifications: { en: "Certifications", no: "Sertifiseringer" },
    languages:      { en: "Languages",      no: "Språk" },
    native:         { en: "Native",         no: "Morsmål" },
    print:          { en: "Download CV (PDF)", no: "Last ned CV (PDF)" },
    viewProject:    { en: "View",           no: "Se" },
    sourceCode:     { en: "Source",         no: "Kildekode" },
    resumeNav:      { en: "Resume",         no: "CV" },
    aboutNav:       { en: "About",          no: "Om meg" },
    projectsNav:    { en: "Projects",       no: "Prosjekter" },
    blogNav:        { en: "Blog",           no: "Blogg" },
    projectsIntro:  { en: "Technical projects, architecture at a glance, and the skills behind them.", no: TODO_NO },
    aboutMe:        { en: "About me",       no: "Om meg" },
    hobbies:        { en: "Hobbies & Interests", no: "Hobbyer og interesser" },
    goals:          { en: "Goals",          no: "Mål" },
    gallery:        { en: "Photos & Videos", no: "Bilder og videoer" },
    galleryNote:    { en: "Coming soon.",   no: TODO_NO },
    connect:        { en: "Connect",        no: "Følg meg" },
    skillsCore:     { en: "Best at",        no: "Best på" },
    skillsPracticed:{ en: "Skills in practice", no: "Ferdigheter i praksis" },
    statusLive:     { en: "Live",           no: "Live" },
    statusWip:      { en: "In progress",    no: "Pågår" },
    travelTitle:    { en: "Travel",         no: "Reise" },
    travelIntro:    { en: "Countries I've visited so far — marked on the map below.", no: TODO_NO },
    countriesVisited: { en: "Countries visited", no: "Land besøkt" },
    livingHere:     { en: "Living here",    no: "Bor her" },
    homeCountry:    { en: "Home country",   no: "Hjemland" },

    gamesTitle:     { en: "Games",          no: "Spill" },
    gamesIntro:     { en: "What I'm playing right now, and what I've put time into before.", no: TODO_NO },
    currentlyPlaying: { en: "Currently playing", no: "Spiller nå" },
    previouslyPlayed: { en: "Played before",   no: "Har spilt" },

    chessTitle:     { en: "Chess",          no: "Sjakk" },
    chessIntro:     { en: "Live from chess.com — ratings, record, and recent games.", no: TODO_NO },
    chessRatings:   { en: "Ratings",        no: "Rating" },
    chessRecent:    { en: "Recent games",   no: "Siste partier" },
    chessViewProfile: { en: "Full profile on chess.com", no: TODO_NO },
    chessLoading:   { en: "Loading live data from chess.com…", no: TODO_NO },
    chessUnavailable: { en: "Live chess.com data isn't available right now — try again later.", no: TODO_NO },

    animeTitle:     { en: "Anime",          no: "Anime" },
    animeIntro:     { en: "Currently watching — updated by hand, since Crunchyroll doesn't expose this publicly.", no: TODO_NO },

    stocksTitle:    { en: "Stock Market",   no: "Aksjemarked" },
    stocksIntro:    { en: "Stocks on my watchlist, with live charts.", no: TODO_NO },

    workoutTitle:   { en: "Workout",        no: "Trening" },
    workoutIntro:   { en: "My current routine, and personal bests along the way.", no: TODO_NO },
    currentRoutine: { en: "Current routine", no: "Nåværende program" },
    personalBests:  { en: "Personal bests",  no: "Personlige rekorder" },

    cinematographyTitle: { en: "Cinematography", no: "Filmfotografering" },
    cinematographyIntro: { en: "What I shoot with, and recent work.", no: TODO_NO },
    gear:           { en: "Gear",            no: "Utstyr" },
    recentWork:     { en: "Recent work",     no: "Nylig arbeid" },

    blogTitle:      { en: "Blog",            no: "Blogg" },
    blogIntro:      { en: "Notes and write-ups, whenever there's something worth writing down.", no: TODO_NO }
  }
};
