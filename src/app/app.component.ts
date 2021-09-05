import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(private firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
    this.testFirebaseConnection()
  }

  //test connection of firebase
  testFirebaseConnection(){
    this.firestore.collection('test').ref.get().then((snapshot) => {snapshot.forEach(doc =>
      doc.ref.update({test: "ok"}))
    })
  }
}
