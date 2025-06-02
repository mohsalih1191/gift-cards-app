require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../utils/logger');

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    preferredLanguage: 'en'
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    preferredLanguage: 'en'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB Connected for seeding');

    // Clear existing data
    await User.deleteMany({});
    logger.info('Cleared existing users');

    // Insert sample users
    const users = await User.create(sampleUsers);
    logger.info(`Created ${users.length} sample users`);

    // Log the created users (without passwords)
    users.forEach(user => {
      logger.info(`Created user: ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 