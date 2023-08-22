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
        <h3>{title}</h3>
        <button type="button" onClick={onClose} />
        <form className="form">
          <div>{children}</div>
          <button clasName="modal__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
