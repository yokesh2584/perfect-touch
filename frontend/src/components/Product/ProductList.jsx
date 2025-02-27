import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
// import './ProductList.css'; // Optional: Import a CSS file for additional styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); // Adjust the API endpoint as necessary
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>Beauty Products</h2>
      <div className="d-flex flex-wrap justify-content-around">
        {products.map((product) => (
          <Card key={product._id} style={{ width: '18rem', margin: '1rem' }}>
            <Link to={`/product/${product._id}`}>
              <Card.Img variant="top" src={product.image} width="200px" height="250px" />
            </Link>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Card.Text>
                <strong>${product.price}</strong>
              </Card.Text>
              <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;