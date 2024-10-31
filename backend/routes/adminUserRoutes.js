const express = require("express");
const userController = require("../controllers/adminUserController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.put("/:id/status", userController.toggleUserStatus);

module.exports = router;
