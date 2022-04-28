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
  where,
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
  if (titleKey === undefined) {
    addDoc(collectionRef, objectsToAdd);
  } else {
    const batch = writeBatch(db);
    const docRef = doc(collectionRef, titleKey);
    batch.set(docRef, objectsToAdd);
    await batch.commit();
  }
};

export const updateLikes = async (docID, isAlreadyLiked, userID) => {
  const followerRef = doc(db, "POST", docID);
  console.log(isAlreadyLiked);
  await updateDoc(followerRef, {
    likes: isAlreadyLiked ? increment(-1) : increment(+1),
    usersWhoLikedIt: isAlreadyLiked ? arrayRemove(userID) : arrayUnion(userID),
  });
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

export const checkIfUsersAlreadyLikedIt = async (userID) => {
  const collectionRef = collection(db, "POST");
  const q = query(
    collectionRef,
    where("usersWhoLikedIt", "array-contains", userID)
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs.length);
  const result = querySnapshot.docs.length === 0 ? false : true;
  console.log(result);
  return result;
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

export const signOutUser = async () => await signOut(auth);

export { firebase };
