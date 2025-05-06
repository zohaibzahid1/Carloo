import mongoose from 'mongoose'; // Import mongoose for MongoDB connection
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB; // Export the connectDB function to be used in server.js
