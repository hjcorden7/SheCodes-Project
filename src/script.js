//Display day and time

function loadCurrentDate() {
  let now = new Date();
  let = now.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let date = document.querySelector("#date");
  date.innerHTML = `${day}, ${hours}:${minutes}`;
}

loadCurrentDate();

//Change City and temperature of searched city
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function logTemp(response) {
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let countryElement = document.querySelector("#country");

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  countryElement.innerHTML = response.data.sys.country;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let cityEntered = document.querySelector("form.search");
cityEntered.addEventListener("submit", handleSubmit);

function search(city) {
  let unit = "metric";
  let apiKey = "28e32eab8c2a4e566136c12d1cd18fb8";
  let apiEndPoint = "api.openweathermap.org/data/2.5/weather?";
  let apiURL = `https://${apiEndPoint}q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiURL).then(logTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-engine");
  search(cityInput.value);
}

search("London");

//switch from C to F

//Show current temp/city - see if there is a way to show London rather than City of Westminster basedon coordinates
function printTemp(response) {
  let currentTempRounded = Math.round(response.data.main.temp);
  let currentCityUpdated = response.data.name;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${currentTempRounded}°C`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentCityUpdated}`;
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "28e32eab8c2a4e566136c12d1cd18fb8";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiURL).then(printTemp);
}

function displayCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-weather");
currentLocationButton.addEventListener("click", displayCurrentLocation);

//switch from C to F

//function switchUnit(event) {

//function switchUnit(event) {
//let h3 = document.querySelector("h3");
//let unitFahrenheit = document.querySelector("#F-select");
//let unitCelsuis = document.querySelector("#C-select");
//if (unitFahrenheit.checked) {
//h3.innerHTML = `${tempRounded}°C`;
//unitCelsuis.checked = true;
//} else {
//h3.innerHTML = `(${tempRounded}*1.8) + 32 °F`;
//unitFahrenheit.checked = true;
//}
//}

//let unitRadio = document.querySelector("form.unit");
//unitRadio.addEventListener("click", switchUnit());
