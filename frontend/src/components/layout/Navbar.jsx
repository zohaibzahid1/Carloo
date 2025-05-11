import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button.jsx'
import { Menu, X, User, LogIn, Car, PenSquare, ChevronDown } from 'lucide-react';
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "../ui/dropdown-menu";
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../../store/slices/authSlice.js';
//import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { isAuthenticated, user} = useSelector(state => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-carloo-500" />
            <span className="text-2xl font-heading font-bold text-gray-900">Carloo</span>
          </Link>

        
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-carloo-500 font-medium transition-colors">
              Home
            </Link>
            <Link to="/listings" className="text-gray-700 hover:text-carloo-500 font-medium transition-colors">
              Cars
            </Link>
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-700 hover:text-carloo-500 font-medium transition-colors flex items-center gap-0.5 text-sm">
                  Listings
                  <ChevronDown className="h-2.5 w-2.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate('/listing/mylistings')}>
                    My Listings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/listing/myrents')}>
                    My Rents
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Link to="/blogs" className="text-gray-700 hover:text-carloo-500 font-medium transition-colors">
              Blog
            </Link>
            
            <Link to="/about" className="text-gray-700 hover:text-carloo-500 font-medium transition-colors">
              About Us
            </Link>
            
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button onClick={handleSignOut} variant="outline" className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <Button onClick={() => navigate('/login')} className="bg-carloo-500 hover:bg-carloo-600 flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t mt-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-carloo-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className="block py-2 text-gray-700 hover:text-carloo-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cars
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/listing/mylistings" 
                  className="block py-2 text-gray-700 hover:text-carloo-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link 
                  to="/listing/myrents" 
                  className="block py-2 text-gray-700 hover:text-carloo-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Rents
                </Link>
              </>
            )}
            <Link 
              to="/blogs" 
              className="block py-2 text-gray-700 hover:text-carloo-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            
            <Link 
              to="/about" 
              className="block py-2 text-gray-700 hover:text-carloo-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            
           <div className="flex flex-col space-y-2 pt-4 border-t">
              {isAuthenticated ? (
                <Button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }} 
                  variant="outline" 
                  className="w-full"
                >
                  Sign Out
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }} 
                  className="w-full bg-carloo-500 hover:bg-carloo-600"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;