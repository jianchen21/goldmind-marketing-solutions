(function(){
  const burger = document.querySelector('.burger');
  if(burger){
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      document.documentElement.classList.toggle('nav-open', !expanded);
    });
  }

  // Close mobile nav when clicking a nav link
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-nav]');
    if(!a) return;
    if(document.documentElement.classList.contains('nav-open')){
      document.documentElement.classList.remove('nav-open');
      burger?.setAttribute('aria-expanded', 'false');
    }
  });

  // Floating WhatsApp CTA show after small scroll
  const fab = document.querySelector('.fab-whatsapp');
  function toggleFab(){
    if(!fab) return;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    fab.classList.toggle('is-visible', y > 220);
  }
  window.addEventListener('scroll', toggleFab, { passive:true });
  window.addEventListener('load', toggleFab);

  // Form placeholder
  const form = document.getElementById('contact_form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Form placeholder. Connect this to your CRM / form tool.');
    });
  }

  // Re-run after Swup page replace
  window.addEventListener('load', () => {
    const swup = window.__swup;
    if(!swup) return;
    swup.hooks.on('content:replace', () => requestAnimationFrame(() => {
      toggleFab();
    }));
  });
})();