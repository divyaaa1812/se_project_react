import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({
  onCardClick,
  clothingItems,
  handleOpenModal,
  onEditProfileModal,
  onLogout,
  loggedIn,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <div className="profile-sidebar">
        <SideBar
          handleEditProfileModal={onEditProfileModal}
          onLogout={onLogout}
        />
      </div>
      <section className="profile-clothes">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleOpenModal={handleOpenModal}
          loggedIn={loggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
