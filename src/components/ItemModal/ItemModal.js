import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className="modal">
      <div className="modal__preview-content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={selectedCard.link}
          className="modal__image"
          alt={selectedCard.name}
        ></img>
        <div className="modal__preview-text">
          <p>{selectedCard.name}</p>
        </div>
        <div className="modal__preview-text">
          <p>Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
