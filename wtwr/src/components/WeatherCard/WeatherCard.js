import "./WeatherCard.css";
import { weatherConditions } from "../../utils/constants";

function WeatherCard({ day, type, temperature = "" }) {
  const imageSrc = weatherConditions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <div>
      <section className="weather__info" id="weather">
        <div className="weather__info-temp">{temperature}</div>
        <img
          className="weather__info-image"
          src={imageSrcUrl}
          alt="Today's weather image"
        />
      </section>
    </div>
  );
}

export default WeatherCard;
