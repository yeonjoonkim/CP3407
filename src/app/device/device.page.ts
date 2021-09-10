import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {NewComponent} from '../device/new/new.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  async newDevice(){
    const modal = await this.modalCtrl.create({
      component: NewComponent
    })

    modal.present();
  }

}
