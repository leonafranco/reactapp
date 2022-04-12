import Firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  addDoc,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyAJeeAIW6Sute5V7gmK1zF_VvDi5Qh3WVY",
  authDomain: "finalproject-51d7c.firebaseapp.com",
  projectId: "finalproject-51d7c",
  storageBucket: "finalproject-51d7c.appspot.com",
  messagingSenderId: "833188403187",
  appId: "1:833188403187:web:b30bee4e5f8e625b5b6486",
};

const firebase = Firebase.initializeApp(config);
export const db = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  titleKey
) => {
  const collectionRef = collection(db, collectionKey);
  // const batch = writeBatch(db);
  // const docRef = doc(collectionRef, titleKey);
  // batch.set(docRef, objectsToAdd);
  // await batch.commit();
  addDoc(collectionRef, objectsToAdd);
};

export const getPostsAndDocuments = async () => {
  const collectionRef = collection(db, "POST");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const postMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { currentTime, displayName, text, uuid } = docSnapshot.data();
    acc[currentTime] = docSnapshot.data();
    return acc;
  }, {});
  return postMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export { firebase };
