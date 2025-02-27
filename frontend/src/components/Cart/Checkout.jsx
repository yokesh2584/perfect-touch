import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/orders', {
        address,
        paymentMethod,
      });
      if (response.status === 200) {
        navigate('/order-confirmation');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Shipping Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
          <select
            className="form-select"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Google Pay">Google Pay</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;