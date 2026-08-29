/* ---------------------------------------------------------------------------
   app.js — renders CONTENT into the shell in index.html.

   You should not need to touch this to change what the CV says. Edit
   content.js instead.
--------------------------------------------------------------------------- */
(function () {
  "use strict";

  var LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  var lang = pickLanguage();

  // null = no explicit choice yet; follow the system's light/dark preference.
  var theme = pickTheme();
  applyTheme();

  /* --- helpers ---------------------------------------------------------- */

  // Resolve a { en, no } pair. Falls back to English when a translation is
  // still TODO_NO, so the page never renders blank.
  function t(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    return value[lang] != null ? value[lang] : value.en;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function slot(name) { return document.querySelector('[data-bind="' + name + '"]'); }

  // Simplified brand marks — not traced logo paths, just enough shape and
  // color to be instantly recognizable at button size.
  var ICONS = {
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4.5" width="20" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 6.5l9 6.5 9-6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#181717"/><text x="4.5" y="16" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="#fff">GH</text></svg>',
    duolingo:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#58CC02"/><text x="3.5" y="16.5" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="#fff">Du</text></svg>',
    chesscom:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#3B3B3B"/><text x="5" y="17.5" font-family="Georgia, serif" font-weight="700" font-size="14" fill="#fff">♞</text></svg>',
    youtube:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="5.5" width="21" height="13" rx="4" fill="#FF0000"/><path d="M10 8.7v6.6l6-3.3z" fill="#fff"/></svg>',
    twitter:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 4.5l15 15M19.5 4.5l-15 15" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#0A66C2"/><rect x="6" y="9.5" width="2.6" height="8.2" fill="#fff"/><circle cx="7.3" cy="6" r="1.5" fill="#fff"/><path d="M11.4 9.5h2.6v1.2c.5-.8 1.4-1.4 2.7-1.4 2 0 3.2 1.3 3.2 3.9v4.5h-2.6v-4.1c0-1.1-.4-1.9-1.4-1.9-.8 0-1.3.6-1.5 1.1-.1.2-.1.5-.1.8v4.1h-2.6z" fill="#fff"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="#C13584" stroke-width="2"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="#C13584" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.15" fill="#C13584"/></svg>'
  };

  function pickLanguage() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "no") return q;
    try {
      var saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "no") return saved;
    } catch (e) { /* storage blocked — fall through */ }
    return "en";
  }

  function pickTheme() {
    try {
      var saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) { /* storage blocked — fall through */ }
    return null; // no explicit choice — follow the system preference
  }

  function effectiveTheme() {
    if (theme) return theme;
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark" : "light";
  }

  function applyTheme() {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");

    var eff = effectiveTheme();
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.dataset.active = eff;
      toggle.querySelectorAll("[data-theme-choice]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.themeChoice === eff));
      });
    }
  }

  function setTheme(next) {
    theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    applyTheme();
  }

  /* --- section renderers ------------------------------------------------ */

  function renderContact() {
    var p = CONTENT.person, ul = slot("contact");
    if (!ul) return;
    ul.innerHTML = "";

    var loc = el("li", null, t(p.location));
    ul.appendChild(loc);

    if (p.email) {
      var li = el("li");
      var a = el("a", null, p.email);
      a.href = "mailto:" + p.email;
      li.appendChild(a); ul.appendChild(li);
    }
    [["linkedin", "LinkedIn"], ["github", "GitHub"]].forEach(function (pair) {
      if (!p[pair[0]]) return;
      var li = el("li"), a = el("a", null, pair[1]);
      a.href = p[pair[0]]; a.rel = "noopener";
      li.appendChild(a); ul.appendChild(li);
    });
  }

  function renderLanguages() {
    var box = slot("languages");
    if (!box) return;
    box.innerHTML = "";

    CONTENT.languages.forEach(function (L) {
      var row = el("div", "lang-row");

      var head = el("div", "lang-head");
      head.appendChild(el("b", null, t(L.name)));
      head.appendChild(el("span", null, L.native ? t(CONTENT.ui.native) : L.cefr));
      row.appendChild(head);

      var bar = el("div", "cefr");
      var filled = L.native ? LEVELS.length : LEVELS.indexOf(L.cefr) + 1;
      for (var i = 0; i < LEVELS.length; i++) {
        bar.appendChild(el("i", i < filled ? "on" : null));
      }
      row.appendChild(bar);

      if (L.note) row.appendChild(el("p", "lang-note", t(L.note)));
      box.appendChild(row);
    });

    // The scale is printed once, so the blocks are self-documenting.
    box.appendChild(el("p", "cefr-scale", LEVELS.join(" · ")));
  }

  function renderSkills() {
    var box = slot("skills");
    if (!box) return;
    box.innerHTML = "";
    CONTENT.skills.forEach(function (g) {
      var d = el("div", "skill-group");
      d.appendChild(el("p", null, t(g.group)));
      d.appendChild(el("span", null, g.items.join(", ")));
      box.appendChild(d);
    });
  }

  function renderEducation() {
    var box = slot("education");
    if (!box) return;
    box.innerHTML = "";
    CONTENT.education.forEach(function (e) {
      var d = el("div", "ed");
      d.appendChild(el("strong", null, t(e.degree)));
      d.appendChild(el("em", null, e.school));
      if (e.detail) d.appendChild(el("em", null, t(e.detail)));
      d.appendChild(el("time", null, e.period));
      box.appendChild(d);
    });
  }

  function renderCertifications() {
    var box = slot("certifications");
    if (!box) return;
    var section = document.querySelector('[data-section="certifications"]');
    var list = CONTENT.certifications || [];
    section.hidden = list.length === 0;
    box.innerHTML = "";
    list.forEach(function (c) {
      var d = el("div", "ed");
      d.appendChild(el("strong", null, c.name));
      if (c.period) d.appendChild(el("time", null, c.period));
      box.appendChild(d);
    });
  }

  function renderExperience() {
    var box = slot("experience");
    if (!box) return;
    box.innerHTML = "";
    CONTENT.experience.forEach(function (job) {
      var group = el("div", "entry-group");

      var head = el("div", "entry-group-head");
      head.appendChild(el("p", "entry-title", job.employer));
      if (job.client) head.appendChild(el("p", "entry-sub", t(job.client)));
      if (job.note) head.appendChild(el("p", "entry-note", t(job.note)));
      group.appendChild(head);

      var phases = el("div", "entry-phases");
      (job.phases || []).forEach(function (ph) {
        var entry = el("div", "entry entry--expandable");
        entry.appendChild(el("p", "entry-period", ph.period));

        var row = el("div", "entry-row");
        row.appendChild(el("p", "entry-title", t(ph.title)));

        var hasDetail = ph.role || ph.summary || (ph.stack && ph.stack.length);
        if (hasDetail) {
          var toggle = el("button", "entry-toggle", t(CONTENT.ui.details));
          toggle.type = "button";
          toggle.setAttribute("aria-expanded", "false");
          row.appendChild(toggle);
        }
        entry.appendChild(row);

        if (hasDetail) {
          var detail = el("div", "entry-detail");
          var inner = el("div", "entry-detail-inner");
          if (ph.role) inner.appendChild(el("p", "entry-detail-role", t(ph.role)));
          if (ph.summary) inner.appendChild(el("p", "entry-body prose", t(ph.summary)));
          if (ph.stack && ph.stack.length) {
            var s = el("div", "stack");
            ph.stack.forEach(function (x) { s.appendChild(el("span", null, x)); });
            inner.appendChild(s);
          }
          detail.appendChild(inner);
          entry.appendChild(detail);

          toggle.addEventListener("click", function () {
            var open = entry.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
          });
        }

        phases.appendChild(entry);
      });
      group.appendChild(phases);

      box.appendChild(group);
    });
  }

  function renderDomain() {
    var heading = slot("domainHeading"), ul = slot("domain");
    if (!heading || !ul) return;
    heading.textContent = t(CONTENT.domain.heading);
    ul.innerHTML = "";
    (t(CONTENT.domain.items) || []).forEach(function (i) { ul.appendChild(el("li", null, i)); });
  }

  function renderProjects() {
    var box = slot("projects");
    if (!box) return;
    var section = document.querySelector('[data-section="projects"]');

    // Work in progress stays off the public page. No "coming soon" cards.
    var live = (CONTENT.projects || []).filter(function (p) { return p.status !== "wip"; });
    section.hidden = live.length === 0;
    box.innerHTML = "";

    live.forEach(function (p) {
      var e = el("div", "entry");
      if (p.period) e.appendChild(el("p", "entry-period", p.period));
      e.appendChild(el("p", "entry-title", t(p.name)));
      e.appendChild(el("p", "entry-body prose", t(p.summary)));

      if (p.stack && p.stack.length) {
        var s = el("div", "stack");
        p.stack.forEach(function (x) { s.appendChild(el("span", null, x)); });
        e.appendChild(s);
      }

      if (p.url || p.repo) {
        var l = el("div", "links");
        if (p.url)  { var a1 = el("a", null, t(CONTENT.ui.viewProject)); a1.href = p.url;  a1.rel = "noopener"; l.appendChild(a1); }
        if (p.repo) { var a2 = el("a", null, t(CONTENT.ui.sourceCode));  a2.href = p.repo; a2.rel = "noopener"; l.appendChild(a2); }
        e.appendChild(l);
      }
      box.appendChild(e);
    });
  }

  function renderTechProjects() {
    var box = slot("techProjects");
    if (!box) return;
    box.innerHTML = "";
    (CONTENT.projects || []).forEach(function (p) {
      var e = el("div", "entry tech-project");

      var head = el("div", "tech-project-head");
      head.appendChild(el("p", "entry-title", t(p.name)));
      var wip = p.status === "wip";
      head.appendChild(el("span", "status-badge " + (wip ? "status-wip" : "status-live"),
        t(CONTENT.ui[wip ? "statusWip" : "statusLive"])));
      e.appendChild(head);

      if (p.period && p.period !== "TODO") e.appendChild(el("p", "entry-period", p.period));
      e.appendChild(el("p", "entry-body prose", t(p.summary)));

      var stages = (p.diagram && p.diagram.length) ? p.diagram : p.stack;
      if (stages && stages.length) {
        var dia = el("div", "diagram");
        stages.forEach(function (s, i) {
          dia.appendChild(el("span", "diagram-stage", s));
          if (i < stages.length - 1) dia.appendChild(el("span", "diagram-arrow", "→"));
        });
        e.appendChild(dia);
      }

      if (p.url || p.repo) {
        var l = el("div", "links");
        if (p.url)  { var a1 = el("a", null, t(CONTENT.ui.viewProject)); a1.href = p.url;  a1.rel = "noopener"; l.appendChild(a1); }
        if (p.repo) { var a2 = el("a", null, t(CONTENT.ui.sourceCode));  a2.href = p.repo; a2.rel = "noopener"; l.appendChild(a2); }
        e.appendChild(l);
      }
      box.appendChild(e);
    });
  }

  function renderSkillsCore() {
    var box = slot("skillsCore");
    if (!box) return;
    box.innerHTML = "";
    ((CONTENT.techSkills && CONTENT.techSkills.core) || []).forEach(function (name) {
      box.appendChild(el("span", "core-skill", name));
    });
  }

  function renderSkillsPracticed() {
    var box = slot("skillsPracticed");
    if (!box) return;
    box.innerHTML = "";
    ((CONTENT.techSkills && CONTENT.techSkills.practiced) || []).forEach(function (s) {
      var row = el("div", "practiced-row");
      row.appendChild(el("span", "practiced-name", s.name));
      row.appendChild(el("span", "practiced-note", t(s.note)));
      box.appendChild(row);
    });
  }

  function renderAboutMe() {
    var tagline = slot("aboutTagline");
    if (tagline) tagline.textContent = t(CONTENT.about.tagline);
    var p = slot("aboutParagraph");
    if (!p) return;
    p.textContent = t(CONTENT.about.paragraph);
  }

  function renderHobbies() {
    var box = slot("hobbies");
    if (!box) return;
    box.innerHTML = "";
    (CONTENT.about.hobbies || []).forEach(function (h) {
      var chip = el(h.link ? "a" : "div", "hobby-chip");
      if (h.link) chip.href = h.link;
      chip.appendChild(el("span", "hobby-emoji", h.emoji));
      chip.appendChild(el("span", "hobby-label", t(h.label)));
      box.appendChild(chip);
    });
  }

  function renderGoals() {
    var box = slot("goals");
    if (!box) return;
    box.innerHTML = "";
    (CONTENT.about.goals || []).forEach(function (y) {
      var card = el("div", "goal-card");
      card.appendChild(el("div", "goal-year", y.year));
      var ul = el("ul", "plain goal-list");
      (y.items || []).forEach(function (g, i) {
        var li = el("li", "goal-item");
        li.appendChild(el("span", "goal-index", String(i + 1)));
        li.appendChild(el("span", "goal-text", t(g)));
        ul.appendChild(li);
      });
      card.appendChild(ul);
      box.appendChild(card);
    });
  }

  function renderSocial() {
    var box = slot("social");
    if (!box) return;
    box.innerHTML = "";
    (CONTENT.about.social || []).forEach(function (s) {
      var a = el("a", "social-btn social-btn--" + s.key);
      a.href = s.url || "#";
      a.title = s.label;
      a.setAttribute("aria-label", s.label);
      if (s.url) {
        a.rel = "noopener";
        if (s.url.indexOf("mailto:") !== 0) a.target = "_blank";
      } else {
        a.setAttribute("aria-disabled", "true");
      }
      a.innerHTML = ICONS[s.key] || "";
      box.appendChild(a);
    });
  }

  function isoToFlagEmoji(iso2) {
    return iso2.toUpperCase().replace(/./g, function (ch) {
      return String.fromCodePoint(127397 + ch.charCodeAt(0));
    });
  }

  function renderTravelMap() {
    var svg = document.getElementById("world-map");
    var marks = document.getElementById("marks");
    if (!svg || !marks) return;

    var byIso = {};
    svg.querySelectorAll(".country").forEach(function (p) {
      byIso[p.dataset.iso] = p;
    });

    marks.innerHTML = "";
    (CONTENT.travel.visited || []).forEach(function (c) {
      var cx = c.cx, cy = c.cy;
      if (cx == null || cy == null) {
        var pathEl = byIso[c.iso3];
        if (!pathEl) return;
        pathEl.classList.add("visited");
        cx = parseFloat(pathEl.dataset.cx);
        cy = parseFloat(pathEl.dataset.cy);
      }

      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "mark" + (c.home ? " mark-home" : ""));
      g.setAttribute("transform", "translate(" + cx + "," + cy + ")");
      g.innerHTML = c.home
        ? '<circle r="1.8" class="mark-dot"/><circle r="0.7" class="mark-dot-core"/>'
        : '<line x1="-1.3" y1="-1.3" x2="1.3" y2="1.3"/><line x1="-1.3" y1="1.3" x2="1.3" y2="-1.3"/>';

      var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = c.name + (c.home ? " — living here" : c.homeCountry ? " — home country" : "");
      g.appendChild(title);
      marks.appendChild(g);
    });
  }

  function renderTravelList() {
    var box = slot("travelFlags");
    if (!box) return;
    box.innerHTML = "";
    (CONTENT.travel.visited || []).forEach(function (c) {
      var item = el("div", "flag-item");
      item.appendChild(el("span", "flag-emoji", isoToFlagEmoji(c.iso2)));
      item.appendChild(el("span", "flag-name", c.name));
      if (c.home) item.appendChild(el("span", "flag-note", t(CONTENT.ui.livingHere)));
      else if (c.homeCountry) item.appendChild(el("span", "flag-note", t(CONTENT.ui.homeCountry)));
      box.appendChild(item);
    });
  }

  function renderGames() {
    function fill(box, list) {
      if (!box) return;
      box.innerHTML = "";
      (list || []).forEach(function (g) {
        var card = el("div", "entry");
        card.appendChild(el("p", "entry-title", g.name + (g.platform ? " — " + g.platform : "")));
        card.appendChild(el("p", "entry-body prose", t(g.note)));
        box.appendChild(card);
      });
    }
    fill(slot("currentGames"), CONTENT.gaming.current);
    fill(slot("pastGames"), CONTENT.gaming.played);
  }

  function renderAnime() {
    var box = slot("animeWatching");
    if (!box) return;
    box.innerHTML = "";
    (CONTENT.anime.watching || []).forEach(function (a) {
      var card = el("div", "entry");
      card.appendChild(el("p", "entry-title", a.name));
      if (a.episode) card.appendChild(el("p", "entry-period", a.episode));
      box.appendChild(card);
    });
  }

  function renderBlog() {
    var box = slot("blogPosts");
    if (!box) return;
    box.innerHTML = "";
    var posts = (CONTENT.blog.posts || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    posts.forEach(function (p) {
      var card = el("div", "entry");
      card.appendChild(el("p", "entry-title", t(p.title)));
      card.appendChild(el("p", "entry-period", p.date));
      card.appendChild(el("p", "entry-body prose", t(p.body)));
      box.appendChild(card);
    });
  }

  function renderWorkout() {
    var routine = slot("workoutRoutine");
    if (routine) {
      routine.innerHTML = "";
      (CONTENT.workout.routine || []).forEach(function (r) {
        var card = el("div", "entry");
        card.appendChild(el("p", "entry-title", r.day));
        card.appendChild(el("p", "entry-body prose", t(r.note)));
        routine.appendChild(card);
      });
    }

    var bests = slot("personalBests");
    if (bests) {
      bests.innerHTML = "";
      (CONTENT.workout.personalBests || []).forEach(function (b) {
        var row = el("div", "pb-row");
        row.appendChild(el("span", "pb-lift", b.lift));
        row.appendChild(el("span", "pb-value", b.value));
        bests.appendChild(row);
      });
    }
  }

  function renderCinematography() {
    var gear = slot("cineGear");
    if (gear) {
      gear.innerHTML = "";
      (CONTENT.cinematography.gear || []).forEach(function (g) {
        var card = el("div", "entry");
        card.appendChild(el("p", "entry-title", g.name));
        card.appendChild(el("p", "entry-body prose", t(g.note)));
        gear.appendChild(card);
      });
    }

    var work = slot("cineWork");
    if (work) {
      work.innerHTML = "";
      (CONTENT.cinematography.work || []).forEach(function (w) {
        var card = el("div", "entry");
        card.appendChild(el("p", "entry-title", w.name));
        card.appendChild(el("p", "entry-body prose", t(w.note)));
        work.appendChild(card);
      });
    }
  }

  // TradingView's official embed widget — free, no API key, config passed
  // as inline JSON text inside the loader <script> tag it looks for.
  function renderStockWatchlist() {
    var box = slot("stockWatchlist");
    if (!box) return;
    box.innerHTML = "";
    var colorTheme = effectiveTheme();
    (CONTENT.stocks.watchlist || []).forEach(function (s) {
      var card = el("div", "stock-card");
      card.appendChild(el("p", "stock-symbol", s.symbol));
      if (s.note) card.appendChild(el("p", "stock-note", t(s.note)));

      var widget = el("div", "tradingview-widget-container");
      widget.appendChild(el("div", "tradingview-widget-container__widget"));
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.text = JSON.stringify({
        symbol: s.symbol, width: "100%", height: 220, locale: "en",
        dateRange: "3M", colorTheme: colorTheme, isTransparent: true, autosize: true
      });
      widget.appendChild(script);
      card.appendChild(widget);
      box.appendChild(card);
    });
  }

  /* --- orchestration ---------------------------------------------------- */

  function render() {
    document.documentElement.lang = lang === "no" ? "nb" : "en";

    document.querySelectorAll('[data-bind="name"]').forEach(function (n) {
      n.textContent = CONTENT.person.name;
    });
    document.querySelectorAll('[data-bind="year"]').forEach(function (n) {
      n.textContent = String(new Date().getFullYear());
    });
    var tagline = slot("tagline");
    if (tagline) tagline.textContent = t(CONTENT.person.tagline);
    var profile = slot("profile");
    if (profile) profile.textContent = t(CONTENT.person.profile);

    var img = slot("photo");
    if (img) {
      img.src = CONTENT.person.photo;
      img.alt = CONTENT.person.name;
    }

    document.querySelectorAll("[data-ui]").forEach(function (n) {
      n.textContent = t(CONTENT.ui[n.dataset.ui]);
    });

    renderContact();
    renderLanguages();
    renderSkills();
    renderEducation();
    renderCertifications();
    renderExperience();
    renderDomain();
    renderProjects();
    renderAboutMe();
    renderHobbies();
    renderGoals();
    renderSocial();
    renderTechProjects();
    renderSkillsCore();
    renderSkillsPracticed();
    renderTravelMap();
    renderTravelList();
    renderGames();
    renderAnime();
    renderStockWatchlist();
    renderWorkout();
    renderCinematography();
    renderBlog();

    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    var toggle = document.querySelector(".lang-toggle");
    if (toggle) toggle.dataset.active = lang;
  }

  function setLanguage(next) {
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem("lang", next); } catch (e) { /* ignore */ }
    render();
  }

  document.querySelectorAll("[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLanguage(b.dataset.lang); });
  });
  document.querySelectorAll("[data-theme-choice]").forEach(function (b) {
    b.addEventListener("click", function () { setTheme(b.dataset.themeChoice); });
  });
  // Live-follow the system if the visitor hasn't made an explicit choice.
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (!theme) applyTheme();
    });
  }

  // Fade-in-on-scroll for content bands. The .reveal class is only ever
  // added here — never in the HTML — so if this never runs (JS error,
  // no IntersectionObserver, reduced-motion), every band is simply
  // visible by default. Progressive enhancement, not a dependency.
  if (window.IntersectionObserver &&
      !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    var bands = document.querySelectorAll(".band--paper, .band--alt");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -60px 0px" });
    bands.forEach(function (b) {
      b.classList.add("reveal");
      io.observe(b);
    });
  }

  /* --- translation completeness check -----------------------------------
     Walks CONTENT and reports every value that has an `en` but no `no`.
     Console only — never shown to visitors.
  --------------------------------------------------------------------- */
  function auditTranslations(node, path, out) {
    if (node === null || typeof node !== "object") return out;
    if (Object.prototype.hasOwnProperty.call(node, "en")) {
      if (node.no == null) out.push(path);
      return out;
    }
    Object.keys(node).forEach(function (k) {
      auditTranslations(node[k], path ? path + "." + k : k, out);
    });
    return out;
  }

  render();

  var missing = auditTranslations(CONTENT, "", []);
  if (missing.length) {
    console.warn(
      "Norwegian translation missing for " + missing.length + " field(s):\n  " +
      missing.join("\n  ") +
      "\nThese fall back to English until translated."
    );
  }
})();
