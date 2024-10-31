const Product = require("../models/Product");
const ApiError = require("../middleware/ApiError");
const catchAsync = require("../middleware/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sort = "-createdAt",
  } = req.query;

  // Build query
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Execute query without pagination
  const products = await Product.find(query).sort(sort);

  const total = await Product.countDocuments(query);

  res.status(200).json({
    status: "success",
    results: products.length,
    total,
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
