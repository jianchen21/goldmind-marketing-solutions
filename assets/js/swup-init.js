(function(){
  function init(){
    if(!window.Swup) return null;
    const swup = new Swup({
      containers: ['#app'],
      cache: true,
      animateHistoryBrowsing: true
    });
    window.__swup = swup;
    return swup;
  }
  if(!window.__swup) init();
})();