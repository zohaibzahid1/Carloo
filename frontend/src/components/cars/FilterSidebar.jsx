import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Calendar } from 'lucide-react';

const FilterSidebar = ({ onFilterChange, onReset }) => {
  const [priceRange, setPriceRange] = useState([0, 99999]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Initialize filters from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const location = params.get('location');
    const from = params.get('fromDate');
    const to = params.get('toDate');
    
    if (location) setSelectedLocation(location);
    if (from) setFromDate(from);
    if (to) setToDate(to);
  }, []);

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    // Allow empty value
    if (value === '') {
      setPriceRange(['', priceRange[1]]);
      return;
    }
    const min = parseInt(value);
    const max = priceRange[1] === '' ? 10000 : priceRange[1];
    if (!isNaN(min) && (max === '' || min <= max)) {
      setPriceRange([min, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    // Allow empty value
    if (value === '') {
      setPriceRange([priceRange[0], '']);
      return;
    }
    const max = parseInt(value);
    const min = priceRange[0] === '' ? 0 : priceRange[0];
    if (!isNaN(max) && (min === '' || max >= min)) {
      setPriceRange([priceRange[0], max]);
    }
  };

  const handlePriceChange = (value) => {
    // Ensure min price doesn't exceed max price
    const [min, max] = value;
    if (min > max) {
      setPriceRange([max, max]);
    } else {
      setPriceRange(value);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleReset = () => {
    setPriceRange([0, 99999]);
    setSelectedYear('');
    setSelectedLocation('');
    setFromDate('');
    setToDate('');
    onReset();
    // Trigger filter change with reset values
    onFilterChange({
      minPrice: 0,
      maxPrice: 99999,
      year: '',
      location: '',
      fromDate: '',
      toDate: ''
    });
  };

  const handleApplyFilters = () => {
    onFilterChange({
      minPrice: priceRange[0] === '' ? 0 : priceRange[0],
      maxPrice: priceRange[1] === '' ? 99999 : priceRange[1],
      year: selectedYear,
      location: selectedLocation,
      fromDate: fromDate,
      toDate: toDate
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-carloo-200 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-black">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-carloo-500 hover:text-carloo-600"
        >
          Reset
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-black mb-2 block">Price Range (per day)</Label>
        <div className="flex items-center space-x-4 mb-2">
          <Input
            type="number"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            min={0}
            className="w-24 border-carloo-200 focus:border-carloo-500"
            placeholder="Min"
          />
          <span className="text-black">-</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            min={0}
            className="w-24 border-carloo-200 focus:border-carloo-500"
            placeholder="Max"
          />
        </div>
        <Slider
          value={priceRange.map(v => v === '' ? 0 : v)}
          onValueChange={handlePriceChange}
          min={0}
          max={10000}
          step={100}
          className="mt-2"
        />
      </div>

      {/* Availability Dates */}
      <div className="mb-6">
        <Label className="text-black mb-2 block">Availability</Label>
        <div className="space-y-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full pl-10 border-carloo-200 focus:border-carloo-500"
              placeholder="Available From"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full pl-10 border-carloo-200 focus:border-carloo-500"
              placeholder="Available To"
            />
          </div>
        </div>
      </div>

      {/* Year */}
      <div className="mb-6">
        <Label className="text-black mb-2 block">Year</Label>
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-full border-carloo-200 focus:border-carloo-500">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="mb-6">
        <Label className="text-black mb-2 block">Location</Label>
        <Select value={selectedLocation} onValueChange={handleLocationChange}>
          <SelectTrigger className="w-full border-carloo-200 focus:border-carloo-500">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta'].map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar; 