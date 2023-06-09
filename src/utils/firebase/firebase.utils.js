// This file is what Google wants. 

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} //onAuthStateChanged will return back a listener. 
  from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'; // doc gets data. 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBh_bCb-KoOMDGDN6P9o9554ui-HMSFbRo",
    authDomain: "handwork-db.firebaseapp.com",
    projectId: "handwork-db",
    storageBucket: "handwork-db.appspot.com",
    messagingSenderId: "923166509732",
    appId: "1:923166509732:web:be5b09c27ec2c86dd67431"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider(); // will give back a provider instance. GAP is a class; need 'new' keyword. Could have multiple providers.

  googleProvider.setCustomParameters({
    prompt: "select_account" // everytime someone interacts with us, they need to select an account.
  });

  export const auth = getAuth(); // Don't need new - use the same one for every auth instance in the app. Only way to keep track for 'users' in Firebase.
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);

    //need to BATCH these objects to the collection in one transaction.
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('db batch done');

  };

  export const getCategoriesAndDocs = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    
    const querySnapshot = await getDocs(q); //getDocs is the async ability to fetch those doc snapshots we want.
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
  };

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
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
            console.log('error creating user', error.message);
        };
    };

    return userDocRef;

    // check if user data exists

    // if user data DOES NOT exist
    // create / set the document with the data from userAuth in my collection / db.

    // return userDocRef
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // async because we are setting files inside firebase.
    if ( !email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if ( !email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth); // auth is keeping track of signed-in user. 

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback, /* errorCallback, completedCallback */); 
  // 2 parameters (auth, callback everytime auth state changes).  It is always listening for auth state changes. 
  // when clicked: {
  //   next: callback,
  //   error: errorCallback,
  //   complete: completedCallback
  // }