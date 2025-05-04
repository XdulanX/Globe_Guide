import React from 'react';
import { useDispatch } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toggleFavorite } from '../store/countriesSlice'; // Action to add/remove from favorites

const CountryCard = ({ country, isFavorite }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle navigating to the country details page
  const handleClick = () => {
    console.log("Navigating to:", country.cca3);
    navigate(`/country/${country.cca3}`); // Correctly use navigate
  };

  // Handle adding/removing from favorites
  const handleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click from firing
    dispatch(toggleFavorite(country)); // Add/remove from favorites
  };

  // Safely render fields with fallback if missing
  const renderField = (label, value) => {
    return value ? <p className="text-sm"><strong>{label}:</strong> {value}</p> : <p className="text-sm"><strong>{label}:</strong> Not Available</p>;
  };

  const renderLanguages = (languages) => {
    return languages ? Object.values(languages).join(', ') : 'Not Available';
  };

  return (
    <div
      className="relative cursor-pointer p-4 bg-white text-center rounded-lg shadow-md hover:bg-gray-100"
      onClick={handleClick}
    >
      <img src={country.flags.svg} alt={country.name.common} className="w-32 mx-auto mb-4" />
      <h3 className="text-xl font-semibold">{country.name.common}</h3>

      {/* Render Capital */}
      {renderField('Capital', country.capital)}

      {/* Render Population */}
      {renderField('Population', country.population ? country.population.toLocaleString() : null)}

      {/* Render Languages */}
      <p className="text-sm"><strong>Languages:</strong> {renderLanguages(country.languages)}</p>
      
      {/* Favorite Button */}
      <button
        className="absolute top-2 right-2 text-xl"
        onClick={handleFavorite}
      >
        {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400" />}
      </button>
    </div>
  );
};

export default CountryCard;
