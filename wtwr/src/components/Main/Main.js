import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ tempvalue, onCardClick }) {
  return (
    <>
      <main className="main">
        <WeatherCard day={false} type="nightrain" temperature={tempvalue} />
        <section className="card_section">
          Today is {tempvalue} / You may want to wear:
          <div className="card_items">
            {defaultClothingItems.map((item) => {
              return <ItemCard item={item} onCardClick={onCardClick} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Main;
