const express = require('express');
const { check } = require('express-validator');
const { createOrder, getUserOrders } = require('../controllers/orders');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.post(
  '/',
  [
    check('giftCardId', 'Gift card ID is required').not().isEmpty(),
    check('quantity', 'Quantity must be a positive number').isInt({ min: 1 })
  ],
  createOrder
);

router.get('/', getUserOrders);

module.exports = router;