import React from 'react';

export const Slider = ({ defaultValue, max, step, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max={max}
      step={step}
      defaultValue={defaultValue}
      onChange={onChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-carloo-500"
    />
  );
};

export default Slider; 