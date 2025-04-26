//Scroll Effect
$(document).ready(function () {
   $(window).on('scroll', function () {
      if ($(window).scrollTop() >= 100 && !$('#site-header').hasClass('sticky')) {
         $('#site-header').addClass('sticky')
      } else if ($(window).scrollTop() < 100 && $('#site-header').hasClass('sticky')) {
         $('#site-header').removeClass('sticky')
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


//Domain and Hosting Trasaction

//Domain Price objects
const domainPrices = {
   '.com': 9.9,
   '.net': 12.9,
   '.org': 8.99,
   '.bd': 15.99
}

const hosting = [
   {
      id: 1,
      Name: 'Basic Hosting',
      price: 2.99,
      features: ['10GB storage', 'Unlimited Bandwidth', 'Free SSL', '5 emails accounts'],
      popular: false
   },

   {
      id: 2,
      Name: 'Premium Hosting',
      price: 5.99,
      features: ['50GB storage', 'Unlimited Bandwidth', 'Free Domain', 'Unlimited Email'],
      popular: false
   },

   {
      id: 3,
      Name: 'Business Hosting',
      price: 9.99,
      features: ['100GB storage', 'free CDN', 'Priority Support', 'Daily Backups'],
      popular: false
   },
];

//Display hosting
const hostingPlans = document.getElementById('hostingPlans');
hosting.forEach(plan => {
   const div = document.createElement('div');
   div.className = 'col-md-4 mb-4'
   div.innerHTML = `
   <div class="card">
      <div class="card-header bg-success text-white text-center">
         <h4>${plan.Name}</h4>
      </div>
      <div class="card-body">
         <p class="h3">$${plan.price}<span class="text-muted">/mo</span></p>
         <p>${plan.features.map(feature=> `<li>✔${feature}</li>`).join('')}</p>
         <button class="btn btn-outline-success w-100 add-to-cart"
         data-name="${plan.
         Name}"
         data-price="${plan.price}"
         data-type="hosting">Add To Cart</button>
      </div>
   </div>
   `
   hostingPlans.appendChild(div);
});

//Display Domain

const savedDomain = localStorage.getItem('domain');
const domainResult = document.getElementById('domainResult');
if (savedDomain) {
   domainResult.innerHTML = savedDomain;
}


document.getElementById('searchDomainBtn').addEventListener('click', function () {
   const domainName = document.getElementById('domainInput').value.trim();
   const domainExtension = document.getElementById('domainExtension').value;
   const domainResult = document.getElementById('domainResult');

   if (!domainName) {
      alert('Please Enter a domain Name');
      return;
   }

   isAvailable = Math.random() > 0.5;

   if (isAvailable) {
      const price = domainPrices[domainExtension];
      domainResult.innerHTML = `
      <div class="alert alert-success">
         <h4>${domainName}${domainExtension} is available</h4>
         <p>Price:$${price}/year</p>
         <button class="btn btn-success add-to-cart"
         data-name="${domainName}${domainExtension}"
         data-price="${price}"
         data-type="Domain">Add to Cart</button>
      </div>
      `
      localStorage.setItem('domain', domainResult.innerHTML);
   } else {
      domainResult.innerHTML = `
      <div class="alert alert-danger">
         <h4>${domainName}${domainExtension} is not available</h4>
         <p>Please try another domain name!</p>
      </div>
      ` 
   }

});

// add To cart part
document.addEventListener('click', function (e) {
   if (e.target.classList.contains('add-to-cart')) {
      const name = e.target.getAttribute('data-name');
      const price = parseFloat(e.target.getAttribute('data-price'));
      const type = e.target.getAttribute('data-type');

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name, price, type, quantity: 1,});
      localStorage.setItem('cart', JSON.stringify(cart));

      updateCartCount();
      e.target.innerText = '✅ Added';
   }
});

function updateCartCount() {

   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   document.getElementById('cartCount').innerText = cart.length;
}
updateCartCount();
   

//Registration form validation
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const successMsg = document.querySelector('.successMsg');
const regiForm = document.querySelector('#regiForm');

const saveData =JSON.parse(localStorage.getItem('formData'));
if (saveData) {
   fullName.value = saveData.fullName;
   email.value = saveData.email;
}


document.getElementById('regiForm').addEventListener('submit', (event) => {
   event.preventDefault();

   const userData = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirmPassword.value.trim(),
   }

   const errors = validateForm(userData);

   document.querySelectorAll('.error').forEach(error => error.textContent = '');


   if (errors.length > 0) {
      errors.map(error => {
         const element = document.getElementById(error.field).nextElementSibling;
         element.textContent = error.message;
      })
   } else {
      successMsg.innerHTML = `<img src="img/loading.gif" alt="" style="width: 20px; height: auto">`;
      fakeServerDataSubmit(userData)
         .then(res => {
         successMsg.textContent = res.message;
         successMsg.style.color = 'green';
         regiForm.reset();
         setTimeout(() => {
            successMsg.textContent = 'Registration';
            successMsg.style.color = 'white';
         }, 4000);

            const saveData = {
               fullName: userData.fullName,
               email: userData.email,
            };

            localStorage.setItem('formData', JSON.stringify(saveData));
         
      }).catch(err => {
         successMsg.textContent = err.message;
      })
   }
});

 function validateForm(data){
   const errors = [];

   if (data.fullName === '') {
      errors.push({ field: 'fullName', message: 'Name is required' });
   };

   if (!validateEmail(data.email) ) {
      errors.push({ field: 'email', message: 'Email is Invalid'});
   };

   if (!/[A-Z]/.test(data.password) ) {
      errors.push({ field: 'password', message: 'Passwords must be include Uppercase'});
   };

   if (!/[a-z]/.test(data.password) ) {
      errors.push({ field: 'password', message: 'Passwords must be include Lowercase'});
   };

   if (!/\d/.test(data.password) ) {
      errors.push({ field: 'password', message: 'Passwords must be include number'});
   };

   if (data.password !== data.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Passwords do not match, Please try again'});
   };

   return errors;
};

function validateEmail(email) {
   const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
   return pattern.test(email);
};

//Submit data to fake server
function fakeServerDataSubmit(data) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               fullName: data.fullName,
               email: data.email,
               password: data.password,
               password: data.confirmPassword,
            }),
         })
            .then(res => res.json())
            .then(data => {
               console.log('success:', data);
               resolve({ message: 'Registration SuccessFull' });
            })
            .catch(err => {
               reject({ message: 'something went wrong' });
            });
      },2500);
   })
};

//Login form Validation
const loginForm = document.getElementById('loginForm');
const emailLogin = document.getElementById('emailLogin');
const emailError = document.getElementById('emailError');
const passwordLogin = document.getElementById('passwordLogin');
const passwordError = document.getElementById('passwordError');
const successMsgLogin = document.querySelector('.successMsgLogin');

loginForm.addEventListener('submit', (e) => {
   e.preventDefault();
   
   const loginFormData = {
      emailLogin: emailLogin.value.trim(),
      passwordLogin: passwordLogin.value.trim(),
   }
  
  // Old message clear
  successMsgLogin.textContent = '';
  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  
  // Email validation
  if (!emailPattern.test(emailLogin.value)) {
    emailError.style.display = 'block';
    isValid = false;
  }
  
  // Password Validation
  if (!passwordPattern.test(passwordLogin.value)) {
    passwordError.style.display = 'block';
    isValid = false;
  }

  //success Message
   if (isValid) {
      fakebackendDataSubmit(loginFormData);
  }
});

function fakebackendDataSubmit(LoginData) {
   fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      headers:{
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         emailLogin: LoginData.emailLogin,
         passwordLogin: LoginData.passwordLogin,
      }),
   }).then(res => res.json()) 
   .then(data => {
      console.log('Success:', data);
      successMsgLogin.innerHTML = `<img src="img/loading.gif" alt="" style="width: 30px; height: 30px;">`;
      setTimeout(() => {
         successMsgLogin.innerHTML = 'Login Successfull';
         loginForm.reset();  
      }, 5000);
   
    // 3 later hide;
    setTimeout(() => {
      successMsgLogin.textContent = '';
    }, 10000);
   }).catch(err => {
      successMsgLogin.textContent = 'something went Wrong';
   })
}
