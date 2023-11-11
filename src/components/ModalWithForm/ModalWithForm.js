import "./ModalWithForm.css";
import React from "react";
import { Link } from "react-router-dom";

const ModalWithForm = ({
  children,
  buttonText = "Add Text",
  linkText = "Add link",
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
          <div className="modal__button-container">
            <button className="modal__button" type="submit">
              {buttonText}
            </button>
            <Link to="/" className="modal__link">
              {linkText}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
