import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyAS6mQJ-GNmgRp9pBTHnqP3CW_7yiJZluo",
    authDomain: "exam-management-361bb.firebaseapp.com",
    projectId: "exam-management-361bb",
    storageBucket: "exam-management-361bb.appspot.com",
    messagingSenderId: "151285234103",
    appId: "1:151285234103:web:901e5c3bfc55ad23f99032"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;