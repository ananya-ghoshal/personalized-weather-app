import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

import Search from "../icons/search.svg";
import Dashboard from "../icons/dashboard.svg";
import TrafficIcon from "../icons/traffic.svg";
import CropIcon from "../icons/crops.svg";
import EventIcon from "../icons/events.svg";
import CalendarIcon from "../icons/events.svg";
import LocationIcon from "../icons/current-location.png";

import Clear from "../images/clear.png";
import Cloudy from "../images/cloudy.jpg";
import Humidity from "../images/humidity.png";
import Wind from "../images/wind.png";
import Pressure from "../images/pressure.png";

function Main() {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [cropData, setCropData] = useState("");
  const apiKey = "e191f9c1ba3604661727c459541f1b8c";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&units=imperial&appid=${apiKey}`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  const handleDashboard = (event, tab) => {
    let i, sidenavElement, userGroups;
    // Get all elements with class="sidenavElement" and hide them
    sidenavElement = document.getElementsByClassName("user-groups");
    for (i = 0; i < sidenavElement.length; i++) {
      sidenavElement[i].style.display = "none";
    }

    // Get all elements with class="userGroups" and remove the class "active"
    userGroups = document.getElementsByClassName("user-groups");
    for (i = 0; i < userGroups.length; i++) {
      userGroups[i].className = userGroups[i].className.replace("active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "flex";
    event.currentTarget.className += " active";
  };

  return (
    <div className="container">
      <div className="sidenav">
        {/* dashboard button  */}
        <button
          className="sidenav-element"
          onClick={(e) => handleDashboard(e, "dashboard")}
        >
          <img className="icons" src={Dashboard}></img>
          Dashboard
        </button>
        {/* traffic button  */}
        <button
          className="sidenav-element"
          onClick={(e) => handleDashboard(e, "traffic")}
        >
          <img className="icons" src={TrafficIcon}></img>
          Traffic
        </button>
        {/* crops button */}
        <button
          className="sidenav-element"
          onClick={(e) => handleDashboard(e, "crops")}
        >
          <img className="icons" src={CropIcon}></img>
          Crop Yield
        </button>
        {/* events button  */}
        <button
          className="sidenav-element"
          onClick={(e) => handleDashboard(e, "events")}
        >
          <img className="icons" src={EventIcon}></img>
          Event Planning
        </button>
      </div>

      {/* Main section  */}

      <div className="main">
        <div className="search">
          <div className="search_city">
            <img src={Search} className="icons" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter City"
              type="text"
            />
            <img src={LocationIcon} className="icons" />
          </div>
          <div className="search_date">
            <div className="search_date">
              <img src={CalendarIcon} className="icons" />
              <input type="date" placeholder="Enter date"></input>
            </div>
          </div>
        </div>

        {data.name !== undefined && (
          <>
            {/* HERO SECTION  */}
            <div className="hero">
              {/* Weather card  */}
              <div className="weather-card">
                {/* location  */}
                <div className="location">
                  <p>{data.name}</p>
                  <p>{currentDate}</p>
                  <p>{currentTime}</p>
                </div>
                {/* Temperature display  */}
                <div className="weather-display">
                  <div className="temp">
                    {data.main.temp > 0 ? (
                      <p className="tempDeg">
                        {" "}
                        + {data.main.temp.toFixed()} °C
                      </p>
                    ) : (
                      <p className="tempDeg">
                        {" "}
                        - {data.main.temp.toFixed()} °C
                      </p>
                    )}
                  </div>
                  {/* Temperature description  */}
                  <div className="description">
                    <p>{data.weather[0].main}</p>
                  </div>
                </div>
              </div>

              {/* dashboard weather details according to user groups section  */}
              <div
                id="dashboard"
                className="user-groups active"
                style={{ display: "flex" }}
              >
                dashboard
              </div>

              <div id="traffic" className="user-groups">
                traffic
              </div>

              <div id="crops" className="user-groups">
                crop yield data
              </div>

              <div id="events" className="user-groups">
                events
              </div>
            </div>

            <div className="weather-details">
              <div className="details">
                <p>Feels like</p>
                <p style={{ color: "grey" }}>Today feels like</p>
                <div className="weather-data">
                  <img src={Clear} className="weather-icon" />
                  {data.main.temp > 0 ? (
                    <p> + {data.main.temp.toFixed()} °C</p>
                  ) : (
                    <p> - {data.main.temp.toFixed()} °C</p>
                  )}
                </div>
              </div>
              <div className="details">
                <p>Humidity</p>
                <p style={{ color: "grey" }}>Today Humidity </p>
                <div className="weather-data">
                  <img src={Humidity} className="weather-icon" />
                  {data.main.humidity} %
                </div>
              </div>
              <div className="details">
                <p>Wind</p>
                <p style={{ color: "grey" }}>Today wind speed </p>
                <div className="weather-data">
                  <img src={Wind} className="weather-icon" alt="" />
                  {data.wind.speed} km/h
                </div>
              </div>
              <div className="details">
                <p>Pressure</p>
                <p style={{ color: "grey" }}>Today air pressure</p>
                <div className="weather-data">
                  <img src={Pressure} className="weather-icon" />
                  {data.main.pressure} hpa
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Main;
