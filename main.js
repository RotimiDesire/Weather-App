const KEY = "071270fb149a1d34a7f96bbe03e1b244";

const form = document.querySelector("form");
const city = document.getElementById("city");
const weatherData = document.getElementById("data");

async function getWeatherData(cityValue) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error("Invalid Network Response");
    }

    const data = await res.json();

    const icon = data.weather[0].icon;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}˚C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed}m/s`,
    ];

    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Icon" />`;

    weatherData.querySelector(".temperature").textContent = `${temperature}˚C`;

    weatherData.querySelector(".description").textContent = description;

    weatherData.querySelector(".details").innerHTML = details.map(
      (detail) => `<span>${detail}</span>`
    );
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";

    weatherData.querySelector(".temperature").textContent = "";

    weatherData.querySelector(".description").textContent =
      "An error occured, try again.";

    weatherData.querySelector(".details").innerHTML = "";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = city.value;
  getWeatherData(cityValue);
});
