// validators/carValidator.js
import { body } from 'express-validator';
import { validationResult } from 'express-validator'; // Import validationResult to handle validation errors

export const carValidationRules = [
  body('car.make').isString().withMessage('Car make is required').notEmpty(),
  body('car.model').isString().withMessage('Car model is required').notEmpty(),
  body('car.year').isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage('Year must be valid'),
  body('car.color').isString().withMessage('Color is required').notEmpty(),
  body('car.registrationNumber').isString().withMessage('Registration number is required').notEmpty(),
  body('rentalPricePerDay').isFloat({ min: 100 }).withMessage('Rental price must be at least 100'),
  body('location').isString().withMessage('Location is required').notEmpty(),
  body('availableFrom').isISO8601().withMessage('Available from must be a valid date').notEmpty(),
  body('availableTo').isISO8601().withMessage('Available to must be a valid date').notEmpty(),
  body('images').isArray({ min: 1 }).withMessage('At least one image URL is required')
];

export const validateCar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
