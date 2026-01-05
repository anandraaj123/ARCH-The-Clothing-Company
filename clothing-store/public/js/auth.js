import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔒 RUN ONLY ON LOGIN PAGE
const isLoginPage = document.getElementById("loginForm") || document.getElementById("signupForm");

if (!isLoginPage) {
  // ❌ Agar login page nahi hai → kuch bhi mat karo
  console.log("auth.js ignored on non-login page");
} else {

  // ❌ NO AUTO REDIRECT ON LOAD
  onAuthStateChanged(auth, () => {
    // intentionally empty
  });

  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "./products.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // SIGNUP
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = signupForm.email.value;
      const password = signupForm.password.value;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = "./products.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }
}
