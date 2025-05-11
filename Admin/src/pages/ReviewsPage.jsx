import React, { useState, useEffect } from 'react';
import { Trash2, Star } from 'lucide-react';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/reviews/all');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      // Map API data to expected structure if needed
      const reviewsFromApi = data.map(review => ({
        id: review._id,
        rating: review.rating,
        title: review.title,
        review: review.review,
        username: review.username,
      }));
      setReviews(reviewsFromApi);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      // In a real app, you would call your API to delete the review
       await fetch(`http://localhost:5000/reviews/${id}`, { method: 'DELETE' });

      // For now, just update the UI
      setReviews(reviews.filter(review => review.id !== id));
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading && !reviews.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Customer Reviews</h2>
        <div className="text-sm text-gray-500">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} total
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm p-5 transition-all duration-200 hover:shadow-md">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(review.rating)}
                </div>
                <h3 className="font-medium text-gray-900">{review.title}</h3>
                <p className="text-gray-600 mt-1">{review.review}</p>
                <p className="text-sm text-gray-500 mt-2">By {review.username}</p>
              </div>
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Delete review"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        
        {reviews.length === 0 && !loading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No reviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;