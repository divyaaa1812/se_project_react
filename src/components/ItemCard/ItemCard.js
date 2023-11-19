import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import { useContext } from "react";
import likebutton from "../../images/likebutton.png";
import likebuttonactive from "../../images/likebuttonactive.png";

const ItemCard = ({ item, onCardClick, loggedIn, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const cardLikeButtonClass = `card__like-btn ${
    loggedIn ? "card__like-btn_visible" : "card__like-btn_hidden"
  }`;
  const cardLikeButtonImg = `${isLiked ? likebuttonactive : likebutton}`;
  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <div className="card__item">
      <p className="card__name">{item?.name}</p>
      <img
        src={cardLikeButtonImg}
        className={cardLikeButtonClass}
        onClick={handleLikeClick}
        alt="Button to like an item"
      />
      <img
        alt={item?.name}
        src={item?.imageUrl}
        className="card__image"
        onClick={() => {
          onCardClick(item);
        }}
      />
    </div>
  );
};

export default ItemCard;
