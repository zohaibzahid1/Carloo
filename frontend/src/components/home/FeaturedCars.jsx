import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button.jsx';
import { ArrowRight } from 'lucide-react'
import CarCard from '../cars/CarCard.jsx';
import axiosInstance from '../../services/AxiosInterceptor';

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      setLoading(true);
      // Fetch all cars
      const carsResponse = await axiosInstance.get('/listing/cars');
      if (!carsResponse.data) {
        throw new Error('No cars data received');
      }
      const cars = carsResponse.data;
      console.log('Cars fetched:', cars.length);

      // Since rentals endpoint is protected, we'll show available cars
      const availableCars = cars
        .filter(car => car.availability !== false)
        .sort((a, b) => {
          // Sort by price (lower to higher) as a default sorting
          return a.rentalPricePerDay - b.rentalPricePerDay;
        })
        .slice(0, 4);

      console.log('Showing available cars:', availableCars);
      setFeaturedCars(availableCars);

    } catch (err) {
      console.error('Detailed error in fetchFeaturedCars:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || err.message || 'Failed to load featured cars');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-left">Featured Cars</h2>
              <p className="text-gray-600 mt-2">Loading featured cars...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-left">Featured Cars</h2>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-4xl font-heading font-bold text-black mb-3">Featured Cars</h2>
            <p className="text-gray-600 max-w-2xl">Explore our selection of available cars</p>
          </div>
          <Button variant="ghost" className="text-carloo-500 hover:text-carloo-600 mt-4" asChild>
            <Link to="/listings" className="flex items-center">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <CarCard 
                key={car._id}
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
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No featured cars available at the moment.
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedCars
