import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WeatherCheckService } from './weather-check.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherLogService {

  constructor(private firestore: AngularFirestore, private weather: WeatherCheckService) {
  }

  addWeatherLog(apiName: string, timestamp: any, location: string, temp: number, wind: number, humidity: number, rain: any){
    let rainValue = this.weather.rainValue(rain)
    this.firestore.collection('weatherLog').ref.add({
      apiName: apiName,
      timestamp: timestamp,
      location: location,
      temp: temp,
      wind: wind,
      humidity: humidity,
      rain: rainValue
    })
  }

  getWeatherLog(){
    let weatherLog = []
    this.firestore.collection('weatherLog').ref.orderBy('timestamp', 'desc').get().then((user) => {user.forEach((doc =>{
      weatherLog.push({
        apiName: doc.get('apiName'),
        timestamp: doc.get('timestamp'),
        location: doc.get('location'),
        temp: doc.get('temp'),
        wind: doc.get('wind'),
        humidity: doc.get('humidity'),
        rain: doc.get('rain')
      })
        })
      )}
    )
    return weatherLog;
  }
}
