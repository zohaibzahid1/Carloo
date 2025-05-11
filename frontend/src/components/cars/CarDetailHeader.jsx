import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const CarDetailHeader = ({ car, basePrice, discount, location }) => {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/listings" className="hover:text-blue-600">Cars</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{car.make} {car.model || ''}</span>
      </div>
      
      {/* Car Title */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{car.name || `${car.make} ${car.model || ''}`}</h1>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-500">{location || 'Location not specified'}</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0 md:text-right">
          <div className="text-2xl font-bold">
            <span className="text-blue-500">${basePrice}</span>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
          {discount > 0 && (
            <div className="text-sm text-green-600">
              {discount}% discount
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarDetailHeader; 