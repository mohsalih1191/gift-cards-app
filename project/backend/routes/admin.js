const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getStats,
  getRecentOrders,
  getUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/admin');

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard routes
router.get('/stats', getStats);
router.get('/recent-orders', getRecentOrders);

// User management routes
router.get('/users', getUsers);
router.put('/users/:userId/role', updateUserRole);
router.delete('/users/:userId', deleteUser);

module.exports = router; 