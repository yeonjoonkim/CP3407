import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WeatherLogService } from './weather-log.service';


@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  //https://openweathermap.org/current - calling api
  //Setting apiKey
  private apiKey = 'bbf1afadff8791a5f0b13584a3be32d9';

  constructor(private stroage: Storage, private weatherLog: WeatherLogService) {
  }

  async OnInit(){
    this.stroage.create();
  }


  setWeather(data: any){
    let displayData: any;
    let timestamp: Date = new Date();
    let location = data.name;
    let sunriseTime = new Date(data.sys.sunrise * 1000);
    let sunsetTime = new Date(data.sys.sunset * 1000);
    let currentTemp = Math.round(data.main.temp) / 10;
    let currentWindSpeed = data.wind.speed;
    let currentWindDeg = data.wind.deg;
    let hourlyRain = data.rain;
    let humidity = data.main.humidity;
    let lat = data.coord.lat;
    let lon = data.coord.lon;

    if (hourlyRain === undefined || hourlyRain === null){
      hourlyRain = {'1h': 0};
    }
    displayData = {lastUpdate: timestamp, location: location, sunriseTime: sunriseTime, sunsetTime: sunsetTime,
    currentTemp: currentTemp, currentWindSpeed: currentWindSpeed, currentWindDeg: currentWindDeg, 
    hourlyRain: hourlyRain, humidity: humidity, lat: lat, lon: lon
    }
    this.stroage.set("OPENWEATHER", displayData)

    this.weatherLog.addWeatherLog('openWeather', timestamp, location, currentTemp, currentWindSpeed, humidity, hourlyRain)
    setTimeout(() => {
    }, 1000);
  }

  getWeatherData(city: string){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+this.apiKey)
    .then(response=>response.json())
    .then(data=> {
      this.setWeather(data)
     })
  }
}
