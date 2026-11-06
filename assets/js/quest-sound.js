// SheCodesAI Code Quest sounds, made with the Web Audio API (no audio files).
(function () {
  var KEY = 'shecodesai-quest-sound', ctx = null, on = true;
  try { on = localStorage.getItem(KEY) !== 'off'; } catch (e) {}

  function ac() {
    if (!ctx) { var A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  // one note: frequency (Hz), start offset and length (s), wave type, volume
  function note(f, t, len, type, vol) {
    var c = ac(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain(), s = c.currentTime + t;
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(0.0001, s);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, s + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, s + len);
    o.connect(g); g.connect(c.destination); o.start(s); o.stop(s + len + 0.05);
  }
  function seq(notes, type, vol) { notes.forEach(function (n) { note(n[0], n[1], n[2], type, vol); }); }

  var C5 = 523.25, E5 = 659.25, G5 = 783.99, C6 = 1046.5, D5 = 587.33, A5 = 880, B5 = 987.77, E6 = 1318.5, G6 = 1567.98;
  var sounds = {
    correct: function (streak) { var up = Math.min(streak || 1, 6) * 0.04; seq([[E5 * (1 + up), 0, 0.12], [A5 * (1 + up), 0.08, 0.22]], 'triangle', 0.22); },
    wrong: function () { seq([[196, 0, 0.18], [155.6, 0.12, 0.3]], 'sawtooth', 0.07); },
    tap: function () { note(1200, 0, 0.05, 'sine', 0.05); },
    badge: function () {
      seq([[C5, 0, 0.16], [E5, 0.12, 0.16], [G5, 0.24, 0.16], [C6, 0.36, 0.5]], 'triangle', 0.22);
      seq([[G5, 0.36, 0.5], [E6, 0.6, 0.35], [G6, 0.75, 0.6]], 'sine', 0.1);
    },
    certificate: function () {
      seq([[C5, 0, 0.18], [C5, 0.16, 0.1], [C5, 0.28, 0.1], [E5, 0.4, 0.3], [D5, 0.68, 0.18], [E5, 0.86, 0.18], [G5, 1.04, 0.3], [C6, 1.36, 0.9]], 'square', 0.07);
      seq([[C5, 1.36, 0.9], [E5, 1.36, 0.9], [G5, 1.36, 0.9], [B5, 1.6, 0.5], [E6, 1.8, 0.8]], 'triangle', 0.1);
    },
    lose: function () { seq([[G5, 0, 0.25], [E5, 0.22, 0.25], [C5, 0.44, 0.25], [155.6 * 2, 0.66, 0.6]], 'triangle', 0.16); }
  };

  window.QuestSound = {
    play: function (name, arg) { if (on && sounds[name]) { try { sounds[name](arg); } catch (e) {} } },
    isOn: function () { return on; },
    toggle: function () { on = !on; try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) {} if (on) sounds.tap(); return on; }
  };
})();
