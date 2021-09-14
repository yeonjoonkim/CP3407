import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private timestamp: Date = new Date();
  
  constructor(private firestore: AngularFirestore) { }



  getDeviceInfo(){
    //Get device from firestore
    let deviceList = []
    this.firestore.collection('device').ref.orderBy('ws', 'asc').get().then((user) => {user.forEach((doc =>{
      let ws = doc.get('ws')
      let instrument = doc.get('instrument')
      let ip =  doc.get('ip')
      let status = doc.get('status')
      if(ws != undefined && instrument != undefined && ip != undefined && status!= undefined){
        deviceList.push({ws: ws, instrument: instrument, ip: ip, status: status})
      }
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
      if(ws != undefined){
      deviceList.push({ws: ws})
      if(!wsList.includes(ws)){
        wsList.push(ws)
      }
        }})
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
      status: true
    })
  }


  updateAllDeviceOn(ws: string){
    this.firestore.collection('device').ref.where("ws", "==", ws).get().then((user) => {user.forEach((doc =>{
      doc.ref.update({status: true})
        })
      )
    })
  }

  updateAllDeviceOff(ws: string){
    this.firestore.collection('device').ref.where("ws", "==", ws).get().then((device) => {device.forEach(doc =>
      doc.ref.update({status: false})
       )})
  }

  updateSingleDeviceOff(ws: string, ip: string){
    this.firestore.collection('device').ref.where("ws", "==", ws).where("ip", "==", ip).get().then((device) => {device.forEach(doc =>
      doc.ref.update({status: false})
       )})
  }


  updateSingleDeviceOn(ws: string, ip: string){
    this.firestore.collection('device').ref.where("ws", "==", ws).where("ip", "==", ip).get().then((device) => {device.forEach(doc =>
      doc.ref.update({status: true})
       )})
  }

  async deleteAllDevice(ws: string){
    const doc = await this.firestore.collection('device').ref.where("ws", "==", ws).get();
    doc.forEach(element => {
      element.ref.delete();
    });
  }

  async deleteSingleDevice(ws: string, ip: string){
    const doc = await this.firestore.collection('device').ref.where("ws", "==", ws).where("ip", "==", ip).get();
    doc.forEach(element => {
      element.ref.delete();
    });
  }
  


}