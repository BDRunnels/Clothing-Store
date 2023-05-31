import { useState } from 'react';

import FormInput from '../form-input/form-input-component';
import Button from '../button/button-component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    // Normally could use 4 useState (one for each input)
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        // async bc generating user document inside of an external service
        event.preventDefault();

        // confirm password matches
        if ( password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        };

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password); // email and pw are destructured off of formFields object (line 15)
            // console.log('response user', response.user);
            
            // const user = response.user
            console.log('user', user)

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use' ) {
                alert("Cannot create user; email already in use")
            } else {
            console.log("user creation encountered an error", error);
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
            <h2>Don't have an account?</h2>
            <span> Sign up with your email and password.</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit"> Sign Up </Button>
            </form>
        </div>
    );
};

export default SignUpForm;