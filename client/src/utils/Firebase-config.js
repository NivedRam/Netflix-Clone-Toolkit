// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMBHyulli_XgEDQ4oY6PsG-tEuwQ9Vc9o",
  authDomain: "react-netflix-clone-3220e.firebaseapp.com",
  projectId: "react-netflix-clone-3220e",
  storageBucket: "react-netflix-clone-3220e.appspot.com",
  messagingSenderId: "164322271360",
  appId: "1:164322271360:web:a03276b23912dc61188665",
  measurementId: "G-226TZ7YMS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);