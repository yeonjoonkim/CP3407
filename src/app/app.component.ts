import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(private storage: Storage) {
  }

    async ngOnInit() {
      //create a storage
      await this.storage.create();
      //check if the interval is already set up
      this.storage.get("interval").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("interval", 1)
        }
      });
      
      //check if the maxium temp is already set up
      this.storage.get("max_temp").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("max_temp", 39.5)
        }
      });

      //check if the maxium wind is already set up
      this.storage.get("max_wind").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("max_wind", 10)
        }
      });
    }

    

}
