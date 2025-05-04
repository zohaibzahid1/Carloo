import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';


function App() {
  // All the routes are defined here that will be used in the application using Link of react-router-dom
  // Temporary assignment of the component in each route
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        
        {/* If you need a new route, just add it here under your name */}
        {/* Zohaib */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={ <Home /> } />
          <Route path="/updateprofile" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          {/*Fatima*/}
        <Route path="/home" element={ <Home /> }/> 
        <Route path="/blogs" element={<Home />} /> {/* This is the route for the all blogs page */}
        <Route path="/blogs/addblog" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the add blog page */}
        <Route path="/blogs/myblogs" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the blogs by a user where he will also have the option to delete em */}
        {/* Ayesha */}
        <Route path="/listings" element={<Home />} /> {/* This is the route for the all listings page */}
        <Route path="/listing/addlisting" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the add listing page */}
        <Route path="/listing/mylistings" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the listings by a user where he will also have the option to delete em */}
        <Route path="/listing/mylistings/update" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the update listing page */}
        {/* Danish */}
        <Route path="/aboutus" element={<Home />} />
        <Route path="/contactus" element={<Home />} />
        <Route path="/listing/detailview" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the detail view of a listing */}
        <Route path="/checkout" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the checkout page */}
        <Route path="/checkout/result" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* This is the route for the success/faliure page after checkout */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;