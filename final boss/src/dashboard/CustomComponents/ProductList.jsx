import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          {/* <th>Ratings</th> */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <img
                src={product.img}
                alt={product.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            </td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            {/* <td>
              {product.ratings} ({product.ratingsCount} reviews)
            </td> */}
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => onEdit(product)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(product._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
