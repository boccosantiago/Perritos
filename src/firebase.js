import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtGAhl9JpA-Kuw60JpeV4OPOSZ6xnh-bo",
  authDomain: "authentication-perritos.firebaseapp.com",
  dataBaseURL: "http://authentication-perritos.firebaseio.com",
  projectId: "authentication-perritos",
  storageBucket: "authentication-perritos.appspot.com",
  messagingSenderId: "69859096539",
  appId: "1:69859096539:web:0034cd79f5b1e8624c19fe",
  measurementId: "G-1GSSKRGGEJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
