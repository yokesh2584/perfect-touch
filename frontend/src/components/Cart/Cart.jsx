import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, loading } = useContext(CartContext);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClear = () => {
    clearCart();
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getImageSrc = (image) => {
    if (image.startsWith('data:image')) {
      // Image is already a Base64-encoded string
      return image;
    } else {
      // Image is a local asset
      return `/images/${image}`;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item) => {
              const imageSrc = getImageSrc(item.image);
              return (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {imageSrc ? (
                      <img src={imageSrc} alt={item.name} className="img-thumbnail" style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                    ) : (
                      <div style={{ width: '100px', height: '100px', marginRight: '10px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>No Image</span>
                      </div>
                    )}
                    <div>
                      <h5>{item.name}</h5>
                      <p>Price: ${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                </li>
              );
            })}
          </ul>
          <div className="mt-3">
            <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
            <button className="btn btn-danger" onClick={handleClear}>Clear Cart</button>
            <Link to="/checkout" className="btn btn-success ml-2">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;