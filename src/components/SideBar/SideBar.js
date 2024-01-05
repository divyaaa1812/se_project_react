import avatar from "../../images/avatar.png";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

const SideBar = ({ onOpenModal, handleEditProfileModal, onLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <div className="sidebar__user-info-container">
        <div>
          <img
            src={currentUser?.avatar}
            alt={`avatar of ${currentUser?.name}`}
            className="sidebar__avatar-image"
          />
        </div>
        <div>
          <Link to="/profile" className="sidebar__profile-info">
            {currentUser?.name}
          </Link>
        </div>
      </div>
      <div className="profile__sidebar-button-container">
        <button
          className="profile__sidebar-button"
          type="button"
          onClick={() => onOpenModal("editProfile")}
          onSubmit={() => handleEditProfileModal()}
        >
          Change Profile Data
        </button>
        <button
          className="profile__sidebar-button"
          type="button"
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default SideBar;
