const DomainPrices = {
   '.com': 9.9,
   '.net': 12.9,
   '.org': 8.99,
   '.bd': 15.99
};

const hostingPlans = [
   {
      id: 1,
      name: "Basic Hosting",
      price: 2.99,
      features: ["10GB Storage", "Unlimited Bandwidth", "Free SSL", "5 Email Accounts"],
      popular: false
   },
   {
      id: 2,
      name: "Premium Hosting",
      price: 5.99,
      features: ["50GB Storage", "Unmetered Bandwidth", "Free Domain", "Unlimited Email"],
      popular: true
   },
   {
      id: 3,
      name: "Business Hosting",
      price: 9.99,
      features: ["100GB Storage", "Free CDN", "Priority Support", "Daily Backups"],
      popular: false
   }
];

// Load hosting
const hostingContainer = document.getElementById("hostinPlans");
hostingPlans.forEach(plan => {
   const col = document.createElement("div");
   col.className = "col-md-4 mb-3";
   col.innerHTML = `
      <div class="card">
      <div class="card-header bg-success text-white text-center">
      <h4>${plan.name}</h4>
      </div>
         <div class="card-body">
            <p class="h3">$${plan.price}<span text-muted>/mo</span></p>
            <p>${plan.features.map(feature=>`<li>✔${feature}</li>`).join('')}</p>
            <button class="btn btn-outline-success w-100 add-to-cart"
               data-name="${plan.name}"
               data-price="${plan.price}"
               data-type="hosting">Add To Cart</button>
         </div>
      </div>
   `;
   hostingContainer.appendChild(col);
});

// Domain search
document.getElementById('searchDomainBtn').addEventListener('click', function () {
   const domainName = document.getElementById('domainInput').value.trim();
   const domainExtension = document.getElementById('domainExtension').value;
   const domainResult = document.getElementById('domainResult');

   if (!domainName) {
      alert('Please enter a domain name');
      return;
   }

   const isAvailable = Math.random() > 0.5;

   if (isAvailable) {
      const price = DomainPrices[domainExtension];
      domainResult.innerHTML = `
         <div class="alert alert-success">
            <h4>${domainName}${domainExtension} is Available</h4>
            <p>Price: $${price}/year</p>
            <button class="btn btn-success add-to-cart"
               data-name="${domainName}${domainExtension}"
               data-price="${price}"
               data-type="domain">Add To Cart</button>
         </div>
      `;
   } else {
      domainResult.innerHTML = `
         <div class="alert alert-danger">
            <h4>${domainName}${domainExtension} is not Available</h4>
            <p>Try another Domain name.</p>
         </div>
      `;
   }
});

// Add to cart
document.addEventListener("click", function (e) {
   if (e.target.classList.contains("add-to-cart")) {
      const name = e.target.getAttribute("data-name");
      const price = parseFloat(e.target.getAttribute("data-price"));
      const type = e.target.getAttribute("data-type");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price, type, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
      e.target.innerText = "Added ✅";
   }
});

// Update cart icon
function updateCartCount() {
   const cart = JSON.parse(localStorage.getItem("cart")) || [];
   document.getElementById("cartCount").innerText = cart.length;
}
updateCartCount();