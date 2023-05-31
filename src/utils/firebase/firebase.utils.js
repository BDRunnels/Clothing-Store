// This file is what Google wants. 

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword  } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // doc gets data. 
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