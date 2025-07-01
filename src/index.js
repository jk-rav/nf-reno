// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, addDoc } from "firebase/firestore";


import { myTestConst, logInBtn, logOutBtn, setObserver } from "./auth";
console.log("testValue = " + myTestConst)
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
const provider = new GoogleAuthProvider(auth);

const db = getFirestore(app)



console.log("testing auth")
//function btnTest(){console.log("Testing Btn")}


document.getElementById('logInBtn').addEventListener('click', logInBtn);
document.getElementById('logOutBtn').addEventListener('click', logOutBtn);
document.getElementById('testStore').addEventListener('click', testStore);


setObserver();

async function testStore(){
  console.log("testing Store...")
  try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}

function testInModule(){console.log("test complete")}
