import React from 'react';
import { Smartphone, Download } from 'lucide-react';

const MobileApp = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Get Our Mobile App</h2>
              <p className="text-blue-100 mb-6">
                Download our mobile app for a better experience. Book cars, manage your rentals, and more on the go.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Smartphone className="w-5 h-5 mr-2" />
                  App Store
                </button>
                <button className="flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Google Play
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1617469767053-3c4f2a7c84e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="Mobile app"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp; 