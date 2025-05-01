import express from 'express';
import  protectRoutes  from '../middleware/authorisedOrNotMiddleware.js' // Import the middleware for authentication
import addCarToListing from '../controllers/listingCarsController.js'        // Import the controller function

const carListingRouter = express.Router();

// add a car to the listing
carListingRouter.post('/add',protectRoutes, addCarToListing); // Use the middleware to protect the route

export default carListingRouter; // Export the router to be used in the server.js file
