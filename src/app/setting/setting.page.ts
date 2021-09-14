import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


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
  selelectedIntervals: number;


  constructor(private storage:Storage) {
  }

  async ngOnInit() {
    //create a storage
    await this.storage.create();
    // get the selection of the interval from storage
    await this.storage.get("interval").then(val =>{
      // set the storage interval for selection
      this.interval = val;
    })
    await this.storage.get("max_temp").then(val =>{
      // set the storage max_temp for selection
      this.max_temp = val;
    })

    
    
  }

  async setInterval(){     
    // set the selection of the interval to storage
    await this.storage.set("interval", this.interval)
  }

  
}
