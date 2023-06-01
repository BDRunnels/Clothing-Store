// createContext is the storage itself.
import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, /* signOutUser */ createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// as the actual value you want to access.
export const UserContext = createContext({
    //context needs initial value.
    currentUser: null, //empty object evaluates as true.
    setCurrentUser: () => null, //setters are null functions as their base. 
});

// actual component
export const UserProvider = ({ children }) => {
    // allowing the child components to access the value inside the useState.
    const [currentUser, setCurrentUser] = useState(null); // any component that is listening for currentUser, will update when logged-in. 
    const value = { currentUser, setCurrentUser };

    // signOutUser(); // will manually sign out the user. 

    useEffect(() => {
        const unsubscribe =  onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            };
            setCurrentUser(user); // signs out --> null, signs in --> user object
        }); //receives a callback fn and runs when auth changes. Will check auth state (sign in / out) immediately.
        return unsubscribe // on un-mount. 
    }, []);

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
};


