//daa4659a14cca866944d7bffab42b490
//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

const latitude = 33.44;
const longitude = -94.04;
const APIkey = "daa4659a14cca866944d7bffab42b490";

export const getWeatherForecast = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const getTemperatureValue = (data) => {
  const temperatureValue = data.main.temp;
  return temperatureValue;
};
