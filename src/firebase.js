// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKa1Agqfcs46FmOr2ojJe48JTvJhRSCyA",
  authDomain: "bizzhome-b8090.firebaseapp.com",
  projectId: "bizzhome-b8090",
  storageBucket: "bizzhome-b8090.appspot.com",
  messagingSenderId: "481346664226",
  appId: "1:481346664226:web:faebe334be6f6c773d577b",
  measurementId: "G-RQSYKNXHT1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
