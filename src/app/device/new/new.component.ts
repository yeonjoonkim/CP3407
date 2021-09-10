import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { ModalController } from '@ionic/angular';
import {AlertController, LoadingController} from '@ionic/angular'



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  private deviceInfo: Array<any> =[];
  wsList = []
  selectedWS = '';
  SELECTION = ['YES', 'NO'];
  SELECTED = 'NO';
  newInstrument = '';
  newIP = '';
  constructor(private deviceService: DeviceService, private modalCtrl: ModalController, private alertController: AlertController, private loadingController: LoadingController) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.wsList = this.deviceService.getWSInfo();
  }

  ngOnInit() {    
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async add(){
    if (this.selectedWS === '' || this.selectedWS === undefined){
      alert("Please Enter The Weather Station")
    }
    if (this.newInstrument === ''|| this.newInstrument === undefined){
      alert("Please Enter The New Instrument")
    }
    if (this.newIP === '' || this.newIP === undefined){
      alert("Please Enter The IP Address")
    }
    if(this.SELECTED === "YES"){
      for(let i = 0; i < this.deviceInfo.length; i++){
        if(this.deviceInfo[i].ws === this.selectedWS){
          alert("The Weather Station is existed.")
          this.selectedWS = ''
        }
      }
    }
    if(this.selectedWS.length > 0 && this.newInstrument.length > 0 && this.newIP.length > 0 ){
      this.ipValidation(this.newIP)
      let addGrant = true;
      for (let i =0;  i < this.deviceInfo.length; i++){
        let ws = this.deviceInfo[i].ws
        let existedIP = this.deviceInfo[i].ip
        let existedInstrument = this.deviceInfo[i].instrument
        if(this.selectedWS === ws && this.newIP === existedIP){
          alert("New IP is existed.")
          this.newIP = ''
          addGrant = false;
        }
        if(this.selectedWS === ws && this.newInstrument === existedInstrument){
          alert("New Instrument is existed.")
          this.newInstrument = ''
          addGrant = false;
        }
      }
      if (addGrant == true){
    //init loading signal
    const loading = await this.loadingController.create();
    this.deviceService.addDevice(this.selectedWS, this.newInstrument, this.newIP)
    await loading.dismiss();
    //alert the user
    const alert = await this.alertController.create({
      header: 'Successfully Connected',
      buttons: ['OK'],
    });
    await alert.present();
    setTimeout(() => {
      window.location.reload();
    }, 900);
    this.modalCtrl.dismiss();
      }
    }

  }

  ipValidation(ip: string){
    var words = []
    let count = 0
    if(ip.includes('.')){
      words.push(ip.split('.'))
      for (let i = 0; i < words.length; i++){
        for (let ip = 0; ip < words[i].length; ip++){
          count++
        }
      }
      if (count < 4){
        alert("Please Enter Valid IP")
      }
    } else{
      alert("Please Enter Valid IP")
    }

  }

}
