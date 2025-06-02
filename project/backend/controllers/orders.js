const { validationResult } = require('express-validator');
const Order = require('../models/Order');
const GiftCard = require('../models/GiftCard');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('../utils/logger');

// @desc    Create order and payment intent
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { giftCardId, quantity, recipientEmail } = req.body;

  try {
    // Check if gift card exists
    const giftCard = await GiftCard.findById(giftCardId);
    
    if (!giftCard) {
      return res.status(404).json({
        success: false,
        error: 'Gift card not found'
      });
    }
    
    // Calculate amount
    const amount = giftCard.price * quantity;
    
    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: giftCard.currency || 'usd',
      metadata: {
        integration_check: 'accept_a_payment',
        giftCardId,
        userId: req.user.id
      }
    });
    
    // Create order
    const order = await Order.create({
      user: req.user.id,
      giftCard: giftCardId,
      quantity,
      amount,
      paymentIntentId: paymentIntent.id,
      recipientEmail: recipientEmail || req.user.email
    });
    
    res.status(201).json({
      success: true,
      data: {
        order,
        clientSecret: paymentIntent.client_secret
      }
    });
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('giftCard')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    logger.error(`Error fetching user orders: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};