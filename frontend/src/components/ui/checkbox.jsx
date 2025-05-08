import React from 'react';

export const Checkbox = ({ id, checked, onChange, className = '', ...props }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 rounded border-gray-300 text-carloo-500 focus:ring-carloo-500 ${className}`}
      {...props}
    />
  );
}; 