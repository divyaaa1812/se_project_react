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
  getLocationValue,
  getWeatherIcon,
} from "../../utils/weatherApi";

function App() {
  //Hook to open and closemodal
  const [openModal, setOpenModal] = useState("");
  const handleOpenModal = () => {
    setOpenModal("openModal");
  };
  const handleCloseModal = () => {
    setOpenModal("");
  };
  //Hook to render preview image modal when card is selected on page
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setOpenModal("previewModal");
    setSelectedCard(card);
  };
  //Hook to set temp value on page
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    getWeatherForecast().then((data) => {
      const temperatureValue = getTemperatureValue(data);
      setTemp(Math.ceil(temperatureValue));
    });
  }, []);
  //Hook to set location value on page
  const [location, setLocation] = useState("");
  useEffect(() => {
    getWeatherForecast().then((data) => {
      const locationValue = getLocationValue(data);
      setLocation(locationValue);
    });
  }, []);

  const [weatherImage, setWeatherImage] = useState("");
  useEffect(() => {
    getWeatherForecast().then((data) => {
      const weatherIcon = getWeatherIcon(data);
      setWeatherImage(weatherIcon);
    });
  }, []);

  return (
    <>
      <Header locationValue={location} onOpenModal={handleOpenModal} />
      <Main
        tempvalue={temp}
        weatherImage={weatherImage}
        onCardClick={handleCardClick}
      />
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
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
        ></ItemModal>
      )}
    </>
  );
}

export default App;
