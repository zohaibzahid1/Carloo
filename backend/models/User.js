import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Don't hash if password isn't modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password during login
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


// Export the User model as default
const User = mongoose.model('User', UserSchema);
export default User;