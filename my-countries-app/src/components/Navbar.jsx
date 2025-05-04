import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation hook to detect active route
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access the Redux store
import { FaHome, FaHeart, FaUser } from 'react-icons/fa'; // Importing icons
import { logout } from '../store/authSlice'; // Import the logout action

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dispatch = useDispatch();
  
  // Access the username from the Redux store
  const username = useSelector((state) => state.auth.username);

  // Extract the first two letters of the username for the profile initials
  const profileInitials = username ? username.slice(0, 2).toUpperCase() : ''; // Default to empty if no username

  // Get current location to highlight active route
  const location = useLocation();

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle sign out action
  const handleSignOut = () => {
    dispatch(logout()); // Dispatch the logout action to clear user data from Redux store
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.profile-dropdown') === null) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-indigo-600 py-4 shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo or Home link */}
        <Link to="/" className="text-white text-3xl font-bold hover:text-indigo-300 transition-all">
          GlobeGuide
        </Link>

        {/* Links to Home and Favourites pages */}
        <div className="flex space-x-6 ml-auto">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 text-white text-xl hover:text-indigo-300 transition-all 
                        ${location.pathname === '/' ? 'border-b-2 border-white' : ''}`}
          >
            <FaHome /> 
            <span>Home</span>
          </Link>
          
          <Link 
            to="/favourites" 
            className={`flex items-center space-x-2 text-white text-xl hover:text-indigo-300 transition-all 
                        ${location.pathname === '/favourites' ? 'border-b-2 border-white' : ''}`}
          >
            <FaHeart /> 
            <span>Favourites</span>
          </Link>
        </div>

        {/* User profile - showing initials if logged in */}
        <div className="flex items-center space-x-4 ml-6 relative">
          {username ? (
            <div className="flex items-center profile-dropdown" onClick={toggleDropdown}>
              {/* Profile initials */}
              <div className="bg-white text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold cursor-pointer">
                {profileInitials}
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48">
                  <div className="py-2">
                    <button 
                      onClick={handleSignOut} 
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white text-lg hover:text-indigo-300 transition-all">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
