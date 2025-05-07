import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CarCard from '../components/cars/CarCard';
import FilterSidebar from '../components/cars/FilterSidebar';
import { Button } from '../components/ui/button';
import { Grid, List, SlidersHorizontal, Calendar, MapPin, Users, Star } from 'lucide-react';
import axiosInstance from '../services/AxiosInterceptor';
import { toast } from 'react-toastify';

const Listing = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    carTypes: [],
    features: []
  });

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/listing/cars', {
        params: {
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          carTypes: filters.carTypes.join(','),
          features: filters.features.join(',')
        }
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to fetch cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 500,
      carTypes: [],
      features: []
    });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-carloo-500 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-heading font-bold text-white">Available Cars</h1>
          <p className="text-white mt-2">Browse our selection of quality rental vehicles</p>
        </div>
      </div>
      
      <div className="container-custom py-8 bg-carloo-400 relative">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center border-white text-white hover:bg-carloo-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar - hidden on mobile unless toggled */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-1/4 relative z-20`}>
            <FilterSidebar onFilterChange={handleFilterChange} onReset={handleResetFilters} />
          </div>
          
          {/* Main content */}
          <div className="flex-1 relative z-10">
            {/* Top controls */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-white">Showing {cars.length} cars</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white mr-2">View:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={viewMode === 'grid' ? 'bg-carloo-500 text-white' : 'text-white hover:bg-carloo-500'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={viewMode === 'list' ? 'bg-carloo-500 text-white' : 'text-white hover:bg-carloo-500'}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Loading state */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                {/* Car listings */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                      <div key={car._id} className="relative z-10">
                        <CarCard 
                          id={car._id}
                          title={`${car.car.make} ${car.car.model}`}
                          image={car.images[0]}
                          price={car.rentalPricePerDay}
                          location={car.location}
                          year={car.car.year}
                          seats={car.seats || 5}
                          rating={car.rating || 4.5}
                          reviewCount={car.reviewCount || 0}
                          featured={car.featured}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cars.map((car) => (
                      <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-carloo-300 relative z-10">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img 
                              src={car.images[0]} 
                              alt={`${car.car.make} ${car.car.model}`} 
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-4 flex flex-col">
                            <div className="flex justify-between items-start">
                              <h3 className="font-heading font-semibold text-lg text-black">{`${car.car.make} ${car.car.model}`}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="text-sm text-black">{car.rating || 4.5} ({car.reviewCount || 0})</span>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-center text-black text-sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{car.location}</span>
                            </div>
                            
                            <div className="mt-4 flex items-center space-x-4">
                              <div className="flex items-center text-black text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{car.car.year}</span>
                              </div>
                              <div className="flex items-center text-black text-sm">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{car.seats || 5} seats</span>
                              </div>
                            </div>
                            
                            <div className="mt-auto pt-4 flex items-center justify-between">
                              <div className="font-heading">
                                <span className="text-lg font-semibold text-black">${car.rentalPricePerDay}</span>
                                <span className="text-black text-sm">/day</span>
                              </div>
                              <Button asChild size="sm" className="bg-carloo-500 hover:bg-carloo-600 text-white">
                                <Link to="/listing/detailview" state={{ carId: car._id || car.id }}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listing; 