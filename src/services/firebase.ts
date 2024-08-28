
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByTw7-jDcxH2-IuK1KGkj4m7-8BUEcrks",
  authDomain: "vibesnap-7e6fb.firebaseapp.com",
  projectId: "vibesnap-7e6fb",
  storageBucket: "gs://vibesnap-7e6fb.appspot.com",
  messagingSenderId: "939994658409",
  appId: "1:939994658409:web:1f17b655c4b4de862794f8",
  measurementId: "G-329PCLEKJX"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);