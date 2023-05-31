import { useEffect } from 'react'; // for GOOGLE REDIRECT
import {getRedirectResult} from 'firebase/auth'; // for GOOGLE REDIRECT

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up/sign-up-component';



const SignIn = () => {

    // for GOOGLE REDIRECT
    // useEffect(() => {
    //     async function redirect() {
    //         const response = await getRedirectResult(auth);
    //         // console.log(response);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     };
        
    //     redirect();
    // }, []);

    // for GOOGLE POPUP
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef =  await createUserDocumentFromAuth(user)
    };



    return (
        <div>
            <h1> Sign in Page </h1>
            <button onClick={logGoogleUser}> Sign In with Google Popup</button>
            {/* <button onClick={signInWithGoogleRedirect}> Sign In with Google Redirect </button> */}
            <SignUpForm />
        </div>
    );
};

export default SignIn;