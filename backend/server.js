import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from '../backend/routes/AuthenticationRoute.js'
import carListingRouter from './routes/listingCarsRoute.js';


dotenv.config(); // Load environment variables from .env file e.g port,db url, etc.

// initialize express app
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Routes

app.use('/authentication',authRouter); // e.g end url /authentication/register, /authentication/login

// this is a protected route, so only authenticated users can access it
// trackback the function calls to understand how this is a protectd route
app.use('/listmycars',carListingRouter); // e.g end url /listmycars/add 


const PORT = process.env.PORT || 5000; // Set the port to the value in the .env file or default to 5000


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
