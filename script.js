import config from "./config.js";

const apiKey = config.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search");
const weatherResult = document.getElementById("weather-result");
const city = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");
const weatherForm = document.getElementById("weather-form");
const weatherIcon = document.getElementById("weather-icon");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  if (cityValue) {
    getWeatherData(cityValue);
  }
});

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  if (cityValue) {
    getWeatherData(cityValue);
  }
});

async function getWeatherData(cityValue) {
  const url = `${apiUrl}?q=${cityValue}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === "404") {
      showErrorMessage("City not found");
    } else if (response.ok) {
      displayWeather(data);
    } else {
      showErrorMessage("Error fetching data");
    }
  } catch (error) {
    console.log(error);
    showErrorMessage("An error occurred while fetching the weather data");
  }
}

function displayWeather(data) {
  city.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = data.weather[0].description;

  weatherResult.classList.remove("d-none");
  errorMessage.classList.add("d-none");
  cityInput.value = "";
}

function showErrorMessage(message) {
  weatherResult.classList.add("d-none");
  errorMessage.classList.remove("d-none");
  errorMessage.textContent = message;
}
