import React, { useMemo, useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext ";

function Main({
  tempvalue,
  weatherImage,
  onCardClick,
  clothingItems,
  loggedIn,
  onCardLike,
  isLiked,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperatureData = tempvalue.temperatureValue;
  const temperatureInDigits =
    temperatureData && Math.round(temperatureData.temperatureValue);
  const temperatureUnit = temperatureData && temperatureData.tempUnits;
  const temp =
    (temperatureUnit && temperatureUnit.temperatureWithUnits)?.[
      currentTemperatureUnit
    ] || 900;

  const weatherType = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      if (temperatureInDigits >= 86) {
        return "hot";
      } else if (temperatureInDigits >= 66 && temperatureInDigits <= 85) {
        return "warm";
      } else if (temperatureInDigits <= 65) {
        return "cold";
      }
    }
    if (currentTemperatureUnit === "C") {
      if (temperatureInDigits >= 30) {
        return "hot";
      } else if (temperatureInDigits >= 19 && temperatureInDigits <= 29) {
        return "warm";
      } else if (temperatureInDigits <= 18) {
        return "cold";
      }
    }
  }, [tempvalue]);

  const filteredItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserOwnedItems = filteredItems.filter((currentUserOwnedItem) => {
    return currentUserOwnedItem.owner === currentUser._id;
  });
  console.log(loggedIn);

  return (
    <main className="main">
      <WeatherCard type={weatherImage} temperature={temp} />
      <section className="card__section">
        <div className="card__section-title">
          Today is {temp} / You may want to wear
        </div>
        {loggedIn ? (
          <div className="card__items">
            {currentUserOwnedItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  cardData={item}
                  onCardClick={onCardClick}
                  loggedIn={loggedIn}
                  onCardLike={onCardLike}
                  isLiked={isLiked}
                />
              );
            })}
          </div>
        ) : (
          <div className="card__items">
            {filteredItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  cardData={item}
                  onCardClick={onCardClick}
                  loggedIn={loggedIn}
                  onCardLike={onCardLike}
                  isLiked={isLiked}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Main;
