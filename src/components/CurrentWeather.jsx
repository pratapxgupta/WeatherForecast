// src/components/CurrentWeather.jsx
import React from 'react';

const CurrentWeather = ({ weather }) => {
  const date = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'short'
  });

  return (
    <div className="card current-weather">
      <div className="location">
        <h3>{weather.name.toUpperCase()}, {weather.sys.country}</h3>
        <p>{date}</p>
      </div>
      <div className="main-weather">
        <h2>{Math.round(weather.main.temp)}°C</h2>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>{weather.weather[0].description}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
