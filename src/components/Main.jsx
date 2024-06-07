import { useState } from "react";
import React from "react";
import axios from "axios";
import Search from "../icons/search.svg";
import Clear from "../images/clear.png";
import Clouds from "../images/clouds.png";
import Drizzle from "../images/drizzle.png";
import Humidity from "../images/humidity.png";
import Mist from "../images/mist.png";
import Rain from "../images/rain.png";
import Snow from "../images/snow.png";
import Wind from "../images/wind.png";
import Pressure from "../images/pressure.png";
import Sunny from "../images/sunny.jpg";

function Main() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&units=imperial&appid=e191f9c1ba3604661727c459541f1b8c`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  let weather = document.getElementsByClassName("weather-card");
  return (
    <div className="main">
      <div className="search">
        <img src={Search} className="icons" />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {data.name !== undefined && (
        <>
          <div className="hero">
            <div className="weather-card">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="weather-display">
                <div className="temp">
                  {data.main.temp > 0 ? (
                    <p className="tempDeg"> + {data.main.temp.toFixed()} °C</p>
                  ) : (
                    <p className="tempDeg"> - {data.main.temp.toFixed()} °C</p>
                  )}
                </div>
                <div className="description">
                  <p>{data.weather[0].main}</p>
                </div>
              </div>
            </div>

            <div className="map"></div>
          </div>

          <div className="weather-details">
            <div className="details">
              <p>Feels like</p>
              <p style={{ color: "grey" }}>Today feels like</p>
              <p className="weather-data">
                <img src={Clear} className="weather-icon" />
                {data.main.temp > 0 ? (
                  <p> + {data.main.temp.toFixed()} °C</p>
                ) : (
                  <p> - {data.main.temp.toFixed()} °C</p>
                )}
              </p>
            </div>
            <div className="details">
              <p>Humidity</p>
              <p style={{ color: "grey" }}>Today Humidity </p>
              <p className="weather-data">
                <img src={Humidity} className="weather-icon" />
                {data.main.humidity} %
              </p>
            </div>
            <div className="details">
              <p>Wind</p>
              <p style={{ color: "grey" }}>Today wind speed </p>
              <p className="weather-data">
                <img src={Wind} className="weather-icon" alt="" />
                {data.wind.speed} km/h
              </p>
            </div>
            <div className="details">
              <p>Pressure</p>
              <p style={{ color: "grey" }}>Today air pressure</p>
              <p className="weather-data">
                <img src={Pressure} className="weather-icon" />
                {data.main.pressure} hpa
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
