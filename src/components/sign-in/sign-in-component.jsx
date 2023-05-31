import { useState } from 'react';

import FormInput from '../form-input/form-input-component';
import Button from '../button/button-component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import './sign-in-form.scss'

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    // Normally could use 4 useState (one for each input)
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        // async bc generating user document inside of an external service
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();

        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password': 
                    alert("Incorrect Password"); 
                    break;
                case 'auth/user-not-found': 
                    alert("Email not found");
                    break;
                default: 
                    console.log(error);
            };
        };
        // 
    };

    const handleChange = (event) => {
        // const {name, value} = event.target;

        setFormFields({...formFields, [event.target.name]: event.target.value}); // spreading in formFields object and modifying one at a time.

    };
        
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password.</span>
            <form onSubmit={handleSubmit}>
                
                {/* <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/> */}

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                {/* <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/> */}
                <div className='buttons-container'>
                    <Button type="submit"> Sign In </Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}> Google Sign In </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;