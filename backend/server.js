import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from '../backend/routes/AuthenticationRoute.js'


dotenv.config(); // Load environment variables from .env file e.g port,db url, etc.

// initialize express app
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Routes

app.use('/authentication',router); // e.g end url /authentication/register, /authentication/login


const PORT = process.env.PORT || 5000; // Set the port to the value in the .env file or default to 5000


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
