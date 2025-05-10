import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'react-toastify';
import axiosInstance from '../services/AxiosInterceptor';
import Layout from '../components/layout/Layout';

const ListYourCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    car: {
      make: '',
      model: '',
      year: '',
      color: '',
      transmission: '',
      fuelType: '',
      mileage: '',
      seats: '',
      registrationNumber: '',
    },
    rentalPricePerDay: '',
    location: '',
    availableFrom: '',
    availableTo: '',
    description: '',
    images: [],
    availability: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('car.')) {
      const carField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        car: {
          ...prev.car,
          [carField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    if (name.startsWith('car.')) {
      const carField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        car: {
          ...prev.car,
          [carField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert images to base64
      const imageUrls = [];
      if (formData.images && formData.images.length > 0) {
        for (const image of formData.images) {
          const reader = new FileReader();
          const imagePromise = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
          });
          reader.readAsDataURL(image);
          const base64Image = await imagePromise;
          imageUrls.push(base64Image);
        }
      }

      // Prepare the data object
      const carData = {
        car: {
          make: formData.car.make,
          model: formData.car.model,
          year: parseInt(formData.car.year),
          color: formData.car.color,
          transmission: formData.car.transmission,
          fuelType: formData.car.fuelType,
          mileage: parseInt(formData.car.mileage),
          seats: parseInt(formData.car.seats),
          registrationNumber: formData.car.registrationNumber
        },
        rentalPricePerDay: parseFloat(formData.rentalPricePerDay),
        location: formData.location,
        availableFrom: formData.availableFrom,
        availableTo: formData.availableTo,
        description: formData.description,
        availability: formData.availability,
        images: imageUrls
      };

      const response = await axiosInstance.post('/listing/cars', carData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success('Car listed successfully!');
        navigate('/mylistings');
      } else {
        throw new Error(response.data.message || 'Failed to list car');
      }
    } catch (error) {
      console.error('Error listing car:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error?.message || 
                          error.message || 
                          'Failed to list car';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-white min-h-screen py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-heading font-bold text-blue-900 mb-3">List Your Car</h1>
              <p className="text-blue-800/80">Share your car with the community and start earning</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Car Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold text-blue-900 mb-4">Car Details</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="car.make" className="text-blue-900">Make</Label>
                    <Input
                      id="car.make"
                      name="car.make"
                      value={formData.car.make}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car.model" className="text-blue-900">Model</Label>
                    <Input
                      id="car.model"
                      name="car.model"
                      value={formData.car.model}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car.year" className="text-blue-900">Year</Label>
                    <Input
                      id="car.year"
                      name="car.year"
                      type="number"
                      value={formData.car.year}
                      onChange={handleChange}
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car.color" className="text-blue-900">Color</Label>
                    <Input
                      id="car.color"
                      name="car.color"
                      value={formData.car.color}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car.transmission" className="text-blue-900">Transmission</Label>
                    <Select
                      value={formData.car.transmission}
                      onValueChange={(value) => handleSelectChange('car.transmission', value)}
                    >
                      <SelectTrigger className="border-blue-200 focus:border-blue-500 text-gray-900">
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic" className="text-gray-900">Automatic</SelectItem>
                        <SelectItem value="manual" className="text-gray-900">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car.fuelType" className="text-blue-900">Fuel Type</Label>
                    <Select
                      value={formData.car.fuelType}
                      onValueChange={(value) => handleSelectChange('car.fuelType', value)}
                    >
                      <SelectTrigger className="border-blue-200 focus:border-blue-500 text-gray-900">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol" className="text-gray-900">Petrol</SelectItem>
                        <SelectItem value="diesel" className="text-gray-900">Diesel</SelectItem>
                        <SelectItem value="electric" className="text-gray-900">Electric</SelectItem>
                        <SelectItem value="hybrid" className="text-gray-900">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Rental Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold text-blue-900 mb-4">Rental Details</h2>

                  <div className="space-y-2">
                    <Label htmlFor="car.mileage" className="text-blue-900">Mileage</Label>
                    <Input
                      id="car.mileage"
                      name="car.mileage"
                      type="number"
                      value={formData.car.mileage}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car.seats" className="text-blue-900">Number of Seats</Label>
                    <Input
                      id="car.seats"
                      name="car.seats"
                      type="number"
                      value={formData.car.seats}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="car.registrationNumber" className="text-blue-900">Registration Number</Label>
                    <Input
                      id="car.registrationNumber"
                      name="car.registrationNumber"
                      value={formData.car.registrationNumber}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rentalPricePerDay" className="text-blue-900">Price per Day ($)</Label>
                    <Input
                      id="rentalPricePerDay"
                      name="rentalPricePerDay"
                      type="number"
                      value={formData.rentalPricePerDay}
                      onChange={handleChange}
                      required
                      min="100"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-blue-900">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availableFrom" className="text-blue-900">Available From</Label>
                    <Input
                      id="availableFrom"
                      name="availableFrom"
                      type="date"
                      value={formData.availableFrom}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availableTo" className="text-blue-900">Available To</Label>
                    <Input
                      id="availableTo"
                      name="availableTo"
                      type="date"
                      value={formData.availableTo}
                      onChange={handleChange}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Description and Images */}
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-blue-900">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border-blue-200 focus:border-blue-500 min-h-[100px] text-gray-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images" className="text-blue-900">Car Images</Label>
                  <Input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="border-blue-200 focus:border-blue-500"
                  />
                  <p className="text-sm text-blue-600">Upload at least one image of your car</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Listing Car...' : 'List Your Car'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListYourCar; 