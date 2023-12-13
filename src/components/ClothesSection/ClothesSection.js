import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

const ClothesSection = ({
  onCardClick,
  clothingItems,
  onOpenModal,
  loggedIn,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const ownedItems = clothingItems.filter((currentUserOwnedItem) => {
    return currentUserOwnedItem.owner === currentUser?._id;
  });

  return (
    <>
      <div className="card__text-info">
        <p className="card__text-items"> Your items</p>
        <button
          className="card__text-button"
          type="submit"
          onClick={() => onOpenModal("AddItemModal")}
        >
          + Add new
        </button>
      </div>
      <div className="card_items">
        {""}
        {ownedItems.map((ownedCard) => {
          return (
            <ItemCard
              key={ownedCard?._id}
              cardData={ownedCard}
              onCardClick={onCardClick}
              loggedIn={loggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </>
  );
};
export default ClothesSection;
