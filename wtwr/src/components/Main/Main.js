import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

function Main() {
  return (
    <>
      <main className="main">
        <WeatherCard day={true} type="nightrain" />
        <ItemCard />
      </main>
    </>
  );
}

export default Main;
