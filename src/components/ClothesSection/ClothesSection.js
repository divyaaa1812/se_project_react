import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

const filteredItems = defaultClothingItems.filter((item) => {
  return item;
});

const ClothesSection = ({ onCardClick }) => {
  return (
    <>
      <div className="card_items">
        {filteredItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </div>
    </>
  );
};
export default ClothesSection;
