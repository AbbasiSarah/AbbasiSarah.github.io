// SheCodesAI Code Quest: a small coding game. Challenges live in quest-data.js.
(function () {
  var W = window.QUEST, KEY = 'shecodesai-quest-v1';
  var RANKS = [[0, 'Beginner'], [400, 'Code Explorer'], [900, 'Data Wrangler'], [1500, 'Model Builder'], [2100, 'Neural Ninja'], [2700, 'AI Architect']];
  var S = { xp: 0, worlds: {} };
  try { S = JSON.parse(localStorage.getItem(KEY)) || S; } catch (e) {}
  var run = null;
  var $ = function (id) { return document.getElementById(id); };

  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function rank(xp) { var r = RANKS[0][1]; RANKS.forEach(function (x) { if (xp >= x[0]) r = x[1]; }); return r; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // tiny Python highlighter: escape first, then wrap tokens
  function highlight(line) {
    var out = '', re = /(#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|\b(def|for|in|return|import|from|as|lambda|if|else|print|while|None|True|False)\b|\b(\d+\.?\d*)\b|(____)/g, last = 0, m;
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index));
      var cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'n' : 'b';
      out += '<span class="hl-' + cls + '">' + esc(m[0]) + '</span>';
      last = re.lastIndex;
    }
    return out + esc(line.slice(last));
  }

  function stats() {
    $('qXp').textContent = S.xp;
    $('qRank').textContent = rank(S.xp);
    $('qBadges').textContent = W.filter(function (w) { return S.worlds[w.id] && S.worlds[w.id].done; }).length + ' / ' + W.length;
  }

  function map() {
    $('qPlay').hidden = true; $('qMap').hidden = false; stats();
    $('qMap').innerHTML = W.map(function (w, i) {
      var st = S.worlds[w.id] || {}, prev = i === 0 || (S.worlds[W[i - 1].id] || {}).done, locked = !prev;
      var stars = st.stars ? '★★★'.slice(0, st.stars) + '☆☆☆'.slice(st.stars) : '';
      return '<button type="button" class="q-world' + (locked ? ' locked' : '') + (st.done ? ' done' : '') + '" data-w="' + i + '"' + (locked ? ' disabled' : '') + '>' +
        '<span class="q-icon" aria-hidden="true">' + (locked ? '🔒' : w.icon) + '</span>' +
        '<span class="q-wtitle">World ' + (i + 1) + ': ' + esc(w.title) + '</span>' +
        '<span class="q-wintro">' + esc(w.intro) + '</span>' +
        '<span class="q-wmeta">' + (st.done ? '<span class="q-stars">' + stars + '</span> Badge: ' + esc(w.badge) : locked ? 'Finish World ' + i + ' to unlock' : w.challenges.length + ' challenges · Play') + '</span>' +
        '</button>';
    }).join('');
  }

  function start(i) {
    run = { w: i, q: 0, hearts: 3, streak: 0, mistakes: 0, gained: 0, answered: false };
    $('qMap').hidden = true; $('qPlay').hidden = false;
    $('qWorldName').textContent = W[i].icon + ' ' + W[i].title;
    question();
    $('qPlay').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function hud() {
    $('qHearts').innerHTML = [0, 1, 2].map(function (k) { return '<span class="' + (k < run.hearts ? 'on' : 'off') + '">♥</span>'; }).join('');
    $('qStreak').textContent = run.streak >= 2 ? '🔥 ' + run.streak + ' streak' : '';
    $('qDots').innerHTML = W[run.w].challenges.map(function (_, k) { return '<span class="' + (k < run.q ? 'past' : k === run.q ? 'now' : '') + '"></span>'; }).join('');
  }

  function question() {
    run.answered = false; hud();
    var c = W[run.w].challenges[run.q], label = { blank: 'Fill the blank', output: 'Predict the output', bug: 'Find the bug', concept: 'Quick question' }[c.type];
    var html = '<p class="q-type">' + label + '</p><h2 class="q-q">' + esc(c.q) + '</h2>';
    if (c.code) {
      html += '<pre class="q-code' + (c.type === 'bug' ? ' clickable' : '') + '">' + c.code.split('\n').map(function (ln, k) {
        return c.type === 'bug'
          ? '<button type="button" class="q-line" data-line="' + k + '"><span class="q-ln">' + (k + 1) + '</span>' + (highlight(ln) || ' ') + '</button>'
          : '<span class="q-line"><span class="q-ln">' + (k + 1) + '</span>' + (highlight(ln) || ' ') + '</span>';
      }).join('') + '</pre>';
    }
    if (c.type !== 'bug') {
      run.opts = shuffle(c.options.map(function (o, k) { return { text: o, right: k === c.answer }; }));
      html += '<div class="q-opts">' + run.opts.map(function (o, k) { return '<button type="button" class="q-opt" data-opt="' + k + '"><span class="q-key">' + 'ABCD'[k] + '</span><code>' + esc(o.text) + '</code></button>'; }).join('') + '</div>';
    } else {
      html += '<p class="q-hint">Tap the line you think is wrong.</p>';
    }
    html += '<div class="q-feedback" id="qFb" hidden></div>';
    $('qCard').innerHTML = html;
  }

  function answer(right, el) {
    if (run.answered) return;
    run.answered = true;
    var c = W[run.w].challenges[run.q], fb = $('qFb'), pts = 0;
    if (right) {
      run.streak++; pts = 100 + Math.min(run.streak - 1, 5) * 20; run.gained += pts;
      el.classList.add('right');
    } else {
      run.streak = 0; run.hearts--; run.mistakes++;
      el.classList.add('wrong');
      var correct = c.type === 'bug' ? document.querySelector('.q-line[data-line="' + c.answer + '"]')
        : document.querySelector('.q-opt[data-opt="' + run.opts.findIndex(function (o) { return o.right; }) + '"]');
      if (correct) correct.classList.add('right');
    }
    document.querySelectorAll('.q-opt, .q-line').forEach(function (b) { b.disabled = true; });
    hud();
    var last = run.q === W[run.w].challenges.length - 1, out = run.hearts <= 0;
    fb.innerHTML = '<p class="q-verdict ' + (right ? 'ok' : 'no') + '">' + (right ? 'Correct! +' + pts + ' XP' + (run.streak >= 2 ? ' (streak bonus)' : '') : 'Not quite.') + '</p>' +
      '<p>' + esc(c.why) + '</p>' +
      '<div class="q-fb-actions"><button type="button" class="btn primary small" id="qNext">' + (out ? 'See result' : last ? 'Finish world' : 'Next challenge →') + '</button>' +
      (c.note ? ' <a class="btn small" href="../roadmap/#' + esc(c.note) + '">Learn this topic</a>' : '') + '</div>';
    fb.hidden = false;
    $('qNext').focus();
  }

  function finish() {
    var w = W[run.w], passed = run.hearts > 0, stars = passed ? Math.max(1, 3 - run.mistakes) : 0;
    var st = S.worlds[w.id] || {};
    var newXp = passed ? Math.max(0, run.gained - (st.best || 0)) : 0;   // replays only add improvements
    if (passed) { S.xp += newXp; S.worlds[w.id] = { done: true, stars: Math.max(stars, st.stars || 0), best: Math.max(run.gained, st.best || 0) }; save(); }
    stats();
    var share = 'I earned the "' + w.badge + '" badge on SheCodesAI Code Quest with ' + S.xp + ' XP! Can you beat me? https://abbasisarah.github.io/play/';
    $('qDots').innerHTML = ''; $('qHearts').innerHTML = ''; $('qStreak').textContent = '';
    $('qCard').innerHTML = passed
      ? '<div class="q-end"><div class="q-badge" aria-hidden="true">' + w.icon + '</div><p class="q-type">Badge unlocked</p><h2 class="q-q">' + esc(w.badge) + '</h2>' +
        '<p class="q-stars big">' + '★★★'.slice(0, stars) + '☆☆☆'.slice(stars) + '</p>' +
        '<p>' + run.gained + ' XP this run' + (newXp < run.gained ? ' (+' + newXp + ' new)' : '') + ' · Rank: <b>' + esc(rank(S.xp)) + '</b></p>' +
        '<div class="q-fb-actions"><button type="button" class="btn primary small" id="qMapBtn">Back to map</button> <button type="button" class="btn small" id="qShare">Copy brag text</button></div>' +
        '<p class="q-share" id="qShareMsg" hidden></p></div>'
      : '<div class="q-end"><div class="q-badge" aria-hidden="true">💔</div><h2 class="q-q">Out of hearts</h2><p>Every mistake is a lesson. Open the explanations again, then retry.</p>' +
        '<div class="q-fb-actions"><button type="button" class="btn primary small" id="qRetry">Try again</button> <button type="button" class="btn small" id="qMapBtn">Map</button></div></div>';
    var mb = $('qMapBtn'); if (mb) mb.addEventListener('click', map);
    var rt = $('qRetry'); if (rt) rt.addEventListener('click', function () { start(run.w); });
    var sh = $('qShare');
    if (sh) sh.addEventListener('click', function () {
      var msg = $('qShareMsg'); msg.hidden = false;
      try {
        navigator.clipboard.writeText(share).then(function () { msg.textContent = 'Copied! Paste it in your story or post.'; },
          function () { msg.textContent = share; });
      } catch (e) { msg.textContent = share; }
    });
  }

  $('qMap').addEventListener('click', function (e) { var b = e.target.closest('.q-world'); if (b && !b.disabled) start(+b.dataset.w); });
  $('qCard').addEventListener('click', function (e) {
    var o = e.target.closest('.q-opt'), l = e.target.closest('.q-line');
    if (o && !run.answered) answer(run.opts[+o.dataset.opt].right, o);
    else if (l && l.tagName === 'BUTTON' && !run.answered) answer(+l.dataset.line === W[run.w].challenges[run.q].answer, l);
    else if (e.target.id === 'qNext') {
      if (run.hearts <= 0 || run.q === W[run.w].challenges.length - 1) finish(); else { run.q++; question(); }
    }
  });
  document.addEventListener('keydown', function (e) {
    if (!run || $('qPlay').hidden || run.answered) return;
    var k = 'abcd'.indexOf(e.key.toLowerCase());
    var btn = document.querySelector('.q-opt[data-opt="' + k + '"]');
    if (k >= 0 && btn) btn.click();
  });
  $('qBack').addEventListener('click', map);
  $('qReset').addEventListener('click', function () {
    var b = this;
    if (b.dataset.confirm) { S = { xp: 0, worlds: {} }; save(); map(); b.textContent = 'Reset progress'; delete b.dataset.confirm; }
    else { b.dataset.confirm = '1'; b.textContent = 'Click again to confirm reset'; }
  });
  map();
})();
