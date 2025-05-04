import express from 'express';

import { createCheckout } from '../controllers/CheckoutController.js';
import { checkoutValidator } from '../middleware/CheckoutValidator.js';
import protectRoutes from '../middleware/authorisedOrNotMiddleware.js';

const checkoutRouter = express.Router();

checkoutRouter.post('/', protectRoutes, checkoutValidator, createCheckout);

export default checkoutRouter;
