import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <div>
      <p className="card_name">{item.name}</p>
      <img
        alt="Illustration of clothing to wear"
        src={item.link}
        className="card_image"
        onClick={() => {
          onCardClick(item);
        }}
      />
    </div>
  );
};

export default ItemCard;
