// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRHZhMxotNzJ4yAlKaIF7mzFTS7TCngWo",
  authDomain: "petito-shop.firebaseapp.com",
  projectId: "petito-shop",
  storageBucket: "petito-shop.appspot.com",
  messagingSenderId: "469004459",
  appId: "1:469004459:web:7a340e3c39797fa4dec7ee",
  measurementId: "G-0CLQDQ89ST"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const analytics = getAnalytics(app);