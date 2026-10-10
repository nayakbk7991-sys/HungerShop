const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { createOrder, getOrderById, myOrders, updateOrdersStatus } = require('../controllers/orderController');
const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getOrderById);
router.route('/my').get(protect, myOrders);
router.route('/:id/status').put(protect, admin, updateOrdersStatus);
module.exports = router;