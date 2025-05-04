import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import axios from 'axios';
import backgroundImage from '../assets/images/registerBackground.jpg'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [country, setCountry] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      if (country.length > 1) {
        setIsLoading(true);
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${country}?fields=name`);
          setSuggestions(response.data.slice(0, 5)); // Limit suggestions to 5 countries
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching countries:", error);
          setIsLoading(false);
        }
      }
    };
    fetchCountries();
  }, [country]);

  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!contactNo) {
      newErrors.contactNo = 'Contact number is required';
    } else if (!phonePattern.test(contactNo)) {
      newErrors.contactNo = 'Invalid phone number';
    }

    if (!country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // If form is invalid, don't proceed
    }

    try {
      // Retrieve existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // If there are already 5 users, remove the oldest one
      if (users.length >= 5) {
        users.shift(); // Remove the oldest user (first in the array)
      }

      // Add new user to the list
      const userData = {
        username,
        password,
        contactNo,
        country,
      };
      users.push(userData);

      // Store updated users in localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Dispatch login action to store the token in Redux and localStorage
      dispatch(login({ token: 'fake-jwt-token', username }));

      // After registration, navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex justify-center items-center h-full bg-gradient-to-b from-transparent to-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-blur-lg bg-opacity-70">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-2 p-3 w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-2 p-3 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                id="contactNo"
                placeholder="Enter your contact number"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className={`mt-2 p-3 w-full border ${errors.contactNo ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {errors.contactNo && <p className="text-sm text-red-500">{errors.contactNo}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Start typing your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`mt-2 p-3 w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
              {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
              <div className="mt-2">
                {suggestions.length > 0 && (
                  <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => setCountry(suggestion.name.common)}
                        className="cursor-pointer hover:bg-blue-100 p-2"
                      >
                        {suggestion.name.common}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
