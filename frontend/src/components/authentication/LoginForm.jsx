import React, { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import axiosInstance from '../../services/AxiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formValues.username) {
      newErrors.username = 'username is required';
    } else if (username.length < 3 || username.length > 20) {
      newErrors.username = 'username is invalid';
    }
    
    if (!formValues.password) {
      newErrors.password = 'Password is required';
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
        setIsLoading(true);
      
        axiosInstance.post('/authentication/login', {
          username: formValues.username.trim(),
          password: formValues.password,
        })
        .then(response => {
          // ✅ Success handling
          const token = response.data.token; // adjust based on actual response structure
          sessionStorage.setItem('token', token); // or sessionStorage
          navigate('/'); // Redirect to home page or dashboard
          console.log('Login successful with:', formValues);
          // Optionally redirect user, e.g., navigate('/dashboard')
        })
        .catch(error => {
            if (error.response) {
              const msg = error.response.data.message?.toLowerCase();
          
              if (msg.includes('no user')) {
                toast.error('No user exists with this username.');
              } else if (msg.includes('invalid')) {
                toast.error('Incorrect password.');
              } else {
                toast.error(error.response.data.message || 'Login failed.');
              }
            } else if (error.request) {
              toast.error('No response from server. Please try again.');
            } else {
              toast.error('Something went wrong. Please try again.');
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      
  };

  const handleRegister = () => {
    console.log('Redirecting to registration page');
    navigate('/register'); // Redirect to registration page
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            username 
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              required
              value={formValues.username}
              onChange={handleChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.username ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200`}
              placeholder="user_123"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formValues.password}
              onChange={handleChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10 transition duration-200`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">

        {// rememebr me 
        /* {<div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formValues.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-200"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>} */

        //   <div className="text-sm">
        //     <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-200">
        //       Forgot your password?
        //     </a>
        //   </div>
            }
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          {isLoading ? (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-blue-50 group-hover:text-white" aria-hidden="true" />
            </span>
          )}
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={handleRegister}
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
          >
            Register now
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;