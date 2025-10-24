import React from 'react';

const WeatherBox = ({ weather }) => {
  if (!weather) return null;

  if (weather.error) {
    return (
      <div className="weather-card error-card">
        <div className="error-message">
          <h3>⚠️ Oops!</h3>
          <p>{weather.error}</p>
        </div>
      </div>
    );
  }

  const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);
  const kelvinToFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9/5 + 32);
  
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeatherIcon = (iconCode, description) => {
    if (iconCode === null) return null;

    return (
      <img 
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={description || ''}
        className="weather-icon-large"
      />
    );
  };

  return (
    <div className="weather-card">
      <div className="city-name">{weather.name}</div>
      <div className="date-info">{getCurrentDate()}</div>
      
      <div className="weather-main-content">
        <div className="weather-icon-section">
          {getWeatherIcon(weather.weather[0].icon, weather.weather[0].description)}
        </div>
        
        <div className="temperature-display">
          <span className="temperature-main">{kelvinToCelsius(weather.main.temp)}</span>
          <span className="temperature-unit">°C</span>
          <span className="temperature-slash"> / </span>
          <span className="temperature-fahrenheit">{kelvinToFahrenheit(weather.main.temp)}°F</span>
        </div>
      </div>
      
      <div className="weather-description">
        {weather.weather[0].description}
      </div>
    </div>
  );
};

export default WeatherBox;