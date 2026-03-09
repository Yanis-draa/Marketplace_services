// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx6YvCiblLIG6jy3An9-O5vfqAetCy4j0",
  authDomain: "marketplace-services-dab26.firebaseapp.com",
  projectId: "marketplace-services-dab26",
  storageBucket: "marketplace-services-dab26.firebasestorage.app",
  messagingSenderId: "805753381909",
  appId: "1:805753381909:web:61703bb75bee2397dd1a1c",
  measurementId: "G-X6LLQYCJT9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  //Retroune une instance de la base de données Firestore liée à l'application Firebase initialisée
const analytics = getAnalytics(app);
