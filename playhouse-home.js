(function () {
  // Top 10 carousel: infinite auto-scroll + pause on hover
  const games = [
    { name: 'FIFA 24', rank: 1, img: 'imgs/games/eafc26.png' },
    { name: 'GTA V', rank: 2, img: 'imgs/PC/GTAV.png' },
    { name: 'Call of Duty MW3', rank: 3, img: 'imgs/games/codbo.png' },
    { name: 'eFootball 2024', rank: 4, img: 'imgs/games/eafc26.png' },
    { name: 'God of War', rank: 5, img: 'imgs/PC/god18.png' },
    { name: 'Minecraft', rank: 6, img: 'imgs/PC/mine.png' },
    { name: 'FC 25', rank: 7, img: 'imgs/games/eafc26.png' },
    { name: 'Fortnite', rank: 8, img: 'imgs/PC/rev.png' },
    { name: 'Mortal Kombat 11', rank: 9, img: 'imgs/PC/cs.png' },
    { name: 'Need for Speed Heat', rank: 10, img: 'imgs/PC/stardewvalley.png' }
  ];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function makeCarouselCard(game) {
    const el = document.createElement('div');
    el.className = 'ph-game-card';
    el.innerHTML = `
      <img src="${game.img}" alt="${game.name}">
      <div class="ph-game-meta">
        <p class="ph-game-name">${game.name}</p>
        <div class="ph-game-rank">#${game.rank}</div>
      </div>
    `;
    return el;
  }

  function initCarousel() {
    const root = document.getElementById('phTop10');
    if (!root) return;

    const viewport = $('.ph-carousel-viewport', root);
    const track = $('.ph-carousel-track', root);
    const dotsWrap = $('.ph-carousel-dots', root);
    const leftBtn = $('.ph-carousel-btn.ph-left', root);
    const rightBtn = $('.ph-carousel-btn.ph-right', root);

    // clear
    track.innerHTML = '';
    dotsWrap.innerHTML = '';

    // build 2 copies for seamless infinite
    const list = [...games, ...games];
    list.forEach(g => track.appendChild(makeCarouselCard(g)));

    const items = $all('.ph-game-card', track);
    const singleW = items[0] ? items[0].getBoundingClientRect().width : 190;
    const gap = items.length > 1 ? (items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left - singleW) : 14;
    const step = singleW + gap;

    let index = 0; // 0..9 active
    const total = games.length;

    // dots
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'ph-dot';
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => {
        index = i;
        go(index, true);
      });
      dotsWrap.appendChild(d);
    }

    function setActiveDot() {
      const dots = $all('.ph-dot', dotsWrap);
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }

    let tx = 0;
    function go(i, immediate) {
      index = i;
      setActiveDot();
      // scroll to corresponding position inside first copy
      tx = -index * step;
      track.style.transition = immediate ? 'none' : 'transform 0.5s ease';
      track.style.transform = `translateX(${tx}px)`;
    }

    // Start centered at first copy
    track.style.transform = `translateX(0px)`;
    setActiveDot();

    let paused = false;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduce) {
      let last = performance.now();
      function tick(t) {
        if (!paused) {
          const dt = t - last;
          // auto advance each ~1800ms
          if (dt > 1800) {
            go((index + 1) % total, false);
            last = t;
          }
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (viewport) {
      viewport.addEventListener('mouseenter', () => (paused = true));
      viewport.addEventListener('mouseleave', () => (paused = false));
    }

    if (leftBtn) leftBtn.addEventListener('click', () => go((index - 1 + total) % total, false));
    if (rightBtn) rightBtn.addEventListener('click', () => go((index + 1) % total, false));

    // Intersection fade-in
    const fadeEls = $all('.ph-fade-in');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach(el => io.observe(el));

    // Pause auto when page hidden
    document.addEventListener('visibilitychange', () => {
      paused = document.hidden;
    });
  }

  function initFidelityAndProgress() {
    // Fidelity bar: 1h..10h with +1h free at 10
    const fidelidadeWrap = document.getElementById('phFidelidade');
    if (fidelidadeWrap) {
      const freeMsg = $('.ph-free-msg', fidelidadeWrap);
      const bar = $('.ph-bar', fidelidadeWrap);
      const filled = $('.ph-bar > span', fidelidadeWrap);
      const presentLevel = parseInt(localStorage.getItem('playhouse_hours') || '0', 10);

      // clamp 0..10
      const hours = Math.max(0, Math.min(10, presentLevel));
      const pct = (hours / 10) * 100;
      if (filled) filled.style.width = pct + '%';

      const nodes = $all('.ph-level-node', fidelidadeWrap);
      nodes.forEach((n, idx) => n.classList.toggle('is-done', idx < hours));

      if (hours >= 10 && freeMsg) {
        freeMsg.style.display = 'block';
      }

      // Allow demo progress increment
      const addBtn = $('#phAddHour');
      if (addBtn && !addBtn.dataset.bound) {
        addBtn.dataset.bound = '1';
        addBtn.addEventListener('click', () => {
          const current = parseInt(localStorage.getItem('playhouse_hours') || '0', 10);
          const next = Math.min(10, current + 1);
          localStorage.setItem('playhouse_hours', String(next));
          // reload UI
          location.reload();
        });
      }
    }

    // RPG progress
    const progWrap = document.getElementById('phRpg');
    if (progWrap) {
      const levelEl = $('#phLevel', progWrap);
      const xpEl = $('#phXp', progWrap);
      const hours = parseFloat(localStorage.getItem('playhouse_hours') || '0');
      // Map hours to level 1..6
      const level = Math.min(6, Math.max(1, Math.floor(hours / 2) + 1));
      const xp = Math.min(100, Math.round(((hours % 2) / 2) * 100));

      if (levelEl) levelEl.textContent = String(level);
      if (xpEl) xpEl.textContent = String(xp);

      const barFill = $('.ph-bar > span', progWrap);
      if (barFill) barFill.style.width = xp + '%';

      const nodes = $all('.ph-rpg-node', progWrap);
      nodes.forEach((n, idx) => n.classList.toggle('is-done', idx + 1 <= level));
    }
  }

  function initTestimonials() {
    const root = document.getElementById('phTestimonials');
    if (!root) return;

    // fallback: if markup doesn't exist, do nothing
    const track = $('.ph-test-track', root);
    const dots = $all('.ph-test-dot', root);
    const prev = $('.ph-test-prev', root);
    const next = $('.ph-test-next', root);

    if (!track) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let i = 0;
    const total = $all('.ph-test-item', track).length;

    function set() {
      track.style.transform = `translateX(${-i * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
    }

    if (dots.length === total && total > 1) {
      dots.forEach((d, idx) => {
        d.addEventListener('click', () => {
          i = idx;
          set();
        });
      });
    }

    if (prev) prev.addEventListener('click', () => {
      i = (i - 1 + total) % total;
      set();
    });

    if (next) next.addEventListener('click', () => {
      i = (i + 1) % total;
      set();
    });

    if (!reduce && total > 1) {
      let paused = false;
      root.addEventListener('mouseenter', () => (paused = true));
      root.addEventListener('mouseleave', () => (paused = false));

      set();
      setInterval(() => {
        if (!paused && !document.hidden) {
          i = (i + 1) % total;
          set();
        }
      }, 3800);
    } else {
      set();
    }
  }

  function init() {
    initCarousel();
    initFidelityAndProgress();
    initTestimonials();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

