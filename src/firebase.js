import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
 apiKey: "AIzaSyAtGAhl9JpA-Kuw60JpeV4OPOSZ6xnh-bo",
  authDomain: "authentication-perritos.firebaseapp.com",
   projectId: "authentication-perritos",
   storageBucket: "authentication-perritos.appspot.com",
  messagingSenderId: "69859096539",
  appId: "1:69859096539:web:0034cd79f5b1e8624c19fe",
  measurementId: "G-1GSSKRGGEJ"
};

/* const firebaseConfig = {
  apiKey: "AIzaSyCJQNFpGQjSqNxxZvLzXUgJo7yu7SfYRog",
  authDomain: "register-935f6.firebaseapp.com",
  projectId: "register-935f6",
  storageBucket: "register-935f6.appspot.com",
  messagingSenderId: "807946851220",
  appId: "1:807946851220:web:ea920f737c0aac7f7e7581"
}; */
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
//const analytics = getAnalytics(app);