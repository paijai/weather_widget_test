const weatherTag = document.querySelector(".js-weather");
const API_KEY = "<API_KEY>";
const POSITION = "position";

function setIcon(desc, icon) {
  icon.setAttribute("type", "");
  switch (desc) {
    case "clear sky":
      icon.setAttribute("name", "sun");
      break;
    case "few clouds":
      icon.setAttribute("name", "cloud");
      break;
    case "scattered clouds":
      icon.setAttribute("name", "cloud");
      break;
    case "broken clouds":
      icon.setAttribute("type", "solid");
      icon.setAttribute("name", "cloud");
      break;
    case "shower rain":
      icon.setAttribute("name", "cloud-rain");
      break;
    case "rain":
      icon.setAttribute("name", "cloud-light-rain");
      break;
    case "thunderstorm":
      icon.setAttribute("name", "cloud-lightning");
      break;
    case "snow":
      icon.setAttribute("name", "cloud-snow");
      break;
    case "mist":
      icon.setAttribute("name", "water");
      break;
  }
}
function savePosition(position) {
  localStorage.setItem(POSITION, JSON.stringify(position));
}

function paintWeather(weather) {
  const icon = weatherTag.querySelector(".js-icon");
  const temp = weatherTag.querySelector(".js-temp");
  const place = weatherTag.querySelector(".js-place");
  
  temp.innerText = weather.main.temp;
  place.innerText = weather.name;
  setIcon(weather.weather[0].description, icon);
}

function getWeather(position) {
  const lat = position.lat;
  const lon = position.lon;
  const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(weather)
    .then((response) => response.json())
    .then((response) => paintWeather(response))
    .catch((error) => `오류: ${error}`);
}

function handleGeoError(err) {
  console.log("위치 정보를 가져올 수 없습니다.");
}

function handleGeoSuccess(place) {
  const lat = place.coords.latitude;
  const lon = place.coords.longitude;
  const position = {
    lat,
    lon
  };
  savePosition(position);
  getWeather(position);
}

function getPlace(){
  const loadedPosition = localStorage.getItem(POSITION);
  if (loadedPosition === null) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    } else {
      console.log("위치 정보를 지원하지 않습니다.");
    }
  } else {
    const parsedPosition = JSON.parse(loadedPosition);
    getWeather(parsedPosition);
  }
}

function init() {
  getPlace();
}

init();