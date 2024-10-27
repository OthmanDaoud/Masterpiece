import React from "react";

const title = "All Categories";

// Define categories for filtering
const categories = [
  "All",
  "Construction",
  "Electrical",
  "Paint",
  "Wood",
  "Steel",
  "Pumps",
];

const ShopCategory = ({ filterItem, selectedCategory }) => {
  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2">{title}</h5>
      </div>

      {/* Render buttons for each category */}
      {categories.map((category, index) => (
        <button
          key={index}
          className={`m-2 ${selectedCategory === category ? "bg-warning" : ""}`}
          onClick={() => filterItem(category === "All" ? "" : category)}
        >
          {category}
        </button>
      ))}
    </>
  );
};

export default ShopCategory;
