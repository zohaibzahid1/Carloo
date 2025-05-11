import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/AxiosInterceptor';
import Layout from '../components/layout/Layout';
import { toast } from 'react-toastify';

// Dummy user data with specific ID
const dummyUserData = {
  _id: "681fa905303cb2d99e16b418",
  username: 'Danish',
  password: '123456',
  email: 'l227899@lhr.nu.edu.pk',
  creditcard: '5678222211119012',
  phone: '03274330306',
  address: 'Nuces Lahore'
};

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    creditcard: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load dummy data when component mounts
  useEffect(() => {
    // Simulate fetching data
    setFormData({
      username: dummyUserData.username,
      password: dummyUserData.password,
      email: dummyUserData.email,
      creditcard: dummyUserData.creditcard,
      phone: dummyUserData.phone,
      address: dummyUserData.address
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format credit card number as user types
    if (name === 'creditcard') {
      const digitsOnly = value.replace(/\D/g, '');
      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1-');
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Please login to access this page');
        navigate('/login');
        return;
      }

      // Validate all required fields
      if (!formData.username || formData.username.length < 3) {
        setError('Username must be at least 3 characters long');
        toast.error('Username must be at least 3 characters long');
        return;
      }
      if (!formData.email || !formData.email.includes('@')) {
        setError('Please enter a valid email address');
        toast.error('Please enter a valid email address');
        return;
      }
      if (!formData.creditcard || formData.creditcard.replace(/\D/g, '').length !== 16) {
        setError('Credit card must be 16 digits');
        toast.error('Credit card must be 16 digits');
        return;
      }
      if (!formData.phone) {
        setError('Phone number is required');
        toast.error('Phone number is required');
        return;
      }
      if (!formData.address) {
        setError('Address is required');
        toast.error('Address is required');
        return;
      }
      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        toast.error('Password must be at least 6 characters long');
        return;
      }

      // Always send all fields in the required format and order
      const updatedData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        creditcard: formData.creditcard.replace(/\D/g, ''),
        phone: formData.phone,
        address: formData.address
      };

      console.log('Sending update request with data:', updatedData); // Debug log

      // Send update request to backend
      const response = await axiosInstance.put('/updateprofile/', updatedData);
      console.log('Update response:', response.data); // Debug log
      
      if (response.data.success) {
        setSuccess('Profile updated successfully!');
        toast.success('Profile updated successfully!');
        // Update the dummy data with the response from server, in the correct order
        Object.assign(dummyUserData, {
          username: response.data.user.username,
          password: formData.password,
          email: response.data.user.email,
          creditcard: response.data.user.creditcard.replace(/(\d{4})(?=\d)/g, '$1-'),
          phone: response.data.user.phone,
          address: response.data.user.address
        });
        // Update form with the server response data, in the correct order
        setFormData(prev => ({
          username: response.data.user.username || prev.username,
          password: formData.password,
          email: response.data.user.email || prev.email,
          creditcard: response.data.user.creditcard.replace(/(\d{4})(?=\d)/g, '$1-') || prev.creditcard,
          phone: response.data.user.phone || prev.phone,
          address: response.data.user.address || prev.address
        }));
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Full error object:', err); // Log the full error object
      console.error('Error response:', err.response); // Log the error response
      console.error('Error request:', err.request); // Log the request object
      console.error('Error config:', err.config); // Log the request config

      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);

        if (err.response.status === 401) {
          sessionStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else if (err.response.data?.errors) {
          // Handle validation errors from backend
          const errorMessage = err.response.data.errors[0].msg;
          setError(errorMessage);
          toast.error(errorMessage);
        } else {
          const errorMessage = err.response.data?.message || 'Server error occurred';
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        setError('No response from server. Please check your connection.');
        toast.error('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', err.message);
        setError(err.message || 'Failed to update profile');
        toast.error(err.message || 'Failed to update profile');
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-blue-100">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Update Profile</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="creditcard">
                Credit Card
              </label>
              <input
                type="text"
                id="creditcard"
                name="creditcard"
                value={formData.creditcard}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-blue-900 text-sm font-semibold mb-2" htmlFor="password">
                New Password (leave blank to keep current password)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfile; 