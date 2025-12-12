import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGlFjSZ-KUntyDr5O0uPtw06cC56dduYg",
  authDomain: "auth-7aaf6.firebaseapp.com",
  projectId: "auth-7aaf6",
  storageBucket: "auth-7aaf6.firebasestorage.app",
  messagingSenderId: "909237790042",
  appId: "1:909237790042:web:c51815b04bb39f2ad37f63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

