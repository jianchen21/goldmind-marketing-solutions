(function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  function killTriggers(){
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  function init(){
    killTriggers();

    const app = document.querySelector('#app');
    if(app){
      gsap.fromTo(app, {autoAlpha:0, y:10}, {autoAlpha:1, y:0, duration:0.55, ease:'power2.out'});
    }

    // reveal elements
    gsap.utils.toArray('.card, .panel, .stack__item, .logo, .slide').forEach((el) => {
      gsap.fromTo(el, {y:18, autoAlpha:0}, {
        y:0, autoAlpha:1, duration:0.55, ease:'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });

    ScrollTrigger.refresh();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.addEventListener('load', () => {
    const swup = window.__swup;
    if(!swup) return;

    swup.hooks.on('animation:out:start', () => {
      const app = document.querySelector('#app');
      if(app) gsap.to(app, {autoAlpha:0, y:-6, duration:0.25, ease:'power2.in'});
    });

    swup.hooks.on('content:replace', () => requestAnimationFrame(init));
  });
})();