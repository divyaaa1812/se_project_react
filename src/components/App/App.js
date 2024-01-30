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
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import * as auth from "../../utils/Auth";
import ProtectedRoute from "../ProtectedRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  //Hook to open and closemodal
  const [openModal, setOpenModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [weatherImage, setWeatherImage] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // to access browser stored content of a webpage for functional components
  const history = useHistory();

  const getClothingItems = async () => {
    try {
      const data = await getItems();
      console.log(data);
      setClothingItems(data);
    } catch (error) {
      console.error;
    }
  };
  useEffect(() => {
    const getToken = async () => {
      const jwt = localStorage.getItem("jwt");
      try {
        if (jwt) {
          auth.verifyToken(jwt).then((res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser(res);
              history.push("/profile");
            } else {
              setLoggedIn(false);
              history.push("/");
            }
          });
        }
      } catch (error) {
        console.error;
      }
    };
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherForecast();
        const temperatureValue = await getTemperatureValue(data);
        const locationValue = await getLocationValue(data);
        const weatherIcon = await getWeatherIcon(data);
        setTemp({ temperatureValue });
        setLocation(locationValue);
        setWeatherImage(weatherIcon);
      } catch (err) {
        console.error;
      }
    };
    fetchWeatherData();
    getToken();
    getClothingItems();
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

  const onAddItem = ({ name, weather, imageUrl }) => {
    setIsLoading(true);
    addItem({ name, weather, imageUrl })
      .then((response) => {
        setClothingItems([response.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUp = ({ name, avatar, email, password }) => {
    return auth
      .registerUser({ name, avatar, email, password })
      .then(() => {
        handleUserLogin({ email, password });
        handleCloseModal();
      })
      .catch((err) => {
        console.error;
      });
  };

  const handleUserLogin = ({ email, password }) => {
    setIsLoading(true);
    return auth
      .loginUser({ email, password })
      .then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", token);
        return auth.verifyToken(token).then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
          handleCloseModal();
          history.push("/profile");
        });
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    return auth
      .editProfile({ name, avatar })
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    setCurrentUser({});
    localStorage.removeItem("jwt");
    setLoggedIn(false);
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
      .catch(console.error);
  };

  const handleLikeClick = (item, isLiked, currentUser) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    !isLiked
      ? addCardLike(item, currentUser, token)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              const newCards = cards.map((card) =>
                card._id === item._id ? updatedCard.data : card
              );
              return newCards;
            });
          })
          .catch(console.error)
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(item, currentUser, token)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              const newCards = cards.map((card) =>
                card._id === item._id ? updatedCard.data : card
              );
              return newCards;
            });
          })
          .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          locationValue={location}
          onOpenModal={handleOpenModal}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main
              tempvalue={temp}
              weatherImage={weatherImage}
              onCardClick={handleCardClick}
              clothingItems={clothingItems}
              loggedIn={loggedIn}
              onCardLike={handleLikeClick}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onCardClick={handleCardClick}
              clothingItems={clothingItems.sort((a, b) =>
                a.createdAt > b.createdAt ? -1 : 1
              )}
              onOpenModal={handleOpenModal}
              onEditProfileModal={handleEditProfileSubmit}
              onLogout={handleLogout}
              loggedIn={loggedIn}
              onCardLike={handleLikeClick}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <RegisterModal
              handleCloseModal={handleCloseModal}
              onRegisterUser={handleSignUp}
              onOpenModal={handleOpenModal}
            />
          </Route>
          <Route path="/signin">
            <LoginModal
              handleCloseModal={handleCloseModal}
              onUserLogin={handleUserLogin}
              onOpenModal={handleOpenModal}
            />
          </Route>
        </Switch>
        <Footer />
        {openModal === "AddItemModal" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            onAddItem={onAddItem}
            onOpenModal={handleOpenModal}
            buttonText={isLoading ? "Saving..." : "Save"}
          />
        )}
        {openModal === "SignupModal" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            onRegisterUser={handleSignUp}
            onOpenModal={handleOpenModal}
            buttonText={isLoading ? "Submtting..." : "Next"}
            altbuttonText={isLoading ? "LoggingIn..." : " or Log in"}
          />
        )}
        {openModal === "LoginModal" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            onUserLogin={handleUserLogin}
            onOpenModal={handleOpenModal}
            buttonText={isLoading ? "LoggingIn..." : "LogIn"}
            altbuttonText={isLoading ? "Submtting..." : "or Register"}
          />
        )}
        {openModal === "previewModal" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
            loggedIn={loggedIn}
          />
        )}
        {openModal === "editProfile" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            onEditProfile={handleEditProfileSubmit}
            onOpenModal={handleOpenModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
