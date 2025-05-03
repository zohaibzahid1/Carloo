// controllers/carController.js
import Car from '../models/Car.js';

// Create a new car
export const createCar = async (req, res) => {
  try {
    const  ownerId  = req.user; // Assuming the user is authenticated
    const carData = req.body;
     // Log the car data for debugging
    const newCar = await Car.createNewCar(carData, ownerId);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ message: 'Error creating car', error: err });
  }
};

// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cars', error: err });
  }
};

// Get a car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching car', error: err });
  }
};

// Update a car
export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: 'Error updating car', error: err });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting car', error: err });
  }
};

// Get all cars by a specific user (auth required)
export const getCarByUserId = async (req, res) => {
  try {
    const userId = req.user; // Assuming the user is authenticated
    const cars = await Car.find({ ownerId: userId });
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cars by user', error: err });
  }
};
