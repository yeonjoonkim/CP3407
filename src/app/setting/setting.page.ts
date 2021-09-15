import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {AlertController, LoadingController} from '@ionic/angular';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  intervals: any[] = [{ id:1, name: "1 Hour"},{id:2,name: "2 Hours"},{id:3,name: "3 Hours"},{id:4,name: "3 Hours"}];
  interval: number;
  max_temp: number;
  max_wind: number;
  city: String;
  selelectedIntervals: number;


  constructor(private storage:Storage, private alertController: AlertController, 
    private loadingController: LoadingController) {
  }

  async ngOnInit() {
    //create a storage
    await this.storage.create();
    // get the selection of the interval from storage
    await this.storage.get("INTERVAL").then(val =>{
      // set the storage interval for selection
      this.interval = val;
    })
    await this.storage.get("MAX_TEMP").then(val =>{
      // set the storage max_temp for selection
      this.max_temp = val;
    })
    await this.storage.get("MAX_WIND").then(val =>{
      // set the storage max_temp for selectsion
      this.max_wind = val;
    })

    await this.storage.get("CITY").then(val =>{
      // set the storage max_temp for selectsion
      this.city = val;
    })

    
    
  }



  async setSetting(){
    const loading = await this.loadingController.create();
    this.city = this.city.toLowerCase()
    await this.storage.set("INTERVAL", this.interval)
    await this.setCity();
    await this.setTemp();
    await this.setWind();
    await loading.dismiss();
  }

  async setCity(){
     //if city is null or undefined
     if(this.city == null || this.city == undefined){
      //alert user
      alert("Please Enter The City.")
    }
    //else if city has value
    else if(this.city){
      //console.log(this.city)
      await this.storage.set("CITY", this.city.toLowerCase())
    }
  }



  async setWind(){
    if(this.max_wind== null || this.max_wind == undefined){
            //alert user
            alert("Please Enter The Maximum Temperature.")
    } else if(this.max_wind){
      //console.log(this.max_wind)
      await this.storage.set("MAX_WIND", this.max_wind)
    }
  }

  async setTemp(){
    if(this.max_temp == null || this.max_temp == undefined){
      //alert user
      alert("Please Enter The Maximum Temperature.")

    } else if(this.max_temp){
      //console.log(this.max_temp)
      await this.storage.set("MAX_TEMP", this.max_temp)
    }
  }
}
