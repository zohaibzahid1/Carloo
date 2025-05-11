// routes/carRoutes.js
import express from 'express';
import { carValidationRules, validateCar } from '../middleware/carValidator.js'; // Import validation rules and middleware
import { createCar, getAllCars, getCarById, updateCar, deleteCar,getCarByUserId } from '../controllers/CarController.js';
import protectRoutes from '../middleware/authorisedOrNotMiddleware.js'
const carRouter = express.Router();

// Create a new car
carRouter.post('/cars', protectRoutes, carValidationRules, validateCar, createCar);

// Get all cars
carRouter.get('/cars', getAllCars); // everyone can view all cars

// Get car by  car ID
carRouter.get('/cars/:id', getCarById);

// Update a car
carRouter.put('/cars/:id', protectRoutes, carValidationRules, validateCar, updateCar);
// colon is needed by express not by client url should be /cars/id

// Delete a car
carRouter.delete('/cars/:id', protectRoutes, deleteCar);

// Get all cars by a specific user (auth required)
carRouter.get('/carsbyuser', protectRoutes, getCarByUserId); // Auth required




export default carRouter;
