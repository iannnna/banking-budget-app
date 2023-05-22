import React, { useState } from 'react';
import './Login.css'

const Login = ({onLoginSuccess, onSignupQuestion}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (username === 'admin123' && password === 'admin123') {
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
                            <input type="text" id='login-password' name='login-password' value={password}
                onChange={handlePasswordChange} />
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
