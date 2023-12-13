import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__preview-text modal__preview-del-text modal__preview-delete-btn ${
    isOwn
      ? `modal__preview-delete-btn_visible`
      : `modal__preview-delete-btn_hidden`
  }`;

  return (
    <div className="modal">
      <div className="modal__preview-content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={selectedCard.imageUrl}
          className="modal__image"
          alt={selectedCard.name}
        ></img>
        <div className="modal__preview-info">
          <div className="modal__card-info">
            <div className="modal__preview-text">
              <p>{selectedCard.name}</p>
            </div>
            <div className="modal__preview-text">
              <p>Weather: {selectedCard.weather}</p>
            </div>
          </div>
          <button
            className={itemDeleteButtonClassName}
            type="button"
            onClick={() => handleDeleteCard(selectedCard)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
