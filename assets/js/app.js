(function(){
  const burger = document.querySelector('.burger');
  if(burger){
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      document.documentElement.classList.toggle('nav-open', !expanded);
    });
  }
  const form = document.getElementById('contact_form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Form placeholder. Connect this to your CRM / form tool.');
    });
  }
})();