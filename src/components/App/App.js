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
import { Switch, Route, Redirect } from "react-router-dom";
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
  const [temp, setTemp] = useState({});
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
        console.log(data);
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
            console.log(res);
            setLoggedIn(true);
            setCurrentUser(res._id);
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

  const onAddItem = ({ name, weather, imageUrl }) => {
    setIsLoading(true);
    addItem({ name, weather, imageUrl })
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const handleSubmit = (request) => {
  //   setIsLoading(true);
  //   request()
  //     .then(handleCloseModal)
  //     .catch(console.error)
  //     .finally(() => setIsLoading(false));
  // };

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

  const handleEditProfileSubmit = (name, avatar, token) => {
    setIsLoading(true);
    auth
      .editProfile(name, avatar, token)
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

  const handleLikeClick = ({ selectedCard, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    isLiked
      ? addCardLike(selectedCard, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) =>
                card._id === selectedCard._id ? updatedCard.data : card
              )
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(selectedCard, token)
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
    <CurrentUserContext.Provider value={currentUser}>
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
              onCardLike={handleLikeClick}
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onCardClick={handleCardClick}
              clothingItems={clothingItems}
              onEditProfileModal={handleEditProfileSubmit}
              onLogout={handleLogout}
              loggedIn={loggedIn}
              onCardLike={handleLikeClick}
            />
          </ProtectedRoute>
          {/* <Route exact path="">
            {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
          </Route> */}
          <Route path="/signup">
            <RegisterModal
              handleCloseModal={handleCloseModal}
              onRegisterUser={handleSignUp}
              isOpen={handleOpenModal}
            />
          </Route>
          <Route path="/signin">
            <LoginModal
              handleCloseModal={handleCloseModal}
              onUserLogin={handleUserLogin}
              isOpen={handleOpenModal}
            />
          </Route>
        </Switch>
        <Footer />
        {openModal === "AddItemModal" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            onAddItem={onAddItem}
            isOpen={openModal === "addClothesModal"}
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
            buttonText={isLoading ? "LoggingIn..." : "LogIn"}
          />
        )}
        {openModal === "previewModal" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
          />
        )}
        {openModal === "editProfile" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            onEditProfile={handleEditProfileSubmit}
            isOpen={openModal === "editProfile"}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
