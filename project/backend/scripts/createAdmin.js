require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../utils/logger');

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB Connected');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'mohsalih1191@gmail.com' });
    if (existingUser) {
      logger.info('User already exists, updating role to admin');
      existingUser.role = 'admin';
      await existingUser.save();
      logger.info('User role updated to admin');
    } else {
      // Create new admin user
      const user = await User.create({
        name: 'Mohammed Salih',
        email: 'mohsalih1191@gmail.com',
        password: 'admin123',
        role: 'admin',
        preferredLanguage: 'en'
      });
      logger.info('Admin user created successfully');
    }

    logger.info('Script completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdminUser(); 