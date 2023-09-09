import avatar from "../../images/avatar.png";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  return (
    <>
      <div className="sidebar__avatar-image">
        <img src={avatar} alt="profile Picture" />
      </div>
      <div>
        <Link to="/profile" className="sidebar__profile-info">
          Divya
        </Link>
      </div>
    </>
  );
};

export default SideBar;
