import "./Header.css";
import avatar from "../../images/avatar.png";
import logo from "../../images/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

function Header({ locationValue, onOpenModal, isLoggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  const currentAvatar = { currentUser }.avatar !== "" ? true : false;
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
        {isLoggedIn ? (
          <>
            <div>
              <button
                className="header__button"
                type="text"
                onClick={onOpenModal}
              >
                + Add Clothes
              </button>
            </div>
            <div className="header__avatar-image">
              <img src={{ currentDate }.avatar} alt="profile Picture" />
            </div>
            <Link to="/profile">
              <div className="header__name">{{ currentUser }.name}</div>
            </Link>
            {currentAvatar ? (
              <div className="header__avatar-image">
                <img src={{ currentUser }?.avatar} alt="Profile picture" />
              </div>
            ) : (
              <p className="header__avatar-default">
                {{ currentUser }?.name[0].toUpperCase()}
              </p>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onOpenModal("SignupModal")}
              className="header__signup-btn header__btn"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => onOpenModal("LoginModal")}
              className="header__login-btn header__btn"
            >
              Log In
            </button>
          </>
        )}
        ;
      </div>
    </header>
  );
}

export default Header;
