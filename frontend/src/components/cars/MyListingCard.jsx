import React from 'react';
import { MapPin, Users, Calendar, Star, Clock, Tag, Pencil, Trash2, Car as CarIcon } from 'lucide-react';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/Badge';
import axiosInstance from '../../services/AxiosInterceptor';



const MyListingCard = ({
  id,
  title,
  image,
  rentalPricePerDay,
  location,
  car,
  availableFrom,
  availableTo,
  images = [],
  availability,
  createdAt,
  onUpdate,
  onDelete,
}) => {
  const displayImage = images && images.length > 0 ? images[0] : '/placeholder-car.jpg';

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 w-full">
      {/* Image Section */}
      <div className="relative h-40">
        <img 
          src={displayImage} 
          alt={title || `${car?.make} ${car?.model}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-heading font-bold text-base text-white mb-0.5">{car?.make} {car?.model}</h3>
          <p className="text-white/90 text-xs">{car?.year} • {car?.color}</p>
        </div>
        {!availability && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-xs">
            Currently Rented
          </Badge>
        )}
      </div>
      
      {/* Details Section */}
      <div className="p-4">
        {/* Price and Registration */}
        <div className="flex justify-between items-center mb-3">
          <div className="font-heading">
            <span className="text-xl font-bold text-blue-600">${rentalPricePerDay}</span>
            <span className="text-gray-600 text-xs">/day</span>
          </div>
          <div className="flex items-center space-x-1 bg-blue-50 px-2 py-0.5 rounded-full">
            <CarIcon className="h-3 w-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-900">{car?.registrationNumber}</span>
          </div>
        </div>

        {/* Car Details */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center space-x-1.5">
            <div className="bg-blue-50 p-1.5 rounded-lg">
              <Tag className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Make</p>
              <p className="text-sm font-medium text-gray-900">{car?.make}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="bg-blue-50 p-1.5 rounded-lg">
              <CarIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Model</p>
              <p className="text-sm font-medium text-gray-900">{car?.model}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="bg-blue-50 p-1.5 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Year</p>
              <p className="text-sm font-medium text-gray-900">{car?.year}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="bg-blue-50 p-1.5 rounded-lg">
              <Tag className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Color</p>
              <p className="text-sm font-medium text-gray-900">{car?.color}</p>
            </div>
          </div>
        </div>

        {/* Location and Availability */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center space-x-1.5">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-700">{location}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              Available: {new Date(availableFrom).toLocaleDateString()} - {new Date(availableTo).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5"
            onClick={() => onUpdate(id)}
            disabled={!availability}
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Update
          </Button>
          <Button
            variant="destructive"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-1.5"
            onClick={() => onDelete(id)}
            disabled={!availability}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyListingCard; 