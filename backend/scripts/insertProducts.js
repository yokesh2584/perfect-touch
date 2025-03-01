const mongoose = require("mongoose");
const Product = require("../models/Product");
require('dotenv').config();

const products = [
  {
    name: "Hydrating Face Cream",
    description: "A deeply hydrating face cream for all skin types.",
    price: 29.99,
    brand: "BeautyCo",
    category: "Skincare",
    image: "./images/product1.jpeg",
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: "Volumizing Mascara",
    description: "A volumizing mascara that adds length and volume to your lashes.",
    price: 19.99,
    brand: "LashPro",
    category: "Makeup",
    image: "./images/product2.jpeg",
    rating: 4.7,
    numReviews: 25,
  },
  {
    name: "Nourishing Hair Oil",
    description: "A nourishing hair oil that promotes healthy, shiny hair.",
    price: 24.99,
    brand: "HairEssence",
    category: "Haircare",
    image: "./images/product3.jpeg",
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: "Matte Lipstick",
    description: "A long-lasting matte lipstick available in various shades.",
    price: 14.99,
    brand: "LipGlam",
    category: "Makeup",
    image: "./images/product4.jpeg",
    rating: 4.6,
    numReviews: 30,
  },
  {
    name: "Revitalizing Eye Cream",
    description: "An eye cream that reduces puffiness and dark circles.",
    price: 34.99,
    brand: "EyeBright",
    category: "Skincare",
    image: "./images/product5.jpeg",
    rating: 4.4,
    numReviews: 20,
  },
];

const insertProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products);

    console.log("Products inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting products:", error);
    mongoose.connection.close();
  }
};

insertProducts();