import "./Header.css";
import logo from "../../images/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

function Header({ locationValue, onOpenModal, loggedIn }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser } = useContext(CurrentUserContext);
  const avatar = currentUser.avatar;
  const name = currentUser.name;
  const currentAvatar = avatar !== "";

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
        {loggedIn ? (
          <>
            <div>
              <button
                className="header__btn"
                type="button"
                onClick={() => onOpenModal("AddItemModal")}
              >
                + Add Clothes
              </button>
            </div>
            {/* <div className="header__avatar-image">
              <img src={avatar} alt="Profile avatar icon" />
            </div> */}
            <Link className="header__name" to="/profile">
              <div>{name}</div>
            </Link>
            {!!currentAvatar ? (
              <div>
                <img
                  src={avatar}
                  alt={`avatar of ${currentUser.name}`}
                  className="header__avatar-image"
                />
              </div>
            ) : (
              <p className="header__avatar-default">{name[0].toUpperCase()}</p>
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
      </div>
    </header>
  );
}

export default Header;
