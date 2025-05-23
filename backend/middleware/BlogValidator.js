import { body, validationResult } from 'express-validator';

const blogValidationRules = [
  body('title').isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('category').isLength({ min: 3 }).withMessage('Category must be at least 3 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// const validateBlog = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors.array());
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

export  {blogValidationRules};
