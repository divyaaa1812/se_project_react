import React from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //subscribe to use ContextProvider to use its props
  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="switch">
      <input
        className="switch__button"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "C"
            ? "switch__slider switch__slider-C"
            : "switch__slider switch__slider-F"
        }
      ></span>
      <p
        className={`switch__text-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__text-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
