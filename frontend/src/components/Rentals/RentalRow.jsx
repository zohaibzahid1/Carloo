import React from 'react';
import ReviewButton from './ReviewButton';
import { formatDate } from './formatDate';

const RentalRow = ({ rental, onSubmitReview }) => {
  const { listingId, fromDate, toDate, reviewId } = rental;
  const { car, rentalPricePerDay, location, images } = listingId;

  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <td className="py-4 px-6" data-label="Car">
        <div className="flex items-center space-x-4">
          <img 
            src={imageUrl} 
            alt={`${car.make} ${car.model}`} 
            className="w-20 h-[50px] object-cover rounded shadow"
          />
          <div>
            <p className="font-semibold text-gray-900">{car.make} {car.model} ({car.year})</p>
            <p className="text-sm text-gray-500">Reg: {car.registrationNumber}</p>
            <p className="text-xs text-gray-400">{car.color}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6" data-label="Period">
        <div className="flex flex-col">
          <span className="text-sm text-gray-700">From: {formatDate(fromDate)}</span>
          <span className="text-sm text-gray-700">To: {formatDate(toDate)}</span>
        </div>
      </td>
      <td className="py-4 px-6" data-label="Price">
        <span className="font-semibold text-gray-900">
          ₹{rentalPricePerDay}/day
        </span>
      </td>
      <td className="py-4 px-6" data-label="Location">
        <span className="text-gray-700">{location}</span>
      </td>
      <td className="py-4 px-6 text-center" data-label="Action">
        <ReviewButton 
          rentalId={rental._id}
          hasReview={!!reviewId}
          onSubmitReview={onSubmitReview}
        />
      </td>
    </tr>
  );
};

export default RentalRow;