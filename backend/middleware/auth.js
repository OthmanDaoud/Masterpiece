const jwt = require("jsonwebtoken");
require("dotenv").config();
const ApiError = require("./ApiError");
const User = require("../models/User");
const catchAsync = require("./catchAsync");

const auth = catchAsync(async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({
          message: "The user belonging to this token no longer exists.",
        });
    }

    // Grant access to protected route
    req.user = user; // Attach user to request
    console.log("Token verified successfully. User ID:", req.user._id);
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(500).send("Error verifying token: " + error.message);
  }
});

// Export auth middleware
module.exports = auth;

// Restrict access to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to perform this action.",
        });
    }
    next();
  };
};
