import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root'
})
export class SyslogService {
  private timestamp: Date = new Date();
  
  constructor(private firestore: AngularFirestore, private deviceService: DeviceService) { }


  systemLogAllDeviceManualUpdate(status: string, ws: string){
    if(status == 'on'){
      this.firestore.collection('systemLog').ref.add({
        date: this.timestamp,
        ws: ws,
        instrument: 'All',
        action: 'Turn On',
        comment:'Manual'
      })
    } else if(status == 'off'){
      this.firestore.collection('systemLog').ref.add({
        date: this.timestamp,
        ws: ws,
        instrument: 'All',
        action: 'Turn Off',
        comment:'Manual'
      })
    }
  }




  systemLogSingleDeviceManualOn(ws: string, instrument: string){
    this.firestore.collection('systemLog').ref.add({
      date: this.timestamp,
      ws: ws,
      instrument: instrument,
      action: 'Turn On',
      comment:'Manual'
    })
  }

  systemLogSingleDeviceManualOff(ws: string, instrument: string){
    this.firestore.collection('systemLog').ref.add({
      date: this.timestamp,
      ws: ws,
      instrument: instrument,
      action: 'Turn Off',
      comment:'Manual'
    })
  }
  systemLogSingleDeviceManualDelete(ws: string, instrument: string){
    this.firestore.collection('systemLog').ref.add({
      date: this.timestamp,
      ws: ws,
      instrument: instrument,
      action: 'Delete',
      comment:'Manual'
    })
  }
  systemLogAllDeviceManualDelete(ws: string){
    this.firestore.collection('systemLog').ref.add({
      date: this.timestamp,
      ws: ws,
      instrument: 'All',
      action: 'Delete',
      comment:'Manual'
    })
  }


  systemLogNewDevice(ws: string, instrument: string, newIP: string){
    this.firestore.collection('systemLog').ref.add({
      date: this.timestamp,
      ws: ws,
      instrument: instrument,
      action: 'Add',
      comment: 'Manual'
    })
  }



  getSystemLog(){
    //Get system log from firestore
    let systemLogs = []
    this.firestore.collection('systemLog').ref.orderBy('date', 'desc').get().then((user) => {user.forEach((doc =>{
      systemLogs.push({
        date: doc.get('date'),
        ws: doc.get('ws'),
        action: doc.get('action'),
        instrument: doc.get('instrument'),
        comment: doc.get('comment')
      })
        })
      )}
    )
    // return system log
    return systemLogs;
  }
  
}
