import React from 'react';
import { Calendar, MapPin, Gauge, Briefcase } from 'lucide-react';

const CarSpecifications = ({ car, description, location, availableFrom, availableTo }) => {
  // Extract car details from the nested car.car object
  const carDetails = car.car || car;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">About this car</h2>
      <p className="text-gray-700 mb-6">
        {description || `This ${carDetails.year} ${carDetails.make} ${carDetails.model} is available for rent in ${location}. With its ${carDetails.color} finish and reliable performance, this vehicle offers a comfortable driving experience.`}
      </p>
      
      <h3 className="text-lg font-bold mb-3">Specifications</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Year</div>
            <div className="font-medium">{carDetails.year}</div>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Location</div>
            <div className="font-medium">{location}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Gauge className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Color</div>
            <div className="font-medium">{carDetails.color}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Registration</div>
            <div className="font-medium">{carDetails.registrationNumber}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Available From</div>
            <div className="font-medium">{new Date(availableFrom).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Available To</div>
            <div className="font-medium">{new Date(availableTo).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
      
      {car.features && car.features.length > 0 && (
        <>
          <h3 className="text-lg font-bold mb-3">Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {car.features.map((feature, idx) => (
              <div key={idx} className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CarSpecifications; 