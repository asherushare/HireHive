import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    mongoose.connection.on('connected', () => console.log('✅ MongoDB Connected'));
    mongoose.connection.on('error', (err) => console.error('❌ MongoDB connection error:', err));
    mongoose.connection.on('disconnected', () => console.log('⚠️  MongoDB disconnected'));

    // Use HireHive as database name (consistent with earlier code)
    await mongoose.connect(`${process.env.MONGODB_URI}/HireHive`);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    throw error; // Re-throw so calling code can handle it
  }
}

export default connectDB;