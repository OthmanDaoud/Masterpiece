const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/signup", userController.signUp);
router.post("/verify-otp", userController.verifyOTP);
router.post("/login", userController.logIn);

// Profile
router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, userController.updateProfile);

module.exports = router;