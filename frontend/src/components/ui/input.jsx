import React from 'react';

const Input = React.forwardRef(({ className = '', error, ...props }, ref) => {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-carloo-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input }; 