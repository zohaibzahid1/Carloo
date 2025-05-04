import Checkout from '../models/Checkout.js';
import Car from '../models/Car.js';
import User from '../models/User.js';

export const createCheckout = async (req, res) => {
  try {
    const userId = req.user; // the one who is renting the car
    const checkout = await Checkout.createCheckout(
        userId,
        req.body.listingId,
        req.body.startDate,
        req.body.endDate
    );

    res.status(201).json({ message: 'Checkout successful', checkout });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
