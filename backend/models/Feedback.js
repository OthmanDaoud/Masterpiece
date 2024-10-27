const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Comment must be at least 3 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
