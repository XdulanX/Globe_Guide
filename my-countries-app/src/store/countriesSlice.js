// countriesSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    favourites: [], // We'll load this dynamically for each user
    isLoading: false,
    error: null,
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    toggleFavorite: (state, action) => {
      const country = action.payload;
      const username = localStorage.getItem('username'); // Fetch username to use in the key
      const userFavorites = JSON.parse(localStorage.getItem(`favorites-${username}`)) || [];

      const isFavorite = userFavorites.some(fav => fav.cca3 === country.cca3);

      if (isFavorite) {
        // Remove from favorites
        const updatedFavorites = userFavorites.filter(fav => fav.cca3 !== country.cca3);
        localStorage.setItem(`favorites-${username}`, JSON.stringify(updatedFavorites));
        state.favourites = updatedFavorites; // Update the state
      } else {
        // Add to favorites
        const updatedFavorites = [...userFavorites, country];
        localStorage.setItem(`favorites-${username}`, JSON.stringify(updatedFavorites));
        state.favourites = updatedFavorites; // Update the state
      }
    },
    setUserFavorites: (state) => {
      const username = localStorage.getItem('username');
      const favoritesFromStorage = JSON.parse(localStorage.getItem(`favorites-${username}`)) || [];
      state.favourites = favoritesFromStorage;
    },
  },
});

export const { setCountries, setLoading, setError, toggleFavorite, setUserFavorites } = countriesSlice.actions;

export const selectCountries = (state) => state.countries.countries;
export const selectFavourites = (state) => state.countries.favourites;
export const selectLoading = (state) => state.countries.isLoading;

export default countriesSlice.reducer;
