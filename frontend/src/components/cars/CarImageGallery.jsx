import React from 'react';

const CarImageGallery = ({ images, mainImage, onMainImageChange }) => {
  return (
    <div className="mb-8">
      {/* Main Image */}
      <div className="rounded-lg overflow-hidden mb-4 border border-gray-300">
        <img
          src={mainImage || (images && images.length > 0 ? images[0] : '')}
          alt="Car"
          className="w-full h-64 md:h-96 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='18' text-anchor='middle' fill='%23999999'%3ECar Image%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Thumbnail Images */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden cursor-pointer border-2 ${
                img === mainImage ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => onMainImageChange(img)}
            >
              <img
                src={img}
                alt={`Car view ${index + 1}`}
                className="w-full h-20 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='18' text-anchor='middle' fill='%23999999'%3ECar Image%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarImageGallery; 