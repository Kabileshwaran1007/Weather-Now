import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt } from 'react-icons/fa';
import './Weather.css'; // Import your CSS file

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    try {
      const geoResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: location,
          count: 1,
          language: 'en',
          format: 'json',
        },
      });

      if (geoResponse.data.results.length === 0) {
        setError('Location not found');
        return;
      }

      const { latitude, longitude } = geoResponse.data.results[0];

      const weatherResponse = await axios.get('http://localhost:5000/weather', {
        params: { latitude, longitude },
      });

      setWeather(weatherResponse.data.current_weather); 
    } catch (error) {
      console.error(error);
      setError('Error fetching weather data');
    }
  };

  const getWeatherIcon = (weatherCode) => {
    const iconProps = { size: 100 };
    
    switch (weatherCode) {
      case 0:
        return <FaSun {...iconProps} />;
      case 1:
        return <FaCloud {...iconProps} />;
      case 2:
        return <FaCloudRain {...iconProps} />;
      case 3:
        return <FaSnowflake {...iconProps} />;
      case 4:
        return <FaBolt {...iconProps} />;
      default:
        return <FaSun {...iconProps} />;
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather Now</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="weather-input"
        />
        <button onClick={fetchWeather} className="weather-button">Get Weather</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-details">
          <h3>Current Weather</h3>
          <p>{weather.temperature}°C</p>
          <div className="weather-icon">
            {getWeatherIcon(weather.weather_code)} 
          </div>
          <div className="weather-info">
            <div>
              {/* <p>Rain</p> */}
              {/* <p><strong>{weather.rain} mm</strong></p> */}
            </div>
            <div>
              {/* <p>Wind Speed</p> */}
              {/* <p><strong>{weather.windSpeed} m/s</strong></p> Adjusted to use windSpeed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
