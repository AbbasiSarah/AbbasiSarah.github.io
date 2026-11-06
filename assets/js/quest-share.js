// SheCodesAI Code Quest: draws shareable badge cards (Instagram, 1080x1350)
// and the completion certificate (A4 landscape) on a canvas, in the browser.
(function () {
  var NAVY9 = '#040b20', NAVY8 = '#071433', NAVY7 = '#0b1e4a', LINE = '#1c3263',
      TEAL = '#2fe0bf', GOLD = '#f5b70a', INK = '#eef3ff', MUTED = '#9fb0d4';
  var WIDE = 'Montserrat, "Segoe UI", system-ui, sans-serif';
  var BODY = 'Poppins, "Segoe UI", system-ui, sans-serif';
  var EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  var SITE = 'abbasisarah.github.io/play';
  var MARK = ['M34 6 L58 6 L44 20 L20 20 Z', 'M14 22 L40 22 L50 32 L24 32 Z', 'M14 32 L40 32 L30 42 L4 42 Z', 'M20 44 L44 44 L30 58 L6 58 Z'];

  function ready() { return (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve(); }

  function canvas(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  function hexPath(x, y, r) {
    var p = new Path2D();
    for (var i = 0; i < 6; i++) {
      var a = Math.PI / 180 * (60 * i - 90);
      p[i ? 'lineTo' : 'moveTo'](x + r * Math.cos(a), y + r * Math.sin(a));
    }
    p.closePath(); return p;
  }

  function background(g, w, h) {
    var grad = g.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, NAVY7); grad.addColorStop(0.55, NAVY8); grad.addColorStop(1, NAVY9);
    g.fillStyle = grad; g.fillRect(0, 0, w, h);
    // faint hexagon field, like the site cover
    g.save(); g.strokeStyle = 'rgba(47, 224, 191, 0.07)'; g.lineWidth = 2;
    var r = 46, dx = r * Math.sqrt(3), dy = r * 1.5;
    for (var row = -1, y = 0; y < h + r; row++, y = row * dy) {
      for (var x = (row % 2 ? dx / 2 : 0) - dx; x < w + dx; x += dx) g.stroke(hexPath(x, y, r));
    }
    g.restore();
    var glow = g.createRadialGradient(w * 0.5, h * 0.36, 10, w * 0.5, h * 0.36, w * 0.7);
    glow.addColorStop(0, 'rgba(47, 224, 191, 0.16)'); glow.addColorStop(1, 'rgba(47, 224, 191, 0)');
    g.fillStyle = glow; g.fillRect(0, 0, w, h);
  }

  function logo(g, x, y, size, align) {
    var s = size / 64, label = 'SheCodesAI';
    g.font = '700 ' + Math.round(size * 0.62) + 'px ' + BODY;
    var tw = g.measureText(label).width, total = size + size * 0.25 + tw;
    var left = align === 'center' ? x - total / 2 : x;
    g.save(); g.translate(left, y - size / 2); g.scale(s, s); g.fillStyle = TEAL;
    MARK.forEach(function (d, i) { g.globalAlpha = i === 1 || i === 2 ? 0.85 : 1; g.fill(new Path2D(d)); });
    g.restore();
    g.fillStyle = INK; g.textAlign = 'left'; g.textBaseline = 'middle';
    g.fillText(label, left + size * 1.25, y + 2);
  }

  function text(g, str, x, y, font, color, align, spacing) {
    g.font = font; g.fillStyle = color; g.textAlign = align || 'center'; g.textBaseline = 'alphabetic';
    if (spacing && 'letterSpacing' in g) g.letterSpacing = spacing + 'px';
    g.fillText(str, x, y);
    if ('letterSpacing' in g) g.letterSpacing = '0px';
  }

  function fit(g, str, maxW, weight, start, family) {
    var size = start;
    do { g.font = weight + ' ' + size + 'px ' + family; size -= 2; } while (g.measureText(str).width > maxW && size > 20);
    return g.font;
  }

  function wrap(g, str, x, y, maxW, lineH, font, color) {
    g.font = font; var words = str.split(' '), line = '', lines = [];
    words.forEach(function (wd) { var t = line ? line + ' ' + wd : wd; if (g.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t; });
    lines.push(line);
    lines.forEach(function (ln, i) { text(g, ln, x, y + i * lineH, font, color, 'center'); });
    return y + lines.length * lineH;
  }

  function pill(g, str, cx, cy, font, fg, bg, border) {
    g.font = font; var w = g.measureText(str).width + 64, h = 64;
    g.beginPath(); g.roundRect(cx - w / 2, cy - h / 2, w, h, h / 2);
    g.fillStyle = bg; g.fill(); if (border) { g.strokeStyle = border; g.lineWidth = 2; g.stroke(); }
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(str, cx, cy + 1);
    g.textBaseline = 'alphabetic';
  }

  function medal(g, cx, cy, r, icon, color) {
    g.save();
    var hx = hexPath(cx, cy, r);
    var fillG = g.createRadialGradient(cx, cy - r * 0.3, r * 0.1, cx, cy, r);
    fillG.addColorStop(0, 'rgba(245, 183, 10, 0.32)'); fillG.addColorStop(1, 'rgba(7, 20, 51, 0.95)');
    g.fillStyle = fillG; g.fill(hx);
    g.lineWidth = Math.max(4, r * 0.07); g.strokeStyle = color || GOLD; g.stroke(hx);
    g.lineWidth = 2; g.strokeStyle = 'rgba(245, 183, 10, 0.45)'; g.stroke(hexPath(cx, cy, r * 0.84));
    g.font = Math.round(r * 0.95) + 'px ' + EMOJI; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(icon, cx, cy + r * 0.06);
    g.restore();
  }

  function today() { return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }

  // o: { name, badge, icon, worldNo, worldTitle, stars, xp, rank }
  function badge(o) {
    return ready().then(function () {
      var W = 1080, H = 1350, c = canvas(W, H), g = c.getContext('2d');
      background(g, W, H);
      logo(g, W / 2, 110, 60, 'center');
      text(g, 'CODE QUEST', W / 2, 200, '600 30px ' + WIDE, MUTED, 'center', 8);
      text(g, 'BADGE UNLOCKED', W / 2, 300, '700 34px ' + WIDE, TEAL, 'center', 10);
      medal(g, W / 2, 520, 180, o.icon);
      text(g, o.badge, W / 2, 800, fit(g, o.badge, 900, '700', 92, BODY), INK);
      text(g, 'World ' + o.worldNo + ': ' + o.worldTitle, W / 2, 862, '500 36px ' + BODY, MUTED);
      text(g, '★★★'.slice(0, o.stars) + '☆☆☆'.slice(o.stars), W / 2, 950, '400 70px ' + BODY, GOLD, 'center', 12);
      text(g, 'Earned by', W / 2, 1040, '400 32px ' + BODY, MUTED);
      text(g, o.name, W / 2, 1100, fit(g, o.name, 900, '700', 58, BODY), INK);
      text(g, o.xp + ' XP  ·  ' + o.rank + '  ·  ' + today(), W / 2, 1160, '500 30px ' + BODY, MUTED);
      pill(g, 'Play free: ' + SITE, W / 2, 1260, '600 30px ' + BODY, NAVY9, GOLD);
      return c;
    });
  }

  // o: { name, xp, rank, worlds: [{ icon, badge }], id }
  function certificate(o) {
    return ready().then(function () {
      var W = 1754, H = 1240, c = canvas(W, H), g = c.getContext('2d');
      background(g, W, H);
      g.strokeStyle = GOLD; g.lineWidth = 6; g.strokeRect(40, 40, W - 80, H - 80);
      g.strokeStyle = 'rgba(245, 183, 10, 0.4)'; g.lineWidth = 2; g.strokeRect(62, 62, W - 124, H - 124);
      logo(g, W / 2, 150, 64, 'center');
      text(g, 'CERTIFICATE OF COMPLETION', W / 2, 262, '700 48px ' + WIDE, GOLD, 'center', 10);
      text(g, 'Code Quest: from Python to AI agents', W / 2, 322, '500 34px ' + BODY, TEAL);
      text(g, 'This certifies that', W / 2, 410, '400 32px ' + BODY, MUTED);
      text(g, o.name, W / 2, 500, fit(g, o.name, 1300, '700', 96, BODY), INK);
      g.fillStyle = GOLD; g.fillRect(W / 2 - 260, 528, 520, 3);
      wrap(g, 'has completed all 5 worlds of SheCodesAI Code Quest: 40 hands-on challenges in Python, data analysis, machine learning, deep learning and generative AI.',
        W / 2, 600, 1240, 46, '400 32px ' + BODY, INK);
      var n = o.worlds.length, gap = 250, x0 = W / 2 - gap * (n - 1) / 2;
      o.worlds.forEach(function (w, i) {
        medal(g, x0 + i * gap, 790, 70, w.icon);
        text(g, w.badge, x0 + i * gap, 900, '600 24px ' + BODY, INK);
      });
      var cols = [['TOTAL XP', String(o.xp)], ['RANK', o.rank], ['DATE', today()], ['CERTIFICATE ID', o.id]];
      cols.forEach(function (col, i) {
        var cx = 300 + i * 385;
        text(g, col[0], cx, 1000, '600 20px ' + WIDE, MUTED, 'center', 4);
        text(g, col[1], cx, 1044, '600 30px ' + BODY, INK);
      });
      text(g, 'Sara Abbasi', W - 300, 1120, 'italic 600 40px ' + BODY, TEAL);
      text(g, 'Founder, SheCodesAI', W - 300, 1156, '400 22px ' + BODY, MUTED);
      text(g, SITE, 300, 1156, '500 24px ' + BODY, GOLD);
      return c;
    });
  }

  function certId(name, xp) {
    var s = name.trim().toLowerCase() + '|' + xp + '|' + new Date().toISOString().slice(0, 10), h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return 'SCAI-' + new Date().getFullYear() + '-' + h.toString(36).toUpperCase().slice(0, 6);
  }

  function download(c, filename) {
    c.toBlob(function (b) {
      var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    }, 'image/png');
  }

  // Native share sheet on phones (Instagram, WhatsApp, LinkedIn apps). Returns false if unsupported.
  function share(c, filename, message) {
    return new Promise(function (resolve) {
      c.toBlob(function (b) {
        try {
          var f = new File([b], filename, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [f] })) {
            navigator.share({ files: [f], text: message, title: 'SheCodesAI Code Quest' }).then(function () { resolve(true); }, function () { resolve(true); });
          } else resolve(false);
        } catch (e) { resolve(false); }
      }, 'image/png');
    });
  }

  function linkedInPost() { return 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent('https://' + SITE + '/'); }

  function linkedInProfile(id) {
    var d = new Date();
    return 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME' +
      '&name=' + encodeURIComponent('Code Quest: Python to AI Agents') +
      '&organizationName=' + encodeURIComponent('SheCodesAI') +
      '&issueYear=' + d.getFullYear() + '&issueMonth=' + (d.getMonth() + 1) +
      '&certUrl=' + encodeURIComponent('https://' + SITE + '/') + '&certId=' + encodeURIComponent(id);
  }

  window.QuestShare = { badge: badge, certificate: certificate, certId: certId, download: download, share: share, linkedInPost: linkedInPost, linkedInProfile: linkedInProfile };
})();
