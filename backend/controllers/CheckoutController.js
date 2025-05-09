import Checkout from '../models/Checkout.js';
import MyRents from '../models/MyRents.js';

export const createCheckout = async (req, res) => {
  try {
    const userId = req.user; // the one who is renting the car
    const checkout = await Checkout.createCheckout(
        userId,
        req.body.listingId,
        req.body.startDate,
        req.body.endDate
    );
    // if the checkout is successful, create a new rent record
    if (checkout) {
      const flag = await MyRents.createNewRent(userId, req.body.listingId,req.body.startDate, req.body.endDate);
      if (!flag) {
        throw new Error('Failed to create rent record');
      }
    }
    res.status(201).json({ message: 'Checkout successful and rent record created', checkout });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
