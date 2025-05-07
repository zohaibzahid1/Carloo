import React from 'react';

const Textarea = React.forwardRef(({ className = '', error, ...props }, ref) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-carloo-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea }; 