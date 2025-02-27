const express = require('express');
const { createOrder, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController.js');
// const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get order by ID
router.get('/:id', getOrderById);

// Route to update order to paid
router.put('/:id/pay', updateOrderToPaid);

// Route to get logged in user's orders
router.get('/myorders', getMyOrders);

module.exports = router;