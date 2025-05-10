import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from '../backend/routes/AuthenticationRoute.js'
import carRouter from './routes/listingCarsRoute.js';
import blogRouter from './routes/blogRoutes.js';
import profileUpdateRouter from './routes/profileUpdateRoute.js';
import checkoutRouter from './routes/checkoutRoute.js'; 
import MyrentRouter from './routes/MyRentsRoute.js'; // Import the MyRentsRoute
import performStartupTasks from './startupTasks.js'; // Import the startup tasks
import reviewsRouter from './routes/ReviewsRoute.js';

dotenv.config(); // Load environment variables from .env file e.g port,db url, etc.

// initialize express app
const app = express();

// Connect to MongoDB
connectDB().then(async () => {
    // Run startup tasks after DB connection is established
     await performStartupTasks();
  });


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Routes

app.use('/authentication',authRouter); // e.g end url /authentication/register, /authentication/login

// this is a protected route, so only authenticated users can access it
// trackback the function calls to understand how this is a protectd route
app.use('/listing',carRouter); // e.g end url /listmycars/add 

app.use('/blogs', blogRouter); // e.g end url /blogs/add /blogs/getallblogs

app.use('/updateprofile', profileUpdateRouter); // e.g end url /updateprofile

app.use('/checkout', checkoutRouter); // e.g end url /checkout

app.use('/rents', MyrentRouter); // e.g end url /myrents

app.use('/reviews', reviewsRouter); // e.g end url /reviews



const PORT = process.env.PORT || 5000; // Set the port to the value in the .env file or default to 5000


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
