// ===== GET CART FROM LOCALSTORAGE =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");
const totalAmountSpan = document.getElementById("totalAmount");

// ===== RENDER CART =====
function renderCart() {
  if (!cartItemsDiv || !totalAmountSpan) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalAmountSpan.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <span>Size: ${item.size}</span>
      </div>
      <div>
        <span>₹${item.price}</span><br/>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalAmountSpan.textContent = total;
}

// ===== REMOVE ITEM =====
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== SAVE TOTAL FOR CHECKOUT =====
function saveTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  localStorage.setItem("totalAmount", total);
}

// ===== ON PAGE LOAD =====
renderCart();
saveTotal();
