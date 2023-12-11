import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = ({
  onCardClick,
  clothingItems,
  onOpenModal,
  onEditProfileModal,
  onLogout,
  loggedIn,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <div className="profile-sidebar">
        <SideBar
          onOpenModal={onOpenModal}
          onLogout={onLogout}
          handleEditProfileModal={() => onEditProfileModal()}
        />
      </div>
      <section className="profile-clothes">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onOpenModal={onOpenModal}
          loggedIn={loggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
