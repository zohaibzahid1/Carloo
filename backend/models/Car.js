// models/Car.js
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner ID is required']
  },
  car: {
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: {
      type: Number,
      required: true,
      min: [1900, 'Year must be valid'],
      max: [new Date().getFullYear() + 1, 'Year must be valid']
    },
    color: { type: String, required: true, trim: true },
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  rentalPricePerDay: {
    type: Number,
    required: true,
    min: [100, 'Rental price must be at least 100']
  },
  location: { type: String, required: true, trim: true },
  availableFrom: { type: Date, required: true },
  availableTo: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v > this.availableFrom;
      },
      message: 'End date must be after start date'
    }
  },
  images: {
    type: [String],
    validate: {
      validator: (v) => v.length > 0,
      message: 'At least one image URL is required'
    }
  },
  createdAt: { type: Date, default: Date.now },
  availability: {type: Boolean, default: true, required: true}
});

// Static method to create new car
carSchema.statics.createNewCar = async function (data, ownerId) {
  const newCar = new this({
    ownerId,
    ...data
  });

  return await newCar.save();
};




const Car = mongoose.model('Car', carSchema);
export default Car;
