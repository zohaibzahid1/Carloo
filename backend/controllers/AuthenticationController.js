// AuthenticationController.js
// This file contains the logic for user registration and login, including password hashing and JWT token generation.




import jwt from 'jsonwebtoken'; // Import jsonwebtoken for creating JWT tokens
import User from '../models/User.js'; // Import User model for database operations

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT, is stored in .env file

const regiserUser = async (req, res) => {

 

  const { username, password, email, creditcard, phone, address } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create new user
    const user = await User.create({
      username,
      password,
      email,
      creditcard,
      phone,
      address
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send token and username in response
    res.json({ token, username: user.username , userId: user._id});
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
   
    const { username, password } = req.body;
   
    try {
      const user = await User.findOne({ username }); // Check if user exists
      if (!user) return res.status(400).json({ message: 'No such User exsists' });
  
      const isMatch = await user.comparePassword(password); // Compare password with hashed password
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token 

      
      res.json({ token, username: user.username, userId: user._id }); // Send token username and userid in response
    
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // create a function to update the user profile including password
const updateUserProfile = async (req, res) => {
    const { username, password, email, creditcard, phone, address } = req.body;
  
    try {
      const user = await User.findById(req.user); // Get the authenticated user
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Update user details
      user.username = username || user.username;
      user.password = password || user.password; // Password should be hashed in the model's pre-save hook
      user.email = email || user.email;
      user.creditcard = creditcard || user.creditcard;
      user.phone = phone || user.phone;
      user.address = address || user.address;
  
      await user.save(); // Save updated user to database
  
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  // show all users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Get all users from the database
      res.json(users); // Send users in response
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
// delete user
export const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id); // Delete user by ID
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };








  export { regiserUser, loginUser , updateUserProfile}; // Export the functions for use in routes