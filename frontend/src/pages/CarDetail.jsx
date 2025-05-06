import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import axiosInstance from '../services/AxiosInterceptor';
import { Calendar, MapPin, Users, Fuel, Gauge, CreditCard, Star, Briefcase } from 'lucide-react';

const CarDetail = () => {
  // Get carId from URL params or from location state
  const { id } = useParams();
  const location = useLocation();
  const stateCarId = location.state?.carId;
  const carId = id || stateCarId;
  //
  
  console.log('Car ID:', carId); // Debugging line to check the carId
  
  console.log("----------------------------------------")
   //display car details here everything on console
    console.log("Car Details:")
    console.log("Car ID:", carId);
  console.log("----------------------------------------")

  const navigate = useNavigate();
  
  // Local state for data and UI components
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [selectedDays, setSelectedDays] = useState(3);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!carId) {
      setError('Car ID not found. Please go back to the listings page.');
      setLoading(false);
      return;
    }

    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        // Make sure the API endpoint matches your backend route
        const response = await axiosInstance.get(`/listing/cars/${carId}`);
        console.log('Car data received:', response.data); // Debug the response
        setCar(response.data);
        
        // Set main image if available
        if (response.data.images && response.data.images.length > 0) {
          setMainImage(response.data.images[0]);
        } else if (response.data.image) {
          setMainImage(response.data.image);
        }
        
        // Calculate initial price
        calculatePrice(response.data.pricePerDay || response.data.price, 3);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Failed to load car details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const calculatePrice = (basePrice, days) => {
    if (!basePrice) return { subtotal: 0, discount: 0, serviceFee: 0 };
    
    const subtotal = basePrice * days;
    const discount = car?.discount ? subtotal * (car.discount / 100) : 0;
    const serviceFee = Math.round(subtotal * 0.08); // 8% service fee
    setTotalPrice(subtotal - discount + serviceFee);
    return { subtotal, discount, serviceFee };
  };

  const handleDateChange = (type, e) => {
    const date = e.target.value;
    
    if (type === 'pickup') {
      setPickupDate(date);
    } else {
      setReturnDate(date);
    }
    
    // Calculate days between dates if both are selected
    if ((type === 'pickup' && returnDate) || (type === 'return' && pickupDate)) {
      const start = new Date(type === 'pickup' ? date : pickupDate);
      const end = new Date(type === 'return' ? date : returnDate);
      
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        setSelectedDays(diffDays);
        calculatePrice(car?.pricePerDay || car?.price, diffDays);
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
        totalPrice, 
        pickupDate, 
        returnDate,
        carDetails: car
      } 
    });
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

  // Calculate pricing
  const basePrice = car.rentalPricePerDay || car.price || 0;
  const subtotal = basePrice * selectedDays;
  const discountAmount = car.discount ? subtotal * (car.discount / 100) : 0;
  const serviceFee = Math.round(subtotal * 0.08);
  const total = subtotal - discountAmount + serviceFee;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Images and Details */}
          <div className="lg:col-span-2">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link to="/">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/listings">Cars</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{car.car.make} {car.car.model || ''}</span>
            </div>
            
            {/* Car Title */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{car.car.name || `${car.car.make} ${car.car.model || ''}`}</h1>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-500">{car.location || 'Location not specified'}</span>
                </div>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                <div className="text-2xl font-bold">
                  <span className="text-blue-500">${basePrice}</span>
                  <span className="text-gray-500 text-sm">/day</span>
                </div>
                {car.discount > 0 && (
                  <div className="text-sm text-green-600">
                    {car.discount}% discount
                  </div>
                )}
              </div>
            </div>
            

               {/* Car Images */}
                <div className="mb-8">
                {/* Main Image */}
                <div className="rounded-lg overflow-hidden mb-4 border border-gray-300">
                    <img
                    src={
                        mainImage ||
                        (car.images && car.images.length > 0 && car.images[0])
                        }     //|| 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' }
                    
                        alt={`${car.car?.make || ''} ${car.car?.model || ''}`}
                    className="w-full h-64 md:h-96 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                      //  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
                    }}
                    />
                </div>

                {/* Thumbnail Images */}
                {car.images && car.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {car.images.map((img, index) => (
                        <div
                        key={index}
                        className={`rounded-lg overflow-hidden cursor-pointer border-2 ${
                            img === mainImage ? 'border-blue-500' : 'border-transparent'
                        }`}
                        onClick={() => setMainImage(img)}
                        >
                        <img
                            src={img}
                            alt={`Image ${index + 1}`}
                            className="w-full h-20 object-cover"
                            onError={(e) => {
                            e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
                    }}
                    />
                    </div>
                ))}
                </div>
            )}
            </div>

        
        {/* Car Details */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">About this car</h2>
          <p className="text-gray-700 mb-6">{car.description || `This ${car.car.year} ${car.car.make} ${car.car.model} is available for rent in ${car.location}. With its ${car.car.color} finish and reliable performance, this vehicle offers a comfortable driving experience. Available from ${new Date(car.availableFrom).toLocaleDateString()} to ${new Date(car.availableTo).toLocaleDateString()}.`}</p>
          
          <h3 className="text-lg font-bold mb-3">Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Year</div>
                <div className="font-medium">{car.car?.year}</div>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{car.location}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Gauge className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Color</div>
                <div className="font-medium">{car.car?.color}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Registration</div>
                <div className="font-medium">{car.car?.registrationNumber}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Available From</div>
                <div className="font-medium">{new Date(car.availableFrom).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Available To</div>
                <div className="font-medium">{new Date(car.availableTo).toLocaleDateString()}</div>
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
          
          {car.reviews && car.reviews.length > 0 && (
            <>
              <h3 className="text-lg font-bold mb-3">Reviews</h3>
              <div className="space-y-4">
                {car.reviews.map((review, idx) => (
                  <div key={idx} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="font-medium mr-2">{review.userName || 'User'}</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Book this car</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date</label>
                  <input 
                    type="date"
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleDateChange('pickup', e)}
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <input 
                    type="date"
                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleDateChange('return', e)}
                    value={returnDate}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="border-t border-b py-4 mb-4">
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>${basePrice} x {selectedDays} days</span>
                  <span>${subtotal}</span>
                </div>
                {car.discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount ({car.discount}%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-lg mb-6 text-gray-900">
                <span>Total</span>
                <span>${total}</span>
              </div>
              
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleProceed}
                disabled={!pickupDate || !returnDate}
              >
                Reserve Now
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetail;