// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB0WqhOMQnOPWBxVPJdQXJs-uxbjOhjzzM",
  authDomain: "todo-list-19351.firebaseapp.com",
  projectId: "todo-list-19351",
  storageBucket: "todo-list-19351.appspot.com",
  messagingSenderId: "382152790588",
  appId: "1:382152790588:web:50eba1ffb80ae0058aa939",
  measurementId: "G-7F114YF949",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
