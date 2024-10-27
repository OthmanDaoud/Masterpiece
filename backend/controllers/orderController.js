// controllers/orderController.js
const Order = require("../models/Order");
const mongoose = require("mongoose");

exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      products,
      totalAmount,
      paymentStatus,
      paypalPaymentId,
      paypalOrderId,
    } = req.body;

    const userId = req.user; // Extracted from the middleware

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Validate products array
    const isValidProducts = products.every(
      (item) =>
        mongoose.Types.ObjectId.isValid(item.product) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );

    if (!isValidProducts) {
      return res.status(400).json({ message: "Invalid products data" });
    }

    // Validate total amount
    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    const newOrder = new Order({
      user: userId,
      products,
      totalAmount,
      paymentStatus,
      paypalPaymentId,
      paypalOrderId,
    });

    const savedOrder = await newOrder.save({ session });

    // Here you might want to update product inventory
    // await Product.updateMany(...);

    await session.commitTransaction();
    res.status(201).json(savedOrder);
  } catch (error) {
    await session.abortTransaction();
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
