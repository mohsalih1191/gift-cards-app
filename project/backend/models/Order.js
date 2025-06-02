const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  giftCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiftCard',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  amount: {
    type: Number,
    required: true
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  redemptionCode: {
    type: String
  },
  recipientEmail: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);