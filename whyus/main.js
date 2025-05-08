//Scroll Effect
const mainHeader = document.querySelector('.main-header');
$(document).ready(function () {
   $(window).on('scroll', function () {
      if ($(window).scrollTop() >= 100 && !$('#site-header').hasClass('sticky')) {
         $('#site-header').addClass('sticky')
         mainHeader.style.paddingTop = '0px';
      } else if ($(window).scrollTop() < 100 && $('#site-header').hasClass('sticky')) {
         $('#site-header').removeClass('sticky')
         mainHeader.style.paddingTop = '75px';
      }
   });
  var options = {
      animateClass: 'animate__animated', // for v3 or 'animate__animated' for v4
      animateThreshold: 100,
      scrollPollInterval: 20
   }
   $('.home-section').AniView(options);
});

//Hamberger Menu
const hamberger = document.querySelector('.hamberger');
const navbar = document.querySelector('.navbar');
hamberger.addEventListener('click', function () {
   hamberger.classList.toggle('active');
   navbar.classList.toggle('active');
});

//counter
const counters = document.querySelectorAll('.number');
const time = 500;
let hasAnimated = false;

function runCounter() {
   counters.forEach(counter => {
      function upadateCount() {
         let target = +counter.getAttribute('data-target');
         let count = +counter.innerHTML.replace('+', '');
         let increament = target / time;

         if (count < target) {
            counter.innerHTML = Math.ceil(count + increament) + '+';
            setTimeout(upadateCount, 10);
         } else {
            counter.innerHTML = target + '+';
         }
      }
      upadateCount();
   }) 

}

const statsSection = document.getElementById('stats');

// Intersection Observer setup
const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (entry.isIntersecting && !hasAnimated) {
    runCounter();
    hasAnimated = true; 
    observer.unobserve(statsSection); 
  }
}, {
  threshold: 0.5
});

observer.observe(statsSection);

//Preloder
setTimeout(function() {
   document.getElementById("preloader").style.display = "none";
}, 3000);


//Tabs
const cardContent = document.querySelectorAll('.tab-content');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
   button.addEventListener('click', function () {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');


      cardContent.forEach(content => content.classList.remove('active'));
      const target = this.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
      const active = document.querySelector('.active');
   });
});