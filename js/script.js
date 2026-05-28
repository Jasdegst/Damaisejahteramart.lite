// Loading Screen
window.addEventListener('load', () => {

  document.getElementById('loading').style.display = 'none';

});

// Menu Mobile
const toggle = document.getElementById('menu-toggle');

const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {

  navLinks.classList.toggle('active');

});

// Back To Top
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {

  if(window.scrollY > 300){

    topBtn.style.display = 'block';

  } else {

    topBtn.style.display = 'none';

  }

});

// Scroll To Top
topBtn.addEventListener('click', () => {

  window.scrollTo({

    top:0,
    behavior:'smooth'

  });

});