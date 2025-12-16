/* =========================
   CART SETUP
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price, image) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart ✅");
}

/* =========================
   LOAD CART (cart.html)
========================= */
function loadCart() {
  const box = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!box || !totalEl) return;

  box.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty</p>";
    totalEl.textContent = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    box.innerHTML += `
      <div class="feature-card">
        <h3>${item.name}</h3>
        <p>₹${item.price} × ${item.qty}</p>
        <p><strong>₹${item.price * item.qty}</strong></p>
        <button class="nav-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  totalEl.textContent = "₹" + total;
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* =========================
   PLACE ORDER (checkout.html)
========================= */
function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details ❗");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty ❗");
    return;
  }

  let total = 0;
  cart.forEach(i => total += i.price * i.qty);

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: Date.now(),
    name,
    phone,
    address,
    items: cart,
    total,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");
  cart = [];

  window.location.href = "success.html";
}

/* =========================
   AUTO LOAD CART
========================= */
document.addEventListener("DOMContentLoaded", loadCart);

