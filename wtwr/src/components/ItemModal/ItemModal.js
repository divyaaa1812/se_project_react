import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  console.log(selectedCard);
  return (
    <div className="modal">
      <div className="modal__preview-content">
        <button
          class="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img src={selectedCard.link} className="modal__image"></img>
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
