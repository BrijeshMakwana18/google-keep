// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS1JMq2tJXxk51A5gUxMXvsIeSHkZlZGE",
  authDomain: "fir-de2c8.firebaseapp.com",
  projectId: "fir-de2c8",
  storageBucket: "fir-de2c8.appspot.com",
  messagingSenderId: "46098055588",
  appId: "1:46098055588:web:7ed8c293f3d5c74d6b0131",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);
