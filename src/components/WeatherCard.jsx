import React from 'react';

function WeatherCard({ weather, toDate }) {
  return (
    <>
      <div className="city-name">
        <h2>
          {weather.name}, <span>{weather.sys.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{toDate()}</span>
      </div>
      <div className="icon-temp">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        {Math.round(weather.main.temp)}<sup className="deg">°C</sup>
      </div>
      <div className="des-wind">
        <p>{weather.weather[0].description.toUpperCase()}</p>
        <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>📈 Pressure: {weather.main.pressure} hPa</p>
      </div>
    </>
  );
}

export default WeatherCard;