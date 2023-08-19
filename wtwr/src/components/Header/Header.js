import "./Header.css";
import headerLogo from "../images/Logo.png";
import avatar from "../images/avatar.png";

function Header() {
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src={headerLogo} alt="WhatToWearLogo" />
          </div>
          <div className="header__date">Date</div>
        </div>
        <div className="header__avatar">
          <div>
            <button type="text">+ Add Clothes</button>
          </div>
          <div>Divya Bharathi</div>
          <div className="header__avatar-image">
            <img src={avatar} alt="profile Picture" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
