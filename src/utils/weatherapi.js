//daa4659a14cca866944d7bffab42b490

const latitude = 37.67;
const longitude = -121.8;
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

//extract temp and loca values from api response

export const getTemperatureValue = (data) => {
  const temperatureValue = data.main.temp;
  return temperatureValue;
};

export const getLocationValue = (data) => {
  const locValue = data.name;
  return locValue;
};
