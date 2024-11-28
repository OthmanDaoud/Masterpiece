import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
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
                  className="img-fluid"
                  style={{ maxWidth: "50px", height: "auto" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}JOD</td>
              <td>{product.stock}</td>
              <td>
                <div className="d-flex justify-content-start flex-wrap">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2 mb-2"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mb-2"
                    onClick={() => onDelete(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
