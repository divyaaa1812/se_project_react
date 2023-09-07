import React from "react";

//create context obj with required values. This is to use across all components by wrapping it in html code
const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

export default CurrentTemperatureUnitContext;
