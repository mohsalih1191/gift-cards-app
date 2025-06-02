require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const fs = require('fs');

// Route files
const giftCardRoutes = require('./routes/giftCards');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for ACME challenge
}));

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://ja7fla.com', 'https://www.ja7fla.com', 'https://api.ja7fla.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ACME Challenge Route
app.get('/.well-known/acme-challenge/:token', (req, res) => {
  const token = req.params.token;
  logger.info(`ACME challenge request for token: ${token}`);
  
  // Create the challenge response
  const challengeResponse = `${token}.7iy3Z661DrLHEmCt2GLa-rDBixvwBKZ-u2yX0ZfI4i4`;
  
  // Write to both IIS directory and local directory
  const iisPath = path.join('C:', 'inetpub', 'wwwroot', '.well-known', 'acme-challenge', token);
  const localPath = path.join(__dirname, '.well-known', 'acme-challenge', token);
  
  try {
    // Ensure directories exist
    fs.mkdirSync(path.dirname(iisPath), { recursive: true });
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    
    // Write the challenge file
    fs.writeFileSync(iisPath, challengeResponse);
    fs.writeFileSync(localPath, challengeResponse);
    
    logger.info(`Challenge file written to ${iisPath} and ${localPath}`);
    res.send(challengeResponse);
  } catch (error) {
    logger.error(`Error writing challenge file: ${error.message}`);
    res.status(500).send('Error processing challenge');
  }
});

// Mount routers
app.use('/api/giftcards', giftCardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to Gift Card API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      giftcards: '/api/giftcards',
      orders: '/api/orders',
      admin: '/api/admin'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});