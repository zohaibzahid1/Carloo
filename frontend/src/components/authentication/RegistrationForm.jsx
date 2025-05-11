import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import FormInput from './FormInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../store/slices/authSlice';

const RegistrationForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    creditcard: '',
    phone: '',
    address: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home page or dashboard
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach(err => toast.error(err.msg));
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
    return () => {
      dispatch(clearErrors());
    };
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    const creditCardRegex = /^\d{16}$/;
    if (!formData.creditcard) {
      newErrors.creditcard = 'Credit card number is required';
    } else if (!creditCardRegex.test(formData.creditcard)) {
      newErrors.creditcard = 'Please enter a valid 16-digit credit card number';
    }
    const phoneRegex = /^\d{11}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 11-digit phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Please enter a complete address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
       (dispatch(registerUser(formData)))
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-12 bg-white overflow-y-auto max-md:p-6 w-full max-w-lg shadow-lg rounded-lg relative z-10 mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight max-md:text-2xl text-center">Create an account</h2>
        <p className="text-base text-gray-600 text-center">Fill in your details to get started</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <FormInput label="Username" type="text" name="username" value={formData.username} onChange={handleChange} error={errors.username} placeholder="johndoe" className="w-full" />
        <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" className="w-full" />
        <FormInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" className="w-full" />
        <FormInput label="Credit Card" type="text" name="creditcard" value={formData.creditcard} onChange={handleChange} error={errors.creditcard} placeholder="XXXX XXXX XXXX XXXX" className="w-full" />
        <FormInput label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="0300-1234567" className="w-full" />
        <FormInput label="Address" type="text" name="address" value={formData.address} onChange={handleChange} error={errors.address} placeholder="123 Main St, City, State, Zip" className="w-full" />
        <button type="submit" disabled={loading} className={`mt-4 h-12 bg-blue-500 text-white border-none rounded-lg font-semibold text-base cursor-pointer transition-all relative overflow-hidden hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/15 active:translate-y-0.5 ${loading ? 'text-transparent' : ''} w-full`}>
          {loading ? (
            <span className="relative">
              Creating account...
              <span className="absolute w-6 h-6 top-1/2 left-1/2 -ml-3 -mt-3 border-[3px] border-white/30 rounded-full border-t-white animate-spin"></span>
            </span>
          ) : (
            'Create account'
          )}
        </button>
        <div className="mt-6 text-center text-gray-600 text-sm w-full">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-primary font-semibold no-underline hover:underline cursor-pointer">
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;