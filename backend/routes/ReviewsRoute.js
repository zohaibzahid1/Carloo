import express from 'express';
import { addReview, getAllReviews } from '../controllers/ReviewsController.js';
import protectRoutes from '../middleware/authorisedOrNotMiddleware.js';
import { reviewsValidator } from '../middleware/ReviewsValidator.js';
const reviewsRouter = express.Router();


reviewsRouter.post('/add', protectRoutes,reviewsValidator,addReview);
reviewsRouter.get('/all', getAllReviews);

export default reviewsRouter;