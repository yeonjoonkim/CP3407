import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class WeatherbitService {

  //Weather Bit API Key
  private address = 'https://api.weatherbit.io/v2.0/forecast/daily?city='
  private apiKey = 'key=9cb3b4baa24e483eb2c2855ff46bc37a'
  constructor(private stroage: Storage) { }

  async OnInit(){
    this.stroage.create();
  }
 
  setForecast(weekly: any){
    let weeklyData = []

    for (let i = 0; i < 7; i++){
      let tempData = weekly.data[i];
      let date = tempData.datetime;
      let min_temp = tempData.min_temp;
      let max_temp = tempData.max_temp;
      let wind_speed = tempData.wind_spd.toFixed(2);
      let clouds = tempData.clouds;
      weeklyData.push({date:date, min_temp:min_temp,max_temp:max_temp, wind_speed:wind_speed, clouds: clouds})
    }
    this.stroage.set("WEATHERBIT", weeklyData)
  }


  getForecastData(city: string){
    fetch(this.address + city + '&' + this.apiKey).then(response => response.json())
    .then(data =>{
      this.setForecast(data);
    });
  }
}
