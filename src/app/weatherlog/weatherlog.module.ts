import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherlogPageRoutingModule } from './weatherlog-routing.module';

import { WeatherlogPage } from './weatherlog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherlogPageRoutingModule
  ],
  declarations: [WeatherlogPage]
})
export class WeatherlogPageModule {}
