// Loading Screen
window.addEventListener('load', () => {

  document.getElementById('loading').style.display = 'none';

});

// Menu Mobile
const toggle =
document.getElementById("menu-toggle");

const navLinks =
document.querySelector(".nav-links");

toggle.addEventListener("click",(e)=>{

  e.stopPropagation();

  navLinks.classList.toggle("active");

});

/* Tutup menu jika klik area lain */

document.addEventListener("click",(e)=>{

  if(
    !navLinks.contains(e.target)
    &&
    !toggle.contains(e.target)
  ){

    navLinks.classList.remove("active");

  }

});

/* Tutup menu jika klik link */

document
.querySelectorAll(".nav-links a")
.forEach(link=>{

  link.addEventListener("click",()=>{

    navLinks.classList.remove("active");

  });

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