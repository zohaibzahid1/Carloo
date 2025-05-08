import React from 'react';

export const Label = ({ children, className = '', ...props }) => {
  return (
    <label
      className={`text-sm font-medium text-carloo-600 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label; 