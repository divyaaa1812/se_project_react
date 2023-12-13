import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ type, temperature = "" }) {
  return (
    <section className="weather__info" id="weather">
      <div className="weather__info-temp">{temperature}</div>
      <img
        className="weather__info-image"
        src={`https://openweathermap.org/img/wn/${type}@2x.png`}
        alt="Today's weather image"
      />
    </section>
  );
}

export default WeatherCard;
