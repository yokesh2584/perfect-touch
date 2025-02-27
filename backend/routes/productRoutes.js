const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");

const router = express.Router();

// Route to create a new product
router.post("/", authMiddleware, adminMiddleware, createProduct);

// Route to get all products
router.get("/", getAllProducts);

// Route to get a product by ID
router.get("/:id", getProductById);

// Route to update a product by ID
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

// Route to delete a product by ID
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;