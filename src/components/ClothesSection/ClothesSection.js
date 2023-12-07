import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";

const ClothesSection = ({ onCardClick, clothingItems, handleOpenModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const ownedItems = clothingItems.filter((item) => {
    return item.owner === currentUser;
  });

  return (
    <>
      <div className="card__text-info">
        <p className="card__text-items"> Your items</p>
        <button
          className="card__text-button"
          type="submit"
          onClick={handleOpenModal}
        >
          + Add new
        </button>
      </div>
      <div className="card_items">
        {""}
        {ownedItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </div>
    </>
  );
};
export default ClothesSection;
