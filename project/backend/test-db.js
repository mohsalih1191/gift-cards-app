require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    
    // Test creating a collection
    const testCollection = conn.connection.collection('test_connection');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Successfully wrote to test collection');
    
    // Clean up test data
    await testCollection.deleteOne({ test: 'connection' });
    console.log('✅ Successfully cleaned up test data');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

testConnection(); 