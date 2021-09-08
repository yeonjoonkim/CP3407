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

    /// TODO: NEW SET UP THE STORAGE
    async ngOnInit() {
      //create a storage
      await this.storage.create();
    }

}
