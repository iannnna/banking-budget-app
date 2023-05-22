import React, { useState } from 'react';
import './Signup.css'

const Signup = ({onSignupSuccess, onLoginQuestion}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignup = () => {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Signup successful!');
        onSignupSuccess();
    };

    const handleLoginQuestion = () => {
        onLoginQuestion();
    }

    return(
        <div className='signup-main-page'>
            <div className='signup-form-container'>
                <h2 className='signup-intro'>Create an Account</h2>
                <div className='signup-form-container'>
                    <div className='signup-form'>
                        <div className='signup-username-container'>
                            <label htmlFor="signup-username">Username</label>
                            <input type="text" id='signup-username' name='signup-username' value={username}
                onChange={handleUsernameChange}/>
                        </div>
                        <div className='signup-password-container'>
                            <label htmlFor="signup-passoword">Password</label>
                            <input type="text" id='signup-password' name='signup-password' value={password}
                onChange={handlePasswordChange}/>
                        </div>
                        <button className='login-button' onClick={handleSignup}>Sign Up</button>
                        <div className='login-question'>
                            <p>Already have an account?</p>
                            <button onClick={handleLoginQuestion}>Login here</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup