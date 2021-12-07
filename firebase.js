// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAJaYUJK9VyQoeVQPhapfIq9cO1OeTvpcQ",
  authDomain: "tinder-2-ad3e2.firebaseapp.com",
  projectId: "tinder-2-ad3e2",
  storageBucket: "tinder-2-ad3e2.appspot.com",
  messagingSenderId: "261259144383",
  appId: "1:261259144383:web:30a4ad4fb762cff272aa0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore();
