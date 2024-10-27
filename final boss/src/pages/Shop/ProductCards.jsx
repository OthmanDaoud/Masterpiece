import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../../components/Sidebar/Rating";
import Pagination from "./Pagination";
import ShopCategory from "./ShopCategory"; // Import the ShopCategory component

const ProductCards = ({ GridList }) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/allProducts?page=${currentPage}&limit=${productsPerPage}&category=${category}`
        );
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage, category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  return (
    <div>
      <ShopCategory
        filterItem={handleCategoryChange}
        selectedCategory={category}
      />

      {/* Products Display */}
      <div
        className={`shop-product-wrap row justify-content-center ${
          GridList ? "grid-view" : "list-view"
        }`}
      >
        {products.map((product, i) => (
          <div
            className={`${
              GridList ? "col-lg-4 col-md-6 col-12" : "col-12"
            } product-card`}
            key={i}
          >
            <div
              className={`product-item ${GridList ? "grid-item" : "list-item"}`}
            >
              <div className="product-thumb">
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <img
                    src={`${product.img}`}
                    alt={`${product.img}`}
                    style={{
                      objectFit: "fit",
                      height: "200px",
                      width: "50%",
                    }}
                  />
                </div>
                <div className="product-action-link">
                  <Link to={`/shop/${product._id}`}>
                    <i className="icofont-eye"></i>
                  </Link>
                  <Link to="/cart-page">
                    <i className="icofont-cart-alt"></i>
                  </Link>
                </div>
              </div>
              <div className="product-content">
                <h5>
                  <Link to={`/shop/${product._id}`}>{product.name}</Link>
                </h5>
                <p className="productRating">
                  <Rating value={product.ratings} />
                </p>
                <h6>{product.price} JD</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
        paginate={setCurrentPage}
        activePage={currentPage}
      />
    </div>
  );
};

export default ProductCards;
