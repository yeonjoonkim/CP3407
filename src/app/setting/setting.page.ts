import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  intervals: any[] = [{ id:1, name: "1 Hour"},{id:2,name: "2 Hours"},{id:3,name: "3 Hours"},{id:4,name: "3 Hours"}];
  interval = 1;
  selelectedIntervals: number;


  constructor(private storage:Storage) {
  }

  async ngOnInit() {
    //create a storage
    await this.storage.create();
    // get the selection of the interval from storage
    await this.storage.get("interval").then(val =>{
      this.interval = val;
    })
    // set the storage interval for selection
    
  }

  async setInterval(){     
    // set the selection of the interval to storage
    await this.storage.set("interval", this.interval)
  }

  
}
