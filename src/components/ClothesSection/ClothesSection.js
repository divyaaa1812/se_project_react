import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ onCardClick, clothingItems }) => {
  return (
    <>
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
