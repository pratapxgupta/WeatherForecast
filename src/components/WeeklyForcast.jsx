// src/components/WeeklyForecast.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faWind, faTint } from '@fortawesome/free-solid-svg-icons';

const WeeklyForecast = ({ data }) => {
  return (
    <div className="card weekly-forecast">
      <h4>Weekly Forecast</h4>
      <div className="weekly-grid">
        {data.map((day, i) => {
          const date = new Date(day.dt_txt);
          const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });

          return (
            <div className="forecast-row" key={i}>
              <h5>{weekday}</h5>
              <p>{day.weather[0].description}</p>
              <div className="details">
                <FontAwesomeIcon icon={faTemperatureHigh} /> {Math.round(day.main.temp)}°C
                <FontAwesomeIcon icon={faWind} /> {day.wind.speed} m/s
                <FontAwesomeIcon icon={faTint} /> {day.main.humidity} %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
