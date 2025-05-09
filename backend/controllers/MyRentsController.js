import MyRents from "../models/MyRents.js";

// Get all rents
export const getAllRents = async (req, res) => {
  try {
    const rents = await MyRents.find().populate('listingId');
    res.status(200).json(rents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get rents by user ID (authenticated)
export const getRentsByUserId = async (req, res) => {
  try {
    const userId = req.user;
    const rents = await MyRents.find({ userId }).populate('listingId');
    res.status(200).json(rents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register a new rent
// it used in CheckoutController when there is a successful checkout
export const registerRent = async (req, res) => {
  try {
    const { listingId,startDate,endDate } = req.body;
    const userId = req.user;
    const rent = await MyRents.createNewRent({ userId, listingId,startDate,endDate });
    res.status(201).json(rent);
  } catch (err) {
    res.status(err.name === 'ValidationError' ? 400 : 500).json({ error: err.message });
  }
};
// it is used in ReviewsController to update the reviewId in the MyRents model
// this function is called when a new review is added
export const updateRentReviewId = async (rentId, reviewId) => {
  try {
    const rent = await MyRents.findByIdAndUpdate(
      rentId,
      { reviewId },
      { new: true }
    );
    return rent;
  } catch (err) {
    throw new Error(err.message);
  }
};