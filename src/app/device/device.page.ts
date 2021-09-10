import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {AlertController, LoadingController} from '@ionic/angular'
import {NewComponent} from '../device/new/new.component';
import { DeviceService } from '../services/device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {
  deviceInfo: any =[];
  wsList: any=[];
  buttonControl: string;
  selectedWS = '';
  selectedIP = '';
  seletedDevice = '';

  constructor(private modalCtrl: ModalController, private deviceService: DeviceService, private router: Router,
    private alertController: AlertController, private loadingController: LoadingController
    ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.wsList = this.deviceService.getWSInfo();
  }

  ngOnInit() {
  }

  async newDevice(){
    const modal = await this.modalCtrl.create({
      component: NewComponent
    })

    modal.present();
  }


  async segmentChanged(){
    const loading = await this.loadingController.create();
    if(this.buttonControl == 'on'){
      this.deviceService.updateAllDeviceOn(this.selectedWS);
      this.deviceService.systemLogAllDeviceManualUpdate(this.buttonControl, this.selectedWS);
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: this.selectedWS,
        message:'Successfully Turn On'
      });
      await alert.present();

    } else{
      console.log(this.buttonControl)
      console.log(this.selectedWS)
      this.deviceService.updateAllDeviceOff(this.selectedWS);
      this.deviceService.systemLogAllDeviceManualUpdate(this.buttonControl, this.selectedWS);
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: this.selectedWS,
        message:'Successfully Turn Off'
      });
      await alert.present();
    }
    setTimeout(() => {
      window.location.reload();
    }, 900);
  }

  async offDevice(){
    const loading = await this.loadingController.create();
    this.deviceService.updateSingleDeviceOff(this.selectedWS, this.selectedIP)
    this.deviceService.systemLogSingleDeviceManualOff(this.selectedWS, this.seletedDevice)
    const alert = await this.alertController.create({
      header: 'Successfully Turn Off',
      message: "IP Address: " + this.selectedIP
    });
    await alert.present();
    await loading.dismiss();
    setTimeout(() => {
      window.location.reload();
    }, 900);
  }

  async onDevice(){
    const loading = await this.loadingController.create();
    this.deviceService.updateSingleDeviceOn(this.selectedWS, this.selectedIP)
    this.deviceService.systemLogSingleDeviceManualOn(this.selectedWS, this.seletedDevice)
    const alert = await this.alertController.create({
      header: 'Successfully Turn On',
      message: "IP Address: " + this.selectedIP
    });
    await alert.present();
    await loading.dismiss();
    setTimeout(() => {
      window.location.reload();
    }, 900);
  }

  async deleteAll(){
    const loading = await this.loadingController.create();
    this.deviceService.deleteAllDevice(this.selectedWS)
    this.deviceService.systemLogAllDeviceManualDelete(this.selectedWS)
    const alert = await this.alertController.create({
      header: 'Successfully Deleted',
      message: "seletecedWS: " + this.selectedWS
    });
    await alert.present();
    await loading.dismiss();
    setTimeout(() => {
      window.location.reload();
    }, 900);
  }

  async deleteSingle(){    
  const loading = await this.loadingController.create();
  this.deviceService.deleteSingleDevice(this.selectedWS, this.selectedIP)
  this.deviceService.systemLogSingleDeviceManualDelete(this.selectedWS, this.seletedDevice)
  const alert = await this.alertController.create({
    header: 'Successfully Deleted',
    message: "IP: " + this.selectedIP
  });
  await alert.present();
  await loading.dismiss();
  setTimeout(() => {
    window.location.reload();
  }, 900);
}


}
