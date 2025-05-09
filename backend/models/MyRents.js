import mongoose from 'mongoose';

const myRentsSchema = new mongoose.Schema(
    {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    default: null
  },
fromDate: {
    type: Date,
    required: true
},
toDate: {
    type: Date,
    required: true
}
}, 
{
  timestamps: true
}
);
// static method to create new rent
myRentsSchema.statics.createNewRent = async function (userId, listingId, fromDate, toDate) {
  const newRent = new this({
    userId,
    listingId,
    fromDate,
    toDate
  });

  return await newRent.save();
};

const MyRents = mongoose.model('MyRents', myRentsSchema);
export default MyRents;
