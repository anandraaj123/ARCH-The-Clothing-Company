// ===== IMPORTS =====
import { auth, db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== FORM =====
const addressForm = document.getElementById("addressForm");

// ❌ NO onAuthStateChanged HERE
// ❌ NO AUTO REDIRECT HERE

// ===== SAVE ADDRESS =====
if (addressForm) {
  addressForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    // ✅ AUTH CHECK ONLY ON SUBMIT
    if (!user) {
      window.location.href = "./login.html";
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const pincode = document.getElementById("pincode").value;

    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        address,
        city,
        pincode,
        email: user.email
      });

      // ✅ Go to payment
      window.location.href = "./checkout.html";

    } catch (error) {
      alert("Error saving address: " + error.message);
    }
  });
}
