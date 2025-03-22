import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); // Adjust the API endpoint as necessary
        setProducts(response.data);
        setFilteredProducts(response.data);
        setCategories([...new Set(response.data.map(product => product.category))]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPrice]);

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedPrice) {
      if (selectedPrice === 'low') {
        filtered = filtered.filter(product => product.price < 50);
      } else if (selectedPrice === 'medium') {
        filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
      } else if (selectedPrice === 'high') {
        filtered = filtered.filter(product => product.price > 100);
      }
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list">
      <h2>Beauty Products</h2>
      <div className="filters">
        <Form>
          <Form.Group controlId="categoryFilter">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="priceFilter">
            <Form.Label>Price</Form.Label>
            <Form.Control as="select" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
              <option value="">All</option>
              <option value="low">Below $50</option>
              <option value="medium">$50 - $100</option>
              <option value="high">Above $100</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="d-flex flex-wrap justify-content-around">
        {filteredProducts.map((product) => (
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