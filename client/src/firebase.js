// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-39f63.firebaseapp.com",
  projectId: "real-estate-39f63",
  storageBucket: "real-estate-39f63.appspot.com",
  messagingSenderId: "78246589972",
  appId: "1:78246589972:web:43be9e900c98b0f7d41901"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);