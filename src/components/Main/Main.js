import React, { useMemo, useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  tempvalue,
  weatherImage,
  onCardClick,
  clothingItems,
  loggedIn,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(tempvalue);
  const temperatureData = tempvalue.temperatureValue;
  const temperatureInDigits =
    temperatureData && Math.round(temperatureData.temperatureValue);
  const temperatureUnit = temperatureData && temperatureData.tempUnits;
  const temp =
    (temperatureUnit && temperatureUnit.temperatureWithUnits)?.[
      currentTemperatureUnit
    ] || 900;
  console.log(temp);

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
  console.log(filteredItems);

  return (
    <main className="main">
      <WeatherCard type={weatherImage} temperature={temp} />
      <section className="card__section">
        <div className="card__section-title">
          Today is {temp} / You may want to wear:
        </div>
        <div className="card__items">
          {filteredItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                cardData={item}
                onCardClick={onCardClick}
                isLoggedIn={loggedIn}
                onCardLike={onCardLike}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
