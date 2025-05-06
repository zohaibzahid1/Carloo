import React from 'react';
import FeaturedCars from '../components/Home/FeaturedCars.jsx';
import Layout from '../components/layout/Layout.jsx';
import { useState } from 'react';
import axiosInstance from '../services/AxiosInterceptor.jsx';
import { useNavigate } from 'react-router-dom';
// demo use of api call using axiosInstance
const Home = () => {
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
    try {
        const response = await axiosInstance.get('/listing/cars');
        setCars(response.data);
        console.log('Cars fetched successfully:', response.data);
    } catch (error) {
        console.error('Error fetching cars:', error);
    }
    };
    // Add this inside the component
    const navigate = useNavigate();

    return (
        <Layout>
            <button onClick={fetchCars} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Get Cars</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.length > 0 ? (
                    cars.map((car, index) => (
                        <div key={index} className="border rounded-lg shadow-md p-4 bg-white">
                            {car.car.images && car.car.images.length > 0 ? (
                                <img 
                                    src={car.car.images[0]} 
                                    alt={`${car.car.make} ${car.car.model}`}
                                    className="w-full h-48 object-cover mb-3 rounded"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-3 rounded">
                                    <p className="text-gray-500">No image available</p>
                                </div>
                            )}
                            <h3 className="text-xl font-bold">{car.car.make}</h3>
                            <p className="text-gray-600 mb-2">{car.car.model}</p>
                            <button 
                                onClick={() => navigate('/listing/detailview', { state: { carId: car._id || car.id } })}
                                className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                View Detail
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No cars to display</p>
                )}
            </div>
        </Layout>
    );
};

export default Home;