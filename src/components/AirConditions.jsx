// src/components/AirConditions.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faWind, faCloud, faTint } from '@fortawesome/free-solid-svg-icons';

const AirConditions = ({ weather }) => {
  return (
    <div className="card air-conditions">
      <h4>Air Conditions</h4>
      <div className="conditions-grid">
        <div className="condition">
          <FontAwesomeIcon icon={faTemperatureLow} />
          <p>Real Feel</p>
          <h5>{Math.round(weather.main.feels_like)} °C</h5>
        </div>
        <div className="condition">
          <FontAwesomeIcon icon={faWind} />
          <p>Wind</p>
          <h5>{weather.wind.speed} m/s</h5>
        </div>
        <div className="condition">
          <FontAwesomeIcon icon={faCloud} />
          <p>Clouds</p>
          <h5>{weather.clouds.all} %</h5>
        </div>
        <div className="condition">
          <FontAwesomeIcon icon={faTint} />
          <p>Humidity</p>
          <h5>{weather.main.humidity} %</h5>
        </div>
      </div>
    </div>
  );
};

export default AirConditions;
