var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.logo__toggle');
var logo = document.querySelector('.logo');

navMain.classList.remove('main-nav--opened');
navMain.classList.add('main-nav--closed');

navToggle.addEventListener('click', function () {
if(navMain.classList.contains('main-nav--closed')){
navMain.classList.remove('main-nav--closed');
logo.classList.remove('logo--closed');
logo.classList.add('logo--opened');

} else {
    navMain.classList.add('main-nav--closed');
    logo.classList.remove('logo--opened');
    logo.classList.add('logo--closed');
  }
})
