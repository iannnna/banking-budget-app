import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactModal from 'react-modal';
import './Budget.css'

const erase = <FontAwesomeIcon icon={faTrash} />

const Budget = ({updateBalance }) => {
    const [showFundsForm, setShowFundsForm] = useState(false)
    const [showBudgetForm, setShowBudgetForm] = useState(false);
    const [budgets, setBudgets] = useState([]);
    const [goalName, setGoalName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [fundsGoalAmount, setFundsGoalAmount] = useState(0);
    const [deletedProgressIndex, setDeletedProgressIndex] = useState(-1);


    const handleFundsClick = () => {setShowFundsForm(true)};
    const handleFundsClose = () => {setShowFundsForm(false)};

    const handleBudgetClick = () => {setShowBudgetForm(true);};
    const handleBudgetClose = () => {
        setGoalName('');
        setGoalAmount('');
        setShowBudgetForm(false);
    };

    const handleBudgetSubmit = () => {
        if (goalName && goalAmount) {
            const newBudget = { goalName, goalAmount: parseFloat(goalAmount) };
            const updatedBudgets = [...budgets, newBudget];
            setBudgets(updatedBudgets);
            localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
        }
        setGoalName('');
        setGoalAmount('');
        setShowBudgetForm(false);
    };

    const handleDeletedProgress = () => {
        if (deletedProgressIndex >= 0) {
            const deletedBudget = budgets[deletedProgressIndex];
            const amountToAdd = deletedBudget.fundsGoalAmount || 0;
            updateBalance(amountToAdd);

            const updatedBudgets = budgets.filter((_, index) => index !== deletedProgressIndex);
            setBudgets(updatedBudgets);
            localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
            setDeletedProgressIndex(-1);
        }
    };

    const handleAddFunds = (selectedBudget, fundsGoalAmount, progressIndex) => {
        const updatedBudgets = budgets.map((budget, index) => {
            if (index === progressIndex) {
                return budget;
            }
            if (budget.goalName === selectedBudget.goalName) {
                const newFundsGoalAmount = parseFloat(fundsGoalAmount);
                const amountToDeduct = newFundsGoalAmount - (budget.fundsGoalAmount || 0);
                updateBalance(-amountToDeduct);
                return { ...budget, fundsGoalAmount: newFundsGoalAmount };
            }
            return budget;
        });
        setBudgets(updatedBudgets);
        localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
        setFundsGoalAmount(fundsGoalAmount);
    };

    useEffect(() => {
        const savedBudgets = localStorage.getItem('budgets');
        if (savedBudgets) {
            setBudgets(JSON.parse(savedBudgets));
        }
    }, []);

    const totalSavings = budgets.reduce(
        (total, budget) => total + (budget.fundsGoalAmount || 0),
        0
    );

    useEffect(() => {
        handleDeletedProgress();
        }, [deletedProgressIndex]);

    return (
        <div className='budgets'>
            <div className="budget-container">
                    <div className='budget'>
                        <div className='total'>
                            <div className='total-savings'>
                                <h3>Total Savings</h3>
                                <h1>PHP {totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='funds-container'>
                        <div className='left-funds-container'>
                            <div className='left-funds-content'>
                                <button className='addFunds' onClick={handleFundsClick}>+ Add Funds</button>
                                <button className='newSavings' onClick={handleBudgetClick}>+ Add New Budget</button>
                            </div>
                        </div>
                        <div className='right-funds-container'>
                            <h4 className='right-funds'>Budgets</h4>
                            <Progress budgets={budgets} fundsGoalAmount={fundsGoalAmount} onDeleteProgress={setDeletedProgressIndex} updateBalance={updateBalance} />
                        </div>
                    </div>
            </div>
            <AddBudget
                isOpen={showBudgetForm}
                onClose={handleBudgetClose}
                onBudgetSubmit={handleBudgetSubmit}
                goalName={goalName}
                setGoalName={setGoalName}
                goalAmount={goalAmount}                    
                setGoalAmount={setGoalAmount}
            />
            <AddFunds
                isOpen={showFundsForm}
                onClose={handleFundsClose}
                budgets={budgets}
                onAddFunds={handleAddFunds}
            />
        </div>
    )
}

export default Budget

const Progress = ({ budgets, onDeleteProgress }) => {  
    return (
        <div className='progress-container'>
            <ul className='savings-container'>
                {budgets.map((budget, index) => {
                    const percentage = budget.fundsGoalAmount ? Math.floor((budget.fundsGoalAmount / budget.goalAmount) * 100) : 0;

                return (
                    <li key={index} className='progress'>
                        <div className='progress-main-content'>
                            <div className='progress-name-container'>
                                <p className='progress-name'>{budget.goalName}</p>
                                <p className='progress-percentage'>{percentage}%</p>
                            </div>
                            <p className='progress-amount'>Goal: PHP {budget.goalAmount.toLocaleString('en-PH', {minimumFractionDigits: 2 })}</p>
                            <progress max={budget.goalAmount} value={budget.fundsGoalAmount ? budget.fundsGoalAmount : 0} className='savings-progress'></progress>
                        </div>
                        <div className='progress-delete'>
                            <button className='progress-delete-icon' onClick={() => onDeleteProgress(index)}>{erase}</button>
                        </div>
                    </li>
                );
                })}
            </ul>
        </div>
    );
};

const AddFunds = ({isOpen, onClose, budgets, onAddFunds}) => {
    const [fundsGoalName, setFundsGoalName] = useState('');
    const [fundsGoalAmount, setFundsGoalAmount] = useState('');

    const handleGoalNameChange = (event) => {
        setFundsGoalName(event.target.value);
    };

    const handleGoalAmountChange = (event) => {
        setFundsGoalAmount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedBudget = budgets.find((budget) => budget.goalName === fundsGoalName);
        if (selectedBudget && fundsGoalAmount) {
            onAddFunds(selectedBudget, parseFloat(fundsGoalAmount));
            onClose();
            }
    };

    useEffect(() => {
        if (!isOpen) {
            setFundsGoalName('');
            setFundsGoalAmount('');
        }
    }, [isOpen]);


    return(
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="funds-modal" shouldCloseOnOverlayClick={false}>
            <div className='funds-modal-content'>
                    <div className='funds-intro-container'>
                        <h2 className='intro'>Add Funds</h2>
                        <button className='close' onClick={onClose}>&times;</button>
                    </div>
                    <div className='funds-form-container'>
                        <div className='funds-form-intro'>
                            <h3>Save!</h3>
                        </div>
                        <div className='funds-form'>
                            <h4>Transfer to Funds</h4>
                            <div className='funds-name'>
                                <label htmlFor="funds-goal-name" className='funds-form-label'>Choose budget</label>
                                <select type="text" name='funds-goal-name' id='funds-goal-name' defaultValue="" onChange={handleGoalNameChange}>
                                    <option value=""  disabled>Choose Budget</option>
                                    {budgets.map((budget, index) => (
                                        <option key={index} value={budget.goalName}>{budget.goalName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='funds-amount'>
                                <label htmlFor="funds-goal-amount" className='funds-form-label'>Amount</label>
                                <input type="number" name='funds-goal-amount' id='funds-goal-amount' placeholder='Enter goal amount' value={fundsGoalAmount} onChange={handleGoalAmountChange}/>
                            </div>
                            <button className='funds-submit' onClick={handleSubmit}>Confirm</button>
                        </div>
                    </div>
            </div>
        </ReactModal>
    )
}

const AddBudget = ({isOpen, onClose, onBudgetSubmit, goalName, setGoalName, goalAmount, setGoalAmount,}) => {
    const handleSubmit = () => {
        if (goalName && goalAmount) {
        onBudgetSubmit();
        }
        onClose();
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        onClose();
    };

    const handleGoalNameChange = (event) => {
        setGoalName(event.target.value);
    };

    const handleGoalAmountChange = (event) => {
        setGoalAmount(event.target.value);
    };

    return(
        <ReactModal isOpen={isOpen} onRequestClose={handleButtonClick} className="budget-modal" shouldCloseOnOverlayClick={false}>
            <div className='budget-modal-content'>
                <div className='budget-intro-container'>
                    <h2 className='intro'>Add New Budget</h2>
                    <button className='close' onClick={onClose}>&times;</button>
                </div>
                <div className='budget-form-container'>
                    <div className='budget-form-intro'>
                        <h3>Set your Budget Goal!</h3>
                    </div>
                    <div className='budget-form'>
                        <h4>Goal details</h4>
                        <div className='budget-name'>
                            <label htmlFor="goal-name" className='budget-form-label'>Goal Name</label>
                            <input type="text" name='goal-name' id='goal-name' placeholder='Enter goal name' value={goalName} onChange={handleGoalNameChange}/>
                        </div>
                        <div className='budget-amount'>
                            <label htmlFor="goal-amount" className='budget-form-label'>Goal Amount</label>
                            <input type="number" name='goal-amount' id='goal-amount' placeholder='Enter goal amount' value={goalAmount} onChange={handleGoalAmountChange}/>
                        </div>
                        <button className='budget-submit' onClick={handleSubmit}>Confirm</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}