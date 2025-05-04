import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries, setLoading, setUserFavorites } from '../store/countriesSlice';
import { getCountriesByRegion, getAllCountries, searchCountriesByName, getCountriesByLanguage } from '../services/countriesService';
import CountryCard from '../components/CountryCard';
import Navbar from '../components/Navbar';

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const error = useSelector((state) => state.countries.error);
  const favourites = useSelector((state) => state.countries.favourites);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regions, setRegions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(''); // State for language filter
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
  const [languages, setLanguages] = useState([]); // State for storing unique languages

  // Fetch user-specific favorites from localStorage
  useEffect(() => {
    dispatch(setUserFavorites());
  }, [dispatch]);

  // Fetch regions and countries on component mount
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regionData = await fetch("https://restcountries.com/v3.1/all");
        const countriesData = await regionData.json();
        const uniqueRegions = [...new Set(countriesData.map(country => country.region))];
        setRegions(uniqueRegions);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    const fetchAllCountries = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getAllCountries();
        dispatch(setCountries(data));
        dispatch(setLoading(false));

        // Extract unique languages from countries data
        const allLanguages = new Set();
        data.forEach(country => {
          if (country.languages) {
            Object.values(country.languages).forEach(language => {
              allLanguages.add(language);
            });
          }
        });
        // Convert the Set to an array and set the languages state
        setLanguages([...allLanguages]);
      } catch (error) {
        console.error("Error fetching all countries:", error);
        dispatch(setLoading(false));
        dispatch({ type: 'countries/setError', payload: error.message });
      }
    };

    fetchRegions();
    fetchAllCountries();
  }, [dispatch]);

  // Handle search input
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        dispatch(setLoading(true));
        try {
          const data = await searchCountriesByName(searchQuery);
          dispatch(setCountries(data));
          dispatch(setLoading(false));
        } catch (error) {
          console.error("Error searching countries:", error);
          dispatch(setLoading(false));
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery, dispatch]);

  // Handle region click
  const handleRegionClick = async (region) => {
    setSelectedRegion(region);
    dispatch(setLoading(true));
    try {
      const data = await getCountriesByRegion(region);
      dispatch(setCountries(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching countries by region:", error);
      dispatch(setLoading(false));
      dispatch({ type: 'countries/setError', payload: error.message });
    }
  };

  // Handle 'All Countries' button click
  const handleAllCountriesClick = async () => {
    setSelectedRegion('');
    dispatch(setLoading(true));
    try {
      const data = await getAllCountries();
      dispatch(setCountries(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching all countries:", error);
      dispatch(setLoading(false));
      dispatch({ type: 'countries/setError', payload: error.message });
    }
  };

  // Handle Language Filter change
  const handleLanguageFilter = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // Fetch countries based on selected language
  useEffect(() => {
    const fetchCountriesByLanguage = async () => {
      if (selectedLanguage) {
        dispatch(setLoading(true));
        try {
          const data = await getCountriesByLanguage(selectedLanguage);
          dispatch(setCountries(data));
          dispatch(setLoading(false));
        } catch (error) {
          console.error("Error fetching countries by language:", error);
          dispatch(setLoading(false));
        }
      }
    };

    fetchCountriesByLanguage();
  }, [selectedLanguage, dispatch]);

  // Toggle sorting order
  const handleSortOrderToggle = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Sort countries based on name
  const sortedCountries = [...countries].sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen mt-16">
      <Navbar /> {/* Include Navbar here */}

      <header className="text-center py-12 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400">
        <h1 className="text-4xl text-white font-bold mb-4">Explore the World</h1>
        <p className="text-xl text-white">Discover countries, regions, and everything in between</p>
      </header>

      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        {/* Search, Sort, and Language Filter in a row */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by country name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          {/* Language Filter Dropdown */}
          <select
            value={selectedLanguage}
            onChange={handleLanguageFilter}
            className="p-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="">Filter by Language</option>
            {languages.map((language, index) => (
              <option key={index} value={language.toLowerCase()}>
                {language}
              </option>
            ))}
          </select>
          {/* Sort by Name Button */}
          <button
            onClick={handleSortOrderToggle}
            className="p-2 w-full sm:w-3/4 md:w-1/4 lg:w-1/4 bg-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-xl">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div>
            {/* Region Filters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
              <div
                className="cursor-pointer p-4 bg-indigo-600 text-white text-center rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
                onClick={handleAllCountriesClick}
              >
                <h3 className="text-lg font-semibold">All Countries</h3>
              </div>
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-4 bg-indigo-600 text-white text-center rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
                  onClick={() => handleRegionClick(region)}
                >
                  <h3 className="text-lg font-semibold">{region}</h3>
                </div>
              ))}
            </div>

            {/* Display countries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedCountries.map((country, index) => (
                <CountryCard
                  key={index}
                  country={country}
                  isFavorite={favourites.some((fav) => fav.cca3 === country.cca3)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
