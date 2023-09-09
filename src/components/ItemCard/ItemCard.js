import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <div>
      <p className="card_name">{item.name}</p>
      <img
        alt={item.name}
        src={item.imageUrl}
        className="card_image"
        onClick={() => {
          onCardClick(item);
        }}
      />
    </div>
  );
};

export default ItemCard;
