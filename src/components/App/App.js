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
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function App() {
  //Hook to open and closemodal
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [weatherImage, setWeatherImage] = useState("");
  const [weatherTypeValue, setWeatherTypeValue] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const data = await getWeatherForecast();
        const temperatureValue = getTemperatureValue(data);
        const locationValue = getLocationValue(data);
        const weatherIcon = getWeatherIcon(data);
        setTemp(Math.ceil(temperatureValue));
        setLocation(locationValue);
        setWeatherImage(weatherIcon);
      } catch (err) {
        console.log(err);
      }
    }

    fetchWeatherData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal("openModal");
  };
  const handleCloseModal = () => {
    setOpenModal("");
  };

  const handleCardClick = (card) => {
    setOpenModal("previewModal");
    setSelectedCard(card);
  };

  const handleRadioButton = (e) => {
    setWeatherTypeValue(e.currentTarget.value);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  return (
    <>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
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
                  <input
                    type="radio"
                    value="Hot"
                    checked={weatherTypeValue === "Hot"}
                    onChange={handleRadioButton}
                  />
                  <label>Hot</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="Warm"
                    checked={weatherTypeValue === "Warm"}
                    onChange={handleRadioButton}
                  />
                  <label>Warm</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="Cold"
                    checked={weatherTypeValue === "Cold"}
                    onChange={handleRadioButton}
                  />
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
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}

export default App;
