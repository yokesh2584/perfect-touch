import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const fetchProducts = async () => {
    const adminToken = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/products", {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    setProducts(response.data);
  };

  const handleShow = (product) => {
    setCurrentProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentProduct({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentProduct({ ...currentProduct, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminToken = localStorage.getItem("token");
    if (currentProduct._id) {
      await axios.put(
        `http://localhost:3000/api/products/${currentProduct._id}`,
        currentProduct,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
    } else {
      await axios.post("http://localhost:3000/api/products", currentProduct, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
    }
    fetchProducts();
    handleClose();
  };

  const handleDelete = async (id) => {
    const adminToken = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container my-4">
      <h2>Admin Dashboard</h2>
      <Button variant="primary" onClick={() => handleShow({})}>
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(product)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct._id ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={currentProduct.category}
                onChange={handleChange}
                required
              >
                <option value="Skin Care">Skin Care</option>
                <option value="Sun Care">Sun Care</option>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Perfumes">Perfumes</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={currentProduct.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentProduct._id ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
