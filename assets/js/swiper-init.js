(function(){
  function init(){
    if(!window.Swiper) return;
    document.querySelectorAll('[data-swiper]').forEach((el) => {
      if(el.__swiper){ try{ el.__swiper.destroy(true,true); }catch(e){} }
      const prev = el.querySelector('[data-swiper-prev]');
      const next = el.querySelector('[data-swiper-next]');
      const pagination = el.querySelector('[data-swiper-pagination]');
      el.__swiper = new Swiper(el, {
        slidesPerView: 1,
        speed: 650,
        grabCursor: true,
        navigation: { prevEl: prev, nextEl: next },
        pagination: { el: pagination, clickable: true }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  window.addEventListener('load', () => {
    const swup = window.__swup;
    if(!swup) return;
    swup.hooks.on('content:replace', () => requestAnimationFrame(init));
  });
})();