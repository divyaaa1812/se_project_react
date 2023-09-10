import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./profile.css";

const profile = ({ onCardClick, clothingItems }) => {
  return (
    <div className="profile">
      <div className="profile-sidebar">
        <SideBar />
      </div>
      <section className="profile-clothes">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
};

export default Profile;
