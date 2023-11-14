import "./Header.css";
import avatar from "../../images/avatar.png";
import logo from "../../images/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

function Header({ locationValue, onOpenModal, loggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  // const currentAvatar = currentUser.avatar !== "" ? true : false;
  // console.log(currentUser);

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
          <button
            type="button"
            onClick={() => onOpenModal("SignupModal")}
            className="header__signup-btn header__btn"
          >
            Sign Up
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => onOpenModal("LoginModal")}
            className="header__login-btn header__btn"
          >
            Log In
          </button>
        </div>
        <Link to="/profile">
          <div className="header__name">{}</div>
        </Link>
        <div className="header__avatar-image">
          <img src={avatar} alt="profile Picture" />
        </div>
      </div>
    </header>
  );
}

export default Header;
