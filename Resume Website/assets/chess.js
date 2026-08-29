/* ---------------------------------------------------------------------------
   chess.js — fetches live rating/record/recent-games from chess.com's
   public read-only API (no key, CORS-open) for chess.html only.

   Change the username in CONTENT.chess.username (content.js), not here.
--------------------------------------------------------------------------- */
(function () {
  "use strict";

  var USERNAME = (window.CONTENT && CONTENT.chess && CONTENT.chess.username) || "";
  var API = "https://api.chess.com/pub/player/" + encodeURIComponent(USERNAME);

  var DRAW_RESULTS = ["agreed", "repetition", "stalemate", "insufficient", "50move", "timevsinsufficient"];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function fmtDate(unixSeconds) {
    return new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric"
    });
  }

  function showError(box, message) {
    if (!box) return;
    box.innerHTML = "";
    box.appendChild(el("p", "chess-error", message));
  }

  function loadProfile() {
    var box = document.querySelector('[data-bind="chessProfile"]');
    if (!box) return;
    fetch(API)
      .then(function (r) { if (!r.ok) throw new Error("profile"); return r.json(); })
      .then(function (p) {
        box.innerHTML = "";
        var row = el("div", "chess-profile-row");
        if (p.avatar) {
          var img = el("img", "chess-avatar");
          img.src = p.avatar; img.alt = "";
          row.appendChild(img);
        }
        var meta = el("div", "chess-meta");
        var nameLine = el("p", "chess-username");
        var a = document.createElement("a");
        a.href = p.url; a.target = "_blank"; a.rel = "noopener";
        a.textContent = "@" + p.username;
        nameLine.appendChild(a);
        meta.appendChild(nameLine);
        if (p.league) meta.appendChild(el("p", "chess-league", p.league + " league"));
        meta.appendChild(el("p", "chess-joined", "On chess.com since " + fmtDate(p.joined)));
        var profileLine = el("p", "chess-view-profile");
        var b = document.createElement("a");
        b.href = p.url; b.target = "_blank"; b.rel = "noopener";
        b.textContent = t(window.CONTENT && CONTENT.ui.chessViewProfile);
        profileLine.appendChild(b);
        meta.appendChild(profileLine);
        row.appendChild(meta);
        box.appendChild(row);
      })
      .catch(function () {
        showError(box, (window.CONTENT && t(CONTENT.ui.chessUnavailable)) || "Live chess.com data isn't available right now.");
      });
  }

  function t(value) {
    // Mirrors app.js's t() minimally — chess.js doesn't share app.js's scope.
    if (value == null) return "";
    if (typeof value === "string") return value;
    var lang = (window.CONTENT && document.documentElement.lang === "nb") ? "no" : "en";
    return value[lang] != null ? value[lang] : value.en;
  }

  function loadStats() {
    var box = document.querySelector('[data-bind="chessStats"]');
    if (!box) return;
    fetch(API + "/stats")
      .then(function (r) { if (!r.ok) throw new Error("stats"); return r.json(); })
      .then(function (s) {
        box.innerHTML = "";
        [["chess_rapid", "Rapid"], ["chess_blitz", "Blitz"], ["chess_bullet", "Bullet"]].forEach(function (pair) {
          var data = s[pair[0]];
          if (!data || !data.last) return;
          var card = el("div", "chess-rating-card");
          card.appendChild(el("p", "chess-rating-label", pair[1]));
          card.appendChild(el("p", "chess-rating-value", String(data.last.rating)));
          if (data.record) {
            card.appendChild(el("p", "chess-rating-record",
              data.record.win + "W – " + data.record.loss + "L – " + data.record.draw + "D"));
          }
          box.appendChild(card);
        });
        if (!box.children.length) showError(box, "No rated games yet.");
      })
      .catch(function () {
        showError(box, (window.CONTENT && t(CONTENT.ui.chessUnavailable)) || "Live chess.com data isn't available right now.");
      });
  }

  function loadRecentGames() {
    var box = document.querySelector('[data-bind="chessGames"]');
    if (!box) return;
    fetch(API + "/games/archives")
      .then(function (r) { if (!r.ok) throw new Error("archives"); return r.json(); })
      .then(function (arch) {
        var urls = (arch.archives || []).slice(-3).reverse();
        var games = [];
        function next(i) {
          if (i >= urls.length || games.length >= 5) return finish();
          return fetch(urls[i])
            .then(function (r) { return r.ok ? r.json() : { games: [] }; })
            .then(function (d) {
              games = games.concat(d.games || []);
              return next(i + 1);
            });
        }
        function finish() {
          games.sort(function (a, b) { return b.end_time - a.end_time; });
          games = games.slice(0, 5);
          box.innerHTML = "";
          if (!games.length) return showError(box, "No recent games found.");
          games.forEach(function (g) {
            var mine = g.white.username.toLowerCase() === USERNAME.toLowerCase() ? g.white : g.black;
            var opp = g.white.username.toLowerCase() === USERNAME.toLowerCase() ? g.black : g.white;
            var result = mine.result === "win" ? "Won"
              : DRAW_RESULTS.indexOf(mine.result) !== -1 ? "Drew" : "Lost";
            var row = document.createElement("a");
            row.className = "chess-game-row";
            row.href = g.url; row.target = "_blank"; row.rel = "noopener";
            row.appendChild(el("span", "chess-game-result chess-game-result--" + result.toLowerCase(), result));
            row.appendChild(el("span", "chess-game-opponent", "vs " + opp.username));
            row.appendChild(el("span", "chess-game-meta", g.time_class + " · " + fmtDate(g.end_time)));
            box.appendChild(row);
          });
        }
        return next(0);
      })
      .catch(function () {
        showError(box, (window.CONTENT && t(CONTENT.ui.chessUnavailable)) || "Live chess.com data isn't available right now.");
      });
  }

  if (!USERNAME) return;
  loadProfile();
  loadStats();
  loadRecentGames();
})();
