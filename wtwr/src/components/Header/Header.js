import "./Header.css";

function Header() {
  return (
    <div>
      <header className="header">
        <div class="header__logo">
          <div>Logo</div>
          <div>Date</div>
        </div>
        <div class="header__avatar">
          <div>
            <button type="text">Add New Clothes</button>
          </div>
          <div>Name</div>
          <div>avatar</div>
        </div>
      </header>
    </div>
  );
}

export default Header;
