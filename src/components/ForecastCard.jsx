import React from 'react';
import './ForecastCard.css';

function ForecastCard({ day }) {
  const date = new Date(day.dt_txt);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="forecast-card">
      <p className="day">{dayName}</p>
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt={day.weather[0].description}
      />
      <p className="temp">{Math.round(day.main.temp)}°C</p>
    </div>
  );
}

export default ForecastCard;
//