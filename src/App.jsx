import { useState, useEffect } from 'react'
import './App.css'
import WeatherBox from './components/WeatherBox.jsx'
import WeatherButton from './components/WeatherButton.jsx'
import { ClipLoader } from 'react-spinners';

function App() {
  const [weather, setWeather] = useState(null)
  const cities = ['Seoul', 'New York', 'London', 'Tokyo'];
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentPosition = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const {latitude, longitude} = position.coords;
        setLoading(true);
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9fa31b53113d6b77eef3d3121f20f2b4`;
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather({ error: "Failed to fetch weather data. Please try again." });
        setLoading(false);
      }
    });
  }

  const getWeatherByCity = async (city) => { 
    try {

    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fa31b53113d6b77eef3d3121f20f2b4`;
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    setWeather(data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setWeather({ error: "Failed to fetch weather data. Please try again." });
    setLoading(false);
  }
}

  useEffect(()=>{
    city === null ? getCurrentPosition() : getWeatherByCity(city);
  },[city])

  return (
    <div className="container">
      {loading ? (
        <div className="loading-container">
          <ClipLoader
            color={"#666"}
            loading={loading}
            size={60}
          />
          <p>Loading weather...</p>
        </div>
      ) : (
        <div className="weather-content">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} currentCity={city} />
        </div>
      )}
    </div>
  )
}

export default App
