import React from 'react';

const WeatherButton = ({ cities, setCity, currentCity }) => {
  return (
    <div className="weather-buttons">
      <button 
        className={`weather-btn ${currentCity === null ? 'active' : ''}`}
        onClick={() => setCity(null)}
      >
        📍 Current Location
      </button>
      
      {cities.map(city => (
        <button 
          key={city} 
          className={`weather-btn ${currentCity === city ? 'active' : ''}`}
          onClick={() => setCity(city)}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default WeatherButton;
