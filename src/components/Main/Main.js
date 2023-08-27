import React, { useMemo } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ tempvalue, weatherImage, onCardClick }) {
  const weatherType = useMemo(() => {
    if (tempvalue >= 86) {
      return "hot";
    } else if (tempvalue >= 66 && tempvalue <= 85) {
      return "warm";
    } else if (tempvalue <= 65) {
      return "cold";
    }
  }, [tempvalue]);

  const filteredItems = defaultClothingItems.filter((item) => {
    return item.weather === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard type={weatherImage} temperature={tempvalue} />
      <section className="card_section">
        Today is {tempvalue}° / You may want to wear:
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
