const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  ratingsCount: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
