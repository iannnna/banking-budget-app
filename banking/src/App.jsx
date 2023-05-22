import React, { useState } from 'react';
import Login from './components/Login'
import Signup from './components/Signup';
import Aside from './components/Aside'
import Dashboard from './components/Dashboard'
import './App.css'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignupQuestion = () => {
    setIsSignupVisible(true);
  };

  const handleSignupSuccess = () => {
    setIsSignupVisible(false);
  };

  const handleLoginQuestion = () => {
    setIsSignupVisible(false);
  }

  return (
    <main className="main">
      {!isLoggedIn && !isSignupVisible && (
        <div className="login-page">
          <Login onLoginSuccess={handleLoginSuccess} onSignupQuestion={handleSignupQuestion}/>
        </div>
      )}
      {isLoggedIn && (
        <div className="mainDashboard-content">
          <Aside onLogout={handleLogout} />
          <Dashboard />
        </div>
      )}
      {isSignupVisible && (
        <div className="signup-page">
          <Signup onSignupSuccess={handleSignupSuccess} onLoginQuestion={handleLoginQuestion}/>
        </div>
      )}
    </main>
  )
}

export default App