require('dotenv').config();
const mongoose = require('mongoose');

const checkCollections = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Get all collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('\n📚 Found Collections:');
    console.log('-------------------');
    
    for (const collection of collections) {
      console.log(`\nCollection: ${collection.name}`);
      
      // Get sample document to understand structure
      const sampleDoc = await conn.connection.db
        .collection(collection.name)
        .findOne();
      
      if (sampleDoc) {
        console.log('Structure:');
        console.log(JSON.stringify(sampleDoc, null, 2));
        
        // Get count of documents
        const count = await conn.connection.db
          .collection(collection.name)
          .countDocuments();
        console.log(`Total documents: ${count}`);
      } else {
        console.log('Collection is empty');
      }
      console.log('-------------------');
    }
    
    // Close the connection
    await mongoose.connection.close();
    console.log('\n✅ Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkCollections(); 