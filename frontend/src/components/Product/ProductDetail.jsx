import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
// import './ProductDetail.css'; // Assuming you have a CSS file for styling

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-detail container mt-5">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="img-fluid" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
      {/* <div className="reviews mt-4">
        <h3>Reviews</h3>
        {product.reviews.map((review) => (
          <div key={review._id} className="review">
            <strong>{review.user}</strong>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ProductDetail;