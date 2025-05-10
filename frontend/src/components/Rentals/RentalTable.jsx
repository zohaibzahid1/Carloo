
import React from 'react';
import RentalRow from './RentalRow';

const RentalTable = ({ rentals, onSubmitReview }) => {
  if (rentals.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No rental history found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700 first:rounded-tl-lg">Car</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Period</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Price</th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Location</th>
            <th className="py-4 px-6 text-center text-sm font-medium text-gray-700 last:rounded-tr-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <RentalRow 
              key={rental._id}
              rental={rental}
              onSubmitReview={onSubmitReview}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalTable;