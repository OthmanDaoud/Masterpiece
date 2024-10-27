const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");
const auth = require("../middleware/auth");
// const { protect } = require("../middleware/authMiddleware"); // Assuming you have auth middleware

router.get("/product/:productId", feedbackController.getProductFeedback);
router.get("/product/:productId/average", feedbackController.getAverageRating);
router.post("/product/:productId", auth, feedbackController.createFeedback);

module.exports = router;
