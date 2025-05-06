import React from 'react';
import { ShieldCheck, Users, Clock } from 'lucide-react';

const LoginVisual = () => {
  return (
    <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-600 to-blue-800 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500 opacity-20"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-blue-400 opacity-20"></div>
      <div className="absolute -bottom-20 left-1/4 w-60 h-60 rounded-full bg-blue-300 opacity-20"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-8">
          <div className="text-white mr-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Carloo</h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Welcome to Carloo</h2>
        <p className="text-blue-100 mb-8 max-w-md text-center mx-auto">
            Join our community today and experience the future of car rentals. 
            Safe, convenient, and affordable options await you.
        </p>
      </div>
      
      <div className="relative z-10 space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">Why choose us?</h3>
        
        <div className="flex items-start ">
          <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium text-left ">Secure & Trusted</h4>
            <p className="text-blue-100 text-sm">Verified users and secure payment system</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium text-left">Community Driven</h4>
            <p className="text-blue-100 text-sm">Join thousands of satisfied users</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-medium text-left">24/7 Support</h4>
            <p className="text-blue-100 text-sm">Always here when you need us</p>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mt-12 text-blue-100 text-sm">
        &copy; {new Date().getFullYear()} Carloo. All rights reserved.
      </div>
    </div>
  );
};

export default LoginVisual;