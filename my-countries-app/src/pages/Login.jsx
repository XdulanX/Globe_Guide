// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/registerBackground.jpg'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = users.find(user => user.username === username && user.password === password);

      if (foundUser) {
        const token = 'fake-jwt-token'; // In a real-world scenario, you'd get a token from your backend

        // Dispatch login action to update Redux state
        dispatch(login({ token, username }));

        // Redirect to home page after successful login
        navigate('/');
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex justify-center items-center h-full bg-gradient-to-b from-transparent to-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-blur-lg bg-opacity-70">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
