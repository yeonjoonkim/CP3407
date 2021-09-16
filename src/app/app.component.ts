import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { OpenWeatherService } from './services/open-weather.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private setInt: number;

  items: Observable<any[]>;
  constructor(private storage: Storage, private openWeather: OpenWeatherService) {
  }

    async ngOnInit() {
      //create a storage
      await this.storage.create();
      //check if the setting has setted up
      this.storage.get("SETTING").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("SETTING", {interval: 1, max_temp: 39.5, max_wind: 10, city: 'cairns'})
        }
      });
      this.storage.get("CHECK").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("CHECK", "start")
        }
      });
      this.checkWeather()
    }

    //TODO
    checkWeather(){
      this.storage.get("SETTING").then(setting =>{
      //test interval per second
      var obs = interval(3000 * setting.interval);
      obs.subscribe(()=> {
        this.storage.get("TOKEN_KEY").then(token =>{
          if(token == 'true'){
            this.storage.get("CHECK").then(check =>{
              if(check == 'start'){
                //this.openWeather.getWeatherData(setting.city)
                this.storage.get("OPENWEATHER").then(data =>{
                 if(data.currentTemp > setting.max_temp || data.currentWindSpeed > setting.max_wind){

                 }
                })
              } else if(check == 'stop'){
                console.log(check)
              }
            })
          }
        });
      })

    });
    }


    

}
