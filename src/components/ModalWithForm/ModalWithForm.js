import "./ModalWithForm.css";
import React from "react";

const ModalWithForm = ({
  children,
  buttonText = "Add Garment",
  title,
  name,
  onClose,
  isOpen,
  onSubmit,
}) => {
  return (
    <div className={`modal modal_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal__header-title">{title}</h3>
        <form className="form" onSubmit={onSubmit}>
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
