import "./Header.css";

function Header() {
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src="/images/Logo.png" alt="WhatToWearLogo" />
          </div>
          <div className="header__date">Date</div>
        </div>
        <div className="header__avatar">
          <div>
            <button type="text">+ Add Clothes</button>
          </div>
          <div>Divya Bharathi</div>
          <div className="header__avatar-image">
            <img src="/images/avatar.png" alt="profile Picture" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
