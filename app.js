// PotroPlay — interações
(function () {
  // sticky nav state
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  var menu = document.getElementById('mobileMenu');
  var burger = document.getElementById('burger');
  var closeBtn = document.getElementById('closeMenu');
  function openMenu() { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  menu.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // channel wall (placeholder tiles)
  var wall = document.getElementById('wall');
  if (wall) {
    var labels = [
      ['ESPORTE 1', 1], ['NOTÍCIAS 24H', 0], ['REGIONAL TV', 0], ['FILMES', 1],
      ['FUTEBOL HD', 1], ['VARIEDADES', 0], ['DOC', 0], ['INFANTIL', 0],
      ['ESPORTE 2', 0], ['JORNAL', 1], ['NOVELAS', 0], ['SHOW', 0]
    ];
    labels.forEach(function (l) {
      var d = document.createElement('div');
      d.className = 'ch' + (l[1] ? ' on' : '');
      var s = document.createElement('span');
      s.textContent = l[0];
      d.appendChild(s);
      wall.appendChild(d);
    });
    // cycle the "on" highlight for a live feel
    setInterval(function () {
      var tiles = wall.querySelectorAll('.ch');
      if (!tiles.length) return;
      tiles.forEach(function (t) { t.classList.remove('on'); });
      var picks = new Set();
      while (picks.size < 4) picks.add(Math.floor(Math.random() * tiles.length));
      picks.forEach(function (i) { tiles[i].classList.add('on'); });
    }, 2200);
  }

  // FAQ accordion
  var list = document.getElementById('faqList');
  if (list) {
    list.querySelectorAll('.qa').forEach(function (qa) {
      var btn = qa.querySelector('button');
      var ans = qa.querySelector('.ans');
      btn.addEventListener('click', function () {
        var isOpen = qa.classList.contains('open');
        list.querySelectorAll('.qa').forEach(function (o) {
          o.classList.remove('open');
          o.querySelector('.ans').style.maxHeight = null;
        });
        if (!isOpen) {
          qa.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    });
  }

  // anchor offset for sticky header (no scrollIntoView)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.style.opacity = 1; en.target.style.transform = 'none'; io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.feat, .dev, .plan, .step, .benefit, .qa, .section-head, .dl-card').forEach(function (el, i) {
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease ' + (i % 4) * 0.05 + 's, transform .5s ease ' + (i % 4) * 0.05 + 's';
    io.observe(el);
  });
})();
