import React from 'react';
import { Star } from 'lucide-react';

const CarReviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-3">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <div className="font-medium mr-2">{review.userName || 'User'}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarReviews; 