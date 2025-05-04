import React from 'react';
import { useSelector } from 'react-redux';
import CountryCard from '../components/CountryCard';

const Favourites = () => {
  const favourites = useSelector((state) => state.countries.favourites);

  return (
    <div className="bg-gray-50 min-h-screen mt-16">
      <header className="text-center py-12 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400">
        <h1 className="text-4xl text-white font-bold mb-4">Your Favourite Countries</h1>
        <p className="text-xl text-white">Here are the countries you love!</p>
      </header>

      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.length > 0 ? (
            favourites.map((country, index) => (
              <CountryCard key={index} country={country} isFavorite={true} />
            ))
          ) : (
            <p>No favourite countries added yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
