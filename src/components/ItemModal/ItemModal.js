import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard }) => {
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
            className="modal__preview-text modal__preview-del-text"
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
