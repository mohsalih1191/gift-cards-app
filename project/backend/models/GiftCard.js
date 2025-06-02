const mongoose = require('mongoose');

const GiftCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be a positive number']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['Gaming', 'Shopping', 'Entertainment', 'Food', 'Travel', 'Other']
  },
  available: {
    type: Boolean,
    default: true
  },
  denominations: {
    type: [Number],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GiftCard', GiftCardSchema);