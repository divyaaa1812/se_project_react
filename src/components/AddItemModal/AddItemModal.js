import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen, buttonText }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weather, setWeatherTypeValue] = useState("");
  const handleRadioButton = (e) => {
    setWeatherTypeValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setWeatherTypeValue("");
      setImageUrl("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title={"New garment"}
      name="addnewgarment"
      buttonText="Add garmet"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
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
              required
            ></input>
          </div>
        </label>
      </div>
      <div className="form__field">
        <label>
          Image
          <div>
            <input
              type="text"
              name="imageUrl"
              placeholder="ImageURL"
              className="input-field"
              value={imageUrl}
              onChange={handleImageUrlChange}
              required
            ></input>
          </div>
        </label>
      </div>
      <div className="form__field">
        <p className="form__field-text">Select weather type: </p>
        <div>
          <div>
            <label>
              <input
                name="weatherType"
                type="radio"
                value="Hot"
                onChange={handleRadioButton}
              />
              Hot
            </label>
          </div>
          <div>
            <label>
              <input
                name="weatherType"
                type="radio"
                value="Warm"
                onChange={handleRadioButton}
              />
              Warm
            </label>
          </div>
          <div>
            <label>
              <input
                name="weatherType"
                type="radio"
                value="Cold"
                onChange={handleRadioButton}
              />
              Cold
            </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
