import React from "react";
import WeatherCard from "./WeatherCard/WeatherCard";

function Main() {
  return (
    <>
      <main className="main">
        <WeatherCard day={true} type="nightrain" />
      </main>
    </>
  );
}

export default Main;
