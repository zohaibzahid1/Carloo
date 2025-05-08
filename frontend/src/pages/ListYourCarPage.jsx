import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ImagePlus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import axiosInstance from '../services/AxiosInterceptor';
import { toast } from 'react-toastify';

const formSchema = z.object({
  make: z.string().min(2, "Make must be at least 2 characters"),
  model: z.string().min(1, "Model is required"),
  year: z.string().regex(/^\d{4}$/, "Must be a valid year")
    .refine((val) => {
      const year = parseInt(val);
      return year >= 1900 && year <= new Date().getFullYear() + 1;
    }, "Year must be between 1900 and next year"),
  color: z.string().min(1, "Color is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  rentalPricePerDay: z.string()
    .min(1, "Price is required")
    .refine((val) => parseInt(val) >= 100, "Price must be at least 100"),
  location: z.string().min(1, "Location is required"),
  availableFrom: z.string().min(1, "Start date is required"),
  availableTo: z.string().min(1, "End date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.any().refine((files) => files?.length > 0, "At least one image is required"),
});

const ListYourCarPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      color: "",
      registrationNumber: "",
      rentalPricePerDay: "",
      location: "",
      availableFrom: "",
      availableTo: "",
      description: "",
      images: null,
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add car details
      formData.append('car', JSON.stringify({
        make: values.make,
        model: values.model,
        year: parseInt(values.year),
        color: values.color,
        registrationNumber: values.registrationNumber
      }));

      // Add other fields
      formData.append('rentalPricePerDay', parseInt(values.rentalPricePerDay));
      formData.append('location', values.location);
      formData.append('availableFrom', values.availableFrom);
      formData.append('availableTo', values.availableTo);
      formData.append('description', values.description);

      // Add images
      if (values.images) {
        Array.from(values.images).forEach(file => {
          formData.append('images', file);
        });
      }

      // Send request to backend
      const response = await axiosInstance.post('/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Car listed successfully!');
        form.reset();
        // Optionally redirect to the car details page
        // navigate(`/cars/${response.data._id}`);
      } else {
        toast.error(response.data.message || 'Failed to list car');
      }
    } catch (error) {
      console.error('Error listing car:', error);
      toast.error(
        error.response?.data?.message || 
        error.response?.data?.error?.message || 
        'An error occurred while listing your car'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold font-heading mb-6">List Your Car</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Car Images</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center justify-center w-full">
                        <label
                          htmlFor="car-images"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImagePlus className="w-12 h-12 mb-4 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 800x400px)</p>
                          </div>
                          <input
                            id="car-images"
                            type="file"
                            multiple
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Toyota" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Camry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Silver" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ABC-123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rentalPricePerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Rate (PKR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availableFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available From</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availableTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available To</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Karachi, Pakistan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your car (features, condition, etc.)" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-carloo-500 hover:bg-carloo-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Listing Car...' : 'List Your Car'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ListYourCarPage; 