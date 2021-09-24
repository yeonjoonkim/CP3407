import { Component, ViewChild} from '@angular/core';
import { OpenWeatherService } from '../services/open-weather.service';
import { WeatherCheckService } from '../services/weather-check.service';
import { Storage } from '@ionic/storage';
import {SwiperComponent} from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, {
  Pagination
} from 'swiper/core';

SwiperCore.use([Pagination]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('swiper') swiper: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
  };


  openWeatherData: any= [];
  forecastWeahterData: any= [];
  choice = ['START', 'STOP']
  selectedChoice: string;
  rainFall: number;
  constructor(private storage: Storage, private openWeather: OpenWeatherService,
    private weather: WeatherCheckService) {    
  }

  ngAfterContentChecked() {
    if (this.swiper){
    this.swiper.updateSwiper({});
   }
  }

  next(){
    this.swiper.swiperRef.slideNext(500);
  }
  back(){
    this.swiper.swiperRef.slidePrev(500);
  }

  async ngOnInit() {
    this.storage.create();
    this.storage.get("OPENWEATHER").then(val => {
      this.openWeatherData = val
      this. rainFall = this.weather.rainValue(val.hourlyRain)
    })
    this.storage.get("WEATHERBIT").then(val => {
      this.forecastWeahterData = val
    })
    this.storage.get("CHECK").then(val => {
      this.selectedChoice = val.toUpperCase();
    });
  }


  async setChoice(){
    await this.storage.set("CHECK", this.selectedChoice.toLowerCase());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }



}  
 