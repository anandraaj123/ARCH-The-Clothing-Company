// ===== IMPORTS =====
import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ===== ELEMENTS =====
const payAmountEl = document.getElementById("payAmount");
const payBtn = document.getElementById("payNowBtn");

// ===== DATA FROM STORAGE =====
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const totalAmount = localStorage.getItem("totalAmount");

// ===== SHOW AMOUNT =====
if (payAmountEl && totalAmount) {
  payAmountEl.textContent = totalAmount;
}

// ===== AUTH CHECK =====
let currentUser = null;

// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     window.location.href = "login.html";
//   } else {
//     currentUser = user;
//   }
// });

// ===== PAY NOW =====
if (payBtn) {
  payBtn.addEventListener("click", async () => {

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const options = {
      key: rzp_test_Rx97wNGUG9Em0m, // 👈 apni Razorpay test key daal
      amount: totalAmount * 100, // paisa
      currency: "INR",
      name: "ARCH",
      description: "T-Shirt Order",
      handler: async function (response) {

        try {
          // 🔹 Get saved address
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          const addressData = userDoc.data();

          // 🔹 Save order
          await addDoc(collection(db, "orders"), {
            userId: currentUser.uid,
            email: currentUser.email,
            items: cart,
            amount: totalAmount,
            address: addressData,
            paymentId: response.razorpay_payment_id,
            createdAt: serverTimestamp()
          });

          // 🔹 Clear cart
          localStorage.removeItem("cart");
          localStorage.removeItem("totalAmount");

          // 🔹 Redirect
          window.location.href = "success.html";

        } catch (error) {
          alert("Order save failed: " + error.message);
        }
      },
      theme: {
        color: "#000000"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });
}
