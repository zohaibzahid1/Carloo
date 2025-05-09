import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: [1, 'Minimum rating is 1'],
    max: [5, 'Maximum rating is 5']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  review: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true
  },
  rentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MyRent',
    required: true
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
