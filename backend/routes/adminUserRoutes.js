const express = require("express");
const userController = require("../controllers/adminUserController");
const router = express.Router();

router.get("/users", userController.getAllUsers);
router.put("/users/:id/status", userController.toggleUserStatus);

module.exports = router;
