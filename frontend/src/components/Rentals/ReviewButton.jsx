import React from 'react';

const ReviewButton = ({ rentalId, hasReview, onSubmitReview }) => {
  if (hasReview) {
    return (
      <button 
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded cursor-not-allowed text-sm font-medium opacity-60"
        disabled
      >
        Review Submitted
      </button>
    );
  }

  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
      onClick={() => onSubmitReview(rentalId)}
    >
      Submit Review
    </button>
  );
};

export default ReviewButton;