import "./WeatherCard.css";

const weatherConditions = [
  {
    url: require("../images/day/cloudyday.png"),
    day: true,
    type: "cloudyday",
  },
  {
    url: require("../images/day/daysun.png"),
    day: true,
    type: "daysun",
  },
  {
    url: require("../images/day/rainday.png"),
    day: true,
    type: "rainday",
  },
  {
    url: require("../images/night/cloudynight.png"),
    day: false,
    type: "cloudynight",
  },
  {
    url: require("../images/night/moonnight.png"),
    day: false,
    type: "moonnight",
  },
  {
    url: require("../images/night/nightrain.png"),
    day: false,
    type: "nightrain",
  },
];

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
