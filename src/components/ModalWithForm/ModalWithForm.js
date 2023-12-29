import "./ModalWithForm.css";
import React from "react";

const ModalWithForm = ({
  children,
  title,
  name,
  buttonText = "Btn Text",
  altbuttonText = "",
  onClose,
  isOpen,
  onSubmit,
  onAltClick,
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
          <div className="modal__button-container">
            <button className="modal__button" type="submit">
              {buttonText}
            </button>
            <button className="modal__alt-button" onClick={onAltClick}>
              {altbuttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
