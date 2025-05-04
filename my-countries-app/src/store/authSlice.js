// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), // Check for existing token in localStorage
  username: localStorage.getItem('username') || '',  // Get username from localStorage
  token: localStorage.getItem('token') || '',  // Get token from localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, username } = action.payload;
      state.isAuthenticated = true;
      state.username = username;
      state.token = token;
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = '';
      state.token = '';

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
