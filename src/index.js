let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let minutes = now.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;

let thisDay = document.querySelector("#this-day");
thisDay.innerHTML = `${days[now.getDay()]}, `;

let thisDate = document.querySelector("#this-date");
thisDate.innerHTML = `${
  months[now.getMonth()]
} ${now.getDate()}, ${now.getFullYear()}.`;

let minSecs = document.querySelector(".min-secs");
minSecs.innerHTML = `${now.getHours()}:${minutes}`;

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#celsius").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#describe").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}
find("Benin City");

function find(city) {
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function cityPlace(event) {
  event.preventDefault();
  let city = document.querySelector("#location-of-interest").value;
  find(city);
}

let forms = document.querySelector("form");
forms.addEventListener("submit", cityPlace);

function myLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let currentLoc = document.querySelector(".current-city");
currentLoc.addEventListener("click", getLocation);
