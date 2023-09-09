import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({ onCardClick }) => {
  return (
    <div className="profile">
      <div className="profile-sidebar">
        <SideBar />
      </div>
      <section className="profile-clothes">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
};

export default Profile;
