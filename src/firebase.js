import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAlJUnwylWDUH8pn5T65A_3ml6cntq12Q",
  authDomain: "sahanodaya-foundation-8ba2c.firebaseapp.com",
  projectId: "sahanodaya-foundation-8ba2c",
  storageBucket: "sahanodaya-foundation-8ba2c.appspot.com",
  messagingSenderId: "648906473351",
  appId: "1:648906473351:web:3abb586e9005b9c4055d22",
  measurementId: "G-BTTHCM0NZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);