import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../ui/SearchBar.jsx'

const Hero = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityClick = (city) => {
    setSelectedCity(city);
    navigate(`/listings?location=${city}`);
  };

  return (
    <section className="relative h-screen">
      {/* Background Image with Blue Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          Find Your Perfect Ride
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
          Choose from our wide selection of premium cars for your next adventure
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-4xl">
          <SearchBar />
        </div>

        {/* Popular Locations */}
        <div className="mt-8">
          <p className="text-center mb-4">Popular Locations:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className="px-4 py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all text-white border border-white"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 