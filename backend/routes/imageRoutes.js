const express = require("express");
const { uploadImage } = require("../controllers/imageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to upload an image and create a new product
router.post("/upload", authMiddleware, uploadImage);

module.exports = router;