import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Signup.css'

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const Signup = ({onSignupSuccess, onLoginQuestion}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleShowPassClick = () => {
        setShowPassword(!showPassword);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignup = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const isUsernameExists = existingUsers.some((user) => user.username === username);

        if (isUsernameExists) {
        alert('Username already exists. Please choose a different username.');
        return;
        }

        const newUser = {
        username,
        password,
        };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

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
                            <input type={showPassword ? 'text' : 'password'}  id='signup-password' name='signup-password' value={password}
                onChange={handlePasswordChange}/>
                            <button className='show-password' onClick={handleShowPassClick}>{showPassword ? eye : eyeSlash}</button>
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