const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create order from trolley
router.post('/', orderController.createOrder);

// Get all orders for a user
router.get('/user/:userId', orderController.getOrdersByUser);

// Get all orders (admin)
router.get('/', orderController.getAllOrders);

// Cancel order
router.patch('/:orderId/cancel', orderController.cancelOrder);

module.exports = router;
