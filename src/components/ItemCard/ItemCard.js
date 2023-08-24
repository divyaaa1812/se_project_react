import "./ItemCard.css";

const ItemCard = ({ key, item, onCardClick }) => {
  return (
    <div>
      <div>
        <div className="card_name">{item.name}</div>
        <img
          src={item.link}
          className="card_image"
          onClick={() => {
            onCardClick(item);
          }}
        />
      </div>
    </div>
  );
};

export default ItemCard;
