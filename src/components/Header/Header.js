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
  const currentUser = useContext(CurrentUserContext);
  // console.log(currentUser);
  const avatar = currentUser?.avatar;
  const name = currentUser?.name;
  const currentAvatar = avatar !== "" ? true : false;
  // console.log(currentAvatar);
  // console.log(name);
  // console.log(currentUser?.email);
  // console.log(avatar);
  console.log(loggedIn);

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
                className="header__button"
                type="button"
                onClick={() => onOpenModal("AddItemModal")}
              >
                + Add Clothes
              </button>
            </div>
            <div className="header__avatar-image">
              <img src={avatar} alt="Profile avatar icon" />
            </div>
            <Link to="/profile">
              <div className="header__name">{name}</div>
            </Link>
            {currentAvatar ? (
              <div className="header__avatar-image">
                <img src={avatar} alt="" />
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
