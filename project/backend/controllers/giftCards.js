const { validationResult } = require('express-validator');
const GiftCard = require('../models/GiftCard');
const logger = require('../utils/logger');

// @desc    Get all gift cards
// @route   GET /api/giftcards
// @access  Public
exports.getGiftCards = async (req, res) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    
    // Fields to exclude from filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);
    
    // Filter by category if provided
    if (req.query.category) {
      queryObj.category = req.query.category;
    }
    
    // Filter by availability
    if (req.query.available) {
      queryObj.available = req.query.available === 'true';
    }
    
    // Create query
    let query = GiftCard.find(queryObj);
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    query = query.skip(startIndex).limit(limit);
    
    // Execute query
    const giftCards = await query;
    
    // Get total count for pagination
    const total = await GiftCard.countDocuments(queryObj);
    
    // Pagination result
    const pagination = {};
    
    if (startIndex + giftCards.length < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: giftCards.length,
      pagination,
      data: giftCards
    });
  } catch (error) {
    logger.error(`Error fetching gift cards: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single gift card
// @route   GET /api/giftcards/:id
// @access  Public
exports.getGiftCard = async (req, res) => {
  try {
    const giftCard = await GiftCard.findById(req.params.id);
    
    if (!giftCard) {
      return res.status(404).json({
        success: false,
        error: 'Gift card not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: giftCard
    });
  } catch (error) {
    logger.error(`Error fetching gift card: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};