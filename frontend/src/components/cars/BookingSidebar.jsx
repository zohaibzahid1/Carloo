import React from 'react';

const BookingSidebar = ({
  basePrice,
  selectedDays,
  discount,
  pickupDate,
  returnDate,
  onDateChange,
  onProceed,
  isDisabled
}) => {
  const subtotal = basePrice * selectedDays;
  const discountAmount = discount ? subtotal * (discount / 100) : 0;
  const serviceFee = Math.round(subtotal * 0.08); // 8% service fee
  const total = subtotal - discountAmount + serviceFee;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-4">Book this car</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date</label>
          <input 
            type="date"
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => onDateChange('pickup', e)}
            value={pickupDate}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
          <input 
            type="date"
            className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md"
            onChange={(e) => onDateChange('return', e)}
            value={returnDate}
            min={pickupDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      
      <div className="border-t border-b py-4 mb-4">
        <div className="flex justify-between mb-2 text-gray-700">
          <span>${basePrice} x {selectedDays} days</span>
          <span>${subtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-2 text-green-600">
            <span>Discount ({discount}%)</span>
            <span>-${discountAmount}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-700">
          <span>Service fee</span>
          <span>${serviceFee}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold text-lg mb-6 text-gray-900">
        <span>Total</span>
        <span>${total}</span>
      </div>
      
      <button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onProceed}
        disabled={isDisabled}
      >
        Reserve Now
      </button>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        You won't be charged yet
      </p>
    </div>
  );
};

export default BookingSidebar; 