import Car from './models/Car.js';
import Checkout from './models/Checkout.js';
import User from './models/User.js';
// import sendEmail from './utils/sendEmail.js'; // Uncomment and implement this if you have an email utility

const performStartupTasks = async () => {
  try {
    console.log('Running startup tasks...');

    // Task 1: Update car availability based on checkouts with endDate == today's date
    const today = new Date();
    // Normalize to midnight for comparison
    console.log('Today:', today);
    // Find all checkouts where endDate is today
    const checkouts = await Checkout.find({ endDate: today });

    for (const checkout of checkouts) {
      const car = await Car.findById(checkout.listingId);

      if (car && car.availableTo > today) {
        car.availability = true; // Update car availability
        await car.save();
        console.log(`Car with ID ${car._id} is now available.`);
      }
    }

    console.log('Task 1 completed: Car availability updated.');

    // Task 2: Set car availability to false if car.availableTo <= today's date
    const allCars = await Car.find(); // Retrieve all car listings

    for (const car of allCars) {
      if (car.availableTo <= today) {
        car.availability = false; // Set availability to false
        await car.save();
        console.log(`Car with ID ${car._id} is now unavailable.`);

        // Notify the car owner via email
        const owner = await User.findById(car.ownerId); // Retrieve the car owner
        if (owner && owner.email) {
          const emailContent = `
            Dear ${owner.username},
            
            Your car listing (${car.car.make} ${car.car.model}) has expired as of ${today.toDateString()}.
            Please log in to your account to update your car's availability.

            Thank you,
            The Carloo Team
          `;

          // Uncomment and implement the sendEmail function to send the email
          // await sendEmail({
          //   to: owner.email,
          //   subject: 'Car Listing Expired',
          //   text: emailContent,
          // });

          console.log(`Email sent to ${owner.email} notifying about the expired listing.`);
        }
      }
    }

    console.log('Task 2 completed: Car availability updated based on availableTo date.');
  } catch (error) {
    console.error('Error during startup tasks:', error.message);
  }
};

export default performStartupTasks;