import React from 'react';
import { Link } from 'react-router-dom';
import { Car, MapPin, Users, Calendar, Star } from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx'

const CarCard = ({
  id,
  title,
  image,
  price,
  location,
  year,
  seats,
  rating,
  reviewCount,
  featured = false,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg ${
      featured ? 'border-2 border-carloo-500' : ''
    }`}>
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {featured && (
          <Badge className="absolute top-2 left-2 bg-carloo-500">
            Featured
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-heading font-semibold text-lg text-left">{title}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{year}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Users className="h-4 w-4 mr-1" />
              <span>{seats} seats</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="font-heading">
            <span className="text-lg font-semibold">${price}</span>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
          <Button asChild size="sm" className="bg-carloo-500 hover:bg-carloo-600">
            <Link to={`/car/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
