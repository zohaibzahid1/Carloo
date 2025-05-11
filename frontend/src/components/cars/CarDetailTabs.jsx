import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axiosInstance from '../../services/AxiosInterceptor';
import CarSpecifications from './CarSpecifications';

const CarDetailTabs = ({ car, description, location, availableFrom, availableTo }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'reviews') {
      fetchReviews();
    }
  }, [activeTab, car._id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Car object:', car); // Log the entire car object
      console.log('Fetching reviews for car ID:', car._id); // Log the car ID
      const response = await axiosInstance.get(`/reviews/car/${car._id}`);
      console.log('Reviews response:', response.data); // Log the response data
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        carId: car._id,
        carObject: car // Log the car object in case of error
      });
      
      if (error.response?.status === 404) {
        console.log('No reviews found, setting empty array');
        setReviews([]);
        setError(null);
      } else {
        setError(error.response?.data?.message || 'Failed to load reviews. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reviews'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reviews {reviews.length > 0 && `(${reviews.length})`}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'details' ? (
          <CarSpecifications
            car={car}
            description={description}
            location={location}
            availableFrom={availableFrom}
            availableTo={availableTo}
          />
        ) : (
          <div>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchReviews}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Try Again
                </button>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Reviews Yet</h3>
                <p className="text-gray-600">Be the first to review this car</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{review.title || 'Review'}</h3>
                        <div className="mt-1">
                          <span className="text-sm text-gray-600">
                            By {review.username || review.userName || 'Anonymous User'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                          <svg
                            className="w-4 h-4 text-yellow-400 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-blue-900">
                            {review.rating || 0}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {review.review || review.content || review.comment || 'No review text provided'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailTabs; 