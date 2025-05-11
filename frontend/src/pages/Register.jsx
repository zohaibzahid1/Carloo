import React, { useState } from 'react';
import VisualSection from '../components/authentication/RegisterVisual';
import RegistrationForm from '../components/authentication/RegistrationForm';

const Register = () => {
  

  return (
    <div className="flex flex-col  min-h-screen w-full">
      <VisualSection />
      <RegistrationForm  />
    </div>
  );
};

export default Register;
