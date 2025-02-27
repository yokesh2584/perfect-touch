const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

// Route to get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Route to update user profile
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;