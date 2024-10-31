// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  softDeleteReview,
} = require("../controllers/adminFeedbackController");

// Route to get all reviews
router.get("/", getAllReviews);

// Route to soft delete a review by ID
router.delete("/:id", softDeleteReview);

module.exports = router;
