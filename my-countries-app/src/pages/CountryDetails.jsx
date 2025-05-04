import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByAlphaCode } from '../services/countriesService';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryCode) {
      setError('Country code is missing in the URL');
      setLoading(false);
      return;
    }

    const fetchCountryDetails = async () => {
      setLoading(true);
      try {
        const data = await getCountryByAlphaCode(countryCode);
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country details.');
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <div className="text-center text-lg">Loading country details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Safely render data
  const renderField = (label, value) => {
    return value ? <p><strong>{label}:</strong> {value}</p> : <p><strong>{label}:</strong> Not Available</p>;
  };

  return (
    <div className="container mx-auto px-6 py-10 bg-white rounded-lg shadow-lg mt-26">
      {/* Back Button */}
      <button
        onClick={handleBackButtonClick}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md mb-6 hover:bg-indigo-700 transition-colors"
      >
        &larr; Back
      </button>

      <div className="flex flex-col items-center mb-8">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-64 h-40 object-cover rounded-xl shadow-lg mb-4"
        />
        <h2 className="text-4xl font-bold text-center text-gray-800">{country.name.common}</h2>
        <p className="text-xl text-gray-600">{country.name.official}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">General Information</h3>
          {renderField("Region", country.region)}
          {renderField("Subregion", country.subregion)}
          {renderField("Capital", Array.isArray(country.capital) ? country.capital.join(', ') : country.capital)}
          {renderField("Population", country.population ? country.population.toLocaleString() : null)}
          {renderField("Area", country.area ? country.area.toLocaleString() + " km²" : null)}
          {renderField("Languages", country.languages ? Object.values(country.languages).join(', ') : null)}
          {renderField("Currencies", country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : null)}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Additional Information</h3>
          {renderField("FIFA Code", country.fifa)}
          {renderField("Start of Week", country.startOfWeek)}
          {renderField("Timezones", country.timezones ? country.timezones.join(', ') : null)}
          {renderField("Google Maps", country.maps?.googleMaps ? <a href={country.maps.googleMaps} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View on Google Maps</a> : null)}
          {renderField("OpenStreetMap", country.maps?.openStreetMaps ? <a href={country.maps.openStreetMaps} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View on OpenStreetMap</a> : null)}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Borders</h3>
        {country.borders ? (
          <ul className="list-disc pl-6">
            {country.borders.map((border) => (
              <li key={border} className="text-lg text-gray-600">{border}</li>
            ))}
          </ul>
        ) : (
          <p>No borders.</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Coat of Arms</h3>
        {country.coatOfArms ? (
          <img src={country.coatOfArms.png} alt={`${country.name.common} Coat of Arms`} className="w-48 mb-4 rounded-lg shadow-lg" />
        ) : (
          <p>No coat of arms available.</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Demographics</h3>
        <p><strong>Gini Coefficient (2019):</strong> {country.gini ? country.gini[2019] : 'N/A'}</p>
        <p><strong>Demonyms (English):</strong> {country.demonyms?.eng?.m ? country.demonyms.eng.m : 'N/A'}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Independence and Status</h3>
        <p><strong>Independent:</strong> {country.independent ? 'Yes' : 'No'}</p>
        <p><strong>UN Member:</strong> {country.unMember ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default CountryDetails;
