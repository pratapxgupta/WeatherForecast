import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';

function App() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
  const [forecast, setForecast] = useState([]);

  const toDateFunction = () => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const currentDate = new Date();
    return `${weekdays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const getBgColor = (main) => {
    switch (main?.toLowerCase()) {
      case 'clear': return 'linear-gradient(to right, #fceabb, #f8b500)';
      case 'clouds': return 'linear-gradient(to right, #d7d2cc, #304352)';
      case 'rain': return 'linear-gradient(to right, #4e54c8, #8f94fb)';
      case 'snow': return 'linear-gradient(to right, #e0eafc, #cfdef3)';
      default: return 'linear-gradient(to bottom right, #d3eefd, #e3f2fd)';
    }
  };

  const fetchWeatherData = async (city) => {
    const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';
    const current = axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, units: 'metric', appid: API_KEY }
    });
    const forecast = axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: { q: city, units: 'metric', appid: API_KEY }
    });
    const [currentRes, forecastRes] = await Promise.all([current, forecast]);
    setWeather({ data: currentRes.data, loading: false, error: false });
    setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0));
  };

  const search = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      try {
        await fetchWeatherData(input);
      } catch (error) {
        console.error(error);
        setWeather({ data: {}, loading: false, error: true });
      }
    }
  };

  return (
    <div className="App" style={{ background: getBgColor(weather.data.weather?.[0]?.main) }}>
      <h1 className="app-name">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.loading && <Oval color="black" height={100} width={100} />}
      {weather.error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faFrown} /> <span> City not found</span>
        </div>
      )}
      {weather.data.main && <WeatherCard weather={weather.data} toDate={toDateFunction} />}

      {forecast.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>5-Day Forecast</h3>
          <div className="forecast-scroll">
            {forecast.map((item, index) => (
              <ForecastCard key={index} day={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;