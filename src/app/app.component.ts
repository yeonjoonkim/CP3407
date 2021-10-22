import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { WeatherCheckService } from './services/weather-check.service';
import { OpenWeatherService } from './services/open-weather.service';
import { WeatherbitService } from './services/weatherbit.service';
import { DeviceService } from './services/device.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  status: string
  items: Observable<any[]>;
  constructor(private storage: Storage, private openWeather: OpenWeatherService, 
    private weather: WeatherCheckService,private device: DeviceService, private toastCtrl: ToastController,
    private weatherBit: WeatherbitService
    ) {
  }

    async ngOnInit() {
      //create a storage
      await this.storage.create();
      //check if the setting has setted up
      this.storage.get("SETTING").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("SETTING", {interval: 15, max_temp: 39.5, max_wind: 10, max_rain: 10, max_humidity: 80, city: 'cairns'})
          this.openWeather.getWeatherData('cairns');
          this.weatherBit.getForecastData('cairns');
        }
      });
      this.storage.get("CHECK").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("CHECK", "start")
        }
      });
      this.startInterval();
    }

    checkStatus(){
      this.toastCtrl.create({
        message: 'Device Is ' + this.status,
        duration: 4000
      }).then((toastRes) => {
        toastRes.present();
      });
    }

    startInterval(){
      this.storage.get("TOKEN_KEY").then(token =>{
        console.log(token)
        if(token == 'true'){
        this.storage.get("SETTING").then(setting =>{
          console.log(setting.interval)
        const interval: ReturnType<typeof setInterval> = setInterval(() => {
          console.log(interval)
              this.storage.get("CHECK").then(check =>{
                if(check == 'start'){
                this.openWeather.getWeatherData(setting.city);
                this.weatherBit.getForecastData(setting.city);
                  this.storage.get("OPENWEATHER").then(data =>{
                    let rainValue = this.weather.rainValue(data.hourlyRain);
                    let temp = this.weather.check(data.currentTemp, setting.max_temp);
                    let wind = this.weather.check(data.currentWindSpeed, setting.max_wind);
                    let humidity = this.weather.check(data.humidity, setting.max_humidity);
                    let rain = this.weather.check(rainValue, setting.max_rain)
                    console.log(temp, wind, humidity, rain)
                    console.log("current Temp: " + data.currentTemp + " max: " + setting.max_temp)
                    console.log("current Wind: " + data.currentWindSpeed + " max: " + setting.max_wind)
                    console.log("current Humdit: " + data.humidity + " max: " + setting.max_humidity)
                    console.log("current Rain: " + rainValue + " max: " + setting.max_rain)
                    //insert here to test
                    if(temp || wind || humidity || rain){
                      this.device.AutoDeviceOff('openWeather');
                      this.status = 'Off'
                      this.checkStatus();
                      setTimeout(() => {
                      }, 1000);
                      }
                      else{
                        this.device.AutoDeviceOn('openWeather');
                        this.status = 'On'
                        this. checkStatus();
                        setTimeout(() => {
                        }, 900);
                      }
                    });
                
                  }
                if(check == 'stop'){
                  clearInterval(interval);
                }
              })
        }, 1000 * 60 * setting.interval);
      })
    }
  }
      )};
}

// test
