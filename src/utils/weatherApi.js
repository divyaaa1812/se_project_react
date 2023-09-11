import { checkResponse } from "./Api";
const latitude = 36.77;
const longitude = -119.41;
const APIkey = "daa4659a14cca866944d7bffab42b490";

export const getWeatherForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
  return weatherApi;
};

export const getWeatherIcon = (data) => {
  const imageIcon = data.weather[0].icon;
  return imageIcon;
};

export const getSunriseTime = (data) => {
  const sunriseTime = data.sys.sunrise;
  return sunriseTime;
};

export const getSunsetTime = (data) => {
  const sunsetTime = data.sys.sunset;
  return sunsetTime;
};

//extract temp and loca values from api response

export const getTemperatureValue = (data) => {
  const temperatureValue = data.main.temp;
  const FtempUnit = `${Math.round(temperatureValue)}°F`;
  const CtempUnit = `${Math.round(((temperatureValue - 32) * 5) / 9)}°C`;
  const tempUnits = { temperatureWithUnits: { F: FtempUnit, C: CtempUnit } };
  return { temperatureValue, tempUnits };
};

export const getLocationValue = (data) => {
  const locValue = data.name;
  return locValue;
};
