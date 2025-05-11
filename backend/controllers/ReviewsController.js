import Review from '../models/Reviews.js';
import MyRents from '../models/MyRents.js';
import { updateRentReviewId } from './MyRentsController.js';

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { rating, title, review, username, rentId } = req.body;
    // make sure the user is
    const newReview = await Review.create({
      rating,
      title,
      review,
      username,
      rentId,
    });
    
    // update the reviewId in the MyRents model
    
    if (newReview) {
      const update = await updateRentReviewId(rentId, newReview._id);
      if (!update) {
        throw new Error('Failed to update rent with review ID');
      }
    }
    res.status(201).json({ message: 'Review added successfully and reviewId updated', reviewId: newReview._id, review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review', error: err.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
  }
};

// Get all reviews of a car

export const getCarReviews = async (req, res) => {
  try {
    const carId = req.params.id;
    const rents = await MyRents.find({ listingId: carId }).populate('reviewId');
    if (!rents || rents.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this car' });
    }
    const reviews = rents
      .filter(rent => rent.reviewId)
      .map(rent => ({
        reviewId: rent.reviewId._id,
        rating: rent.reviewId.rating,
        title: rent.reviewId.title,
        content: rent.reviewId.review,
      }));
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch car reviews', error: err.message });
  }
}
// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
};