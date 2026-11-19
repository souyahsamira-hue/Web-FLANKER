/* Flanker Bar · main.js — sin dependencias.
   La página se lee entera sin JavaScript; esto solo añade idioma, menú, carta, galería,
   calendario de reservas, horario en vivo y animaciones discretas. */
(() => {
  'use strict';

  const WA_NUMBER = '34628573872';
  const TZ = 'Europe/Madrid';
  const MAX_DAYS = 60;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modo privado */ } }
  };

  /* ------------------------------------------------------------------
     Textos en inglés (el español vive en el HTML)
  ------------------------------------------------------------------ */
  const EN = {
    skip: 'Skip to content', navPrincipal: 'Main', navHistoria: 'Our story', navExperiencias: 'Experiences', navLocal: 'The bar',
    navCarta: 'Menu', navContacto: 'Contact', navReservas: 'Book a table', reservar: 'Book', abrirMenu: 'Open menu',
    heroLugar: 'San Pedro de Alcántara · Marbella', heroLead: 'A gastrobar with a terrace on a pedestrian street in San Pedro de Alcántara.',
    reservarMesa: 'Book a table', verCarta: 'See the menu', bajar: 'Scroll to Our story',
    historiaEyebrow: 'Our story', historiaTitulo: 'A meeting point,<br><em>a neighbourhood soul.</em>',
    historiaP1: 'Flanker has become a meeting point in San Pedro de Alcántara: the place to meet up for the match, for an after-work drink or just because.',
    historiaP2: 'Estrella Galicia tank beer, poured right here. A terrace on a pedestrian street in Guadalcántara. Creative tapas that change with every new menu. And on some nights, live flamenco and music: what we call Flankerío.',
    fact1k: 'Beer', fact1v: 'Estrella Galicia tank beer', fact2k: 'Terrace', fact2v: 'On a pedestrian street', fact3k: 'Average price', fact3v: '€20–30 per person',
    fact4v: '4.5 out of 5 · 713 reviews',
    altFachada: 'Entrance of Flanker Bar, with green woodwork, hanging plants and a guest on a stool',
    altEquipo: "Flanker's kitchen team posing in the kitchen, in black and white", capEquipo: 'The team, at the stove.',
    expEyebrow: 'Experiences', expTitulo: 'Four ways to<br><em>enjoy Flanker.</em>',
    altPatatas: 'Fried potatoes with steak tartare and a runny-yolk egg on a wooden bar',
    exp1T: 'Tapas', exp1P: 'Creative tapas to share: from classic patatas bravas to the steak tartare with roasted bone marrow on our new menu. Cooked here, with good produce and no rush.',
    altTerraza: 'Guests on the terrace with glasses of beer on the table',
    exp2T: 'Drinks', exp2P: 'Estrella Galicia tank beer poured right here, wines, gin & tonics and well-made drinks. At the bar or out on the terrace, right on the pedestrian street.',
    altFlamenco: 'Singer with a Spanish guitar performing under the flamenco dancer mural at Flanker',
    exp3T: 'Flamenco & live music', exp3P: 'Some nights the bar becomes a tablao: singers, guitars and hand-clapping. We call it Flankerío, and it fills up. Better to book a table.',
    proximas: 'Upcoming nights', eventosCargando: 'Check upcoming dates on our Instagram.',
    altFutbol: "Screen showing a football match above Flanker's bar, with a full house",
    exp4T: 'Live football', exp4P: "When there's football on, you can feel it at Flanker. We show the matches on screen, with a well-poured tank beer and something to nibble. If a big game is coming up, best to book a table.",
    preguntaPartido: 'Ask us about the next match',
    localEyebrow: 'The bar', localTitulo: 'Bar, terrace<br><em>and plenty of life.</em>',
    localIntro: 'White walls, green woodwork, photos of artists and a flamenco dancer mural that is now part of the house. Tap any image to see it full screen.',
    g1: 'Interior with the flamenco dancer mural on a green circle and framed photos', g2: 'Hands chopping meat by knife for the steak tartare',
    g3: 'Guest at the wooden bar with the beer taps behind', g4: 'Singer with a microphone performing on the terrace',
    g5: 'Cured pork loin toasts on newspaper', g6: 'Two guests laughing at the outdoor bar',
    g7: 'Freshly sliced brioche in the kitchen', g8: 'Guest smiling with a drink on the terrace',
    g9: 'Close-up of the runny-yolk egg on potatoes and tartare', g10: 'Flanker chef presenting the tartare with bone marrow on the terrace',
    g11: 'Toast being browned with a blowtorch',
    cartaEyebrow: 'The menu', cartaTitulo: 'To nibble, share<br><em>and come back for.</em>', cartaCategorias: 'Menu categories',
    cartaNota: 'Prices include VAT; please confirm them at the bar. Allergen information is a guide only: if you have an allergy or intolerance, tell us and we will advise you. Gluten-free options available.',
    reservasEyebrow: 'Bookings', reservasTitulo: 'Your table,<br><em>in three steps.</em>',
    reservasIntro: "Pick a day, time and party size. When you confirm, WhatsApp opens with the message already written: just send it and we'll reply to confirm.",
    horarioMV: 'Tuesday to Friday', horarioSD: 'Saturday and Sunday', horarioL: 'Monday', cerrado: 'Closed', prefiereLlamar: 'Prefer to call?',
    paso1: 'Pick a day', mesAnterior: 'Previous month', mesSiguiente: 'Next month', calendario: 'Booking calendar',
    calHint: 'We are closed on Mondays. Bookings up to 60 days ahead.', paso2: 'Pick a time', horasDisponibles: 'Available times',
    eligeDia: 'First, pick a day on the calendar.', paso3: 'Your details', personas: 'Guests', masDe12: 'More than 12', zona: 'Area',
    interior: 'Indoors', terraza: 'Terrace', indiferente: 'No preference', grupoAviso: 'For groups of more than 12, give us a call and we will sort it out:',
    nombre: 'Name', telefono: 'Phone', comentarios: 'Comments', opcional: '(optional)',
    comentariosPh: "Allergies, a celebration, the match you'd like to watch…", privacidadAcepto: 'I have read and accept the',
    politicaPrivacidad: 'privacy policy', confirmarWhatsapp: 'Confirm on WhatsApp', solicitudEnviada: 'Request ready',
    teConfirmaremos: "We'll confirm on WhatsApp", doneTexto: "If WhatsApp didn't open, tap the button below or give us a call. Your booking is confirmed once we reply.",
    abrirWhatsapp: 'Open WhatsApp', otraReserva: 'Make another booking',
    opinionesEyebrow: 'Reviews', opinionesTitulo: 'What people say<br><em>on the terrace.</em>',
    ratingTexto: '4.5 out of 5 on Google · 713 reviews (November 2026)',
    opinionesTexto: "If you've been to Flanker, your review helps us a lot. And if not yet, here is what our guests say.",
    dejaResena: 'Leave us a review', verOpiniones: 'Read all reviews on Google',
    contactoEyebrow: 'Contact & location', contactoTitulo: 'See you<br><em>in Guadalcántara.</em>', horario: 'Opening hours', horarioSemanal: 'Weekly opening hours',
    d0: 'Sunday', d1: 'Monday', d2: 'Tuesday', d3: 'Wednesday', d4: 'Thursday', d5: 'Friday', d6: 'Saturday',
    reservasWhatsapp: 'Bookings & WhatsApp', fijo: 'Landline', escribenos: 'Message us', servicios: 'Services',
    am1: 'Terrace', am2: 'Wheelchair access', am3: 'Card payments', am4: 'Wi-Fi', am5: 'Football on screen', am6: 'Bookings',
    comoLlegar: 'Get directions', mapaTexto: 'The map is provided by Google Maps, which may set third-party cookies. It only loads if you ask for it.',
    cargarMapa: 'Load map', legal: 'Legal', avisoLegal: 'Legal notice', privacidad: 'Privacy policy', cookies: 'Cookie policy',
    fotosCredito: 'Photos: @barflanker', escribirWhatsapp: 'Message us on WhatsApp', visor: 'Photo viewer', cerrar: 'Close',
    anterior: 'Previous photo', siguiente: 'Next photo',
    consentTexto: 'This website uses no cookies of its own. The Google Maps map does set third-party cookies: would you like to load it? <a href="cookies.html">More about cookies</a>.',
    rechazar: 'Reject', aceptar: 'Accept'
  };

  // Textos generados por JS, en los dos idiomas
  const T = {
    es: {
      cerrarMenu: 'Cerrar menú', abrirMenu: 'Abrir menú', switchLang: 'Switch to English',
      abierto: 'Abierto ahora', cerradoAhora: 'Cerrado ahora', abreHoy: 'abre hoy a las', abreManana: 'abre mañana a las', abreDia: 'abre el', cierraA: 'cierra a las', hoy: 'Hoy',
      noDisponible: 'no disponible', seleccionado: 'seleccionado', sinHoras: 'Hoy ya no quedan horas libres. Elige otro día.',
      personas: n => n === 1 ? '1 persona' : `${n} personas`,
      zonas: { interior: 'interior', terraza: 'terraza', indiferente: 'indiferente' },
      errNombre: 'Escribe tu nombre.', errTel: 'Escribe un móvil o fijo español válido (9 cifras, por ejemplo 612 345 678).',
      errPriv: 'Necesitamos que aceptes la política de privacidad.', errFecha: 'Elige un día en el calendario.', errHora: 'Elige una hora.',
      errGrupo: 'Para más de 12 personas, llámanos al 628 573 872.',
      verInstagram: 'Ver en Instagram', sinEventos: 'Ahora mismo no hay fechas anunciadas. Las publicamos primero en ',
      cartaError: 'No hemos podido cargar la carta. Llámanos al 628 573 872 y te la contamos.', alergenos: 'Alérgenos',
      sinAlergenos: 'Sin alérgenos declarados', foto: 'Foto', de: 'de', a: 'a las'
    },
    en: {
      cerrarMenu: 'Close menu', abrirMenu: 'Open menu', switchLang: 'Cambiar a español',
      abierto: 'Open now', cerradoAhora: 'Closed now', abreHoy: 'opens today at', abreManana: 'opens tomorrow at', abreDia: 'opens on', cierraA: 'closes at', hoy: 'Today',
      noDisponible: 'unavailable', seleccionado: 'selected', sinHoras: 'There are no times left today. Please pick another day.',
      personas: n => n === 1 ? '1 guest' : `${n} guests`,
      zonas: { interior: 'indoors', terraza: 'terrace', indiferente: 'no preference' },
      errNombre: 'Please enter your name.', errTel: 'Please enter a valid Spanish phone number (9 digits, e.g. 612 345 678).',
      errPriv: 'Please accept the privacy policy.', errFecha: 'Please pick a day on the calendar.', errHora: 'Please pick a time.',
      errGrupo: 'For more than 12 guests, please call us on +34 628 573 872.',
      verInstagram: 'See on Instagram', sinEventos: 'No dates announced right now. We post them first on ',
      cartaError: "We couldn't load the menu. Call us on +34 628 573 872 and we'll tell you all about it.", alergenos: 'Allergens',
      sinAlergenos: 'No declared allergens', foto: 'Photo', de: 'of', a: 'at'
    }
  };

  /* ------------------------------------------------------------------
     Idioma
  ------------------------------------------------------------------ */
  let lang = 'es';
  const ES = { text: new Map(), html: new Map(), attr: new Map() };
  $$('[data-i18n]').forEach(el => ES.text.set(el, el.textContent));
  $$('[data-i18n-html]').forEach(el => ES.html.set(el, el.innerHTML));
  $$('[data-i18n-attr]').forEach(el => {
    const [attr] = el.dataset.i18nAttr.split(':');
    ES.attr.set(el, el.getAttribute(attr));
  });
  const t = k => T[lang][k];
  const listeners = [];

  function applyLang(next, save) {
    lang = next === 'en' ? 'en' : 'es';
    root.lang = lang;
    $$('[data-i18n]').forEach(el => { const v = lang === 'en' ? EN[el.dataset.i18n] : ES.text.get(el); if (v != null) el.textContent = v; });
    $$('[data-i18n-html]').forEach(el => { const v = lang === 'en' ? EN[el.dataset.i18nHtml] : ES.html.get(el); if (v != null) el.innerHTML = v; });
    $$('[data-i18n-attr]').forEach(el => {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      const v = lang === 'en' ? EN[key] : ES.attr.get(el); if (v != null) el.setAttribute(attr, v);
    });
    const sr = $('[data-lang-sr]'); if (sr) sr.textContent = t('switchLang') + ': ';
    if (save) store.set('flanker-lang', lang);
    listeners.forEach(fn => fn());
  }
  const saved = store.get('flanker-lang');
  const initial = saved || ((navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'es');
  $('[data-lang-toggle]')?.addEventListener('click', () => {
    const next = lang === 'es' ? 'en' : 'es';
    if (reduceMotion.matches) return applyLang(next, true);
    root.classList.add('lang-fading'); // fundido corto del texto
    setTimeout(() => { applyLang(next, true); requestAnimationFrame(() => root.classList.remove('lang-fading')); }, 200);
  });

  /* ------------------------------------------------------------------
     Fechas en hora de Madrid (los turistas pueden tener el móvil en otra zona)
  ------------------------------------------------------------------ */
  function madridNow() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).reduce((o, p) => (o[p.type] = p.value, o), {});
    const date = Date.UTC(+parts.year, +parts.month - 1, +parts.day);
    return { date, minutes: (+parts.hour % 24) * 60 + +parts.minute };
  }
  const DAY = 86400000;
  const dow = d => new Date(d).getUTCDay();
  const iso = d => new Date(d).toISOString().slice(0, 10);
  const fromIso = s => { const [y, m, dd] = s.split('-').map(Number); return Date.UTC(y, m - 1, dd); };
  const fmt = (d, opts, l = lang) => new Intl.DateTimeFormat(l === 'en' ? 'en-GB' : 'es-ES', { timeZone: 'UTC', ...opts }).format(new Date(d));
  const longDate = (d, l = lang) => fmt(d, { weekday: 'long', day: 'numeric', month: 'long' }, l).replace(',', '');
  const hm = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

  // Horario: [apertura, cierre] en minutos; 1440 = 00:00 del día siguiente. Lunes cerrado.
  const HOURS = { 0: [750, 1440], 1: null, 2: [960, 1440], 3: [960, 1440], 4: [960, 1440], 5: [960, 1440], 6: [750, 1440] };
  // Reservas: tramos de 30 min hasta las 23:00
  const BOOK = { 0: [750, 1380], 2: [960, 1380], 3: [960, 1380], 4: [960, 1380], 5: [960, 1380], 6: [750, 1380] };

  /* ------------------------------------------------------------------
     Pantalla de carga (< 1 s)
  ------------------------------------------------------------------ */
  const start = performance.now();
  let loadedDone = false;
  function finishLoading() {
    if (loadedDone) return; loadedDone = true;
    const wait = Math.max(0, 450 - (performance.now() - start));
    setTimeout(() => { root.classList.add('loaded'); setTimeout(typeLogo, reduceMotion.matches ? 0 : 250); }, reduceMotion.matches ? 0 : wait);
  }
  window.addEventListener('load', finishLoading);
  setTimeout(finishLoading, 800);

  /* ------------------------------------------------------------------
     Logo escrito en directo al abrir la página
     Usa el mismo archivo del logo recortado por letras (no se redibuja).
     Límites de cada letra medidos en el PNG de 580 px: F L A N K E R.
  ------------------------------------------------------------------ */
  const typed = $('[data-typed]');
  const CUTS = [0, 68, 134, 235, 330.5, 420, 491, 580];
  let heroReady = false;
  const setHeroReady = () => { if (!heroReady) { heroReady = true; root.classList.add('hero-ready'); } };
  setTimeout(setHeroReady, 4000); // red de seguridad
  function typeLogo() {
    if (!typed || reduceMotion.matches) { typed && typed.classList.add('is-done'); setHeroReady(); return; }
    const logo = $('.hero__logo', typed), caret = $('.typed__caret', typed);
    const pct = v => (v / 580 * 100).toFixed(3) + '%';
    const layers = CUTS.slice(0, -1).map((a, i) => {
      const img = document.createElement('img');
      img.src = logo.currentSrc || logo.src; img.alt = ''; img.className = 'typed__l'; img.setAttribute('aria-hidden', 'true');
      img.style.clipPath = `inset(0 ${(100 - CUTS[i + 1] / 580 * 100).toFixed(3)}% 0 ${pct(a)})`;
      typed.insertBefore(img, caret);
      return img;
    });
    typed.classList.add('is-typing');
    caret.style.left = '0%'; caret.classList.add('is-blink');
    let i = 0;
    const next = () => {
      if (i === 0) caret.classList.remove('is-blink');
      layers[i].classList.add('is-on');
      caret.style.left = pct(CUTS[i + 1]);
      i++;
      if (i < layers.length) setTimeout(next, 95 + Math.random() * 90); // ritmo humano, no mecánico
      else {
        caret.classList.add('is-blink');
        setTimeout(() => { typed.classList.add('is-done'); setHeroReady(); }, 650);
        setTimeout(() => { typed.classList.remove('is-typing'); layers.forEach(l => l.remove()); }, 1900);
      }
    };
    setTimeout(next, 420);
  }

  /* ------------------------------------------------------------------
     Cabecera, menú móvil y enlace activo
  ------------------------------------------------------------------ */
  const header = $('.header');
  const burger = $('.burger');
  const floating = $('[data-floating]');
  const hero = $('.hero');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('is-solid', y > 40);
      const pastHero = y > (hero ? hero.offsetHeight * .6 : 300);
      floating?.classList.toggle('is-visible', pastHero && !floatingHidden);
      parallax();
      ticking = false;
    });
  }
  let floatingHidden = false;
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? t('cerrarMenu') : t('abrirMenu'));
    if (open) $('.nav__list a')?.focus({ preventScroll: true });
  }
  burger?.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('.nav a:not([href^="#"])').forEach(a => a.addEventListener('click', () => setMenu(false))); // los internos los gestiona goTo()
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
    if (e.key === 'Tab' && root.classList.contains('menu-open')) { // foco dentro del menú abierto
      const items = [...$$('.nav a'), $('[data-lang-toggle]'), burger].filter(Boolean);
      const first = $('[data-lang-toggle]'), last = $$('.nav a').pop();
      if (!items.includes(document.activeElement)) { e.preventDefault(); $('.nav a').focus(); }
      else if (e.shiftKey && document.activeElement === $('.nav a')) { e.preventDefault(); burger.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  const mqDesk = window.matchMedia('(min-width: 960px)');
  const onDesk = e => { if (e.matches) setMenu(false); };
  if (mqDesk.addEventListener) mqDesk.addEventListener('change', onDesk); else if (mqDesk.addListener) mqDesk.addListener(onDesk); // Safari < 14

  const navLinks = $$('.nav__list a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navLinks.forEach(a => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id));
        navLinks.forEach(a => a.hasAttribute('aria-current') && a.setAttribute('aria-current', 'true'));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['historia', 'experiencias', 'local', 'carta', 'reservas', 'contacto'].forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });

    // El botón flotante se esconde en Reservas y en el pie
    const hideIo = new IntersectionObserver(entries => {
      entries.forEach(en => { en.target._vis = en.isIntersecting; });
      floatingHidden = [$('#reservas'), $('.footer')].some(el => el && el._vis);
      onScroll();
    }, { threshold: 0.05 });
    [$('#reservas'), $('.footer')].forEach(el => el && hideIo.observe(el));
  }

  /* ------------------------------------------------------------------
     Apariciones al hacer scroll (con red de seguridad)
  ------------------------------------------------------------------ */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    root.classList.add('js-reveal');
    const rio = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => rio.observe(el));
    // Si algo falla, todo visible a los 3 s de haber llegado a cada zona
    setTimeout(() => reveals.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight * 1.2) el.classList.add('is-in'); }), 3000);
    window.addEventListener('beforeprint', () => reveals.forEach(el => el.classList.add('is-in')));
  }

  /* ------------------------------------------------------------------
     Navegación suave al pulsar enlaces internos (menú, botones, flotante)
     - Distancia corta: desplazamiento con aceleración y frenada suaves.
     - Distancia larga: fundido al color del apartado de destino, salto
       invisible y entrada escalonada de su contenido.
  ------------------------------------------------------------------ */
  const veil = document.createElement('div');
  veil.className = 'veil'; veil.setAttribute('aria-hidden', 'true');
  document.body.appendChild(veil);
  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let navBusy = false;
  const headerOffset = () => (header ? header.offsetHeight : 0) - 1; // el apartado empieza justo bajo la cabecera
  const sectionOf = el => el.closest('section, footer') || el;
  function bgOf(el) {
    for (let n = sectionOf(el); n && n !== document.documentElement; n = n.parentElement) {
      const c = getComputedStyle(n).backgroundColor;
      if (c && c !== 'transparent' && !/rgba\(0, 0, 0, 0\)/.test(c)) return c;
    }
    return getComputedStyle(document.body).backgroundColor;
  }
  function staggerIn(sec) {
    const items = $$('.reveal', sec).filter(el => el.getBoundingClientRect().top < innerHeight);
    items.forEach(el => { el.classList.remove('is-in'); el.style.transitionDelay = '0ms'; });
    void sec.offsetWidth;
    items.forEach((el, i) => { el.style.transitionDelay = `${120 + i * 80}ms`; el.classList.add('is-in'); });
    setTimeout(() => items.forEach(el => { el.style.transitionDelay = ''; }), 1400);
  }
  function scrollToY(y, dur) {
    return new Promise(res => {
      const from = scrollY, d = y - from, t0 = performance.now();
      const step = now => {
        const p = Math.min(1, (now - t0) / dur);
        window.scrollTo(0, from + d * easeInOut(p));
        p < 1 ? requestAnimationFrame(step) : res();
      };
      requestAnimationFrame(step);
    });
  }
  async function goTo(target, hash) {
    if (navBusy) return; navBusy = true;
    const y = Math.max(0, target.getBoundingClientRect().top + scrollY - (target === hero ? 0 : headerOffset()));
    const dist = Math.abs(y - scrollY);
    root.style.scrollBehavior = 'auto';
    if (reduceMotion.matches || dist < 4) window.scrollTo(0, y);
    else if (dist <= innerHeight * 1.3) await scrollToY(y, Math.min(900, 450 + dist * .35));
    else {
      veil.style.backgroundColor = bgOf(target);
      veil.classList.add('is-on');
      await new Promise(r => setTimeout(r, 380));
      window.scrollTo(0, y);
      if ('IntersectionObserver' in window && root.classList.contains('js-reveal')) staggerIn(sectionOf(target));
      requestAnimationFrame(() => veil.classList.remove('is-on'));
      await new Promise(r => setTimeout(r, 560));
    }
    root.style.scrollBehavior = '';
    if (hash) history.pushState(null, '', hash);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    navBusy = false;
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const hash = a.getAttribute('href');
    const target = hash === '#arriba' ? hero : (hash.length > 1 && document.getElementById(hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    const fromMenu = root.classList.contains('menu-open');
    if (fromMenu) setMenu(false);
    setTimeout(() => goTo(target, hash === '#arriba' ? location.pathname + location.search : hash), fromMenu ? 280 : 0);
  });

  /* ------------------------------------------------------------------
     Parallax sutil en las fotos (máx. ±24 px)
  ------------------------------------------------------------------ */
  const plx = $$('[data-parallax]');
  function parallax() {
    if (reduceMotion.matches || innerWidth < 600) return;
    const vh = innerHeight;
    plx.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = ((r.top + r.height / 2) - vh / 2) / vh; // -1 … 1
      const img = el.firstElementChild;
      img && img.style.setProperty('--py', `${(Math.max(-1, Math.min(1, p)) * -24).toFixed(1)}px`);
    });
  }

  /* ------------------------------------------------------------------
     Vídeo del hero (solo si existe y no se pide reducir movimiento)
  ------------------------------------------------------------------ */
  const video = $('[data-hero-video]');
  if (video) {
    const conn = navigator.connection;
    const saveData = conn && (conn.saveData || /2g|3g/.test(conn.effectiveType || ''));
    if (!video.querySelector('source') || reduceMotion.matches || saveData) video.remove();
    else {
      video.preload = 'auto';
      video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
      video.play().catch(() => {});
    }
  }

  /* ------------------------------------------------------------------
     Próximos eventos (eventos.json)
  ------------------------------------------------------------------ */
  const evList = $('[data-eventos]');
  let eventos = null;
  function renderEventos() {
    if (!evList) return;
    const igLink = `<a href="https://www.instagram.com/barflanker/" target="_blank" rel="noopener">Instagram</a>`;
    if (!eventos) { evList.innerHTML = `<li class="eventos__empty">${t('sinEventos')}${igLink}.</li>`; return; }
    const today = madridNow().date;
    const next = eventos.filter(e => fromIso(e.fecha) >= today).sort((a, b) => a.fecha.localeCompare(b.fecha)).slice(0, 4);
    if (!next.length) { evList.innerHTML = `<li class="eventos__empty">${t('sinEventos')}${igLink}.</li>`; return; }
    evList.innerHTML = next.map(e => {
      const d = fromIso(e.fecha);
      const title = (e.titulo && (e.titulo[lang] || e.titulo.es)) || '';
      const desc = e.descripcion ? (e.descripcion[lang] || e.descripcion.es) : '';
      return `<li class="evento">
        <p class="evento__date"><span class="evento__day">${fmt(d, { day: 'numeric' })}</span><span class="evento__mon">${fmt(d, { month: 'short' }).replace('.', '')}</span></p>
        <div><p class="evento__t">${esc(title)}</p>
        <p class="evento__meta">${cap(fmt(d, { weekday: 'long' }))} · ${esc(e.hora || '')}${desc ? ' · ' + esc(desc) : ''}</p>
        ${e.enlace ? `<p class="evento__meta"><a href="${encodeURI(e.enlace)}" target="_blank" rel="noopener">${t('verInstagram')}</a></p>` : ''}</div>
      </li>`;
    }).join('');
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  fetch('eventos.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : Promise.reject()).then(d => { eventos = d.eventos || []; renderEventos(); })
    .catch(() => { eventos = null; renderEventos(); });
  listeners.push(renderEventos);

  /* ------------------------------------------------------------------
     La carta (carta.json) con pestañas accesibles
  ------------------------------------------------------------------ */
  const menu = $('[data-menu]');
  let carta = null, activeCat = 0;
  function renderCarta() {
    if (!menu) return;
    const tabs = $('[data-menu-tabs]', menu), panels = $('[data-menu-panels]', menu), legend = $('[data-menu-legend]', menu);
    if (!carta) { panels.innerHTML = `<p class="menu__noscript">${t('cartaError')}</p>`; return; }
    const L = o => (o && (o[lang] || o.es)) || '';
    tabs.innerHTML = carta.categorias.map((c, i) =>
      `<button class="menu__tab" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="${i === activeCat}" tabindex="${i === activeCat ? 0 : -1}">${esc(L(c.nombre))}</button>`).join('');
    panels.innerHTML = carta.categorias.map((c, i) => `
      <div class="menu__panel" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}" tabindex="0" ${i === activeCat ? '' : 'hidden'}>
        <h3 class="menu__cat">${esc(L(c.nombre))}</h3>
        <ul class="dishes" role="list">${c.platos.map(p => `
          <li class="dish">
            <div class="dish__row"><h4 class="dish__name">${esc(L(p.nombre))}</h4><span class="dish__dots" aria-hidden="true"></span><span class="dish__price">${esc(p.precio || '—')}${p.precio && p.precio !== '—' && !/€/.test(p.precio) ? ' €' : ''}</span></div>
            ${L(p.descripcion) ? `<p class="dish__desc">${esc(L(p.descripcion))}</p>` : ''}
            ${(p.alergenos || []).length ? `<ul class="dish__alg" role="list" aria-label="${t('alergenos')}">${p.alergenos.map(a => carta.alergenos[a] ? `<li class="alg" title="${esc(L(carta.alergenos[a]))}"><svg aria-hidden="true"><use href="#a-${a}"/></svg><span class="sr-only">${esc(L(carta.alergenos[a]))}</span></li>` : '').join('')}</ul>` : ''}
          </li>`).join('')}
        </ul>
      </div>`).join('');
    legend.innerHTML = Object.entries(carta.alergenos).map(([k, v]) => `<li><span class="alg" aria-hidden="true"><svg><use href="#a-${k}"/></svg></span>${esc(L(v))}</li>`).join('');
    setFigure(false);
    $$('[role="tab"]', tabs).forEach((tab, i) => {
      tab.addEventListener('click', () => selectTab(i, true));
      tab.addEventListener('keydown', e => {
        const n = carta.categorias.length;
        const map = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 };
        if (e.key in map) { e.preventDefault(); selectTab(map[e.key], true); $$('[role="tab"]', tabs)[map[e.key]].focus(); }
      });
    });
  }
  function selectTab(i, animate) {
    activeCat = i;
    const tabs = $$('[role="tab"]', menu), panels = $$('[role="tabpanel"]', menu);
    tabs.forEach((tab, j) => { tab.setAttribute('aria-selected', String(j === i)); tab.tabIndex = j === i ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = j !== i; });
    tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    setFigure(animate);
  }
  function setFigure(animate) {
    const fig = $('[data-menu-fig]', menu); const c = carta.categorias[activeCat]; if (!fig) return;
    if (!c.imagen) { fig.innerHTML = ''; return; }
    const { base, w, h } = c.imagen;
    const html = `<img src="img/${base}-480.webp" srcset="img/${base}-480.webp 480w, img/${base}-720.webp 720w" sizes="(min-width: 900px) 38vw, 1px" width="${w}" height="${h}" alt="" loading="lazy" decoding="async">`;
    const old = fig.querySelector('img');
    if (!animate || !old || reduceMotion.matches) { fig.innerHTML = html; return; }
    old.classList.add('is-changing');
    setTimeout(() => { fig.innerHTML = html; const n = fig.querySelector('img'); n.classList.add('is-changing'); requestAnimationFrame(() => requestAnimationFrame(() => n.classList.remove('is-changing'))); }, 260);
  }
  fetch('carta.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : Promise.reject()).then(d => { carta = d; renderCarta(); })
    .catch(() => { carta = null; renderCarta(); });
  listeners.push(() => carta && renderCarta());

  /* ------------------------------------------------------------------
     Galería con visor a pantalla completa y deslizamiento
  ------------------------------------------------------------------ */
  const lb = $('[data-lightbox]');
  const gItems = $$('[data-gallery] .g__btn');
  let lbIndex = 0, lastFocus = null;
  function showLb(i, dir = 0) {
    lbIndex = (i + gItems.length) % gItems.length;
    const btn = gItems[lbIndex], src = btn.dataset.full, alt = btn.querySelector('img').alt;
    const img = $('[data-lb-img]', lb);
    const apply = () => { img.src = src; img.alt = alt; $('[data-lb-cap]', lb).textContent = alt; $('[data-lb-count]', lb).textContent = `${lbIndex + 1} / ${gItems.length}`; };
    if (dir && !reduceMotion.matches) {
      img.style.setProperty('--dir', `${dir * -16}px`); img.classList.add('is-changing');
      setTimeout(() => { apply(); img.style.setProperty('--dir', `${dir * 16}px`); img.onload = () => requestAnimationFrame(() => img.classList.remove('is-changing')); setTimeout(() => img.classList.remove('is-changing'), 400); }, 220);
    } else apply();
  }
  if (lb && typeof lb.showModal === 'function') {
    gItems.forEach((b, i) => b.addEventListener('click', () => { lastFocus = b; showLb(i); lb.showModal(); root.style.overflow = 'hidden'; }));
    $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
    $('[data-lb-prev]', lb).addEventListener('click', () => showLb(lbIndex - 1, -1));
    $('[data-lb-next]', lb).addEventListener('click', () => showLb(lbIndex + 1, 1));
    lb.addEventListener('close', () => { root.style.overflow = ''; lastFocus && lastFocus.focus(); });
    lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lightbox__fig')) lb.close(); });
    lb.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') showLb(lbIndex + 1, 1);
      if (e.key === 'ArrowLeft') showLb(lbIndex - 1, -1);
    });
    let sx = 0, sy = 0;
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) showLb(lbIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) lb.close();
    }, { passive: true });
  } else {
    gItems.forEach(b => b.addEventListener('click', () => window.open(b.dataset.full, '_blank')));
  }

  /* ------------------------------------------------------------------
     Reservas: calendario propio + horas + WhatsApp
  ------------------------------------------------------------------ */
  const booking = $('[data-booking]');
  if (booking) {
    const form = $('[data-booking-form]', booking);
    const grid = $('[data-cal-grid]', booking);
    const monthLbl = $('[data-cal-month]', booking);
    const prevBtn = $('[data-cal-prev]', booking), nextBtn = $('[data-cal-next]', booking);
    const slotsBox = $('[data-slots]', booking);
    const stepTime = $('[data-step-time]', booking);
    const chosenLbl = $('[data-chosen-date]', booking);
    const personas = $('[data-personas]', booking);
    const grupoAviso = $('[data-grupo-aviso]', booking);
    const summary = $('[data-summary]', booking);
    const formError = $('[data-form-error]', booking);
    const done = $('[data-booking-done]', booking);
    const state = { date: null, time: null, view: null, focus: null };

    const now = () => madridNow();
    const slotsFor = d => {
      const r = BOOK[dow(d)]; if (!r) return [];
      const out = []; for (let m = r[0]; m <= r[1]; m += 30) out.push(m);
      const n = now();
      return d === n.date ? out.filter(m => m > n.minutes) : out;
    };
    const isAvailable = d => {
      const n = now();
      return d >= n.date && d <= n.date + MAX_DAYS * DAY && dow(d) !== 1 && slotsFor(d).length > 0;
    };
    const firstAvailable = () => { const n = now(); for (let i = 0; i <= MAX_DAYS; i++) { const d = n.date + i * DAY; if (isAvailable(d)) return d; } return n.date; };
    const monthStart = d => { const x = new Date(d); return Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), 1); };

    function renderDow() {
      const base = Date.UTC(2024, 0, 1); // lunes
      $('[data-cal-dow]', booking).innerHTML = Array.from({ length: 7 }, (_, i) => `<span>${fmt(base + i * DAY, { weekday: 'short' }).replace('.', '').slice(0, 3)}</span>`).join('');
    }

    function renderCal() {
      const n = now();
      if (state.view == null) state.view = monthStart(state.date || firstAvailable());
      if (state.focus == null) state.focus = state.date || firstAvailable();
      const v = new Date(state.view), y = v.getUTCFullYear(), m = v.getUTCMonth();
      monthLbl.textContent = cap(fmt(state.view, { month: 'long', year: 'numeric' }));
      prevBtn.disabled = state.view <= monthStart(n.date);
      nextBtn.disabled = state.view >= monthStart(n.date + MAX_DAYS * DAY);
      const first = Date.UTC(y, m, 1), days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
      const offset = (dow(first) + 6) % 7; // semana empieza en lunes
      let html = '', cells = [];
      for (let i = 0; i < offset; i++) cells.push('<div class="cal__cell" role="gridcell"></div>');
      for (let dd = 1; dd <= days; dd++) {
        const d = Date.UTC(y, m, dd), ok = isAvailable(d), sel = state.date === d;
        const label = cap(longDate(d)) + (ok ? '' : `, ${t('noDisponible')}`) + (sel ? `, ${t('seleccionado')}` : '');
        cells.push(`<div class="cal__cell" role="gridcell"><button type="button" class="cal__day${d === n.date ? ' is-today' : ''}" data-d="${d}" aria-label="${label}" aria-pressed="${sel}" ${ok ? '' : 'aria-disabled="true"'} tabindex="${d === state.focus ? 0 : -1}">${dd}</button></div>`);
      }
      while (cells.length % 7) cells.push('<div class="cal__cell" role="gridcell"></div>');
      for (let i = 0; i < cells.length; i += 7) html += `<div class="cal__row" role="row">${cells.slice(i, i + 7).join('')}</div>`;
      grid.innerHTML = html;
      if (!grid.querySelector('[tabindex="0"]')) { const b = grid.querySelector('.cal__day:not([aria-disabled])') || grid.querySelector('.cal__day'); b && (b.tabIndex = 0); }
    }

    function moveFocus(d) {
      const n = now();
      d = Math.max(n.date, Math.min(n.date + MAX_DAYS * DAY, d));
      state.focus = d;
      if (monthStart(d) !== state.view) { state.view = monthStart(d); renderCal(); }
      else $$('.cal__day', grid).forEach(b => b.tabIndex = +b.dataset.d === d ? 0 : -1);
      grid.querySelector(`[data-d="${d}"]`)?.focus();
    }

    grid.addEventListener('click', e => {
      const b = e.target.closest('.cal__day'); if (!b || b.getAttribute('aria-disabled') === 'true') return;
      selectDate(+b.dataset.d);
    });
    grid.addEventListener('keydown', e => {
      const b = e.target.closest('.cal__day'); if (!b) return;
      const d = +b.dataset.d;
      const map = { ArrowRight: DAY, ArrowLeft: -DAY, ArrowDown: 7 * DAY, ArrowUp: -7 * DAY };
      if (e.key in map) { e.preventDefault(); moveFocus(d + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); moveFocus(d - ((dow(d) + 6) % 7) * DAY); }
      else if (e.key === 'End') { e.preventDefault(); moveFocus(d + (6 - (dow(d) + 6) % 7) * DAY); }
      else if (e.key === 'PageDown') { e.preventDefault(); moveFocus(d + 30 * DAY); }
      else if (e.key === 'PageUp') { e.preventDefault(); moveFocus(d - 30 * DAY); }
    });
    const slideMonth = dir => {
      const v = new Date(state.view); state.view = Date.UTC(v.getUTCFullYear(), v.getUTCMonth() + dir, 1); state.focus = null;
      renderCal();
      if (!reduceMotion.matches) { grid.style.setProperty('--from', (dir * 18) + 'px'); grid.classList.remove('is-sliding'); void grid.offsetWidth; grid.classList.add('is-sliding'); }
    };
    prevBtn.addEventListener('click', () => slideMonth(-1));
    nextBtn.addEventListener('click', () => slideMonth(1));

    function selectDate(d) {
      state.date = d; state.focus = d;
      if (state.time != null && !slotsFor(d).includes(state.time)) state.time = null;
      renderCal(); renderSlots(); updateSummary();
      grid.querySelector(`[data-d="${d}"]`)?.focus();
    }

    function renderSlots() {
      if (state.date == null) { stepTime.disabled = true; chosenLbl.textContent = ''; return; }
      stepTime.disabled = false;
      chosenLbl.textContent = '· ' + cap(longDate(state.date));
      const s = slotsFor(state.date);
      if (!s.length) { slotsBox.innerHTML = `<p class="slots__empty">${t('sinHoras')}</p>`; return; }
      slotsBox.innerHTML = s.map((m, k) => `<label class="slot" style="--k:${k}"><input type="radio" name="hora" value="${hm(m)}" ${state.time === m ? 'checked' : ''}><span>${hm(m)}</span></label>`).join('');
    }
    slotsBox.addEventListener('change', e => { if (e.target.name === 'hora') { const [h, mm] = e.target.value.split(':').map(Number); state.time = h * 60 + mm; updateSummary(); formError.textContent = ''; } });

    personas.addEventListener('change', () => { grupoAviso.hidden = personas.value !== 'mas'; updateSummary(); });
    form.addEventListener('change', e => { if (e.target.name === 'zona') updateSummary(); });

    function values() {
      const fd = new FormData(form);
      return { nombre: (fd.get('nombre') || '').toString().trim(), tel: (fd.get('telefono') || '').toString().trim(), com: (fd.get('comentarios') || '').toString().trim(),
        zona: (fd.get('zona') || 'indiferente').toString(), personas: personas.value, priv: !!fd.get('privacidad') };
    }
    function updateSummary() {
      const v = values(); const parts = [];
      if (state.date != null) parts.push(cap(longDate(state.date)));
      if (state.time != null) parts.push(hm(state.time));
      if (v.personas !== 'mas') parts.push(t('personas')(+v.personas));
      parts.push(cap(t('zonas')[v.zona]));
      summary.textContent = state.date != null ? parts.join(' · ') : '';
    }

    const normalizePhone = s => {
      const digits = s.replace(/[\s().\-]/g, '');
      const m = digits.match(/^(?:\+34|0034|34)?([6789]\d{8})$/);
      return m ? m[1] : null;
    };
    const prettyPhone = p => `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6)}`;
    function setErr(name, msg) {
      const el = form.querySelector(`[name="${name}"]`), box = form.querySelector(`[data-error-for="${name}"]`);
      if (el) el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (box) box.textContent = msg || '';
    }
    ['nombre', 'telefono', 'privacidad'].forEach(n => form.querySelector(`[name="${n}"]`).addEventListener('input', () => setErr(n, '')));

    form.addEventListener('submit', e => {
      e.preventDefault();
      const v = values(); let firstBad = null; formError.textContent = '';
      const bad = (name, msg) => { setErr(name, msg); if (!firstBad) firstBad = form.querySelector(`[name="${name}"]`); };
      setErr('nombre', ''); setErr('telefono', ''); setErr('privacidad', '');
      if (v.nombre.length < 2) bad('nombre', t('errNombre'));
      const tel = normalizePhone(v.tel); if (!tel) bad('telefono', t('errTel'));
      if (!v.priv) bad('privacidad', t('errPriv'));
      let general = '';
      if (v.personas === 'mas') { general = t('errGrupo'); firstBad = firstBad || personas; }
      if (state.time == null) { general = t('errHora'); firstBad = slotsBox.querySelector('input') || firstBad; }
      if (state.date == null) { general = t('errFecha'); firstBad = grid.querySelector('[tabindex="0"]'); }
      if (state.date != null && !isAvailable(state.date)) { general = t('errFecha'); state.date = null; state.time = null; renderCal(); renderSlots(); }
      if (state.date != null && state.time != null && !slotsFor(state.date).includes(state.time)) { general = t('errHora'); state.time = null; renderSlots(); }
      if (general) formError.textContent = general;
      if (firstBad || general) { (firstBad || formError).focus?.(); return; }

      // El mensaje va siempre en español: lo lee el equipo del bar.
      const fecha = longDate(state.date, 'es');
      const n = +v.personas;
      const msg = `Hola Flanker, quiero reservar: ${fecha} a las ${hm(state.time)}, ${n} ${n === 1 ? 'persona' : 'personas'}, zona ${v.zona}. Nombre: ${v.nombre}. Tel: ${prettyPhone(tel)}. Comentarios: ${v.com || 'ninguno'}`;
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      const w = window.open(url, '_blank');
      if (w) { try { w.opener = null; } catch (err) { /* nada */ } }

      $('[data-done-summary]', booking).textContent = `${cap(longDate(state.date))} ${t('a')} ${hm(state.time)} · ${t('personas')(n)} · ${cap(t('zonas')[v.zona])}`;
      $('[data-done-wa]', booking).href = url;
      form.hidden = true; done.hidden = false; done.focus();
      if (!w) window.location.href = url; // si el navegador bloquea la ventana nueva
    });

    $('[data-booking-reset]', booking).addEventListener('click', () => {
      form.reset(); state.date = null; state.time = null; state.view = null; state.focus = null;
      grupoAviso.hidden = true; done.hidden = true; form.hidden = false;
      renderCal(); renderSlots(); updateSummary();
      grid.querySelector('[tabindex="0"]')?.focus();
    });

    // Al pasar la medianoche o cambiar de idioma se recalcula todo
    const refresh = () => { renderDow(); renderCal(); renderSlots(); updateSummary(); };
    listeners.push(refresh);
    setInterval(() => { if (!form.hidden) { renderCal(); if (state.date != null && document.activeElement?.name !== 'hora') renderSlots(); } }, 60000);
    renderDow(); renderCal();
  }

  /* ------------------------------------------------------------------
     Horario: día actual y «Abierto ahora / Cerrado»
  ------------------------------------------------------------------ */
  function renderStatus() {
    const n = madridNow(), today = dow(n.date);
    $$('[data-hours] tr').forEach(tr => {
      const isT = +tr.dataset.day === today;
      tr.classList.toggle('is-today', isT);
      tr.querySelector('th').setAttribute('data-hoy', isT ? t('hoy') : '');
      if (isT) tr.setAttribute('aria-current', 'date'); else tr.removeAttribute('aria-current');
    });
    const box = $('[data-status]'); if (!box) return;
    const h = HOURS[today];
    const open = h && n.minutes >= h[0] && n.minutes < h[1];
    let txt;
    if (open) txt = `${t('abierto')} · ${t('cierraA')} 00:00`;
    else {
      let next = null, off = 0;
      for (let i = 0; i < 8 && !next; i++) { const d = (today + i) % 7, r = HOURS[d]; if (r && (i > 0 || n.minutes < r[0])) { next = r; off = i; } }
      const when = off === 0 ? `${t('abreHoy')} ${hm(next[0])}` : off === 1 ? `${t('abreManana')} ${hm(next[0])}` : `${t('abreDia')} ${fmt(n.date + off * DAY, { weekday: 'long' })} ${t('a')} ${hm(next[0])}`;
      txt = `${t('cerradoAhora')} · ${when}`;
    }
    box.classList.toggle('is-open', !!open); box.classList.toggle('is-closed', !open);
    $('[data-status-text]', box).textContent = txt;
  }
  listeners.push(renderStatus);
  setInterval(renderStatus, 60000);

  /* ------------------------------------------------------------------
     Mapa de Google bajo consentimiento
  ------------------------------------------------------------------ */
  const mapBox = $('[data-map]');
  const consent = $('[data-consent]');
  function loadMap() {
    if (!mapBox || mapBox.querySelector('iframe')) return;
    const f = document.createElement('iframe');
    f.src = 'https://www.google.com/maps?q=36.482258,-4.9927155&z=17&hl=' + lang + '&output=embed';
    f.title = lang === 'en' ? 'Map: Flanker Bar location' : 'Mapa: ubicación de Flanker Bar';
    f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
    f.addEventListener('load', () => f.classList.add('is-loaded'));
    mapBox.appendChild(f);
    $('[data-map-placeholder]', mapBox)?.remove();
  }
  function setConsent(v) { store.set('flanker-mapa', v); consent.hidden = true; if (v === 'si') loadMap(); }
  $('[data-map-load]')?.addEventListener('click', () => setConsent('si'));
  $('[data-consent-yes]')?.addEventListener('click', () => setConsent('si'));
  $('[data-consent-no]')?.addEventListener('click', () => setConsent('no'));
  const c = store.get('flanker-mapa');
  if (c === 'si') {
    if ('IntersectionObserver' in window && mapBox) {
      const mio = new IntersectionObserver(es => { if (es[0].isIntersecting) { loadMap(); mio.disconnect(); } }, { rootMargin: '400px' });
      mio.observe(mapBox);
    } else loadMap();
  } else if (c !== 'no' && consent && mapBox && 'IntersectionObserver' in window) {
    // El aviso solo aparece al acercarse al mapa: no molesta a quien no lo va a usar
    const cio = new IntersectionObserver(es => { if (es[0].isIntersecting) { if (!store.get('flanker-mapa')) consent.hidden = false; cio.disconnect(); } }, { rootMargin: '0px 0px 200px 0px' });
    cio.observe(mapBox);
  }

  /* ------------------------------------------------------------------
     Arranque
  ------------------------------------------------------------------ */
  applyLang(initial, false);
  onScroll();
})();
