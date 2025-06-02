const { validationResult } = require('express-validator');
const User = require('../models/User');
const logger = require('../utils/logger');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Registration validation errors:', errors.array());
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }

  const { name, email, password, preferredLanguage } = req.body;
  logger.info(`Registration attempt for email: ${email}`);

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      logger.warn(`Registration failed: User already exists for email ${email}`);
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Create user
    user = new User({
      name,
      email,
      password,
      preferredLanguage: preferredLanguage || 'en'
    });

    await user.save();
    logger.info(`User created successfully: ${email}`);

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferredLanguage: user.preferredLanguage
      }
    });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    logger.error(`Stack trace: ${error.stack}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error('Login validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  logger.info(`Login attempt for email: ${email}`);

  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    logger.info(`User found: ${user ? 'Yes' : 'No'}`);

    if (!user) {
      logger.warn(`Login failed: User not found for email ${email}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    logger.info(`Password match: ${isMatch ? 'Yes' : 'No'}`);

    if (!isMatch) {
      logger.warn(`Login failed: Invalid password for email ${email}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = user.getSignedJwtToken();
    logger.info(`Login successful for user: ${user.email}`);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferredLanguage: user.preferredLanguage
      }
    });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    logger.error(`Stack trace: ${error.stack}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferredLanguage: user.preferredLanguage
      }
    });
  } catch (error) {
    logger.error(`Error getting user profile: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};