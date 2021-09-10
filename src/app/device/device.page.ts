import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {NewComponent} from '../device/new/new.component';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {
  private deviceInfo: any =[];

  constructor(private modalCtrl: ModalController, private deviceService: DeviceService) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  ngOnInit() {
  }

  async newDevice(){
    const modal = await this.modalCtrl.create({
      component: NewComponent
    })

    modal.present();
  }

}
