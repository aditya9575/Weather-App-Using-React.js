import React from "react";
import "./currentWeather.css";

const CurrentWeather = ({data}) => {
  return (
    <div className="weather">
      {/* first section of temprature starts here */}
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>

        {/* on the right side we will have image that will picturize the weather conditions */}
        <img className="weather-icon" src={`icons/${data.weather[0].icon}.png`} alt="weather" />
      </div>
      {/* first section of temprature ends here */}

      {/* first section of other details starts here */}
      <div className="bottom">
        <p className="temprature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label ">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
      {/* first section of other details ends here */}
    </div>
  );
};

export default CurrentWeather;
