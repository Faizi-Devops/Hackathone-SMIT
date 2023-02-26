import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCdflhwYEE-phlfsFpmPi3nFcM-Z27wsM4",
    authDomain: "hakaton-e91e0.firebaseapp.com",
    projectId: "hakaton-e91e0",
    storageBucket: "hakaton-e91e0.appspot.com",
    messagingSenderId: "920069884298",
    appId: "1:920069884298:web:00a70992884747da0c2073",
    measurementId: "G-1Z1CBLPDKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {db,auth,storage}