import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCartItems(response.data);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/cart',
          { productId: product._id, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data);
        alert('Product added to cart');
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.product === product._id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.product === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
      alert('Product added to cart');
    }
  };

  const removeFromCart = async (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setCartItems((prevItems) => prevItems.filter((item) => item.product !== id));
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.delete('http://localhost:3000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      setCartItems([]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};