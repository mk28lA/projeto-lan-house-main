(function () {
  const STORAGE_KEY = 'playhouse_prefs_v1';

  function readPrefs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function writePrefs(prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }

  const defaultPrefs = {
    contrast: 'default', // default | high
    fontScale: 1,
    letterSpacing: 0,
    gray: 0,
    cursor: 1
  };

  const prefs = { ...defaultPrefs, ...readPrefs() };

  function applyPrefs(p) {
    // Contrast
    document.body.dataset.contrast = p.contrast === 'high' ? 'high' : '';

    // Gray
    document.body.dataset.gray = p.gray === 1 ? '1' : '';

    // Font scale (keep it simple)
    if (p.fontScale === 1.1) {
      document.body.dataset.fontScale = '1.1';
    } else if (p.fontScale === 0.95) {
      document.body.dataset.fontScale = '0.95';
    } else {
      delete document.body.dataset.fontScale;
    }

    // Letter spacing
    document.body.dataset.letterSpacing = p.letterSpacing === 1 ? '0.12em' : '';

    // Cursor
    document.body.dataset.cursor = p.cursor === 2 ? '2' : '';

    // Expose for future use
    document.documentElement.style.setProperty('--user-contrast', p.contrast === 'high' ? '1' : '0');
  }

  function ensureToggleButtons() {
    // contrast toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle && !darkModeToggle.dataset.bound) {
      darkModeToggle.dataset.bound = '1';
      darkModeToggle.addEventListener('click', () => {
        const next = prefs.contrast === 'high' ? 'default' : 'high';
        prefs.contrast = next;
        applyPrefs(prefs);
        writePrefs(prefs);

        darkModeToggle.textContent = next === 'high' ? '☀️' : '🌙';
      });

      // initial icon
      darkModeToggle.textContent = prefs.contrast === 'high' ? '☀️' : '🌙';
    }

    // Accessibility dropdown (if present later)
    const panel = document.getElementById('a11yPanel');
    if (!panel) return;

    const bind = (id, handler) => {
      const el = document.getElementById(id);
      if (el && !el.dataset.bound) {
        el.dataset.bound = '1';
        el.addEventListener('click', handler);
      }
    };

    bind('a11yIncFont', () => {
      prefs.fontScale = 1.1;
      applyPrefs(prefs);
      writePrefs(prefs);
    });

    bind('a11yDecFont', () => {
      prefs.fontScale = 0.95;
      applyPrefs(prefs);
      writePrefs(prefs);
    });

    bind('a11yGray', () => {
      prefs.gray = prefs.gray === 1 ? 0 : 1;
      applyPrefs(prefs);
      writePrefs(prefs);
    });

    bind('a11yLetter', () => {
      prefs.letterSpacing = prefs.letterSpacing === 1 ? 0 : 1;
      applyPrefs(prefs);
      writePrefs(prefs);
    });

    bind('a11yCursor', () => {
      prefs.cursor = prefs.cursor === 2 ? 1 : 2;
      applyPrefs(prefs);
      writePrefs(prefs);
    });

    bind('a11ySpeakLinks', async () => {
      // Simple voice reading of first visible navigation links.
      const synth = window.speechSynthesis;
      if (!synth) return;

      const links = Array.from(document.querySelectorAll('a'))
        .filter(a => a.offsetParent !== null)
        .slice(0, 8);

      const text = links.map(a => a.textContent.trim()).filter(Boolean).join('. ');
      if (!text) return;

      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      u.rate = 1;
      synth.speak(u);
    });
  }

  // Apply immediately
  applyPrefs(prefs);
  ensureToggleButtons();

  // If prefers reduced motion, tone down animations
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) document.documentElement.dataset.reduceMotion = '1';
})();

