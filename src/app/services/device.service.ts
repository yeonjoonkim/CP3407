import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  
  constructor(private firestore: AngularFirestore) { }



  getDeviceInfo(){
    //Get device from firestore
    let deviceList = []
    this.firestore.collection('device').get().subscribe((user) => {user.forEach((doc =>{
      let ws = doc.get('ws')
      let instrument = doc.get('instrument')
      let ip =  doc.get('ip')
      let status = doc.get('status')
      deviceList.push({ws: ws, instrument: instrument, ip: ip, status: status})
        })
      )}
    )
    // return device
    return deviceList;
  }

  getWSInfo(){
    let deviceList = []
    let wsList = []
    this.firestore.collection('device').get().subscribe((user) => {user.forEach((doc =>{
      let ws = doc.get('ws')
      deviceList.push({ws: ws})
      if(!wsList.includes(ws)){
        wsList.push(ws)
      }
        })
      )
    })

    
    // return WS
    return wsList;
  }

  addDevice(ws: string, instrument: string, ip: string){
    this.firestore.collection('device').ref.add({
      ws: ws,
      instrument: instrument,
      ip: ip,
      status: 'on'
    })
  }

  

}