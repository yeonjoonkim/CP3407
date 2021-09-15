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
      this.storage.get("INTERVAL").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("INTERVAL", 1)
        }
      });
      
      //check if the maxium temp is already set up
      this.storage.get("MAX_TEMP").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("MAX_TEMP", 39.5)
        }
      });

      //check if the maxium wind is already set up
      this.storage.get("MAX_WIND").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("MAX_WIND", 10)
        }
      });

      //check if the city is already set up
      this.storage.get("CITY").then(val =>{
        if (val === null || val === undefined){
          this.storage.set("CITY", "cairns")
        }
      });
    }

    

}
