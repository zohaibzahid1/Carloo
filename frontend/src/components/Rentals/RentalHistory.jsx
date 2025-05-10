import React, { useState, useEffect } from 'react';
import RentalTable from './RentalTable';
import Layout from '../layout/Layout';
import axiosInstance from '../../services/AxiosInterceptor';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSubmitReview = async (rentalId) => {
    try {
      // const success = await submitReview(rentalId); use my own api
      
      if (success) {
        setRentals(prevRentals => 
          prevRentals.map(rental => 
            rental._id === rentalId 
              ? { ...rental, reviewId: 'temp-review-id' } 
              : rental
          )
        );
        alert('Review submitted successfully!');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <Layout>
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          
          <h1 className="text-2xl font-bold text-gray-800">My Rental History</h1>
        </div>
        <p className="text-gray-600">View and manage your car rental history</p>
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
       
        <RentalTable 
          rentals={rentals} 
          onSubmitReview={handleSubmitReview} />
          
      )}
    </div>
    </Layout>
  );
};

export default RentalHistory;