import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import QRCode from 'qrcode';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const url = await QRCode.toDataURL(`Total Amount: $${totalAmount.toFixed(2)}`);
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQrCode();
  }, [totalAmount]);

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
      <div className="row">
        <div className="col-md-8">
          <h3>Order Summary</h3>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  {/* <p>Category: {item.category}</p>
                  <p>Brand: {item.brand}</p> */}
                  <p>Price: ${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div>
                  <img src={item.image} alt={item.name} className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Payment</h3>
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
          <div className="mt-4">
            <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
            <h5>Total Quantity: {totalQuantity}</h5>
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;