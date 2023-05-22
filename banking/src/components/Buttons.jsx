import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faRightLeft, faMoneyBillTransfer, faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import './Buttons.css'

const deposit = <FontAwesomeIcon icon={faPlus} />
const withdraw = <FontAwesomeIcon icon={faMinus} />
const transfer = <FontAwesomeIcon icon={faRightLeft} />
const otherTransfer = <FontAwesomeIcon icon={faBuildingColumns} />

const Buttons = ({updateBalance}) => {
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);
    const [showTransferForm, setShowTransferForm] = useState(false);
    const [value, setValue] = useState('');
    const [buttonText, setButtonText] = useState('');
    
    const handleDepositClick = () => {setShowDepositForm(true);};
    const handleDepositClose = () => { setShowDepositForm(false);};
    const handleWithdrawClick = () => { setShowWithdrawForm(true); };
    const handleWithdrawClose = () => { setShowWithdrawForm(false); };
    const handleTransferClick = () => { setShowTransferForm(true); };
    const handleTransferClose = () => { setShowTransferForm(false); };


    const handleInputChange = (event) => {
        let newValue = parseFloat(event.target.value);

        if (isNaN(newValue)) {
            newValue = "";
        } else if (newValue > 1000000.00) {
            newValue = 1000000.00;
        } else if (newValue < 0){
            newValue = 0;
        } else {
            const decimalIndex = event.target.value.indexOf('.');
            if (decimalIndex !== -1 && event.target.value.substring(decimalIndex + 2).length >= 2) {
                return;
            }
        } 
        
        if (event.key === 'Enter' || event.type === 'blur') {
        newValue = newValue.toFixed(2);
        }

        const formattedValue = newValue.toLocaleString('en-PH', { minimumFractionDigits: 2 });
        setValue(newValue);
        setButtonText(newValue ? `PHP ${formattedValue} ` : " ");
    };

    const handleDepositSubmit = () => {
        const amount = parseFloat(value);
        if (!isNaN(amount)) {
            updateBalance(amount);
        }
        setValue('');
        setButtonText('');
        handleDepositClose()
    };

    const handleDeductSubmit = () => {
        const amount = parseFloat(value);
        if (!isNaN(amount)) {
            updateBalance(-amount);
        }
        setValue('');
        setButtonText('');
        handleWithdrawClose()
    };

    const handleTransferSubmit = () => {
        const recipientBank = document.getElementById('bankNames').value;
        const recipientAccountName = document.getElementById('accountName').value;
        const recipientAccountNumber = document.getElementById('accountNumber').value;
        const amount = parseFloat(value);

        if (!recipientBank || !recipientAccountName || !recipientAccountNumber || isNaN(amount)) {
            return;
        }
        
        if (!isNaN(amount)) {
        updateBalance(-amount);
        }
        setValue('');
        setButtonText('');
        handleTransferClose()
    };

    useEffect(() => {
        const form = document.getElementById('depositForm');
        if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        }
    }, []);

    return (
        <div className="buttons">
            <div className='buttons-container'>
                <div className='deposit'>
                    <button className="circular-button" onClick={handleDepositClick}>{deposit}</button>
                    <h4>Deposit</h4>
                </div>
                <div className='withdraw'>
                    <button className="circular-button" onClick={handleWithdrawClick}>{withdraw}</button>
                    <h4>Withdraw</h4>
                </div>
                <div className='transfer'>
                    <button className="circular-button" onClick={handleTransferClick}>{transfer}</button>
                    <h4>Transfer</h4>
                </div>
            </div>
            <DepositModal
                isOpen={showDepositForm}
                onClose={handleDepositClose}
                onInputChange={handleInputChange}
                onSubmit={handleDepositSubmit}
                value={value}
                buttonText={buttonText}
            />
            <WithdrawModal
                isOpen={showWithdrawForm}
                onClose={handleWithdrawClose}
                onInputChange={handleInputChange}
                onSubmit={handleDeductSubmit}
                value={value}
                buttonText={buttonText}
            />
            <TransferModal
                isOpen={showTransferForm}
                onClose={handleTransferClose}
                onInputChange={handleInputChange}
                onSubmit={handleTransferSubmit}
                value={value}
                buttonText={buttonText}
            />
        </div>
    )
}

export default Buttons

const DepositModal = ({ isOpen, onClose, onInputChange, onSubmit, value, buttonText }) => {
    const preventDefault = (e) => {
        e.preventDefault();
    };

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal" shouldCloseOnOverlayClick={false}>
            <div className='form-container'>
                <div className='form-intro'>
                    <h2 className='intro'>Deposit Form</h2>
                    <button className='close' onClick={onClose}>&times;</button>
                </div>
                <form className='modalForm' onSubmit={preventDefault}>
                    <label htmlFor="depositForm">Amount:<br></br>
                        <input type="number" className="transForm" id='depositForm' name='depositForm' value={value} onChange={onInputChange} step="0.01" placeholder='PHP 0.00'/>
                    </label>
                </form>
                <button className='submit-button' onClick={onSubmit}>Deposit {buttonText}</button>
            </div>
        </ReactModal>
    )
}

const WithdrawModal = ({isOpen, onClose, onInputChange, onSubmit, value, buttonText}) => {
    const preventDefault = (e) => {
        e.preventDefault();
    } 

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal" shouldCloseOnOverlayClick={false}>
            <div className='form-container'>
                <div className='form-intro'>
                    <h2 className='intro'>Withdraw Form</h2>
                    <button className='close' onClick={onClose}>&times;</button>
                </div>
                <form className='modalForm' onSubmit={preventDefault}>
                    <label htmlFor="withdrawForm">Amount:<br></br>
                        <input type="number" className="transForm" id='withdrawForm' name='withdrawForm' value={value} onChange={onInputChange} step="0.01" placeholder='PHP 0.00'/>
                    </label>
                </form>
                <button className='submit-button' onClick={onSubmit}>Withdraw {buttonText}</button>
            </div>
        </ReactModal>
    )
}

const TransferModal = ({isOpen, onClose, onInputChange, onSubmit, value, buttonText}) => {
    const preventDefault = (e) => {
        e.preventDefault();
    } 

    const [showForm, setShowForm] = useState(false);
    const modalClassName = `modal ${showForm ? 'modal-large' : 'modal-small'}`;
    const handleExternalTransferClick = () => {
        setShowForm(true);
    };

    useEffect(() => {
        setShowForm(false);
    }, [isOpen]);

    return(
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className={modalClassName} shouldCloseOnOverlayClick={false}>
            <div className='form-container'>
                    <div className='form-intro'>
                        <h2 className='intro'>Transfer</h2>
                        <button className='close' onClick={onClose}>&times;</button>
                    </div>

                    {showForm ? (
                    <div className='transferForm' onSubmit={preventDefault}>
                        <div className='bankSelection'>
                            <label htmlFor="bankNames"><h3>Recipient Bank:</h3></label>
                            <select name="bankNames" id="bankNames" defaultValue="">
                                <option value="" disabled>Choose Bank</option>
                                <option value="Asia">Asia UniBank</option>
                                <option value="BPL">BPL/BPL Family Savings Bank</option>
                                <option value="Lamp">Lamp Bank</option>
                                <option value="Meter">Meter Bank</option>
                                <option value="VDO">VDO Unibank</option>
                                <option value="WestEast">WestEast Bank</option>
                            </select>
                        </div>
                        <div className='transferName hidden'>
                            <label htmlFor="accountName"><h3>Recipient's Account Name:</h3></label>
                                <input type="text"  id='accountName' name='accountName'/>
                        </div>
                        <div className='transferNumber'>
                            <label htmlFor="accountNumber"><h3>Recipient's Account Number:</h3></label>
                                <input type="number"  id='accountNumber' name='accountNumber'/>
                        </div>
                        <div className='transferAmount'>
                            <label htmlFor="transferAmount"><h3>Amount:</h3></label>
                                <input type="number"  id='transferAmount' name='transferAmount' value={value} onChange={onInputChange} step="0.01" placeholder='PHP 0.00' />
                        </div>
                        <div className='transferNote'>
                            <p className='transferNote-text'>By doing this transaction, you agree that your transaction details will be shared to your selected bank</p>
                        </div>
                        <div className='continueButton-container'>
                            <button className='continueButton'onClick={onSubmit}>Transfer {buttonText}</button>
                        </div>
                    </div>
                    ) : (

                    <div className='transferOption'>
                        <div className='externalTransfer-container'>
                            <button className='externalTransfer'onClick={handleExternalTransferClick}>
                                {otherTransfer}
                                <p className='transferText'>Other Bank</p>
                            </button>
                        </div>
                    </div>
                    )}
                </div>
        </ReactModal>
    )
}