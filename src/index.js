// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi3jkVvltaxKJbxbWt2SlwTum_dOk30rI",
  authDomain: "reno-checker.firebaseapp.com",
  projectId: "reno-checker",
  storageBucket: "reno-checker.firebasestorage.app",
  messagingSenderId: "852244918302",
  appId: "1:852244918302:web:fddd0f25909a8f8075be0f",
  measurementId: "G-78K0GETCGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app)