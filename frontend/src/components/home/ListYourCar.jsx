import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ArrowRight } from 'lucide-react';

const ListYourCar = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">List Your Car</h2>
                <p className="text-gray-600 mb-6">
                  Turn your car into a source of income. List your vehicle on our platform and start earning today.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Car className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-gray-600">Flexible rental periods</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Car className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-gray-600">Competitive pricing</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Car className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-gray-600">Secure payments</p>
                  </li>
                </ul>
                <Link
                  to="/listing/addlisting"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                 List Your Car
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1617469767053-3c4f2a7c84e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="List your car"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListYourCar; 