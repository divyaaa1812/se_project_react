import "./Header.css";
import avatar from "../../images/avatar.png";
import logo from "../../images/Logo.png";

function Header({ locationValue, onOpenModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src={logo} alt="WhatToWearLogo" />
          </div>
          <div className="header__date">
            {currentDate}, {locationValue}
          </div>
        </div>
        <div className="header__avatar">
          <div>
            <button type="text" onClick={onOpenModal}>
              + Add Clothes
            </button>
          </div>
          <div>Divya</div>
          <div className="header__avatar-image">
            <img src={avatar} alt="profile Picture" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
