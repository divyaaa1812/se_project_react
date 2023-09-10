import "./Header.css";
import avatar from "../../images/avatar.png";
import logo from "../../images/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ locationValue, onOpenModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="WhatToWearLogo" />
          </Link>
        </div>
        <div className="header__date">
          {currentDate}, {locationValue}
        </div>
      </div>
      <div className="header__avatar">
        <div>
          <ToggleSwitch />
        </div>
        <div>
          <button type="text" onClick={onOpenModal}>
            + Add Clothes
          </button>
        </div>
        <div>
          <Link to="/profile" className="header_profile_name_link">
            Divya
          </Link>
        </div>
        <div className="header__avatar-image">
          <img src={avatar} alt="profile Picture" />
        </div>
      </div>
    </header>
  );
}

export default Header;
