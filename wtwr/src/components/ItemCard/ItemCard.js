import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <div>
      <div>
        <img
          src={item.link}
          className="card_image"
          onClick={() => {
            onCardClick(item);
          }}
        />
      </div>
      <div className="card_name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
