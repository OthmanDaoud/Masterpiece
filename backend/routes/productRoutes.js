const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

router.get("/allProducts", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);
router.get("/pagination", productController.filterProducts);

module.exports = router;
