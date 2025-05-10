import React from 'react';
import ReviewButton from './ReviewButton';
import { formatDate } from './formatDate';

const RentalRow = ({ rental, onSubmitReview, isMobile }) => {
  const { listingId, fromDate, toDate, reviewId } = rental;
  const { car, rentalPricePerDay, location, images } = listingId;

  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600';

  if (isMobile) {
    // Mobile Card Layout
    return (
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <img src={imageUrl} alt={`${car.make} ${car.model}`} className="w-20 h-20 object-cover rounded" />
          <div>
            <div className="font-semibold text-gray-900">{car.make} {car.model} ({car.year})</div>
            <div className="text-xs text-gray-500">Reg: {car.registrationNumber}</div>
            <div className="text-xs text-gray-400">{car.color}</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between mt-2 text-sm">
          <div>
            <span className="font-medium text-gray-700">From:</span> {formatDate(fromDate)}
          </div>
          <div>
            <span className="font-medium text-gray-700">To:</span> {formatDate(toDate)}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-gray-900">₹{rentalPricePerDay}/day</span>
          <span className="text-gray-700">{location}</span>
        </div>
        <div className="mt-2">
          <ReviewButton 
            rentalId={rental._id}
            hasReview={!!reviewId}
            onSubmitReview={onSubmitReview}
          />
        </div>
      </div>
    );
  }

  // Desktop Table Row
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <td className="py-4 px-6 sm:px-2 block sm:table-cell" data-label="Car">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <img 
            src={imageUrl} 
            alt={`${car.make} ${car.model}`} 
            className="w-full sm:w-20 h-[100px] object-cover rounded shadow"
          />
          <div>
            <p className="font-semibold text-gray-900">{car.make} {car.model} ({car.year})</p>
            <p className="text-sm text-gray-500">Reg: {car.registrationNumber}</p>
            <p className="text-xs text-gray-400">{car.color}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 sm:px-2 block sm:table-cell" data-label="Period">
        <div className="flex flex-col text-sm text-gray-700">
          <span>From: {formatDate(fromDate)}</span>
          <span>To: {formatDate(toDate)}</span>
        </div>
      </td>
      <td className="py-4 px-6 sm:px-2 block sm:table-cell" data-label="Price">
        <span className="font-semibold text-gray-900 block">₹{rentalPricePerDay}/day</span>
      </td>
      <td className="py-4 px-6 sm:px-2 block sm:table-cell" data-label="Location">
        <span className="text-gray-700 block">{location}</span>
      </td>
      <td className="py-4 px-6 sm:px-2 block sm:table-cell text-center" data-label="Action">
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