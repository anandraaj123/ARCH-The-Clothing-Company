// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: "ARCH Black T-Shirt",
    price: 599,
    image: "assets/images/black-tshirt.jpg"
  },
  {
    id: 2,
    name: "ARCH White T-Shirt",
    price: 599,
    image: "assets/images/white-tshirt.jpg"
  }
];

// ===== ADD TO CART =====
function addToCart(button, productName, price) {
  const productCard = button.closest(".product-card");
  const sizeSelect = productCard.querySelector(".size-select");
  const selectedSize = sizeSelect.value;

  if (selectedSize === "") {
    alert("Please select a size");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: productName,
    price: price,
    size: selectedSize
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to cart 🛒");
}

