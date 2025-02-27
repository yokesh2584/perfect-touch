const Product = require("../models/Product");

// @desc    Upload an image and create a new product
// @route   POST /api/images/upload
// @access  Private/Admin
const uploadImage = async (req, res) => {
  const { name, description, price, brand, category, image } = req.body;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  const product = new Product({
    name,
    description,
    price,
    brand,
    category,
    image, // Store the base64 image string
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: "Invalid product data" });
  }
};

module.exports = { uploadImage };