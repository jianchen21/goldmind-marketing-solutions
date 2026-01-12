(function(){
  function init(){
    if(!window.Swup) return null;

    const swup = new Swup({
      containers: ['#app'],
      cache: true,
      animateHistoryBrowsing: true,
      linkSelector: 'a[data-nav]'
    });

    // If clicking hash on same page, allow default smooth scroll
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-nav]');
      if(!a) return;
      const href = a.getAttribute('href') || '';
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });

    window.__swup = swup;
    return swup;
  }
  if(!window.__swup) init();
})();