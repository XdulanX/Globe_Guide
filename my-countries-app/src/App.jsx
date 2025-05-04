// App.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CountryDetails from './pages/CountryDetails';
import Favourites from './pages/Favourites';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* Conditionally render the Navbar: Don't show it for Login and Register */}
      {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}

      {/* Define the routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/country/:countryCode" element={<CountryDetails />} />
        <Route path="/favourites" element={<PrivateRoute><Favourites /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default App;
