import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

// Fetch all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/all?fields=name,flags,population,region,languages,capital,cca3`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};

// Fetch countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries by region (${region}):`, error);
    throw error;
  }
};

// Search countries by name
export const searchCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching countries by name (${name}):`, error);
    throw error;
  }
};

// Fetch countries by language
export const getCountriesByLanguage = async (language) => {
  try {
    const response = await axios.get(`${API_URL}/lang/${language}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries by language (${language}):`, error);
    throw error;
  }
};

export const getCountryByAlphaCode = async (alphaCode) => {
  try {
    const response = await axios.get(`${API_URL}/alpha/${alphaCode}`);
    console.log(`Fetching country with code: ${alphaCode}`); // Log the alpha code
    return response.data;
  } catch (error) {
    console.error(`Error fetching country by alpha code (${alphaCode}):`, error);
    throw error;  
  }
};
