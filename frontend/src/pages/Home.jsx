import React from 'react';
import FeaturedCars from '../components/Home/FeaturedCars.jsx';
import Layout from '../components/layout/Layout.jsx';
import { useState } from 'react';
import axiosInstance from '../services/AxiosInterceptor.jsx';
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

    return (
        <Layout>
            <button onClick={fetchCars}>Get Cars</button>
            <div>
                {cars.length > 0 ? (
                    cars.map((car, index) => (
                        <div key={index}>
                            <h3>{car.car.make}</h3>
                            <p>{car.car.model}</p>
                        </div>
                    ))
                ) : (
                    <p>No cars to display</p>
                )}
            </div>
        </Layout>
    );
};

export default Home;