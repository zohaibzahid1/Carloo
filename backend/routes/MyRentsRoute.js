import express from 'express';
const MyrentRouter = express.Router();

import protectRoutes from '../middleware/authorisedOrNotMiddleware.js';
import  {getAllRents,getRentsByUserId}  from '../controllers/MyRentsController.js';

// get all rents
MyrentRouter.get('/all',protectRoutes,getAllRents);


// get all rents by user id
MyrentRouter.get('/myrents', protectRoutes ,getRentsByUserId);

// we will not register a rent via an api call it will automatically register when a user successfully checks out

export default MyrentRouter;