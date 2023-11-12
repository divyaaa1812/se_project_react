import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  getWeatherForecast,
  getTemperatureValue,
  getLocationValue,
  getWeatherIcon,
} from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/Api";
import * as auth from "../../Auth";

function App() {
  //Hook to open and closemodal
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState({});
  const [location, setLocation] = useState("");
  const [weatherImage, setWeatherImage] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registerUser, setRegisterUser] = useState([]);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const data = await getWeatherForecast();
        const temperatureValue = getTemperatureValue(data);
        const locationValue = getLocationValue(data);
        const weatherIcon = getWeatherIcon(data);
        setTemp({ temperatureValue });
        setLocation(locationValue);
        setWeatherImage(weatherIcon);
      } catch (err) {
        console.log(err);
      }
    }
    fetchWeatherData();
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        // console.log(data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!openModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [openModal]);

  const handleOpenModal = (modalName) => {
    setOpenModal(modalName);
  };
  const handleCloseModal = () => {
    setOpenModal("");
  };

  const handleCardClick = (card) => {
    setOpenModal("previewModal");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const onAddItem = (values) => {
    setIsLoading(true);
    addItem(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onRegisterUser = (values) => {
    console.log(values);
    auth.registerUser(values);
    handleCloseModal;
  };

  const handleUserLogin = (values) => {
    auth.loginUser(values);
    handleCloseModal();
  };

  const handleDeleteCard = (selectedCard) => {
    deleteItem(selectedCard)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards._id !== selectedCard._id;
        });
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header locationValue={location} onOpenModal={handleOpenModal} />
      <Switch>
        <Route exact path="/">
          <Main
            tempvalue={temp}
            weatherImage={weatherImage}
            onCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
        </Route>
        <Route path="/profile">
          <Profile
            onCardClick={handleCardClick}
            clothingItems={clothingItems}
            handleOpenModal={handleOpenModal}
          />
        </Route>
        <Route path="/signup">
          <RegisterModal
            onRegisterUser={onRegisterUser}
            handleOpenModal={handleOpenModal}
          />
        </Route>
        <Route path="/signin">
          <LoginModal
            onUserLogin={handleUserLogin}
            handleOpenModal={handleOpenModal}
          />
        </Route>
      </Switch>
      <Footer />
      {openModal === "openModal" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          onAddItem={onAddItem}
          isOpen={openModal === "openModal"}
          buttonText={isLoading ? "Saving..." : "Save"}
        />
      )}
      {openModal === "SignupModal" && (
        <RegisterModal
          handleCloseModal={handleCloseModal}
          onRegisterUser={onRegisterUser}
          isOpen={openModal === "model1"}
          buttonText={isLoading ? "Saving..." : "Save"}
        />
      )}
      {openModal === "LoginModal" && (
        <LoginModal
          handleCloseModal={handleCloseModal}
          onUserLogin={handleUserLogin}
          isOpen={openModal === "modle2"}
          buttonText={isLoading ? "Saving..." : "Save"}
        />
      )}
      {openModal === "previewModal" && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          handleDeleteCard={handleDeleteCard}
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
