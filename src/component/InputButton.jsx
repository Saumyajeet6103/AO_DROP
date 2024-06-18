import React, { useState } from 'react';
import './inputButtonStyle.css';
import eligible from '../utils/eligibile';

const InputButtonComponent = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [eligibleAmount, setEligibleAmount] = useState('');

  const handleClaim = async () => {
    if (address.length === 43) {
      try {
        setLoading(true);
        const amount = await eligible(address); 
        if (amount !== 'Sorry') {
          let divisor = BigInt(10) ** BigInt(12);
          const dataBigInt = BigInt(amount) * BigInt(1000);
          const result = Number(dataBigInt / divisor) / 1000;
          setEligibleAmount(result.toString());
          setMessage(`You are eligible for ${result}`);
        } else {
          setEligibleAmount("0");
          setMessage('You are eligible for 0');
        }
      } catch (error) {
        setMessage('Some Error Occurred. Please try again later.'); // Handle error message
        console.error('Error occurred during eligibility check:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage('Please enter a valid Arweave Wallet Address.'); // Handle invalid address message
    }
  };

  return (
    <div className="input-button-container">
      <div className="yellow-box">
        <div className="text-boxes">
          <div className="big-text">
            Instant Transfer at Your Fingertips with <span>AO Airdrop</span>
          </div>
          <div className="small-text">
            Simply enter your address and press <span style={{ color: 'red' }}>Claim</span> to automatically receive your airdrop
          </div>
        </div>
        <div className="input-field-container">
          <input
            type="text"
            placeholder="Enter your Arweave Wallet Address..."
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className="button"
            onClick={handleClaim}
            disabled={loading}
          >
            {loading ? 'Claiming...' : 'Claim'}
          </button>
        </div>
        {message && <div className="message">{message}</div>}
        {eligibleAmount && <div className="eligible-amount">Eligible Amount: {eligibleAmount}</div>}
      </div>
    </div>
  );
}

export default InputButtonComponent;
