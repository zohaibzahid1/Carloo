import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from './button';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to listings page with search parameters
    navigate('/listings', {
      state: {
        searchParams: searchData
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="location"
            value={searchData.location}
            onChange={handleChange}
            placeholder="Pick-up Location"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-carloo-500"
            required
          />
        </div>

        {/* Pickup Date Input */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            name="pickupDate"
            value={searchData.pickupDate}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-carloo-500"
            required
          />
        </div>

        {/* Return Date Input */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="date"
            name="returnDate"
            value={searchData.returnDate}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-carloo-500"
            required
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="w-full bg-carloo-500 hover:bg-carloo-600 text-white flex items-center justify-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Search Cars
        </Button>
      </div>
    </form>
  );
};

export default SearchBar; 