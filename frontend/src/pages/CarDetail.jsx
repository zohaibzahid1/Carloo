import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import axiosInstance from '../services/AxiosInterceptor';
import CarImageGallery from '../components/cars/CarImageGallery';
import CarSpecifications from '../components/cars/CarSpecifications';
import CarReviews from '../components/cars/CarReviews';
import BookingSidebar from '../components/cars/BookingSidebar';
import CarDetailHeader from '../components/cars/CarDetailHeader';
import CarDetailTabs from '../components/cars/CarDetailTabs';

const CarDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const stateCarId = location.state?.carId;
  const carId = id || stateCarId;
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [selectedDays, setSelectedDays] = useState(3);

  useEffect(() => {
    if (!carId) {
      setError('Car ID not found. Please go back to the listings page.');
      setLoading(false);
      return;
    }

    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/listing/cars/${carId}`);
        setCar(response.data);
        
        if (response.data.images && response.data.images.length > 0) {
          setMainImage(response.data.images[0]);
        } else if (response.data.image) {
          setMainImage(response.data.image);
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Failed to load car details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleDateChange = (type, e) => {
    const date = e.target.value;
    
    if (type === 'pickup') {
      setPickupDate(date);
    } else {
      setReturnDate(date);
    }
    
    if ((type === 'pickup' && returnDate) || (type === 'return' && pickupDate)) {
      const start = new Date(type === 'pickup' ? date : pickupDate);
      const end = new Date(type === 'return' ? date : returnDate);
      
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        setSelectedDays(diffDays);
      }
    }
  };

  const handleProceed = () => {
    if (!pickupDate || !returnDate) {
      window.alert('Please select pickup and return dates');
      return;
    }
    navigate(`/checkout`, { 
      state: { 
        carId,
        selectedDays, 
        totalPrice: calculateTotalPrice(), 
        pickupDate, 
        returnDate,
        carDetails: car
      } 
    });
  };

  const calculateTotalPrice = () => {
    if (!car) return 0;
    const basePrice = car.rentalPricePerDay || car.price || 0;
    const subtotal = basePrice * selectedDays;
    const discountAmount = car.discount ? subtotal * (car.discount / 100) : 0;
    const serviceFee = Math.round(subtotal * 0.08);
    return subtotal - discountAmount + serviceFee;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading car details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate('/listings')}
            >
              Back to Listings
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Car Not Found</h2>
            <p className="text-gray-700 mb-4">The car you're looking for doesn't exist or has been removed.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate('/listings')}
            >
              Browse Car Listings
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const basePrice = car.rentalPricePerDay || car.price || 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Images and Details */}
          <div className="lg:col-span-2">
            <CarDetailHeader 
              car={car.car}
              basePrice={basePrice}
              discount={car.discount}
              location={car.location}
            />
            
            <CarImageGallery 
              images={car.images}
              mainImage={mainImage}
              onMainImageChange={setMainImage}
            />

            <CarDetailTabs
              car={car}
              description={car.description}
              location={car.location}
              availableFrom={car.availableFrom}
              availableTo={car.availableTo}
            />
          </div>
          
          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              basePrice={basePrice}
              selectedDays={selectedDays}
              discount={car.discount}
              pickupDate={pickupDate}
              returnDate={returnDate}
              onDateChange={handleDateChange}
              onProceed={handleProceed}
              isDisabled={!pickupDate || !returnDate}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetail;