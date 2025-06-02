const User = require('../models/User');
const Order = require('../models/Order');
const GiftCard = require('../models/GiftCard');
const logger = require('../utils/logger');

// Get dashboard statistics
exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalOrders, totalRevenue, activeGiftCards] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      GiftCard.countDocuments({ status: 'active' })
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      activeGiftCards
    });
  } catch (error) {
    logger.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};

// Get recent orders
exports.getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');

    const formattedOrders = orders.map(order => ({
      id: order._id,
      user: order.user.name,
      amount: order.amount,
      status: order.status,
      date: order.createdAt
    }));

    res.json(formattedOrders);
  } catch (error) {
    logger.error('Error fetching recent orders:', error);
    res.status(500).json({ error: 'Failed to fetch recent orders' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}; 