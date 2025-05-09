import mongoose from 'mongoose';
import Car from '../models/Car.js';
import User from '../models/User.js';
import sendEmail from '../utils/Emailsender.js';

const checkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // thw one who is renting the car
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }, // the car being rented
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  platformProfit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

checkoutSchema.statics.createCheckout = async function ( userId, listingId, startDate, endDate ) {
   // first get ownerId from listingId

  const car = await Car.findById(listingId);
  if (!car) throw new Error('Car not found');

  if (car.ownerId._id.toString() === userId.toString()) {
    throw new Error('Cannot rent your own car');
  }
  // add a check to ensure that end date is less then the car.availableto date
  if (new Date(endDate) > new Date(car.availableTo)) {
    throw new Error('Car is not available for the selected dates');
  }
  const oneDay = 1000 * 60 * 60 * 24;
  const rentalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / oneDay);
  const totalPrice = rentalDays * car.rentalPricePerDay;
  const profit = +(totalPrice * 0.05).toFixed(2);


  car.availability = false;
  
  
  await car.save();

  const userInfo = await User.findById(userId);
  
  const owner = await User.findById(car.ownerId);  // Await the result of finding the owner
  if (!owner) throw new Error('Car owner not found');

  const ownerEmail = owner.email; // Now get the email from the user

  // await sendEmail({
  //   to: ownerEmail,
  //   subject: 'New Rental Checkout',
  //   text: `Your car (${car.car.make} ${car.car.model}) has been rented from ${startDate} to ${endDate}.
  //   Rented by: ${userInfo.username}, Email: ${userInfo.email} , Phone: ${userInfo.phone}
  //   Total price: Rs. ${totalPrice}`
  // });
console.log(`Email sent to ${ownerEmail} with rental details.`);
console.log('   Rental details:', {
    car: `${car.car.make} ${car.car.model}`,
    rentedBy: userInfo.username,
    email: userInfo.email});

  return await this.create({
    userId,
    listingId,
    startDate,
    endDate,
    totalPrice,
    platformProfit: profit
  });
};

const Checkout = mongoose.model('Checkout', checkoutSchema);
export default Checkout;