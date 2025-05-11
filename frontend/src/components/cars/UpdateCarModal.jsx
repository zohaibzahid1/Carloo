import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'react-toastify';
import axiosInstance from '../../services/AxiosInterceptor';
import { ImagePlus, X } from 'lucide-react';

const UpdateCarModal = ({ isOpen, onClose, car, onUpdate }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    images: car?.images || [],
    location: car?.location || '',
    rentalPricePerDay: car?.rentalPricePerDay || '',
    color: car?.car?.color || '',
    availableFrom: formatDate(car?.availableFrom) || '',
    availableTo: formatDate(car?.availableTo) || '',
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (car) {
      setFormData({
        images: car.images || [],
        location: car.location || '',
        rentalPricePerDay: car.rentalPricePerDay || '',
        color: car.car?.color || '',
        availableFrom: formatDate(car.availableFrom) || '',
        availableTo: formatDate(car.availableTo) || '',
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then(base64Images => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...base64Images]
        }));
      })
      .catch(error => {
        toast.error('Error processing images');
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates
    const fromDate = new Date(formData.availableFrom);
    const toDate = new Date(formData.availableTo);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate < today) {
      toast.error('Available From date must be today or later');
      return;
    }

    if (toDate <= fromDate) {
      toast.error('Available To date must be after Available From date');
      return;
    }

    try {
      // Format the update data according to the Car model structure
      const updateData = {
        car: {
          make: car.car.make,
          model: car.car.model,
          year: car.car.year,
          color: formData.color,
          registrationNumber: car.car.registrationNumber
        },
        location: formData.location,
        rentalPricePerDay: parseFloat(formData.rentalPricePerDay),
        availableFrom: formData.availableFrom,
        availableTo: formData.availableTo,
        images: formData.images,
        availability: true
      };

      console.log('Update Data:', updateData); // Debug log

      const response = await axiosInstance.put(`/listing/cars/${car._id}`, updateData);
      console.log('Update Response:', response.data); // Debug log

      if (response.data) {
        toast.success('Car updated successfully');
        onUpdate();
        onClose();
      } else {
        toast.error('Failed to update car');
      }
    } catch (error) {
      console.error('Error updating car:', error.response?.data || error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        'Failed to update car. Please try again.'
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">Update Car Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-600 font-medium">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500 bg-white"
                placeholder="Enter car location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rentalPricePerDay" className="text-blue-600 font-medium">Rental Price Per Day</Label>
              <Input
                id="rentalPricePerDay"
                name="rentalPricePerDay"
                type="number"
                min="100"
                value={formData.rentalPricePerDay}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500 bg-white"
                placeholder="Enter rental price"
              />
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color" className="text-blue-600 font-medium">Color</Label>
            <Input
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="border-blue-200 focus:border-blue-500 bg-white"
              placeholder="Enter car color"
            />
          </div>

          {/* Availability Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="availableFrom" className="text-blue-600 font-medium">Available From</Label>
              <Input
                id="availableFrom"
                name="availableFrom"
                type="date"
                min={today}
                value={formData.availableFrom}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableTo" className="text-blue-600 font-medium">Available To</Label>
              <Input
                id="availableTo"
                name="availableTo"
                type="date"
                min={formData.availableFrom || today}
                value={formData.availableTo}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="images" className="text-blue-600 font-medium">Car Images</Label>
              <div className="relative">
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById('images').click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Add Images
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Car ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md border border-blue-100"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-lg hover:bg-blue-700"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update Car
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCarModal; 