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



function logInBtn() {
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

function logOutBtn(){
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

function setObserver(){
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("User is signed in with UID:", uid);
    let myUser = ""
    user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
    myUser=profile.email
    });
  } else {
    // User is signed out
    console.log("No user is signed in.");
  }
});
}

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
