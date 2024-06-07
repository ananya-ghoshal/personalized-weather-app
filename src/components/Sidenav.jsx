import React from "react";
import Dashboard from "../icons/dashboard.svg";
import Traffic from "../icons/traffic.svg";
import Crops from "../icons/crops.svg";
import Events from "../icons/events.svg";

function Sidenav() {
  return (
    <div className="sidenav">
      <button className="sidenav-element">
        <img className="icons" src={Dashboard}></img>
        Dashboard
      </button>
      <button className="sidenav-element">
        <img className="icons" src={Traffic}></img>
        Traffic
      </button>
      <button className="sidenav-element">
        <img className="icons" src={Crops}></img>
        Crop Yield
      </button>
      <button className="sidenav-element">
        <img className="icons" src={Events}></img>
        Event Planning
      </button>
    </div>
  );
}

export default Sidenav;
