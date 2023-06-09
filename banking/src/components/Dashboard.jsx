import { useState, useEffect  } from 'react';
import MainDash from "./MainDash";
import Buttons from "./Buttons";
import Budget from "./Budget"
import './Dashboard.css'

const Dashboard = () => {
    const [balance, setBalance] = useState(() => {
        const savedBalance = localStorage.getItem('walletBalance');
        return savedBalance ? parseFloat(savedBalance) : 0;
    });

    useEffect(() => {
        const savedBalance = localStorage.getItem('walletBalance');
        if (savedBalance) {
        setBalance(parseFloat(savedBalance));
        }
    }, []);

    const updateBalance = (amount) => {
        const newBalance = balance + amount;
        setBalance(newBalance);
        localStorage.setItem('walletBalance', newBalance.toFixed(2));
    };

    return (
        <section>
            <MainDash balance={balance} />
            <Buttons updateBalance={updateBalance} />
            <Budget updateBalance={updateBalance}/>
        </section>
    )
}

export default Dashboard