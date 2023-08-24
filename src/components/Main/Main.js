import React, { useMemo } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ tempvalue, onCardClick }) {
  const weatherType = useMemo(() => {
    if (tempvalue >= 86) {
      return "sunny";
    } else if (tempvalue >= 66 && tempvalue <= 85) {
      return "warm";
    } else if (tempvalue <= 65) {
      return "cold";
    }
  }, [tempvalue]);

  const filteredItems = defaultClothingItems.filter((item) => {
    return item.weather.toLocaleLowerCase === weatherType;
  });

  return (
    <>
      <main className="main">
        <WeatherCard day={false} type="nightrain" temperature={tempvalue} />
        <section className="card_section">
          Today is {tempvalue}° / You may want to wear:
          <div className="card_items">
            {filteredItems.map((item, index) => {
              return (
                <ItemCard
                  key={`item-${index}`}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Main;
