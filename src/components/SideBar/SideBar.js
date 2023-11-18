import avatar from "../../images/avatar.png";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

const SideBar = ({ onEditProfileModal, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <>
      <div className="sidebar__avatar-image">
        <img src={currentUser?.avatar} alt="profile Picture" />
      </div>
      <div>
        <Link to="/profile" className="sidebar__profile-info">
          {currentUser?.name}
        </Link>
      </div>
      <div className="profile__sidebar-button-container">
        <button
          className="profile__sidebar-button"
          type="button"
          onClick={onEditProfileModal}
        >
          Change Profile Data
        </button>
        <button
          className="profile__sidebar-button"
          type="button"
          onClick={handleLogoutClick}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default SideBar;
