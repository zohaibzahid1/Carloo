import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CreditCard, Calendar, MapPin, Car, AlertCircle } from 'lucide-react';
import axiosInstance from '../services/AxiosInterceptor';
import { toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carId, selectedDays, totalPrice, pickupDate, returnDate, carDetails } = location.state || {};

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!carId || !carDetails) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Checkout Session</h2>
            <p className="text-gray-600 mb-4">Please select a car and dates before proceeding to checkout.</p>
            <button
              onClick={() => navigate('/listings')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Cars
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const validateCardNumber = (number) => {
    // Remove spaces and check if it's 16 digits
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.length !== 16) {
      return 'Card number must be 16 digits';
    }
    // Check if all characters are numbers
    if (!/^\d+$/.test(cleanNumber)) {
      return 'Card number must contain only digits';
    }
    return '';
  };

  const validateExpiryDate = (date) => {
    if (!date) return 'Expiry date is required';
    
    // Check format MM/YY
    if (!/^\d{2}\/\d{2}$/.test(date)) {
      return 'Invalid format. Use MM/YY';
    }

    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

    // Check if month is valid (1-12)
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      return 'Invalid month';
    }

    // Check if card is expired
    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return 'Card has expired';
    }

    return '';
  };

  const validateCVV = (cvv) => {
    if (!cvv) return 'CVV is required';
    if (!/^\d{3,4}$/.test(cvv)) {
      return 'CVV must be 3 or 4 digits';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return 'Phone number is required';
    // Allow formats: +92 300 1234567, 0300 1234567, 300-1234567
    const phoneRegex = /^(\+92|0)?[\s-]?[3-9]\d{2}[\s-]?\d{7}$/;
    if (!phoneRegex.test(phone)) {
      return 'Please enter a valid Pakistani phone number';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate each field
    newErrors.cardNumber = validateCardNumber(formData.cardNumber);
    newErrors.cardName = formData.cardName.trim() ? '' : 'Please enter the cardholder name';
    newErrors.expiryDate = validateExpiryDate(formData.expiryDate);
    newErrors.cvv = validateCVV(formData.cvv);
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format and validate card number
    if (name === 'cardNumber') {
      // Remove any non-digit characters
      formattedValue = value.replace(/\D/g, '');
      // Add space after every 4 digits
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
      // Limit to 16 digits + 3 spaces
      formattedValue = formattedValue.substring(0, 19);
      
      // Validate in real-time
      const error = validateCardNumber(formattedValue);
      setErrors(prev => ({
        ...prev,
        cardNumber: error
      }));
    }

    // Format and validate expiry date
    if (name === 'expiryDate') {
      // Remove any non-digit characters
      formattedValue = value.replace(/\D/g, '');
      // Add slash after 2 digits
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      
      // Validate in real-time
      const error = validateExpiryDate(formattedValue);
      setErrors(prev => ({
        ...prev,
        expiryDate: error
      }));
    }

    // Format and validate CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
      
      // Validate in real-time
      const error = validateCVV(formattedValue);
      setErrors(prev => ({
        ...prev,
        cvv: error
      }));
    }

    // Validate email in real-time
    if (name === 'email') {
      const error = validateEmail(value);
      setErrors(prev => ({
        ...prev,
        email: error
      }));
    }

    // Validate phone in real-time
    if (name === 'phone') {
      const error = validatePhone(value);
      setErrors(prev => ({
        ...prev,
        phone: error
      }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Make API call to store checkout data
      const response = await axiosInstance.post('/checkout', {
        listingId: carId,
        startDate: pickupDate,
        endDate: returnDate
      });

      if (response.status === 201) {
        // Navigate to success page with order details
        navigate('/checkout/result', {
          state: {
            carId,
            carDetails,
            selectedDays,
            totalPrice: response.data.checkout.totalPrice,
            pickupDate,
            returnDate,
            orderNumber: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
          }
        });
      } else {
        throw new Error('Checkout failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error(error.response?.data?.error || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate price breakdown
  const basePrice = carDetails.rentalPricePerDay || carDetails.price || 0;
  const subtotal = basePrice * selectedDays;
  const discountAmount = carDetails.discount ? subtotal * (carDetails.discount / 100) : 0;
  const serviceFee = Math.round(subtotal * 0.08);
  const finalTotal = subtotal - discountAmount + serviceFee;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Payment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.cardName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardName && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.cardName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      maxLength="4"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@example.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+92 300 1234567"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {loading ? 'Processing...' : 'Confirm Payment'}
              </button>
            </form>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Price Breakdown</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Base Price</span>
                <span className="text-sm font-medium text-gray-700">${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Discount</span>
                <span className="text-sm font-medium text-gray-700">${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Service Fee</span>
                <span className="text-sm font-medium text-gray-700">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Total</span>
                <span className="text-sm font-medium text-gray-700">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;