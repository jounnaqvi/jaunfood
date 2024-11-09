import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const validateForm = () => {
    const { cardNumber, cardExpiry, cardCVC } = paymentDetails;
    if (!cardNumber || !cardExpiry || !cardCVC) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill in all the required fields.');
      return;
    }
    setError('');
    
    // Assuming payment always succeeds
    setSuccess('Payment processed successfully!');
    setPaymentDetails({
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
    });
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Payment Information</h2>
      {error && <div className='alert alert-danger'>{error}</div>}
      {success && <div className='alert alert-success'>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='cardNumber' className='form-label'>Card Number</label>
          <input
            type='text'
            id='cardNumber'
            name='cardNumber'
            className='form-control'
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='cardExpiry' className='form-label'>Card Expiry (MM/YY)</label>
          <input
            type='text'
            id='cardExpiry'
            name='cardExpiry'
            className='form-control'
            value={paymentDetails.cardExpiry}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='cardCVC' className='form-label'>Card CVC</label>
          <input
            type='text'
            id='cardCVC'
            name='cardCVC'
            className='form-control'
            value={paymentDetails.cardCVC}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
