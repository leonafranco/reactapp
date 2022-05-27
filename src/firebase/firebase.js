import Firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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
  orderBy,
  limit,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  where
} from "firebase/firestore";

import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

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
const storage = getStorage();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  titleKey
) => {
  const collectionRef = collection(db, collectionKey);
  if (titleKey === undefined) {
    addDoc(collectionRef, objectsToAdd);
  } else {
    const batch = writeBatch(db);
    const docRef = doc(collectionRef, titleKey);
    batch.set(docRef, objectsToAdd);
    await batch.commit();
  }
};

export const updateDocUsers = async (formFields, userID) => {
  const followerRef = doc(db, "users", userID);
  formFields.profilePic = await getDownloadURL(ref(storage, userID));
  console.log(formFields.profilePic);
  console.log(formFields);
  await updateDoc(followerRef, formFields);
};

export const updateFollowers = async (
  followerUserId,
  loggedIn,
  isFollowingThisPerson
) => {
  const followerRef = doc(db, "users", followerUserId);
  await updateDoc(followerRef, {
    followers: isFollowingThisPerson
      ? arrayRemove(loggedIn)
      : arrayUnion(loggedIn),
  });
  const followingRef = doc(db, "users", loggedIn);
  await updateDoc(followingRef, {
    following: isFollowingThisPerson
      ? arrayRemove(followerUserId)
      : arrayUnion(followerUserId),
  });
};

export const getDocActualUser = async (userID) => {
  const docRef = doc(db, "users", userID);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.data();
};

export const getPostsAndDocuments = async () => {
  const collectionRef = collection(db, "POST");
  const q = query(collectionRef, orderBy("currentTime", "desc"));
  const querySnapshot = await getDocs(q);
  const postMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    acc[docSnapshot.id] = docSnapshot.data();
    return acc;
  }, {});
  return postMap;
};

export const getComment = async (postID) => {
  const collectionRef = collection(db, "comments");
  const q = query(collectionRef, where("postid", "==", postID), orderBy("currentTime", "desc"));
  const querySnapshot = await getDocs(q);
  const commentMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    acc[docSnapshot.id] = docSnapshot.data();
    return acc;
  }, {});
  return commentMap;
};

export const checkIfUsersAlreadyLikedIt = async (userID, docID) => {
  const docRef = doc(db, "POST", docID);
  const docSnapshot = await getDoc(docRef);
  const result = docSnapshot.data().usersWhoLikedIt.includes(userID);
  return result;
};

export const updateLikes = async (docID, isAlreadyLiked, userID) => {
  const followerRef = doc(db, "POST", docID);
  if (isAlreadyLiked) {
    await updateDoc(followerRef, {
      likes: increment(-1),
      usersWhoLikedIt: arrayRemove(userID),
    });
  } else {
    await updateDoc(followerRef, {
      likes: increment(+1),
      usersWhoLikedIt: arrayUnion(userID),
    });
  }
};

export const uploadPhoto = async (file, currentUserUID) => {
  const fileRef = ref(storage, currentUserUID);
  const snapshot = await uploadBytes(fileRef, file);
  return snapshot;
};

export const getSuggestedFriends = async () => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, limit(3));
  const querySnapshot = await getDocs(q);
  const suggestedFriends = querySnapshot.docs.reduce((acc, docSnapshot) => {
    acc[docSnapshot.id] = docSnapshot.data();
    return acc;
  }, {});
  return suggestedFriends;
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
    const profilePicRef = ref(storage, "default-profile.jpeg");
    const profilePic = await getDownloadURL(profilePicRef);
    const followers = [];
    const following = [];
    console.log(profilePic);
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        profilePic,
        followers,
        following,
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

export const signOutUser = async () => await signOut(auth);

export { firebase };
