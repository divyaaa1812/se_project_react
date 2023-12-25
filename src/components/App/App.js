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
import * as auth from "../../Auth";
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

  useEffect(() => {
    const getToken = async () => {
      const jwt = localStorage.getItem("jwt");
      try {
        if (jwt) {
          auth
            .verifyToken(jwt)
            .then((res) => {
              if (res) {
                setLoggedIn(true);
                setCurrentUser(res);
              }
            })
            .then(() => {
              if (currentUser) {
                history.push("/profile");
              } else {
                history.push("/");
              }
            });
        }
      } catch (error) {
        console.error(error);
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
        console.error(err);
      }
    };

    const getClothingItems = async () => {
      try {
        const data = await getItems();
        setClothingItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    getToken();
    fetchWeatherData();
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
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        handleCloseModal();
      });
  };

  const handleSignUp = ({ name, avatar, email, password }) => {
    return auth
      .registerUser({ name, avatar, email, password })
      .then((user) => {
        auth.loginUser({ email, password }).then(() => {
          handleCloseModal();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUserLogin = ({ email, password }) => {
    return auth
      .loginUser({ email, password })
      .then((res) => {
        const token = res.token;
        localStorage.setItem("jwt", res.token);
        return auth.verifyToken(token).then((data) => {
          const user = data._id;
          setLoggedIn(true);
          setCurrentUser(user);
          handleCloseModal();
          history.push("/profile");
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    return auth
      .editProfile({ name, avatar })
      .then((data) => {
        const user = data._id;
        console.log(user);
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    setCurrentUser("");
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
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeClick = (selectedCard) => {
    const { isLiked } = selectedCard;
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    isLiked
      ? addCardLike(selectedCard)
          .then((updatedCard) => {
            setClothingItems((cards) => {
              return cards.map((card) => {
                return card._id === selectedCard._id ? updatedCard.data : card;
              });
            });
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(selectedCard)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === selectedCard._id ? updatedCard.data : card
              )
            );
          })
          .catch((err) => console.log(err));
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
              clothingItems={clothingItems}
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
            isOpen={handleOpenModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
