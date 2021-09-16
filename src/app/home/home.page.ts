import { Component } from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  openWeatherData: any= [];
  choice = ['START', 'STOP']
  selectedChoice: string;
  constructor(private storage: Storage, private openWeather: OpenWeatherService) {    
  }

  async ngOnInit() {
    this.storage.create();
    this.storage.get("OPENWEATHER").then(val => {
      this.openWeatherData = val
    })
    this.storage.get("CHECK").then(val => {
      this.selectedChoice = val.toUpperCase();
    })
  }


  async setChoice(){
    await this.storage.set("CHECK", this.selectedChoice.toLowerCase());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }



}  
 