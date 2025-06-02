const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Import routes
const authRoutes = require('../../backend/routes/auth');
const giftCardRoutes = require('../../backend/routes/giftCards');
const transactionRoutes = require('../../backend/routes/transactions');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/giftcards', giftCardRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Export serverless handler
module.exports.handler = serverless(app); 