import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import {
  getWeatherForecast,
  getTemperatureValue,
} from "../../utils/weatherapi";

function App() {
  const [openModal, setOpenModal] = useState("");
  const handleOpenModal = () => {
    setOpenModal("openModal");
  };
  const handleCloseModal = () => {
    setOpenModal("");
  };
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setOpenModal("previewModal");
    setSelectedCard(card);
  };

  const [temp, setTemp] = useState(0);
  useEffect(() => {
    getWeatherForecast().then((data) => {
      const temperatureValue = getTemperatureValue(data);
      setTemp(temperatureValue);
    });
  }, []);

  return (
    <>
      <Header onOpenModal={handleOpenModal} />
      <Main tempvalue={temp} onCardClick={handleCardClick} />
      <Footer />
      {openModal === "openModal" && (
        <ModalWithForm
          title="New garment"
          name="addnewgarment"
          buttonText="Add garmet"
          onClose={handleCloseModal}
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
                  name="link"
                  placeholder="ImageURL"
                  className="input-field"
                ></input>
              </div>
            </label>
          </div>
          <div className="form__field">
            <p className="form__field-text">Select weather type: </p>
            <div>
              <div>
                <input type="radio" value="Hot" checked={true} />
                <label>Hot</label>
              </div>
              <div>
                <input type="radio" value="Warm" checked={false} />
                <label>Warm</label>
              </div>
              <div>
                <input type="radio" value="Cold" checked={false} />
                <label>Cold</label>
              </div>
            </div>
          </div>
        </ModalWithForm>
      )}
      {openModal === "previewModal" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
