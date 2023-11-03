// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXUBaE1oWefAxQRj7o2dGIpVLKiKw7RYo",
  authDomain: "certificados-ciunac.firebaseapp.com",
  projectId: "certificados-ciunac",
  storageBucket: "certificados-ciunac.appspot.com",
  messagingSenderId: "1092707219344",
  appId: "1:1092707219344:web:7c317e02132f82a1606515"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);