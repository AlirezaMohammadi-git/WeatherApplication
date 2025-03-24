
const apiKey = '1c651ed08ee9c16390640ac036fff414'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
// metric = Centigrade
// by default it's fahrenheit
const units = 'metric'

export class Weather {

  imageUrl = '10d';
  temp;
  city;
  humidity = 64;
  windSpeed = 18;

  // getting weather from server by city
  async getWeatherInfo(cityName) {
    const response = await fetch(`${baseURL}?q=${cityName}&units=${units}&appid=${apiKey}`)
    if (!response.ok) {
      throw Error(`Response Status: ${response.status}`)
    }

    const array = await response.json()
    this.temp = Math.round(array.main.temp);
    this.city = array.name;
    this.humidity = array.main.humidity;
    this.windSpeed = Math.round(array.wind.speed);
    this.imageUrl = this.#getImageUrl(array.weather[0].icon);

    // saving last successfull city to local. why?
    // because if user enter some invalid city names, we reload data with latest valid city name and show user some alert that city name was invalid.
    this.#saveLatestCity(array)

  }


  #getImageUrl(imageCode) {
    return `https://openweathermap.org/img/wn/${imageCode}.png`
  }

  #saveLatestCity(response) {
    const json = JSON.stringify(response)
    localStorage.setItem('cityName', json)
  }

  getLastValidCity() {
    const jsonWeather = localStorage.getItem('cityName');
    const array = JSON.parse(jsonWeather)

    this.temp = Math.round(array.main.temp);
    this.city = array.name;
    this.humidity = array.main.humidity;
    this.windSpeed = Math.round(array.wind.speed);
    this.imageUrl = this.#getImageUrl(array.weather[0].icon);

    return this;
  }

}