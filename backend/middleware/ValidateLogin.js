
import { body, validationResult } from 'express-validator';

// Validation rules for login
 const loginValidationRules = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Error handler middleware
const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export { loginValidationRules, validateLogin };