
import {loginUser,regiserUser} from '../controllers/AuthenticationController.js'
import express from 'express'; // Import express for creating routes

const router = express.Router();


// Routes folder and its files are used to define two things 
// 1. The routes of the application after the main url (e.g. /users/register, /users/login)
// 2. The controller functions that will be called when the route is hit (e.g. registerUser, loginUser)



// Register User
router.post('/register',regiserUser); // Register User
// Login User
router.post('/login',loginUser); // Login User

export default router; // Export the router to be used in the server.js file