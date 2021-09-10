import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicePageRoutingModule } from './device-routing.module';

import { DevicePage } from './device.page';

import {NewComponent} from '../device/new/new.component';

import { OrderByPipeModule } from '../pipe/orderbypipe.module';
import { MatchPipeModule } from '../pipe/matchpipe.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicePageRoutingModule,
    Ng2SearchPipeModule,
    MatchPipeModule,
    OrderByPipeModule
  ],
  declarations: [DevicePage, NewComponent]
})
export class DevicePageModule {}
