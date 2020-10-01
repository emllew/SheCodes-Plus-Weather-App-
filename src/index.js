// fill the page with openweather data 
function showTemp(response) {
  console.log(response);
  getTemperature(response);
  showPrecipitation(response);
  showHumidity(response);
  showWindSpeed(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}
// get temp and location from geolocation lat&long 
navigator.geolocation.getCurrentPosition(currentLocation);

//get weather and location from current location button
function buttonCurrentLocation(position) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", buttonCurrentLocation);

// get temp and location from search bar
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchedLocationDisplay);

function searchedLocationDisplay(event) {
  event.preventDefault();
  let formInput = document.querySelector("#citySearchInput");
  let city = formInput.value;
  console.log(city);
  let apiKey = "33b9889a2520a43a8c73d715b7b85a96";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}


//today's date and time
let now = new Date();
let h6 = document.querySelector("h6");

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayD = days[now.getDay()];
let year = now.getFullYear();
h6.innerHTML = `it is currently ${hours}:${minutes} on ${dayD}.`;
console.log(h6);
let apiKey = "33b9889a2520a43a8c73d715b7b85a96";


//different responses

function getTemperature(response) {
  let temp = document.querySelector(".todayIcon");
  let mathTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${mathTemp}` + "°C";
}

function showPrecipitation(response) {
  let precipitation = document.querySelector("#precipitation");
  let precip = response.data.weather[0].description;
  precipitation.innerHTML = "it is currently " + `${precip}`;
}

function showHumidity(response) {
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = "humidity is at " + `${humid}` + "%";
}

function showWindSpeed(response) {
  let windSpeed = document.querySelector("#windSpeed");
  let wind = response.data.wind.speed;
  windSpeed.innerHTML = "wind is " + `${wind}` + "m/s";
}