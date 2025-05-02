import { body, validationResult } from 'express-validator';

export const checkoutValidator = [
  body('listingId').isMongoId().withMessage('Valid listing ID is required'),
  body('startDate').isISO8601().toDate().withMessage('Valid start date required'),
  body('endDate').isISO8601().toDate().withMessage('Valid end date required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

