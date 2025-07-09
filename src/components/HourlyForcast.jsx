// src/components/HourlyForecast.jsx
import React from 'react';

const HourlyForecast = ({ data }) => {
  return (
    <div className="card forecast-card">
      <h4>Today's Forecast</h4>
      <p className="sub">{data.length} available forecasts</p>
      <div className="forecast-grid">
        {data.map((hour, i) => {
          const time = new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div key={i} className="forecast-item">
              <p>{time}</p>
              <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="" />
              <h5>{Math.round(hour.main.temp)}°C</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
