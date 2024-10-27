const Product = require("../models/Product");
require("dotenv").config();

exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 15, category } = req.query;

    // Create a filter object if category is provided
    const filter = category ? { category } : {};

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.json({ products, totalProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); // Find product by ID
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

exports.filterProducts = async (req, res) => {
  const { page = 1, limit = 15, category = "" } = req.query;

  try {
    // Build the query object for filtering by category
    const categoryFilter = category ? { category } : {};

    // Fetch products with pagination and filtering
    const products = await Product.find(categoryFilter)
      .limit(parseInt(limit)) // Limit the number of products per page
      .skip((page - 1) * limit) // Skip products based on current page
      .exec();

    // Get total count for pagination purposes
    const totalProducts = await Product.countDocuments(categoryFilter);

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
