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
    await this.storage.get("SETTING").then(val =>{
      // set the storage interval for selection
      this.interval = val.interval;
      this.max_temp = val.max_temp;
      this.max_wind = val.max_wind;
      this.city = val.city;
    })
  }



  async setSetting(){
    let settingGrant = true;
    const loading = await this.loadingController.create();
    this.city = this.city.toLowerCase()
    //if city is null or undefined
    if(this.city == null || this.city == undefined){
    //alert user
    settingGrant = false;
    alert("Please Enter The City.")
    } else if (this.max_wind== null || this.max_wind == undefined){
      //alert user
      settingGrant = false;
      alert("Please Enter The Maximum Temperature.") 
    } else if(this.max_temp == null || this.max_temp == undefined){
      //alert user
      settingGrant = false;
      alert("Please Enter The Maximum Temperature.")
    }
    await loading.dismiss();
    if(settingGrant == true){
      await this.storage.set("SETTING", 
      {interval: this.interval, max_temp: this.max_temp, max_wind: this.max_wind, city: this.city.toLowerCase()})
      alert("Setting saved.")
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

}
