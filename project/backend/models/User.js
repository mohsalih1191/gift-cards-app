const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    index: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    index: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    index: true
  },
  preferredLanguage: {
    type: String,
    enum: ['en', 'ar'],
    default: 'en'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Create compound index for common queries
UserSchema.index({ role: 1, createdAt: -1 });

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role 
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = mongoose.model('User', UserSchema);