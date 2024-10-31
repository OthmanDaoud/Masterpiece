const Order = require("../models/order"); // Adjust the path based on your project structure

// Get all pending orders
exports.getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ paymentStatus: "Pending" })
      .populate("user", "name email") // Populate user details
      .populate("products.product", "name price"); // Populate product details
    res.status(200).json(pendingOrders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending orders.", error });
  }
};

// Get all completed orders
exports.getCompletedOrders = async (req, res) => {
  try {
    const completedOrders = await Order.find({ paymentStatus: "Completed" })
      .populate("user", "name email") // Populate user details
      .populate("products.product", "name price"); // Populate product details
    res.status(200).json(completedOrders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch completed orders.", error });
  }
};

// Change order status from Pending to Completed
exports.changeOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Assuming you want to only allow changing from Pending to Completed
    if (order.paymentStatus !== "Pending") {
      return res.status(400).json({
        message: "Order is not pending and cannot be marked as completed.",
      });
    }

    order.paymentStatus = "Completed"; // Update the status
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated to completed.", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status.", error });
  }
};
