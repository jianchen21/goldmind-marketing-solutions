
(function(){
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true':'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('active');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  reveals.forEach(function(el){ io.observe(el); });

  function animateCount(el, target){
    var dur = 900;
    var startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      var p = Math.min(1, (ts - startTime)/dur);
      el.textContent = Math.floor(p * target).toString();
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var countEls = document.querySelectorAll('[data-count]');
  var ioCount = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var target = parseInt(e.target.getAttribute('data-count') || '0', 10);
        animateCount(e.target, target);
        ioCount.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  countEls.forEach(function(el){ ioCount.observe(el); });

  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.panel');
  function setActive(id){
    tabs.forEach(function(t){
      var on = t.getAttribute('data-tab') === id;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true':'false');
    });
    panels.forEach(function(p){
      p.classList.toggle('active', p.id === id);
    });
  }
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      setActive(t.getAttribute('data-tab'));
    });
  });
  if(tabs.length) setActive('fb');

  var par = document.querySelector('.parallax');
  if(par){
    window.addEventListener('scroll', function(){
      var r = par.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      var p = (r.top - vh) / (vh + r.height);
      var yv = Math.max(-10, Math.min(10, -p * 14));
      par.style.transform = 'translateY(' + yv + 'px)';
    }, { passive: true });
  }
})();

// Netlify form success modal
(function(){
  var form = document.querySelector('form[name="lead"]');
  if(!form) return;
  var modal = document.getElementById('successModal');
  if(!modal) return;

  function openModal(){
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }

  modal.addEventListener('click', function(e){
    if(e.target.dataset.close === 'true' || e.target.classList.contains('modal-backdrop')){
      closeModal();
    }
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams(data).toString()
    }).then(function(){
      form.reset();
      openModal();
    }).catch(openModal);
  });
})();
