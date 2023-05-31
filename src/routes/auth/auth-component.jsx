import { useEffect } from 'react'; // for GOOGLE REDIRECT
import {getRedirectResult} from 'firebase/auth'; // for GOOGLE REDIRECT

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up/sign-up-component';
import SignInForm from '../../components/sign-in/sign-in-component';
import "./auth.scss"


const Auth = () => {

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
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Auth;