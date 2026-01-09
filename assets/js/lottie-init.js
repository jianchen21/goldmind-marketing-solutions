(function(){
  function init(){
    if(!window.lottie) return;
    const target = document.getElementById('lottieHero');
    if(!target) return;
    target.innerHTML = '';
    window.__lottieHero = lottie.loadAnimation({
      container: target,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/lottie/hero.json'
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  window.addEventListener('load', () => {
    const swup = window.__swup;
    if(!swup) return;
    swup.hooks.on('content:replace', () => requestAnimationFrame(init));
  });
})();