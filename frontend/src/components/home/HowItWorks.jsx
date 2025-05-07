import React from 'react';
import { Search, Car, CreditCard } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search',
      description: 'Browse through our wide selection of cars and find the perfect match for your needs.'
    },
    {
      icon: Car,
      title: 'Book',
      description: 'Select your preferred dates and book your chosen vehicle with just a few clicks.'
    },
    {
      icon: CreditCard,
      title: 'Pay',
      description: 'Complete your booking with our secure payment system and get ready for your journey.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600">Rent a car in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <step.icon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 