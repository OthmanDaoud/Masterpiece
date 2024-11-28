import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ProductForm = ({ show, onHide, product, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    seller: "",
    price: "",
    stock: "",
    ratings: "0",
    ratingsCount: "0",
    img: "",
    shipping: "",
    quantity: "0",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      // Convert numeric values to strings for form inputs
      setFormData({
        ...product,
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        ratings: product.ratings?.toString() || "0",
        ratingsCount: product.ratingsCount?.toString() || "0",
        shipping: product.shipping?.toString() || "",
        quantity: product.quantity?.toString() || "0",
      });
    } else {
      setFormData({
        category: "",
        name: "",
        seller: "",
        price: "",
        stock: "",
        ratings: "0",
        ratingsCount: "0",
        img: "",
        shipping: "",
        quantity: "0",
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.seller.trim()) newErrors.seller = "Seller is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (!formData.img.trim()) newErrors.img = "Image URL is required";
    if (!formData.shipping) newErrors.shipping = "Shipping cost is required";

    // Numeric validation
    if (Number(formData.price) < 0)
      newErrors.price = "Price cannot be negative";
    if (Number(formData.stock) < 0)
      newErrors.stock = "Stock cannot be negative";
    if (Number(formData.ratings) < 0 || Number(formData.ratings) > 5) {
      newErrors.ratings = "Rating must be between 0 and 5";
    }
    if (Number(formData.ratingsCount) < 0) {
      newErrors.ratingsCount = "Ratings count cannot be negative";
    }
    if (Number(formData.shipping) < 0) {
      newErrors.shipping = "Shipping cost cannot be negative";
    }
    if (Number(formData.quantity) < 0) {
      newErrors.quantity = "Quantity cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const processedData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      ratings: Number(formData.ratings),
      ratingsCount: Number(formData.ratingsCount),
      shipping: Number(formData.shipping),
      quantity: Number(formData.quantity),
    };

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
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Seller</Form.Label>
            <Form.Control
              type="text"
              name="seller"
              value={formData.seller}
              onChange={handleChange}
              isInvalid={!!errors.seller}
            />
            <Form.Control.Feedback type="invalid">
              {errors.seller}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              isInvalid={!!errors.stock}
            />
            <Form.Control.Feedback type="invalid">
              {errors.stock}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              isInvalid={!!errors.img}
            />
            <Form.Control.Feedback type="invalid">
              {errors.img}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ratings (0-5)</Form.Label>
            <Form.Control
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              isInvalid={!!errors.ratings}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ratings}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ratings Count</Form.Label>
            <Form.Control
              type="number"
              name="ratingsCount"
              value={formData.ratingsCount}
              onChange={handleChange}
              min="0"
              isInvalid={!!errors.ratingsCount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ratingsCount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Shipping Cost</Form.Label>
            <Form.Control
              type="number"
              name="shipping"
              value={formData.shipping}
              onChange={handleChange}
              min="0"
              step="0.01"
              isInvalid={!!errors.shipping}
            />
            <Form.Control.Feedback type="invalid">
              {errors.shipping}
            </Form.Control.Feedback>
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
