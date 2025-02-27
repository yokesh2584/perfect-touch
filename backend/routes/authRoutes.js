const express = require('express');
const { authUser, signup } = require('../controllers/authController');

const router = express.Router();

router.post('/login', authUser);
router.post('/signup', signup);

module.exports = router;