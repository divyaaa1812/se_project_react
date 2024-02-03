import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";
import "./RegisterModal.css";

const RegisterModal = ({
  handleCloseModal,
  onRegisterUser,
  onOpenModal,
  buttonText,
  altbuttonText,
}) => {
  // set states for handling user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatarUrl] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterUser({ name, avatar, email, password });
  };

  const handleAltClick = (e) => {
    onOpenModal("LoginModal");
  };

  const enabled =
    email.length > 0 &&
    password.length > 0 &&
    name.length > 0 &&
    avatar.length > 0;

  useEffect(() => {
    if (onOpenModal) {
      setEmail("");
      setName("");
      setPassword("");
      setAvatarUrl("");
    }
  }, [onOpenModal]);

  return (
    <ModalWithForm
      title={"Sign Up"}
      name="register"
      buttonText={buttonText}
      altbuttonText={altbuttonText}
      onClose={handleCloseModal}
      isOpen={onOpenModal}
      onSubmit={handleSubmit}
      onAltClick={handleAltClick}
    >
      <div className="form__field">
        <label>
          Email*
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={handleEmailChange}
              required
            ></input>
          </div>
        </label>
      </div>
      <div className="form__field">
        <label>
          Password*
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </label>
      </div>
      <div className="form__field">
        <label>
          Name
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={handleNameChange}
            ></input>
          </div>
        </label>
      </div>
      <div className="form__field">
        <label>
          Avatar URL
          <div>
            <input
              type="url"
              name="avatarUrl"
              placeholder="AvatarURL"
              className="input-field"
              value={avatar}
              onChange={handleAvatarChange}
            ></input>
          </div>
        </label>
      </div>
      <div className="modal__button-container">
        <button className="modal__button" disabled={!enabled}>
          {buttonText}
        </button>
        <button
          className="modal__alt-button"
          onClick={handleAltClick}
          type="button"
        >
          {altbuttonText}
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
