import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";
import "./RegisterModal.css";

const RegisterModal = ({
  handleCloseModal,
  onRegisterUser,
  onOpenModal,
  buttonText,
  linkText,
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
      linkText={linkText}
      onClose={handleCloseModal}
      isOpen={onOpenModal}
      onSubmit={handleSubmit}
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
    </ModalWithForm>
  );
};

export default RegisterModal;
