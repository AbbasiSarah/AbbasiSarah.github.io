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
    var all = W.every(function (w) { return S.worlds[w.id] && S.worlds[w.id].done; });
    var cb = $('qCert');
    if (cb) {
      cb.hidden = !all;
      if (all) {
        cb.innerHTML = '<div class="q-cert-text"><span class="q-cert-icon" aria-hidden="true">🎓</span><div><b>You finished all 5 worlds!</b><br>Claim your SheCodesAI certificate and add it to LinkedIn.</div></div>' +
          '<button type="button" class="btn primary small" id="qCertBtn">Get my certificate</button>';
        $('qCertBtn').addEventListener('click', function () { openCert(); });
      }
    }
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
        (allDone() ? '<p class="q-cert-note">🎓 That was the last world. Your certificate is ready!</p>' : '') +
        '<div id="qShareBox" class="q-sharebox"></div>' +
        '<div class="q-fb-actions"><button type="button" class="btn small" id="qMapBtn">Back to map</button></div></div>'
      : '<div class="q-end"><div class="q-badge" aria-hidden="true">💔</div><h2 class="q-q">Out of hearts</h2><p>Every mistake is a lesson. Open the explanations again, then retry.</p>' +
        '<div class="q-fb-actions"><button type="button" class="btn primary small" id="qRetry">Try again</button> <button type="button" class="btn small" id="qMapBtn">Map</button></div></div>';
    var mb = $('qMapBtn'); if (mb) mb.addEventListener('click', map);
    var rt = $('qRetry'); if (rt) rt.addEventListener('click', function () { start(run.w); });
    if (passed) sharePanel($('qShareBox'), { kind: 'badge', w: w, worldNo: run.w + 1, stars: Math.max(stars, (S.worlds[w.id] || {}).stars || 0) });
  }

  function allDone() { return W.every(function (w) { return S.worlds[w.id] && S.worlds[w.id].done; }); }

  function openCert() {
    $('qMap').hidden = true; $('qPlay').hidden = false; var cb = $('qCert'); if (cb) cb.hidden = true;
    $('qWorldName').textContent = '🎓 Certificate'; $('qDots').innerHTML = ''; $('qHearts').innerHTML = ''; $('qStreak').textContent = '';
    $('qCard').innerHTML = '<div class="q-end"><p class="q-type">Code Quest complete</p><h2 class="q-q">Your certificate</h2>' +
      '<p>All 5 worlds and 40 challenges done. Add your name, download the certificate and share it.</p>' +
      '<div id="qShareBox" class="q-sharebox"></div>' +
      '<div class="q-fb-actions"><button type="button" class="btn small" id="qMapBtn">Back to map</button></div></div>';
    $('qMapBtn').addEventListener('click', map);
    sharePanel($('qShareBox'), { kind: 'cert' });
    $('qPlay').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Name box -> image preview -> download / share / LinkedIn
  function sharePanel(box, o) {
    var QS = window.QuestShare; if (!QS || !box) return;
    var isCert = o.kind === 'cert';
    box.innerHTML = '<label class="q-name-label" for="qName">Your name for the ' + (isCert ? 'certificate' : 'badge') + '</label>' +
      '<div class="q-name-row"><input id="qName" class="q-name" type="text" maxlength="40" autocomplete="name" placeholder="e.g. Ayesha Khan" value="' + esc(S.name || '') + '">' +
      '<button type="button" class="btn primary small" id="qMake">' + (isCert ? 'Create certificate' : 'Create my badge') + '</button></div>' +
      '<p class="q-share" id="qShareMsg" hidden></p><div id="qPreview" class="q-preview" hidden></div>' +
      (allDone() && !isCert ? '<button type="button" class="btn small" id="qToCert">🎓 Get my certificate</button>' : '');
    var tc = $('qToCert'); if (tc) tc.addEventListener('click', openCert);
    var msg = $('qShareMsg');
    function say(t) { msg.hidden = false; msg.textContent = t; }
    $('qName').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('qMake').click(); });
    $('qMake').addEventListener('click', function () {
      var name = $('qName').value.trim().replace(/\s+/g, ' ');
      if (name.length < 2) { say('Please type your name first.'); $('qName').focus(); return; }
      S.name = name;
      if (isCert && !S.certId) S.certId = QS.certId(name, S.xp);
      save();
      var job = isCert
        ? QS.certificate({ name: name, xp: S.xp, rank: rank(S.xp), id: S.certId, worlds: W.map(function (w) { return { icon: w.icon, badge: w.badge }; }) })
        : QS.badge({ name: name, badge: o.w.badge, icon: o.w.icon, worldNo: o.worldNo, worldTitle: o.w.title, stars: o.stars, xp: S.xp, rank: rank(S.xp) });
      say('Creating your image…');
      job.then(function (c) {
        msg.hidden = true;
        var file = isCert ? 'SheCodesAI-Code-Quest-Certificate.png' : 'SheCodesAI-' + o.w.badge.replace(/\W+/g, '-') + '-badge.png';
        var text = isCert
          ? 'I just completed SheCodesAI Code Quest: 40 hands-on challenges from Python to AI agents, with ' + S.xp + ' XP and the rank of ' + rank(S.xp) + '. 🎓 Try it free: https://abbasisarah.github.io/play/ #SheCodesAI #MachineLearning #WomenInTech'
          : 'I earned the "' + o.w.badge + '" badge on SheCodesAI Code Quest with ' + S.xp + ' XP! Can you beat me? https://abbasisarah.github.io/play/ #SheCodesAI #CodeQuest';
        var pv = $('qPreview'); pv.hidden = false;
        pv.innerHTML = '<img alt="' + esc(isCert ? 'Your Code Quest certificate' : 'Your ' + o.w.badge + ' badge') + '" src="' + c.toDataURL('image/png') + '">' +
          '<div class="q-fb-actions q-share-actions">' +
          '<button type="button" class="btn primary small" id="qDl">⬇ Download image</button>' +
          '<button type="button" class="btn small" id="qNative">📱 Share to Instagram / apps</button>' +
          '<button type="button" class="btn small" id="qLi">Post on LinkedIn</button>' +
          (isCert ? '<a class="btn small" id="qLiAdd" target="_blank" rel="noopener" href="' + QS.linkedInProfile(S.certId) + '">＋ Add to LinkedIn profile</a>' : '') +
          '<button type="button" class="btn small" id="qCopy">Copy caption</button></div>' +
          '<p class="q-share q-tip">' + (isCert ? 'Certificate ID: <b>' + esc(S.certId) + '</b>. ' : '') +
          'Instagram: download the image, then add it to your story or a post and paste the caption. LinkedIn: click "Post on LinkedIn", paste the caption and attach the image.</p>';
        function copy(after) {
          try { navigator.clipboard.writeText(text).then(function () { say('Caption copied. Paste it with your image.'); if (after) after(); }, function () { say(text); if (after) after(); }); }
          catch (e) { say(text); if (after) after(); }
        }
        $('qDl').addEventListener('click', function () { QS.download(c, file); });
        $('qCopy').addEventListener('click', function () { copy(); });
        $('qNative').addEventListener('click', function () {
          QS.share(c, file, text).then(function (ok) { if (!ok) { QS.download(c, file); copy(); say('Image downloaded and caption copied. Open Instagram and add the image to your story or a post.'); } });
        });
        $('qLi').addEventListener('click', function () { var win = window.open(QS.linkedInPost(), '_blank', 'noopener'); copy(); if (!win) location.href = QS.linkedInPost(); });
        pv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, function () { say('Sorry, the image could not be created in this browser.'); });
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
    if (b.dataset.confirm) { S = { xp: 0, worlds: {}, name: S.name }; save(); map(); b.textContent = 'Reset progress'; delete b.dataset.confirm; }
    else { b.dataset.confirm = '1'; b.textContent = 'Click again to confirm reset'; }
  });
  map();
})();
