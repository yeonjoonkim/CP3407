import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { WeatherCheckService } from './services/weather-check.service';
import { OpenWeatherService } from './services/open-weather.service';
import { DeviceService } from './services/device.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  items: Observable<any[]>;
  constructor(private storage: Storage, private openWeather: OpenWeatherService, private weather: WeatherCheckService,private device: DeviceService) {
  }

    async ngOnInit() {
      //create a storage
      await this.storage.create();
      //check if the setting has setted up
      this.storage.get("SETTING").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("SETTING", {interval: 15, max_temp: 39.5, max_wind: 10, max_rain: 10, max_humidity: 60, city: 'cairns'})
        }
      });
      this.storage.get("CHECK").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("CHECK", "start")
        }
      });
      this.startInterval();
    }

    //TOD0
    startInterval(){
      this.storage.get("TOKEN_KEY").then(token =>{
        if(token == 'true'){
        this.storage.get("SETTING").then(setting =>{
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
              this.storage.get("CHECK").then(check =>{
                if(check == 'start'){
                this.openWeather.getWeatherData(setting.city)
                  this.storage.get("OPENWEATHER").then(data =>{
                    let rainValue = this.weather.rainValue(data.hourlyRain);
                    let temp = this.weather.check(data.currentTemp, setting.max_temp);
                    let wind = this.weather.check(data.currentWindSpeed, setting.max_wind);
                    let humidity = this.weather.check(data.humidity, setting.max_humidity);
                    let rain = this.weather.check(rainValue, setting.max_rain)
                    //insert here to test
                    if(temp || wind || humidity || rain){
                      this.device.AutoDeviceOff('openWeather');
                      setTimeout(() => {
                      }, 1000);
                      }
                      else{
                        this.device.AutoDeviceOn('openWeather');
                        setTimeout(() => {
                        }, 900);
                      }
                    })
                  }
                if(check == 'stop'){
                  console.log(check)
                  clearInterval(interval);
                }
              })
        }, 1000* 4 * setting.interval);}) // 
      }
    });
    }

}

//test
// console.log(temp, wind, humidity, rain)
// console.log("current Temp: " + data.currentTemp + " max: " + setting.max_temp)
// console.log("current Wind: " + data.currentWindSpeed + " max: " + setting.max_wind)
// console.log("current Humdit: " + data.humidity + " max: " + setting.max_humidity)
// console.log("current Rain: " + rainValue + " max: " + setting.max_humidity)