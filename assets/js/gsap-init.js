(function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  function killAll(){
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.globalTimeline.clear();
  }

  function initHero(){
    const title = document.querySelector('.hero__title');
    const sub = document.querySelector('.hero__sub');
    const buttons = document.querySelectorAll('.hero__buttons .btn');
    const pills = document.querySelectorAll('.hero__proof .pill');
    const visual = document.querySelector('.lottie-card');

    if(!title) return;

    const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });
    tl.fromTo(title, {y:22, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.8})
      .fromTo(sub, {y:14, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.6}, "-=0.45")
      .fromTo(buttons, {y:10, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.55, stagger:0.08}, "-=0.35")
      .fromTo(pills, {y:10, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.45, stagger:0.08}, "-=0.28")
      .fromTo(visual, {y:14, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.7}, "-=0.55");
  }

  function sectionTimeline(section){
    const head = section.querySelector('.section__head');
    const h = head?.querySelector('h2, h1, .h1');
    const p = head?.querySelector('p');
    const cards = section.querySelectorAll('.card');
    const slides = section.querySelectorAll('.swiper-slide, .slide');
    const logos = section.querySelectorAll('.logo');
    const panel = section.querySelectorAll('.panel, .stack__item, .callout, .form');

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger: section,
        start: "top 72%",
        end: "bottom 20%",
        once: true
      },
      defaults:{ ease:'power3.out' }
    });

    if(h) tl.fromTo(h, {y:26, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.65});
    if(p) tl.fromTo(p, {y:16, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.55}, "-=0.35");

    const group = cards.length ? cards : (slides.length ? slides : (logos.length ? logos : panel));
    if(group && group.length){
      tl.fromTo(group, {y:18, autoAlpha:0}, {y:0, autoAlpha:1, duration:0.55, stagger:0.12}, "-=0.25");
    }
  }

  function initSections(){
    document.querySelectorAll('section.section').forEach(sectionTimeline);
  }

  function initSwupHooks(){
    const swup = window.__swup;
    if(!swup) return;

    // Smooth out page leave
    swup.hooks.on('animation:out:start', () => {
      const app = document.querySelector('#app');
      if(!app) return;
      gsap.to(app, {autoAlpha:0, y:-10, filter:'blur(2px)', duration:0.28, ease:'power2.in'});
    });

    // On replace, re-init animations
    swup.hooks.on('content:replace', () => {
      requestAnimationFrame(() => {
        initAll();
        // reset scroll triggers baseline
        ScrollTrigger.refresh(true);
      });
    });
  }

  function initAll(){
    killAll();
    // Page enter
    const app = document.querySelector('#app');
    if(app){
      gsap.fromTo(app, {autoAlpha:0, y:10, filter:'blur(2px)'}, {autoAlpha:1, y:0, filter:'blur(0px)', duration:0.45, ease:'power2.out'});
    }
    initHero();
    initSections();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAll();
    initSwupHooks();
  });

})();