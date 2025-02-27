import React from 'react';
import ProductList from '../components/Product/ProductList';
// import './Home.css';

const Home = () => {
  return (
    <div className="home-container container my-4">
      <h1>Welcome to The Perfect Touch</h1>
      <p>Your one-stop shop for all beauty products!</p>
      <ProductList />
    </div>
  );
};

export default Home;