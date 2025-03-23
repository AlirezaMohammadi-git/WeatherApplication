
import { Weather } from "../data/weatherService.js"

// components
const searchInput = document.querySelector('.js-search-location-input')
const searchBtn = document.querySelector('.js-search-btn')
const weatherIcon = document.querySelector('.js-weather-icon')
const tempText = document.querySelector('.js-temperture-text')
const city = document.querySelector('.js-city')
const humidity = document.querySelector('.js-humidity')
const windSpeed = document.querySelector('.js-wind-speed')



loadPage();


async function loadPage() {

  // load data
  const weatherService = new Weather();
  await weatherService.getWeatherInfo('Yazd')

  // settings data
  loadWeatherImage(weatherService.imageUrl)
  tempText.innerText = `${weatherService.temp}°C`
  city.innerText = weatherService.city;
  humidity.innerHTML = `${weatherService.humidity}%`
  windSpeed.innerHTML = `${weatherService.windSpeed}km/h`
}



function loadWeatherImage(imgUrl) {
  weatherIcon.src = imgUrl;
}