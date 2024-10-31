const express = require("express");
const router = express.Router();
const adminOrderController = require("../controllers/adminOrderController"); // Adjust the path based on your project structure

// Route to get pending orders
router.get("/pending", adminOrderController.getPendingOrders);

// Route to get completed orders
router.get("/completed", adminOrderController.getCompletedOrders);

// Route to change order status
router.put("/:orderId", adminOrderController.changeOrderStatus);

module.exports = router;
