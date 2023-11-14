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
import ProtectedRoute from "../ProtectedRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CurrentUserContext from "../../contexts/CurrentUserContext ";

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
  const [isloggedIn, setIsLoggedIn] = useState("false");
  const [currentUser, setCurrentUser] = useState({});
  // to access browser stored content of a webpage for functional components
  const history = useHistory();

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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .verifyToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res.data);
          }
        })
        .then(() => {
          if (currentUser) {
            history.push("/profile");
          } else {
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(handleCloseModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleSignUp = ({ email, password, name, avatar }) => {
    const newUserRequest = () => {
      return auth
        .registerUser({ email, password, name, avatar })
        .then((user) => {
          setCurrentUser(user);
          handleUserLogin({ email, password });
          localStorage.setItem("jwt", user.token);
          setIsLoggedIn(true);
        });
    };
    handleSubmit(newUserRequest);
  };

  const handleUserLogin = ({ email, password }) => {
    const userRequest = () => {
      return auth.loginUser({ email, password }).then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", token);
        console.log(token);
        return auth.verifyToken(token).then((data) => {
          const user = data.data;
          setIsLoggedIn(true);
          setCurrentUser(user);
          history.push("/profile");
        });
      });
    };
    handleSubmit(userRequest);
  };

  const handleLogout = () => {
    setCurrentUser("");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/");
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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          locationValue={location}
          onOpenModal={handleOpenModal}
          loggedIn={isloggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main
              tempvalue={temp}
              weatherImage={weatherImage}
              onCardClick={handleCardClick}
              clothingItems={clothingItems}
              loggedIn={isloggedIn}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={isloggedIn}>
            <Profile
              onCardClick={handleCardClick}
              clothingItems={clothingItems}
              handleOpenModal={handleOpenModal}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <RegisterModal
              onRegisterUser={handleSignUp}
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
            onRegisterUser={handleSignUp}
            isOpen={openModal === "model1"}
            buttonText={isLoading ? "Submtting..." : "Next"}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
