//import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import Home from './pages/home.jsx';
import Login from './pages/Login.jsx';
import CarDetail from './pages/CarDetail.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Register from './pages/Register.jsx';
import { ToastContainer } from 'react-toastify';
import ListYourCarPage from './pages/ListYourcarPage.jsx';
import Listing from './pages/Listing.jsx';
import Blog from './pages/Blog.jsx';
import MyBlogs from './pages/MyBlogs.jsx';
import AddBlog from './pages/AddBlog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import MyListings from './pages/MyListing.jsx';

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
          <Route path="/register" element={ <Register /> } />
          <Route path="/updateprofile" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          {/*Fatima*/}
        <Route path="/home" element={ < Home/> }/> 
        <Route path="/blogs" element={<Blog />} /> {/* This is the route for the all blogs page */}
        <Route path="/blogs/addblog" element={<ProtectedRoute> <AddBlog /> </ProtectedRoute>} /> {/* This is the route for the add blog page */}
        <Route path="/blogs/myblogs" element={<ProtectedRoute> <MyBlogs /> </ProtectedRoute>} /> {/* This is the route for the blogs by a user where he will also have the option to delete em */}
        <Route path="/blog/:id" element={<ProtectedRoute> <BlogDetail /> </ProtectedRoute>} /> {/* This is the route for the update blog page */}
        {/* Ayesha */}
        <Route path="/listings" element={<Listing />} /> {/* This is the route for the all listings page */}
        <Route path="/listing/addlisting" element={<ProtectedRoute> <ListYourCarPage /> </ProtectedRoute>} /> {/* This is the route for the add listing page */}
        <Route path="/listing/mylistings" element={<ProtectedRoute> <MyListings /> </ProtectedRoute>} /> {/* This is the route for the listings by a user where he will also have the option to delete em */}
        {/* Danish */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<AboutUs />} />
        <Route path="/listing/detailview" element={<ProtectedRoute> <CarDetail /> </ProtectedRoute>} /> {/* This is the route for the detail view of a listing */}
        <Route path="/checkout" element={<ProtectedRoute> <Checkout/> </ProtectedRoute>} /> {/* This is the route for the checkout page */}
        <Route path="/checkout/result" element={<ProtectedRoute> <OrderConfirmation /> </ProtectedRoute>} /> {/* This is the route for the success/faliure page after checkout */}
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;