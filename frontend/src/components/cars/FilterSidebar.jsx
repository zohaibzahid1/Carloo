import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Input } from '../../components/ui/input';

const FilterSidebar = ({ onFilterChange, onReset }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ minPrice: value[0], maxPrice: value[1] });
  };

  const handleTypeChange = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    onFilterChange({ carTypes: newTypes });
  };

  const handleFeatureChange = (feature) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    setSelectedFeatures(newFeatures);
    onFilterChange({ features: newFeatures });
  };

  const handleReset = () => {
    setPriceRange([0, 500]);
    setSelectedTypes([]);
    setSelectedFeatures([]);
    onReset();
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
            onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
            className="w-24 border-carloo-200 focus:border-carloo-500"
          />
          <span className="text-black">-</span>
          <Input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-24 border-carloo-200 focus:border-carloo-500"
          />
        </div>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={500}
          step={10}
          className="mt-2"
        />
      </div>

      {/* Car Types */}
      <div className="mb-6">
        <Label className="text-black mb-2 block">Car Type</Label>
        <div className="space-y-2">
          {['Sedan', 'SUV', 'Sports Car', 'Luxury', 'Electric'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeChange(type)}
                className="border-carloo-300 data-[state=checked]:bg-carloo-500 data-[state=checked]:border-carloo-500 data-[state=checked]:text-white"
              />
              <Label htmlFor={type} className="text-black cursor-pointer">{type}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <Label className="text-black mb-2 block">Features</Label>
        <div className="space-y-2">
          {['Air Conditioning', 'Bluetooth', 'GPS', 'Leather Seats', 'Sunroof'].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => handleFeatureChange(feature)}
                className="border-carloo-300 data-[state=checked]:bg-carloo-500 data-[state=checked]:border-carloo-500 data-[state=checked]:text-white"
              />
              <Label htmlFor={feature} className="text-black cursor-pointer">{feature}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        className="w-full bg-carloo-500 hover:bg-carloo-600 text-white"
        onClick={() => onFilterChange({
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          carTypes: selectedTypes,
          features: selectedFeatures
        })}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar; 