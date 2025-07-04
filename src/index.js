// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, addDoc } from "firebase/firestore";
import { getDatabase, push, ref, onValue } from "firebase/database";
import { geoTest, geoTestStart } from "./geoloc.js"


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
  measurementId: "G-78K0GETCGT",
  databaseURL: "https://reno-checker-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider(auth);
const db = getFirestore(app)
const database = getDatabase(app);

function rtdbTest(){

}
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

function dateTimeTest(){
  var myDate = new Date()
  console.log("DateString: " + myDate.getFullYear() + (myDate.getMonth()+1) + myDate.getDate())
}
function getTimeString(){
const myDate = new Date();
const hrString = (myDate.getHours()>9)?myDate.getHours().toString():"0"+myDate.getHours().toString()
const minString = (myDate.getMinutes()>9)?myDate.getMinutes().toString():"0"+myDate.getMinutes().toString()
const secString = (myDate.getSeconds()>9)?myDate.getSeconds().toString():"0"+myDate.getSeconds().toString()
const msecs = myDate.getMilliseconds()
msecString = (msecs>99)?msecs.toString():(msecs>9)?"0"+msecs.toString():"00"+msecs.toString()
console.log(hrString+":"+minString+":"+secString+":"+msecString)
return hrString+":"+minString+":"+secString+":"+msecString
}

function getDateString(){
const myDate = new Date();
const yrString = myDate.getFullYear().toString();
const myMonth = myDate.getMonth()+1
const myDay = myDate.getMonth()+1
const monString = (myMonth>9)?myMonth.toString():myMonth.toString
const dayString = (myDate.getMonth()>9)?myDate.getSeconds().toString():"0"+myDate.getSeconds().toString()
msecString = (msecs>99)?msecs.toString():(msecs>9)?"0"+msecs.toString():"00"+msecs.toString()
console.log(hrString+":"+minString+":"+secString+":"+msecString)
return yrStringhrString+":"+minString+":"+secString+":"+msecString
  //getHours getMinutes getSeconds getMiliseconds
}


console.log("testing auth")
//function btnTest(){console.log("Testing Btn")}


document.getElementById('logInBtn').addEventListener('click', logInBtn);
document.getElementById('logOutBtn').addEventListener('click', logOutBtn);
document.getElementById('testStore').addEventListener('click', testStore);
document.getElementById('testRtdb').addEventListener('click', testRtdb);
document.getElementById('testRtdb').style="color:red;"
document.getElementById('geoTest').addEventListener('click', geoTest);
document.getElementById('geoTestStart').addEventListener('click', geoTestStart);

dateTimeTest();
setObserver();

function testRtdb(){
console.log("testing DB")
try{
const messagesRef = ref(database, 'messages/chatRoom1');
push(messagesRef, {
  text: 'This is a new message!',
  timestamp: Date.now(),
  senderId: 'user789'
});
} catch(e){
  console.error("RT-Database ERROR:: ", e);
}
}

console.log("rt Database functions loaded...")

function testRtbdObserver(){
  const messTemp = ref(database, 'messages/chatRoom1');
  console.log("initializing db observer...")
  onValue(messTemp, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
}
testRtbdObserver();
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

async function uploadLoc(){

}

function testInModule(){console.log("test complete")}
