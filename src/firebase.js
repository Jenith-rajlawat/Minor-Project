import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALTINbCX9aH3rbl6BKFo91OCBSniXkz_Y",
  authDomain: "chat-65dd6.firebaseapp.com",
  projectId: "chat-65dd6",
  storageBucket: "chat-65dd6.appspot.com",
  messagingSenderId: "748113430270",
  appId: "1:748113430270:web:d837c83f949040fa6ec7af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
