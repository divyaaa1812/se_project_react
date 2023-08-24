import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  onClose,
  title,
  name,
  buttonText = "Add Garment",
}) => {
  return (
    <div className={`modal modal_${name}`}>
      <div className="modal__content">
        <button
          class="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <form className="form">
          <h3 className="modal__header-title">{title}</h3>
          <div>{children}</div>
          <button className="modal__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
