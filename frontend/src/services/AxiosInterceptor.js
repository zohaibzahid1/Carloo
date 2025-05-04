import axios from 'axios';

// Create instance
const axiosInstance = axios.create({
  baseURL: 'localhost:5000', 
  headers: {
    'Content-Type': 'application/json'
  }
});
// Add request interceptor to include token in headers which will be used 
// for authentication in protected routes at backend using authOrNormiddleware.js
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
