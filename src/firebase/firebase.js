import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAJeeAIW6Sute5V7gmK1zF_VvDi5Qh3WVY",
  authDomain: "finalproject-51d7c.firebaseapp.com",
  projectId: "finalproject-51d7c",
  storageBucket: "finalproject-51d7c.appspot.com",
  messagingSenderId: "833188403187",
  appId: "1:833188403187:web:b30bee4e5f8e625b5b6486",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
