import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";

const LoginModal = ({
  handleCloseModal,
  onUserLogin,
  onOpenModal,
  buttonText,
  altbuttonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.nativeEvent.submitter.name
    onUserLogin({ email, password });
    // if (e.nativeEvent.submitter.name == "btn")
    // else if (e.nativeEvent.submitter.name == "altbtn")
  };

  const handleAltClick = (e) => {
    onOpenModal("SignupModal");
  };

  useEffect(() => {
    if (onOpenModal) {
      setEmail("");
      setPassword("");
    }
  }, [onOpenModal]);

  return (
    <ModalWithForm
      title={"Log In"}
      name="login"
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
            />
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
            ></input>
          </div>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
