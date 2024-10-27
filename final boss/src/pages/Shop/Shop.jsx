import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Search from "./Search";
import Pagination from "./Pagination";
import ShopCategory from "./ShopCategory";
import PopularPost from "./PopularPost";
import ProductCards from "./ProductCards";
import axios from "axios"; // Import axios for data fetching

const Shop = () => {
  const [GridList, setGridList] = useState(true); // State to control grid/list view
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/allProducts?page=${currentPage}&limit=${productsPerPage}&category=${selectedCategory}`
        );
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage, selectedCategory]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <div>
      <PageHeader title={"Our Shop Pages"} curPage={"Shop"} />

      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <div className="product-view-mode">
                    <a
                      className={`grid ${GridList ? "gridActive" : ""}`}
                      onClick={() => setGridList(true)}
                    >
                      <i className="icofont-ghost"></i>
                    </a>
                    <a
                      className={`list ${!GridList ? "listActive" : ""}`}
                      onClick={() => setGridList(false)}
                    >
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>
                <div>
                  {/* Pass the fetched products and category as props to ProductCards */}
                  <ProductCards
                    products={products}
                    GridList={GridList}
                    totalProducts={totalProducts}
                    currentPage={currentPage}
                    productsPerPage={productsPerPage}
                    paginate={paginate}
                  />
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={GridList} />
                {/* Use handleCategoryChange for the ShopCategory filter */}
                <ShopCategory
                  filterItem={handleCategoryChange}
                  selectedCategory={selectedCategory}
                />
                <PopularPost />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
