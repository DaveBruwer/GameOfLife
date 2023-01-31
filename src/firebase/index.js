import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, addDoc } from "firebase/firestore"



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCADjr92UxizpR2S4SI4O6_enH8fUGpIAI",
  authDomain: "game-of-life-f262d.firebaseapp.com",
  projectId: "game-of-life-f262d",
  storageBucket: "game-of-life-f262d.appspot.com",
  messagingSenderId: "788620194196",
  appId: "1:788620194196:web:d34bfadd07d92908af1f81",
  measurementId: "G-QTGR7W20BJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export {
  auth,
  db,
}