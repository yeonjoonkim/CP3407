import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { ModalController } from '@ionic/angular';
import {AlertController, LoadingController} from '@ionic/angular';
import {SyslogService} from 'src/app/services/syslog.service';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  private deviceInfo: Array<any> =[];
  SELECTION = ['YES', 'NO'];
  SELECTED = 'NO';
  MANAGEDBY = ['openWeather'];
  selectedManaged = 'openWeather';
  wsList = []
  selectedWS = '';

  newInstrument = '';
  newIP = '';
  constructor(private deviceService: DeviceService, private modalCtrl: ModalController, private alertController: AlertController, 
    private loadingController: LoadingController, private syslogService: SyslogService) {
      //get device info and wsList from the firstore
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.wsList = this.deviceService.getWSInfo();
  }

  ngOnInit() {    
  }

  cancel() {
    //close the component
    this.modalCtrl.dismiss();
  }

  async add(){
    //if Input Weather Station is null or undefined
    if (this.selectedWS === '' || this.selectedWS === undefined){
      alert("Please Enter The Weather Station")
    }
    //if the instrument is null or undefined
    else if (this.newInstrument === ''|| this.newInstrument === undefined){
      alert("Please Enter The New Instrument")
    }
    //if the new IP is null or undefined
    else if (this.newIP === '' || this.newIP === undefined){
      alert("Please Enter The IP Address")
    }
    //if choice is yes and weather station is exised in the list.
    if(this.SELECTED === "YES"){
      for(let i = 0; i < this.deviceInfo.length; i++){
        if(this.deviceInfo[i].ws === this.selectedWS.toUpperCase()){
          alert("The Weather Station is existed.")
          this.selectedWS = ''
        }
      }
    }
    //check if the ip is valid in the weather station and instrument.
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
          // temp_addGrant is false
          addGrant = false;
        }
        if(this.selectedWS === ws && this.newInstrument === existedInstrument){
          alert("New Instrument is existed.")
          this.newInstrument = ''
          // temp_addGrant is false
          addGrant = false;
        }
      }
      // check the addgrant is true then add to the list.
      if (addGrant == true){
    //init loading signal
    const loading = await this.loadingController.create();
    this.selectedWS = this.selectedWS.toUpperCase();
    this.deviceService.addDevice(this.selectedWS.toUpperCase(), this.newInstrument, this.newIP, this.selectedManaged);
    this.syslogService.systemLogNewDevice(this.selectedWS.toUpperCase(), this.newInstrument, this.newIP);
    await loading.dismiss();
    //alert the user
    const alert = await this.alertController.create({
      header: 'Successfully Connected',
      buttons: ['OK'],
    });
    await alert.present();
    setTimeout(() => {
      this.modalCtrl.dismiss();
      window.location.reload();
    }, 900);
    
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
