import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this import
import {createUserWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfsr0NIBa0BQVWOdlncLqv7gVM5eeYiy4",
  authDomain: "temphu-67a04.firebaseapp.com",
  databaseURL: "https://temphu-67a04-default-rtdb.firebaseio.com",
  projectId: "temphu-67a04",
  storageBucket: "temphu-67a04.firebasestorage.app",
  messagingSenderId: "859886287757",
  appId: "1:859886287757:web:d67b030ff3cc0894c25bc4",
  measurementId: "G-HLNWXYP44Q"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const signIn = signInWithEmailAndPassword;
export const sendEmail = sendEmailVerification;
export const signOutUser = signOut;
export const googleProvider = provider;
export const db = getFirestore(app); // Add this line to export Firestore instance
export const createUserEmail = createUserWithEmailAndPassword;