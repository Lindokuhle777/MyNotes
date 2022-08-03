// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsCu6ZweHMsX6zkDKIUDLMdMgzZD7jDbA",
  authDomain: "my-notes-92a9f.firebaseapp.com",
  projectId: "my-notes-92a9f",
  storageBucket: "my-notes-92a9f.appspot.com",
  messagingSenderId: "1070634136595",
  appId: "1:1070634136595:web:fa74fbf330f9815567fbe6",
  measurementId: "G-CK6SQ9JTBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getDatabase(app);