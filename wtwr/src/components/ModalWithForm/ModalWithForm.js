import "../ModalWithForm/ModalWithForm.css";
const ModalWithForm = ({
  children,
  title,
  buttonText = "Add Garment",
  onClose,
  modalname,
}) => {
  return (
    <div classname={`modal modal_${modalname}`}>
      <div classname="modal__content">
        <button type="button" onClick={onClose} />
        <h1>{title}</h1>
        <form>
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
