import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedCars from '../components/home/FeaturedCars';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import ListYourCar from '../components/home/ListYourCar';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCars />
      <HowItWorks />
      <ListYourCar />
      <Testimonials />
    </Layout>
  );
};

export default Index; 