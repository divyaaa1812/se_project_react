import "./WeatherCard.css";

function WeatherCard() {
  return (
    <div>
      <main className="main">
        <section className="weather__info">
          <div className="weather__info-temp">68F</div>
          <img
            className="weather__info-image"
            src="/images/day/daysun.png"
            alt="Today's weather image"
          />
        </section>
      </main>
    </div>
  );
}

export default WeatherCard;
