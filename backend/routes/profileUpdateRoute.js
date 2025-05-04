import { updateUserProfile } from "../controllers/AuthenticationController.js";
import express from "express"; // Import express for creating routes
import protectRoutes from "../middleware/authorisedOrNotMiddleware.js"; // Import middleware for protecting routes
import { userValidationRules, validateUser } from "../middleware/ValidateRegister.js"; // Import validation rules and middleware

const profileUpdateRouter = express.Router(); // Create a new router instance

profileUpdateRouter.put("/", protectRoutes, userValidationRules, validateUser,  updateUserProfile);

export default profileUpdateRouter; // Export the router for use in other files