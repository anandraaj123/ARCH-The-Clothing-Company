// ===== Firebase SDK imports (CDN - browser compatible) =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== Firebase Configuration =====
const firebaseConfig = {
  apiKey: "AIzaSyBAp1QCmcEWc6fIltMGCQTP5UfLwAA7T2c",
  authDomain: "arch-clothing.firebaseapp.com",
  projectId: "arch-clothing",
  storageBucket: "arch-clothing.appspot.com",
  messagingSenderId: "311190463300",
  appId: "1:311190463300:web:d7d39fade8ba78374ced11"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);

// ===== Firebase Services =====
const auth = getAuth(app);
const db = getFirestore(app);

// ===== Export Services =====
export { auth, db };
