import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from './components/layout/Navbar.jsx';

// Placeholder components for the routes
const Listings = () => <div>Listings Page</div>;
const Blog = () => <div>Blog Page</div>;
const CreateBlog = () => <div>Create Blog Page</div>;
const About = () => <div>About Us Page</div>;
const Admin = () => <div>Admin Page</div>;
const Auth = () => <div>Authentication Page</div>;

function App() {
  // All the routes are defined here that will be used in the application using Link of react-router-dom
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;