import "./ModalWithForm.css";
import React from "react";

const ModalWithForm = ({
  children,
  title,
  name,
  onClose,
  onOpenModal,
  onSubmit,
}) => {
  return (
    <div className={`modal modal_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        <h3 className="modal__header-title">{title}</h3>
        <form className="form" onSubmit={onSubmit}>
          {children}
          {/* <div className="modal__button-container">
            <button
              className="modal__alt-button"
              onClick={onAltClick}
              type="button"
            >
              {altbuttonText}
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
