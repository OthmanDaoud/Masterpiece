// controllers/feedbackController.js
const Feedback = require("../models/Feedback");

// Get all reviews (non-deleted only)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Feedback.find({ deleted: false }).populate(
      "product user"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Soft delete a review by ID
const softDeleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Feedback.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res
      .status(200)
      .json({ message: "Review soft-deleted successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

module.exports = { getAllReviews, softDeleteReview };
