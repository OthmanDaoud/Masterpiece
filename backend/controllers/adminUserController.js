const User = require("../models/User");
const sendEmail = require("../middleware/mailer"); // Import the sendEmail function

// GET a user by ID
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Toggle isActive status of a user
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the user's status
    user.isActive = !user.isActive;
    await user.save();

    // Send email notification
    const subject = `Your account has been ${
      user.isActive ? "activated" : "deactivated"
    }`;
    const text = `Hello ${
      user.name
    },\n\nYour account status has been changed to ${
      user.isActive ? "active" : "inactive"
    }.`;
    await sendEmail(user.email, subject, text);

    res.status(200).json({
      message: `User is now ${user.isActive ? "active" : "inactive"}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user status", error });
  }
};
