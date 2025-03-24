
import { Weather } from "../data/weatherService.js"

// components
const searchInput = document.querySelector('.js-search-location-input')
const searchBtn = document.querySelector('.js-search-btn')
const weatherIcon = document.querySelector('.js-weather-icon')
const tempText = document.querySelector('.js-temperture-text')
const cityHTML = document.querySelector('.js-city')
const humidity = document.querySelector('.js-humidity')
const windSpeed = document.querySelector('.js-wind-speed')
const invalidText = document.querySelector('.invalid-text')
const weatherDetails = document.querySelector('.js-weather-details')



loadPage('New York')
changeLocation();


async function loadPage(city) {

  try {
    // load data
    const weatherService = new Weather();
    await weatherService.getWeatherInfo(city)

    // settings data
    updateTextWithTransition(document.querySelector(".invalid-text"), "")
    showWeatherDetails();
    loadWeatherImage(weatherService.imageUrl)
    tempText.innerText = `${weatherService.temp}°C`
    cityHTML.innerHTML = weatherService.city;
    humidity.innerHTML = `${weatherService.humidity}%`
    windSpeed.innerHTML = `${weatherService.windSpeed}km/h`

  } catch (error) {

    const weatherService = new Weather();
    if (error.message === 'Response Status: 404') {
      updateTextWithTransition(document.querySelector(".invalid-text"), 'Invalid City')
    } else {
      console.log(`loadPage Error, ==> message: ${error.message}`)
    }

    hideWeatherDetails();
    // changing back data to latest valid city informations.
    loadPageFromLocalStorage(weatherService.getLastValidCity())

  }

}

function loadWeatherImage(imgUrl) {
  weatherIcon.src = imgUrl;
}

function changeLocation() {

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      loadPage(searchInput.value)
    }
  })

  searchBtn.addEventListener("click", () => {

    const textValue = searchInput.value;
    if (textValue !== '') {
      loadPage(textValue)
    }

  })

}

function loadPageFromLocalStorage(weatherService) {
  loadWeatherImage(weatherService.imageUrl)
  tempText.innerText = `${weatherService.temp}°C`
  cityHTML.innerHTML = weatherService.city;
  humidity.innerHTML = `${weatherService.humidity}%`
  windSpeed.innerHTML = `${weatherService.windSpeed}km/h`
}

function updateTextWithTransition(component, newText) {
  const invalidText = component

  // Fade out
  invalidText.style.opacity = "0";
  invalidText.style.top = "50%";

  // Wait for the fade-out transition to complete
  setTimeout(() => {
    // Change the content
    invalidText.innerHTML = newText;

    // Fade back in
    invalidText.style.opacity = "1";
    invalidText.style.top = "105%";
  }, 400); // Match the duration of the CSS transition (0.5s here)
}

// function updateContentWithSlide(component, status) {
//   // status should be "hide=0" or "show=1"
//   const invalidText = component;

//   if (status === 0) {
//     invalidText.style.display = "flex";
//   } else if (status === 1) {
//     invalidText.style.display = "none";
//   }

//   setTimeout(() => {
//     if (status === 0) {
//       invalidText.style.display = "none";
//     } else if (status === 1) {
//       invalidText.style.display = "flex";
//     }
//   }, 500); // Match the duration of the CSS transition (0.5s here)
// }



// Function to show the weather details and expand the container
function showWeatherDetails() {
  const weatherDetails = document.querySelector('.js-weather-details');
  const appContainer = document.querySelector('.app-container');
  weatherDetails.classList.add('visible');
  appContainer.classList.add('expanded');
}

// Function to hide the weather details and collapse the container
function hideWeatherDetails() {
  const weatherDetails = document.querySelector('.js-weather-details');
  const appContainer = document.querySelector('.app-container');
  weatherDetails.classList.remove('visible');
  appContainer.classList.remove('expanded');
}




