import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ProductForm = ({ show, onHide, product, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    seller: "",
    price: "",
    stock: "",
    ratings: "",
    // ratingsCount: '',
    img: "",
    shipping: "",
    quantity: "0",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        category: "",
        name: "",
        seller: "",
        price: "",
        stock: "",
        ratings: "",
        // ratingsCount: '',
        img: "",
        shipping: "",
        quantity: "0",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericFields = ["price", "stock", "ratings", "shipping", "quantity"];
    const processedData = { ...formData };

    numericFields.forEach((field) => {
      processedData[field] = Number(processedData[field]);
    });

    onSubmit(processedData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Edit Product" : "Add New Product"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Seller</Form.Label>
            <Form.Control
              type="text"
              name="seller"
              value={formData.seller}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ratings</Form.Label>
            <Form.Control
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.1"
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Ratings Count</Form.Label>
            <Form.Control
              type="number"
              name="ratingsCount"
              value={formData.ratingsCount}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Shipping Cost</Form.Label>
            <Form.Control
              type="number"
              name="shipping"
              value={formData.shipping}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {product ? "Update Product" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductForm;
