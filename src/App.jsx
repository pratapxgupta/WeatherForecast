import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { RingLoader } from 'react-spinners';

function App() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
  const [forecast, setForecast] = useState([]);
  const API_KEY = 'f00c38e0279b7bc85480c3fe775d518c';

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

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const current = axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { lat, lon, units: 'metric', appid: API_KEY }
      });
      const forecast = axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: { lat, lon, units: 'metric', appid: API_KEY }
      });
      const [currentRes, forecastRes] = await Promise.all([current, forecast]);
      setWeather({ data: currentRes.data, loading: false, error: false });
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0));
    } catch (err) {
      console.error('Geo fetch failed:', err);
      setWeather({ data: {}, loading: false, error: true });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.warn('Geolocation not allowed:', err.message);
          setWeather({ data: {}, loading: false, error: true });
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.warn('Geolocation denied:', err.message);
        }
      );
    }
  }, []);

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
    <div style={{
      background: getBgColor(weather.data.weather?.[0]?.main),
      minHeight: '100vh',
      color: '#fff',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <style>
        {`
          .app-name {
            text-align: center;
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
          }

          .search-bar {
            max-width: 600px;
            margin: 0 auto 2rem;
          }

          .search-container {
            display: flex;
            gap: 10px;
          }

          .city-search {
            flex: 1;
            padding: 1rem;
            border-radius: 12px;
            border: none;
            font-size: 1.1rem;
            background-color: rgba(255, 255, 255, 0.15);
            color: #fff;
            outline: none;
            transition: box-shadow 0.3s ease;
          }

          .city-search::placeholder {
            color: #ccc;
          }

          .city-search:focus {
            box-shadow: 0 0 0 4px rgba(79, 195, 247, 0.5);
            background-color: rgba(255,255,255,0.25);
          }

          .location-btn {
            padding: 0.8rem 1rem;
            border-radius: 12px;
            background-color: #2196f3;
            color: #fff;
            border: none;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
          }

          .error-message {
            color: #ff6b6b;
            text-align: center;
            margin: 1rem 0;
            font-weight: bold;
          }

          .forecast-scroll {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
          }

          .weather-img {
            display: block;
            margin: 1rem auto;
            width: 200px;
            opacity: 0.7;
            transition: opacity 0.3s ease;
          }

          .weather-img:hover {
            opacity: 1;
          }

          @media (max-width: 768px) {
            .app-name {
              font-size: 1.8rem;
            }

            .city-search {
              font-size: 1rem;
              padding: 0.8rem;
            }

            .location-btn {
              padding: 0.7rem;
              font-size: 0.9rem;
            }

            .forecast-scroll {
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            }

            .weather-img {
              width: 150px;
            }
          }
        `}
      </style>

      <h1 className="app-name">Weather App 🌤️</h1>

      <div className="search-bar">
        <div className="search-container">
          <input
            type="text"
            className="city-search"
            placeholder="Enter City Name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={search}
          />
          <button className="location-btn" onClick={getCurrentLocation}>
            📍 Use My Location
          </button>
        </div>
      </div>

      <img
        className="weather-img"
        src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png"
        alt="Weather Art"
      />

      {weather.loading && <RingLoader color="#ffffff" />}
      {weather.error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faFrown} /> <span> City not found</span>
        </div>
      )}

      {weather.data.main && <WeatherCard weather={weather.data} toDate={toDateFunction} />}

      {forecast.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ textAlign: 'center' }}>5-Day Forecast</h3>
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
