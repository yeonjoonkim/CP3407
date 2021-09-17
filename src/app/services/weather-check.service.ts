import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherCheckService {

  constructor() { }

  check(current: number, max: number){
    if(current > max){
      return true
    } else{
      return false;
    }
  }
  rainValue(value: any){
    return value['1h']
  }
}
