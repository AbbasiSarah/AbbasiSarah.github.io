// SheCodesAI clickable ML roadmap. Data comes from _data/roadmap.yml (rendered as JSON in the page).
(function () {
  var data = JSON.parse(document.getElementById('rmData').textContent);
  var tree = document.getElementById('rmTree');
  var panel = document.getElementById('rmPanel');
  var KEY = 'shecodesai-roadmap-done';
  var done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { done = {}; }
  var byId = {}, leaves = [];
  var REPO = 'https://github.com/AbbasiSarah/ml-roadmap';
  var STAGE_PROJECT = { python: '01-expense-analyser', math: '02-gradient-descent', data: '03-data-cleaning',
    'classic-ml': '04-model-comparison', 'deep-learning': '05-neural-net-from-scratch',
    specialise: '06-forecasting-and-rag', deploy: '07-model-api', career: '08-portfolio-readme' };
  function rootOf(n) { while (n.parent) n = n.parent; return n; }
  function pad(i) { return (i < 10 ? '0' : '') + i; }
  function notesUrl(n) { var r = rootOf(n); return REPO + '/blob/main/notes/' + pad(data.indexOf(r) + 1) + '-' + r.id + '/' + n.id + '.md'; }
  function projectUrl(r) { return STAGE_PROJECT[r.id] ? REPO + '/tree/main/projects/' + STAGE_PROJECT[r.id] : null; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function safeUrl(u) { return /^https:\/\//.test(u || '') ? u : '#'; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }

  function index(nodes, parent) {
    (nodes || []).forEach(function (n) {
      n.parent = parent; byId[n.id] = n;
      if (n.children && n.children.length) index(n.children, n); else if (parent) leaves.push(n.id);
    });
  }
  index(data, null);

  function progress() {
    var c = leaves.filter(function (id) { return done[id]; }).length;
    document.getElementById('rmFill').style.width = (leaves.length ? 100 * c / leaves.length : 0) + '%';
    document.getElementById('rmCount').textContent = c + ' of ' + leaves.length + ' topics done';
    document.querySelectorAll('.rm-node').forEach(function (b) {
      var n = byId[b.dataset.id];
      if (!n) return;
      if (n.children) {
        var sub = [];
        (function walk(x) { (x.children || []).forEach(function (k) { if (k.children) walk(k); else sub.push(k.id); }); })(n);
        var d = sub.filter(function (id) { return done[id]; }).length;
        var tag = b.querySelector('.rm-sub');
        if (tag) tag.textContent = d + '/' + sub.length;
      } else {
        b.classList.toggle('is-done', !!done[n.id]);
      }
    });
  }

  function nodeButton(n, level) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'rm-node lvl' + level + (n.children ? ' has-kids' : '');
    b.dataset.id = n.id;
    b.setAttribute('aria-expanded', 'false');
    b.innerHTML = '<span class="rm-dot" aria-hidden="true"></span><span class="rm-label">' + esc(n.title) + '</span>' +
      (n.trending ? '<span class="rm-hot">Trending</span>' : '') +
      (n.children ? '<span class="rm-sub"></span><span class="rm-caret" aria-hidden="true">▸</span>' : '');
    return b;
  }

  function build() {
    data.forEach(function (stage, i) {
      var li = document.createElement('div');
      li.className = 'rm-stage';
      var head = document.createElement('div');
      head.className = 'rm-stage-head';
      var num = document.createElement('span');
      num.className = 'rm-num';
      num.textContent = i + 1;
      var btn = nodeButton(stage, 0);
      btn.querySelector('.rm-label').insertAdjacentHTML('afterend', '<span class="rm-weeks">' + esc(stage.weeks) + '</span>');
      head.appendChild(num); head.appendChild(btn);
      li.appendChild(head);
      var branch = document.createElement('div');
      branch.className = 'rm-branch';
      branch.hidden = true;
      (stage.children || []).forEach(function (t) { branch.appendChild(topicEl(t, 1)); });
      li.appendChild(branch);
      tree.appendChild(li);
    });
  }
  function topicEl(t, level) {
    var wrap = document.createElement('div');
    wrap.className = 'rm-item';
    wrap.appendChild(nodeButton(t, level));
    if (t.children) {
      var sub = document.createElement('div');
      sub.className = 'rm-branch rm-sub-branch';
      sub.hidden = true;
      t.children.forEach(function (k) { sub.appendChild(topicEl(k, level + 1)); });
      wrap.appendChild(sub);
    }
    return wrap;
  }

  function toggle(btn, open) {
    var branch = btn.closest('.rm-stage-head') ? btn.closest('.rm-stage').querySelector(':scope > .rm-branch')
                                                : btn.parentElement.querySelector(':scope > .rm-branch');
    if (!branch) return;
    var show = open == null ? branch.hidden : open;
    branch.hidden = !show;
    btn.setAttribute('aria-expanded', show ? 'true' : 'false');
  }

  function show(n) {
    document.querySelectorAll('.rm-node.is-active').forEach(function (x) { x.classList.remove('is-active'); });
    var b = document.querySelector('.rm-node[data-id="' + n.id + '"]');
    if (b) b.classList.add('is-active');
    var crumbs = [], p = n.parent;
    while (p) { crumbs.unshift(p.title); p = p.parent; }
    var html = '<p class="kicker">' + esc(crumbs.join(' › ') || 'Stage') + '</p>' +
      '<h2 class="rm-title">' + esc(n.title) + (n.trending ? ' <span class="rm-hot">Trending</span>' : '') + '</h2>';
    if (n.children) {
      html += '<p>' + esc(n.summary || n.about || '') + '</p>' + (n.weeks ? '<p class="rm-meta">Suggested time: ' + esc(n.weeks) + '</p>' : '') +
        '<p class="rm-meta">Topics in this branch:</p><ul class="rm-list">' +
        n.children.map(function (k) { return '<li><a href="#' + esc(k.id) + '" data-go="' + esc(k.id) + '">' + esc(k.title) + '</a></li>'; }).join('') + '</ul>';
      if (!n.parent && projectUrl(n)) html += '<p class="rm-actions"><a class="btn primary small" href="' + projectUrl(n) + '" target="_blank" rel="noopener noreferrer">Stage project (code)</a></p>';
    } else {
      html += '<p>' + esc(n.about) + '</p>' +
        '<p class="rm-actions"><a class="btn primary small" href="' + notesUrl(n) + '" target="_blank" rel="noopener noreferrer">My notes + code example</a>' +
        (projectUrl(rootOf(n)) ? ' <a class="btn small" href="' + projectUrl(rootOf(n)) + '" target="_blank" rel="noopener noreferrer">Stage project</a>' : '') + '</p>';
      if (n.resources && n.resources.length) {
        html += '<h3 class="rm-h3">Resources</h3><ul class="rm-res">' + n.resources.map(function (r) {
          return '<li><a href="' + esc(safeUrl(r.url)) + '" target="_blank" rel="noopener noreferrer">' + esc(r.name) + '</a>' +
            '<span class="rm-tag ' + (r.cost === 'paid' ? 'paid' : 'free') + '">' + (r.cost === 'paid' ? 'Paid' : 'Free') + '</span>' +
            (r.kind ? '<span class="rm-kind">' + esc(r.kind) + '</span>' : '') + '</li>';
        }).join('') + '</ul>';
      }
      if (n.project) {
        html += '<h3 class="rm-h3">Practice project</h3><p>' + esc(n.project) + '</p>';
        if (n.example) html += '<p><a class="btn small" href="' + esc(safeUrl(n.example)) + '" target="_blank" rel="noopener noreferrer">See the example</a></p>';
      }
      html += '<label class="rm-check"><input type="checkbox" id="rmDone"' + (done[n.id] ? ' checked' : '') + '> I finished this topic</label>';
    }
    panel.innerHTML = html;
    var cb = document.getElementById('rmDone');
    if (cb) cb.addEventListener('change', function () { if (cb.checked) done[n.id] = true; else delete done[n.id]; save(); progress(); });
    if (window.innerWidth < 860) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openPath(id) {
    var n = byId[id]; if (!n) return;
    var chain = [], p = n;
    while (p) { chain.unshift(p); p = p.parent; }
    chain.forEach(function (x) {
      if (x.children) toggle(document.querySelector('.rm-node[data-id="' + x.id + '"]'), true);
    });
    show(n);
  }

  build(); progress();
  tree.addEventListener('click', function (e) {
    var b = e.target.closest('.rm-node'); if (!b) return;
    var n = byId[b.dataset.id];
    if (n.children) toggle(b);
    show(n);
    try { history.replaceState(null, '', '#' + n.id); } catch (err) {}
  });
  panel.addEventListener('click', function (e) {
    var a = e.target.closest('[data-go]'); if (!a) return;
    e.preventDefault(); openPath(a.dataset.go);
    try { history.replaceState(null, '', '#' + a.dataset.go); } catch (err) {}
  });
  document.getElementById('rmExpand').addEventListener('click', function () {
    var anyClosed = !!document.querySelector('.rm-stage > .rm-branch[hidden]');
    document.querySelectorAll('.rm-node.lvl0').forEach(function (b) { toggle(b, anyClosed); });
    this.textContent = anyClosed ? 'Close all stages' : 'Open all stages';
  });
  var start = (location.hash || '').slice(1);
  if (byId[start]) openPath(start); else toggle(document.querySelector('.rm-node.lvl0'), true);
})();
