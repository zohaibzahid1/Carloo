import React, { useState, useEffect } from 'react';
import RentalTable from '../components/Rentals/RentalTable';
import Layout from '../components/layout/Layout';
import axiosInstance from '../services/AxiosInterceptor';
import Review from '../components/Reviews/Review.jsx';


const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRentalId, setReviewRentalId] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);


  useEffect(() => {
    const loadRentals = async () => {
  try {
    setLoading(true);
    const response = await axiosInstance.get('/rents/myrents');
    setRentals(response.data); // Correctly set the rentals array
    setError(null);
  } catch (err) {
    setError('Failed to load rental history. Please try again later.');
    console.error('Error fetching rentals:', err);
  } finally {
    setLoading(false);
  }
};
    loadRentals();
  }, []);

  const handleSubmitReview = async (reviewData) => {
    setReviewLoading(true);
    try {
      // Send review to backend
      const res = await axiosInstance.post('/reviews', {
        ...reviewData,
        rentId: reviewRentalId,
      });
      if (res.status === 201) {
        setRentals(prevRentals =>
          prevRentals.map(rental =>
            rental._id === reviewRentalId
              ? { ...rental, reviewId: res.data.reviewId }
              : rental
          )
        );
        handleCloseReview();
      } else {
        alert(res.data.message || 'Failed to submit review');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };
  const handleOpenReview = (rentalId) => {
    setReviewRentalId(rentalId);
    setReviewModalOpen(true);
  };
  const handleCloseReview = () => {
    setReviewModalOpen(false);
    setReviewRentalId(null);
  };


return (
  <Layout>
    <div className="py-4 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Rental History</h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">View and manage your car rental history</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600 text-lg">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <RentalTable 
            rentals={rentals} 
            onSubmitReview={handleOpenReview}
          />
        </div>
      )}
      <Review
        isOpen={reviewModalOpen}
        onClose={handleCloseReview}
        onSubmit={handleSubmitReview}
        loading={reviewLoading}
      />
    </div>
  </Layout>
);

};

export default RentalHistory;