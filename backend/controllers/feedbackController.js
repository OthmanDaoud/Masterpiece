const Feedback = require("../models/feedback");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getProductFeedback = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const feedback = await Feedback.find({ product: productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (error) {
    console.error("Error in getProductFeedback:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const result = await Feedback.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    res.json({
      averageRating: result[0]?.averageRating || 0,
      totalRatings: result[0]?.totalRatings || 0,
    });
  } catch (error) {
    console.error("Error in getAverageRating:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createFeedback = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user;

    // Validation
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    if (!comment || comment.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Comment must be at least 3 characters long" });
    }

    // Check if product exists
    const product = await Product.findById(productId).session(session);
    if (!product) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Product not found" });
    }

    // Check for existing feedback
    const existingFeedback = await Feedback.findOne({
      product: productId,
      user: userId,
    }).session(session);

    if (existingFeedback) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "You have already submitted feedback for this product",
      });
    }

    // Create feedback
    const feedback = await Feedback.create(
      [
        {
          product: productId,
          user: userId,
          rating,
          comment,
        },
      ],
      { session }
    );

    // Calculate new average rating
    const newRating = await calculateNewRating(productId, rating, session);

    // Update product
    await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { ratingsCount: 1 },
        $set: { ratings: newRating },
      },
      { session }
    );

    // Populate user details
    const populatedFeedback = await Feedback.findById(feedback[0]._id)
      .populate("user", "name email")
      .session(session);

    await session.commitTransaction();
    res.status(201).json(populatedFeedback);
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in createFeedback:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    session.endSession();
  }
};

async function calculateNewRating(productId, newRating, session) {
  try {
    const result = await Feedback.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]).session(session);

    return result[0]?.averageRating || newRating;
  } catch (error) {
    console.error("Error calculating new rating:", error);
    return newRating;
  }
}
