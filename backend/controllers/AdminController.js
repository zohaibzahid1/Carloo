//import { calculateDailyProfit, calculateOverallProfit, listAllCheckouts } from '../controllers/AdminController.js'; // Import controller functions
// define these 3 functions in the controller
// all of them will require the checkout model  
import Checkout from '../models/Checkout.js'; // Import the Checkout model

const calculateDailyProfit = async (req, res) => {
    try {
        const today = new Date();
        console.log(today);
        today.setHours(1,1, 1, 1); // Set time to midnight for accurate comparison

        const checkouts = await Checkout.find({
            createdAt: {
            $gte: today,
            },
        }); // Find all checkouts created today
        const totalProfit = checkouts.reduce((acc, checkout) => acc + checkout.platformProfit, 0); // Calculate total profit
        console.log(totalProfit);
        res.status(200).json({ totalProfit }); // Send the total profit as a response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
}
const calculateOverallProfit = async (req, res) => {
    try {
        const checkouts = await Checkout.find(); // Find all checkouts
        const totalProfit = checkouts.reduce((acc, checkout) => acc + checkout.platformProfit, 0); // Calculate total profit
        
        res.status(200).json({ totalProfit }); // Send the total profit as a response
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
}
const listAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find()
      .populate({
        path: 'listingId',
        select: 'car.make car.model car.year',
      })
      .populate({
        path: 'userId',
        select: 'username',
      });

    // Transform the data
    const formattedCheckouts = checkouts.map((checkout) => ({
      id: checkout._id,
      username: checkout.userId.username,
      car: `${checkout.listingId.car.make} ${checkout.listingId.car.model} ${checkout.listingId.car.year}`,
      time: new Date(checkout.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Change to true for AM/PM format
      }),
      amount: checkout.totalPrice,
    }));

    res.status(200).json(formattedCheckouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { calculateDailyProfit, calculateOverallProfit, listAllCheckouts }; // Export the functions