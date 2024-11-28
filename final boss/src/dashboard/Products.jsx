import React, { useState, useEffect } from "react";
import { api } from "./CustomComponents/api";
import ProductList from "./CustomComponents/ProductList";
import ProductForm from "./CustomComponents/ProductForm";
import DashboardPagination from "./CustomComponents/DashboardPagination";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getAllProducts();
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (productData) => {
    try {
      await api.createProduct(productData);
      await loadProducts();
      setShowForm(false);
      alert("Product created successfully!");
    } catch (err) {
      alert("Failed to create product. Please try again.");
    }
  };

  const handleUpdate = async (id, productData) => {
    try {
      await api.updateProduct(id, productData);
      await loadProducts();
      setShowForm(false);
      setSelectedProduct(null);
      alert("Product updated successfully!");
    } catch (err) {
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.deleteProduct(id);
        await loadProducts();
        alert("Product deleted successfully!");
      } catch (err) {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1 className="h4" style={{ color: "rgb(241,97,38)" }}>
          Product Management
        </h1>
        <div className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mr-3"
            style={{ width: "300px" }}
          />
          <button
            className="btn"
            style={{ backgroundColor: "rgb(241,97,38)", color: "white" }}
            onClick={() => setShowForm(true)}
          >
            Add New Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div
            className="spinner-border animate-spin text-warning"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="p-3">
            <ProductList
              products={displayedProducts}
              onEdit={(product) => {
                setSelectedProduct(product);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          </div>

          {totalPages > 1 && (
            <DashboardPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <ProductForm
        show={showForm}
        product={selectedProduct}
        onHide={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        onSubmit={
          selectedProduct
            ? (data) => handleUpdate(selectedProduct._id, data)
            : handleCreate
        }
      />
    </div>
  );
};

export default ProductManagement;
