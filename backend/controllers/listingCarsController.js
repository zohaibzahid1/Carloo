import jwt from 'jsonwebtoken'; // Import jsonwebtoken for creating JWT tokens
import Car from '../models/listingCars.js'; // Import Car model for database operations


const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT, is stored in .env file

const addCarToListing = async (req, res) => {
        try {
          const ownerId = req.user?.id;
          if (!ownerId) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
      
          const savedCar = await Car.createNewCar(req.body, ownerId);
          res.status(201).json({ message: 'Car uploaded successfully', car: savedCar });
      
        } catch (error) {
          console.error(error);
      
          if (error.code === 11000 && error.keyPattern?.['car.registrationNumber']) {
            return res.status(409).json({ message: 'Car with this registration number already exists' });
          }
      
          if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors });
          }
      
          res.status(500).json({ message: 'Server error' });
        }
    
}

export default addCarToListing; // Export the function for use in routes

