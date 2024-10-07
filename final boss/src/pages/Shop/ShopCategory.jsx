/* eslint-disable react/prop-types */
const title = "All Categories";
import Data from "/src/products.json";

const ShopCategory = ({
  filterItem,
  setProducts,
  menuItems,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2">{title}</h5>
      </div>

      {/* Button for All Categories */}
      <button
        className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}
        onClick={() => {
          setProducts(Data); // Show all products
          setSelectedCategory("All"); // Set "All" as the selected category
        }}
      >
        All
      </button>

      {/* Render buttons for other categories */}
      {menuItems.map((Val, id) => {
        return (
          <button
            className={`m-2 ${selectedCategory === Val ? "bg-warning" : ""}`}
            onClick={() => {
              filterItem(Val); // Filter products based on the selected category
              setSelectedCategory(Val); // Set the clicked category as the selected one
            }}
            key={id}
          >
            {Val}
          </button>
        );
      })}
    </>
  );
};

export default ShopCategory;
