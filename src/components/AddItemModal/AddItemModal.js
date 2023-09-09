import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React, { useState, useEffect } from "react";

const AddItemModal = (handleCloseModal, onAddItem, isOpen) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weatherTypeValue, setWeatherTypeValue] = useState("");
  const handleRadioButton = (e) => {
    setWeatherTypeValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weatherTypeValue });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setWeatherTypeValue("");
      setImageUrl("");
    }
  }, [isOpen]);

  return (
    <>
      <ModalWithForm
        title={"New garment"}
        name="addnewgarment"
        buttonText="Add garmet"
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={() => handleSubmit}
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
              ></input>
            </div>
          </label>
        </div>
        <div className="form__field">
          <p className="form__field-text">Select weather type: </p>
          <div>
            <div>
              <input type="radio" value="Hot" onChange={handleRadioButton} />
              <label>Hot</label>
            </div>
            <div>
              <input type="radio" value="Warm" onChange={handleRadioButton} />
              <label>Warm</label>
            </div>
            <div>
              <input type="radio" value="Cold" onChange={handleRadioButton} />
              <label>Cold</label>
            </div>
          </div>
        </div>
      </ModalWithForm>
    </>
  );
};

export default AddItemModal;
