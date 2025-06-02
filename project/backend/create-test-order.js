require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const GiftCard = require('./models/GiftCard');
const Order = require('./models/Order');

const createTestOrder = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Create test user if not exists
    let testUser = await User.findOne({ email: 'test@example.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });
      console.log('✅ Created test user');
    }

    // Create test gift card if not exists
    let testGiftCard = await GiftCard.findOne({ name: 'Test Gift Card' });
    if (!testGiftCard) {
      testGiftCard = await GiftCard.create({
        name: 'Test Gift Card',
        description: 'A test gift card for demonstration',
        imageUrl: 'https://example.com/giftcard.jpg',
        price: 50,
        currency: 'USD',
        category: 'Shopping',
        available: true,
        denominations: [25, 50, 100]
      });
      console.log('✅ Created test gift card');
    }

    // Create test order
    const testOrder = await Order.create({
      user: testUser._id,
      giftCard: testGiftCard._id,
      quantity: 2,
      amount: 100,
      paymentIntentId: 'test_payment_intent_123',
      status: 'completed',
      redemptionCode: 'TEST123456',
      recipientEmail: 'recipient@example.com'
    });

    console.log('\n✅ Created test order:');
    console.log(JSON.stringify(testOrder, null, 2));

    // Verify the order was created
    const savedOrder = await Order.findById(testOrder._id)
      .populate('user', 'name email')
      .populate('giftCard', 'name price');
    
    console.log('\n📦 Order Details:');
    console.log('-------------------');
    console.log(`Order ID: ${savedOrder._id}`);
    console.log(`User: ${savedOrder.user.name} (${savedOrder.user.email})`);
    console.log(`Gift Card: ${savedOrder.giftCard.name}`);
    console.log(`Amount: $${savedOrder.amount}`);
    console.log(`Status: ${savedOrder.status}`);
    console.log(`Redemption Code: ${savedOrder.redemptionCode}`);
    console.log('-------------------');

    // Close the connection
    await mongoose.connection.close();
    console.log('\n✅ Connection closed successfully');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createTestOrder(); 