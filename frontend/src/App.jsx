import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute.js';
import Home from './pages/home.jsx';

// Temporary assignment of the component in each route
function App() {
  // All the routes are defined here that will be used in the application using Link of react-router-dom
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} /> 
        <Route path="/register" element={<Home />} />
        <Route path= "/updateprofile" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/home" element={ <Home /> }/>
        <Route path="/aboutus" element={<Home />} />
        <Route path="/contactus" element={<Home />} />
        <Route path="/listings" element={<Home />} />
        <Route path="/blogs" element={<Home />} />
      
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;