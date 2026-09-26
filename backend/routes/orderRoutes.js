const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrdersAdmin,
  updateOrderStatus,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getOrdersAdmin);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
