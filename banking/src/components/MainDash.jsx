import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import networkImg from '../assets/mastercard.png'
import MainDashLogo from '../assets/astro-bank-aside.png'
import './MainDash.css'

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) {
    return "Good Morning!";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon!";
  } else {
    return "Good Evening!";
  }
}

const MainDash = ({balance}) => {
    const [showCardNumber, setShowCardNumber] = useState(false);
    const formattedBalance = balance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleEyeIconClick = () => {
    setShowCardNumber(!showCardNumber);
    }

    return(
        <main className='mainDash'>
            <div className='mainDash-container'>
                <div className="mainDash-left-container">
                    <div className='mainDash-left-content'>
                        <div className='mainDash-greeting'>{getGreeting()}</div>
                        <p className='mainDash-welcome'>Welcome to your Wallet Dashboard</p>
                    </div>
                </div>

                <div className="mainDash-right-container">
                    <div className='mainDash-card-container'>
                        <div className='mainDash-card-details'>
                            <div className='mainDash-logo'>
                                <img src={MainDashLogo} alt="AstroBank" />
                                <div className='mainDash-bank-name'>AstroBank</div>
                            </div>
                            <div className='mainDash-card-number-details'>
                                <div className='mainDash-card-number'>
                                    <div className='mainDash-network-img'>
                                        <img src={networkImg} alt="Master Card" className='network-img' />
                                    </div>
                                    <div className='mainDash-number'>{showCardNumber ? '1234 5678 9012 3683' : '**** **** **** 3683'}</div>
                                </div>
                                <div className='mainDash-validity'>
                                    <p className='mainDash-valid-text'>Valid Thru:</p>
                                    <p className='mainDash-valid-date'>05/2027</p>
                                </div>
                            </div>
                            <div className='mainDash-bottom-div'>
                                <div className='mainDash-card-balance'>
                                    <h3 className='wallet-balance-text'>Wallet Balance</h3>
                                    <div className='balance'>
                                        <h1>PHP{formattedBalance}</h1>
                                    </div>
                                </div>
                                <button className='eye-icon' onClick={handleEyeIconClick}>{showCardNumber ? eye : eyeSlash}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainDash