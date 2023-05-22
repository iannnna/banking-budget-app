import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Login.css'

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

const Login = ({onLoginSuccess, onSignupQuestion}) => {
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

    const handleLogin = (event) => {
        event.preventDefault();

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const matchedUser = storedUsers.find(
        (user) => user.username === username && user.password === password
        );

        if (matchedUser) {
        onLoginSuccess();
        } else {
        alert('Invalid username or password');
        }
    };

    const handleSignupQuestion = () => {
        onSignupQuestion();
    };

    return(
        <div className='login-main-page'>
            <div className='login-form-container'>
                <h2 className='login-intro'>Login</h2>
                <div className='login-form-container'>
                    <div className='login-form'>
                        <div className='login-username-container'>
                            <label htmlFor="login-username">Username</label>
                            <input type="text" id='login-username' name='login-username' value={username}
                onChange={handleUsernameChange}/>
                        </div>
                        <div className='login-password-container'>
                            <label htmlFor="login-passoword">Password</label>
                            <div className='login-password-input'>
                                <input type={showPassword ? 'text' : 'password'} id='login-password' name='login-password' value={password} onChange={handlePasswordChange} />
                                <button className='show-password' onClick={handleShowPassClick}>{showPassword ? eye : eyeSlash}</button>
                            </div>
                        </div>
                        <button className='login-button' onClick={handleLogin}>Login</button>
                        <div className='signup-question'>
                            <p>Not registered yet?</p>
                            <button onClick={handleSignupQuestion}>Signup here</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
