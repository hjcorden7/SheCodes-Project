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

//display future forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
 
          <div class="col-2">
            <p class="forecast-date"> ${formatDay(forecastDay.dt)} </p> 
             <img src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png"  id="future-weather-icon"/><br> 
             <p class="forecast-temp"> ${Math.round(
               forecastDay.temp.day
             )} °C </p>
          
           
          </div> </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "28e32eab8c2a4e566136c12d1cd18fb8";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

//Show current weather of searched city

function logTemp(response) {
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let countryElement = document.querySelector("#country");
  celciusTemperature = response.data.main.temp;

  tempElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
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

  getForecast(response.data.coord);
}

//search engine

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

let cityEntered = document.querySelector("#search-form");
cityEntered.addEventListener("submit", handleSubmit);

search("London");

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
