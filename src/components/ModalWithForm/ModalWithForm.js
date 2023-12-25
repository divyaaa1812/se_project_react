import "./ModalWithForm.css";
import React from "react";

const ModalWithForm = ({
  children,
  title,
  name,
  buttonText = "Btn Text",
  altbuttonText = "Alt btn text",
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
          <div className="modal__button-container">
            <button className="modal__button" type="submit" name="btn">
              {buttonText}
            </button>
            <button className="modal__alt-button" type="submit" name="altbtn">
              {altbuttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
