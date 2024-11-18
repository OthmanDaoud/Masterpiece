const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    seller: {
      type: String,
      required: [true, "Seller is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    ratings: {
      type: Number,
      // required: [true, "Ratings is required"],
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    ratingsCount: {
      type: Number,
      required: [true, "Ratings count is required"],
      min: [0, "Ratings count cannot be negative"],
    },
    img: {
      type: String,
      required: [true, "Image URL is required"],
    },
    shipping: {
      type: Number,
      required: [true, "Shipping cost is required"],
      min: [0, "Shipping cost cannot be negative"],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, "Quantity cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
