import "./WeatherCard.css";

const weatherConditions = [
  {
    url: "/images/day/cloudyday.png",
    day: true,
    type: "cloudyday",
  },
  {
    url: "/images/day/daysun.png",
    day: true,
    type: "daysun",
  },
  {
    url: "/images/day/rainday.png",
    day: true,
    type: "rainday",
  },
  {
    url: "/images/night/cloudynight.png",
    day: true,
    type: "cloudynight",
  },
  {
    url: "../images/night/moonnight.png",
    day: true,
    type: "moonnight",
  },
  {
    url: "../images/night/nightrain.png",
    day: true,
    type: "nightrain",
  },
];

function WeatherCard({ day, type }) {
  const imageSrc = weatherConditions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <div>
      <section className="weather__info" id="weather">
        <div className="weather__info-temp">48F</div>
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
