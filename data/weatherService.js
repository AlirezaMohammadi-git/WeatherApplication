
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
    try {

      const response = await fetch(`${baseURL}?q=${cityName}&units=${units}&appid=${apiKey}`)
      if (!response.ok) {
        throw Error(`Response Status: ${response.status}`)
      }

      const array = await response.json()
      this.temp = Math.round(array.main.temp);
      this.city = array.name;
      this.humidity = array.main.humidity;
      this.windSpeed = Math.round(array.wind.speed);
      console.log(array.weather[0].icon)
      this.imageUrl = this.#getImageUrl(array.weather[0].icon);

    } catch (error) {
      console.error(`weatherService : getWeatherInfo ==> message : ${error.message}`)
    }
  }


  #getImageUrl(imageCode) {
    return `https://openweathermap.org/img/wn/${imageCode}.png`
  }

}