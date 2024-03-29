import React, { useContext } from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

const EditProfileModal = ({ handleCloseModal, onEditProfile, onOpenModal }) => {
  const token = localStorage.getItem("jwt");

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar, token });
  };

  useEffect(() => {
    if (onOpenModal) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [onOpenModal]);

  return (
    <ModalWithForm
      title={"Change profile data"}
      name={"editProfile"}
      buttonText="Save Changes"
      linkText=""
      onClose={handleCloseModal}
      onOpenModal={onOpenModal}
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <label className="modal__label">
          Name*
          <input
            type="text"
            name="name"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            className="input-field"
            value={name}
            onChange={handleNameChange}
          ></input>
        </label>
      </div>
      <div className="form__field">
        <label className="modal__label">
          Avatar URL
          <input
            type="url"
            name="name"
            placeholder="Avatar URL"
            minLength="1"
            maxLength="200"
            className="input-field"
            value={avatar}
            onChange={handleAvatarChange}
          ></input>
        </label>
      </div>
      <div className="modal__button-container">
        <button className="modal__button">Save changes</button>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
