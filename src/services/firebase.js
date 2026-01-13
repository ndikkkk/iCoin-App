// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjq6kQNuCmkcm1IGUhWkgpEZUhV4T5jZU",
  authDomain: "icoin-app-c11eb.firebaseapp.com",
  projectId: "icoin-app-c11eb",
  storageBucket: "icoin-app-c11eb.firebasestorage.app",
  messagingSenderId: "774536860312",
  appId: "1:774536860312:web:7664ab8bfce801c43df6ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export service yang akan kita pakai
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);