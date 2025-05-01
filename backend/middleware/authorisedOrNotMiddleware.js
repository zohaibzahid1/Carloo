// it used to act as a middleware to ensure that the user is authenticated before accessing certain routes.
// It checks for the presence of a JWT token in the request headers and verifies it. If the token is valid, it allows the request to proceed; otherwise, it sends an error response.

import jwt from 'jsonwebtoken';

const protectRoutes = (req, res, next) => {
  let token = req.headers.authorization; // Get the token from the authorization header

  if (token && token.startsWith('Bearer')) { // Check if token is present and starts with 'Bearer' 
    try {
      token = token.split(' ')[1]; // Remove 'Bearer' part

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // the data enclosed in decoded will be the data with which this token was generated
      
      req.user = decoded.id; // attach user id to request
      
      next(); // pass control to the next middleware or route
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protectRoutes;
