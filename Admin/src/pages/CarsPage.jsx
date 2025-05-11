import React, { useState, useEffect } from 'react';
import { Trash2, Car, ArrowUpDown, Search } from 'lucide-react';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('model');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchCars();
  }, []);

 // ...existing code...
  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      // Call your API
      const response = await fetch('http://localhost:5000/listing/cars');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();

      // Map API data to expected structure (adjust if your API fields differ)
      const carsFromApi = data.map(car => ({
        id: car.id || car._id,
        model: car.car.model,
        year: car.car.year,
        dailyRate: car.rentalPricePerDay,
        available: car.availability,
        image: car.images[0] || 'https://via.placeholder.com/150', // Placeholder image if none provided
      }));

      setCars(carsFromApi);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      // Call your API to delete the car
      const response = await fetch(`http://localhost:5000/listing/cars/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      // Update the UI after successful deletion
      setCars(cars.filter(car => car.id !== id));
    } catch (err) {
      console.error('Error deleting car:', err);
      setError('Failed to delete car');
    }
  };


  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort cars
  const filteredAndSortedCars = [...cars]
    .filter(car => 
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
    .sort((a, b) => {
      if (sortField === 'dailyRate' || sortField === 'year') {
        return sortDirection === 'asc' 
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      } else {
        return sortDirection === 'asc'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' 
      ? <ArrowUpDown size={14} className="ml-1 text-blue-500" /> 
      : <ArrowUpDown size={14} className="ml-1 rotate-180 text-blue-500" />;
  };

  if (loading && !cars.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Car Inventory</h2>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          <p>{error}</p>
          <p className="text-sm mt-1">Using mock data for preview purposes.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={car.image} 
                alt={car.model} 
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {car.available ? 'Available' : 'Rented'}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{car.model}</h3>
                </div>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  aria-label={`Delete ${car.model}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-lg font-semibold text-blue-600">${car.dailyRate}<span className="text-sm text-gray-500 font-normal">/day</span></div>
                <div className="flex items-center">
                  <Car size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{car.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredAndSortedCars.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Car size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No cars found.</p>
          {searchTerm && (
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarsPage;