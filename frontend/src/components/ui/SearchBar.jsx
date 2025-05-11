import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from './button';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: ''
  });

  // Initialize search data from URL parameters if they exist
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationParam = params.get('location');
    if (locationParam) {
      setSearchData(prev => ({
        ...prev,
        location: locationParam
      }));
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Build query string from search data
    const params = new URLSearchParams();
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.pickupDate) params.append('fromDate', searchData.pickupDate);
    if (searchData.returnDate) params.append('toDate', searchData.returnDate);
    
    // Navigate to listings page with search parameters
    navigate(`/listings?${params.toString()}`);
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            placeholder="Available From"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            placeholder="Available To"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
        >
          <Search className="h-5 w-5 mr-2" />
          Search Cars
        </Button>
      </div>
    </form>
  );
};

export default SearchBar; 