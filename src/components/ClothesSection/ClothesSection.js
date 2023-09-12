import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ onCardClick, clothingItems }) => {
  return (
    <>
      <div className="card__text-info">
        <p className="card__text-items"> Your items</p>
        <button className="card__text-button">+ Add new</button>
      </div>
      <div className="card_items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </div>
    </>
  );
};
export default ClothesSection;
