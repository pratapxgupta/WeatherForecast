import React from "react";

function WeatherCard({ weather, toDate }) {
  return (
    <>
      <div className="weather-card">
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
          {Math.round(weather.main.temp)}
          <sup className="deg">°C</sup>
        </div>

        <div className="des-wind">
          <p>{weather.weather[0].description.toUpperCase()}</p>
          <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>📈 Pressure: {weather.main.pressure} hPa</p>
        </div>
      </div>

      <style>
        {`
        .weather-card {
         max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  transition: transform 0.3s ease;
  width: 100%;
        }

        .weather-card:hover {
          transform: translateY(-5px);
        }

        .city-name h2 {
          font-size: 1.8rem;
          margin: 0;
        }

        .city-name span {
          font-size: 1.2rem;
          font-weight: 400;
          opacity: 0.8;
        }

        .date {
          margin: 10px 0;
          font-size: 0.95rem;
          color: #d3e0f0;
        }

        .icon-temp {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 15px 0;
          font-size: 2.5rem;
          font-weight: 600;
        }

        .icon-temp img {
          width: 80px;
          height: 80px;
        }

        .icon-temp .deg {
          font-size: 1.5rem;
          vertical-align: top;
          margin-left: 4px;
          font-weight: bold;
        }

        .des-wind p {
          margin: 6px 0;
          font-size: 0.95rem;
          color: #e8f0fe;
        }

        @media only screen and (max-width: 768px) {
          .weather-card {
            padding: 18px;
            width:90%;
          }

          .icon-temp {
            flex-direction: column;
          }

          .icon-temp img {
            margin-bottom: 10px;
          }

          .city-name h2 {
            font-size: 1.4rem;
          }

          .icon-temp {
            font-size: 2rem;
          }

          .des-wind p {
            font-size: 0.85rem;
          }
        }
        `}
      </style>
    </>
  );
}

export default WeatherCard;
