import { Component, OnInit } from '@angular/core';
import { WeatherLogService } from '../services/weather-log.service';

@Component({
  selector: 'app-weatherlog',
  templateUrl: './weatherlog.page.html',
  styleUrls: ['./weatherlog.page.scss'],
})
export class WeatherlogPage implements OnInit {
  WEATHERLOG: any =[]
  constructor(private weatherLog: WeatherLogService) {
    //get weather log from firestore
    this.WEATHERLOG = this.weatherLog.getWeatherLog();
  }

  ngOnInit() {
  }

}
