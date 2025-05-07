import e from 'express';
import { body, validationResult } from 'express-validator';

// Define validation rules
const userValidationRules = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('creditcard').isLength({ min: 16, max: 16 }).withMessage('Credit card number must be 16 digits long'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address').notEmpty().withMessage('Address is required')
  
];

// Handle validation errors
const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export { userValidationRules, validateUser };