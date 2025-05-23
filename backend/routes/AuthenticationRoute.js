
import {loginUser,regiserUser,getAllUsers,deleteUser} from '../controllers/AuthenticationController.js'
import express from 'express'; // Import express for creating routes
import {userValidationRules,validateUser} from '../middleware/ValidateRegister.js';
import {loginValidationRules,validateLogin} from '../middleware/ValidateLogin.js'; // Import validation rules and middleware


const authRouter = express.Router();


// Routes folder and its files are used to define two things 
// 1. The routes of the application after the main url (e.g. /users/register, /users/login)
// 2. The controller functions that will be called when the route is hit (e.g. registerUser, loginUser)



// Register User
authRouter.post('/register',userValidationRules,validateUser,regiserUser); // Register User
// Login User
authRouter.post('/login',loginValidationRules,validateLogin,loginUser); // Login User

authRouter.get('/all',getAllUsers)
// delete user
 authRouter.delete('/:id',deleteUser); // Delete User

export default authRouter; // Export the router to be used in the server.js file