import React, { useMemo, useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ tempvalue, weatherImage, onCardClick, clothingItems }) {
  console.log(clothingItems);
  const temperatureData = tempvalue.temperatureValue;
  const temperatureInDigits =
    temperatureData && Math.round(temperatureData.temperatureValue);
  const temperatureUnit = temperatureData && temperatureData.tempUnits;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp =
    (temperatureUnit && temperatureUnit.temperatureWithUnits)?.[
      currentTemperatureUnit
    ] || 900;
  const weatherType = useMemo(() => {
    if (temperatureInDigits >= 86 || temperatureInDigits >= 30) {
      return "hot";
    } else if (temperatureInDigits >= 66 || temperatureInDigits >= 19) {
      return "warm";
    } else if (temperatureInDigits <= 65 || temperatureInDigits <= 18) {
      return "cold";
    }
  }, [tempvalue]);

  const filteredItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard type={weatherImage} temperature={temp} />
      <section className="card_section">
        Today is {temp} / You may want to wear:
        <div className="card_items">
          {filteredItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
