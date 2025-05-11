// define 3 routes 
// calculate daily profit'
// calculate overall profit
// list down all checkouts
import express from 'express'; // Import express for creating routes
import { calculateDailyProfit, calculateOverallProfit, listAllCheckouts } from '../controllers/AdminController.js'; // Import controller functions

const adminRouter = express.Router(); // Create a new router instance
// Use JSON middleware for parsing request bodies
adminRouter.get('/dailyprofit', calculateDailyProfit); // Route to calculate daily profit
adminRouter.get('/overallprofit', calculateOverallProfit); // Route to calculate overall profit
adminRouter.get('/checkouts', listAllCheckouts); // Route to list all checkouts

export default adminRouter; // Export the router to be used in the server.js file