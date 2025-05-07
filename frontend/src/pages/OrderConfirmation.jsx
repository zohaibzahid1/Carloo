import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CheckCircle, Download, Home, Car, Calendar, MapPin, DollarSign } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carId, carDetails, selectedDays, totalPrice, pickupDate, returnDate, orderNumber } = location.state || {};

  // Calculate price breakdown
  const basePrice = carDetails?.rentalPricePerDay || carDetails?.price || 0;
  const subtotal = basePrice * selectedDays;
  const serviceFee = Math.round(subtotal * 0.08);
  const finalTotal = subtotal + serviceFee;

  if (!carId || !carDetails) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Order</h2>
            <p className="text-gray-600 mb-4">We couldn't find your order details.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleDownloadReceipt = () => {
    // Here  generate and download a PDF receipt functionality will be implemented
    alert('Downloaded ! If not , then not my problem! hehe');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your car rental has been successfully booked.</p>
            <p className="text-sm text-gray-500 mt-2">Order Number: {orderNumber}</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
            
            {/* Car Details */}
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={carDetails.images?.[0] || carDetails.image}
                alt={carDetails.car.name}
                className="w-32 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium text-gray-800 text-lg">{carDetails.car.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Car className="w-4 h-4 mr-1" />
                  <span>{carDetails.car.make} {carDetails.car.model}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{carDetails.car.location}</span>
                </div>
              </div>
            </div>

            {/* Rental Period */}
            <div className="border-t pt-4 mb-4">
              <h3 className="font-medium text-gray-800 mb-3">Rental Period</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">Pickup Date</span>
                  </div>
                  <p className="font-medium text-gray-800">{new Date(pickupDate).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">Return Date</span>
                  </div>
                  <p className="font-medium text-gray-800">{new Date(returnDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Price Details */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-800 mb-3">Price Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Rental Duration</span>
                  <span>{selectedDays} days</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Price per Day</span>
                  <span>${basePrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee (8%)</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">${finalTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Receipt
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation; 