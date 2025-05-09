import { body, validationResult } from 'express-validator';

export const reviewsValidator = [
  body('rating').toInt()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('title')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('review')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Review text is required'),
  body('username')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('rentId')
    .isMongoId()
    .withMessage('Valid rentId is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];