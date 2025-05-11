import express from 'express';
import { addReview, getAllReviews , getCarReviews,deleteReview} from '../controllers/ReviewsController.js';
import protectRoutes from '../middleware/authorisedOrNotMiddleware.js';
import { reviewsValidator } from '../middleware/ReviewsValidator.js';
const reviewsRouter = express.Router();


reviewsRouter.post('/add', protectRoutes,reviewsValidator,addReview);
reviewsRouter.get('/all', getAllReviews);
// get All the reviews of a car
reviewsRouter.get('/car/:id', getCarReviews);
// delete a review
 reviewsRouter.delete('/:id', deleteReview); // Uncomment if you have a delete function

export default reviewsRouter;