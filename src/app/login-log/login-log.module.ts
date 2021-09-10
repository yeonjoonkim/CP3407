import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginLogPageRoutingModule } from './login-log-routing.module';

import { LoginLogPage } from './login-log.page';

import {Ng2SearchPipe} from 'ng2-search-filter'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginLogPageRoutingModule
  ],
  declarations: [LoginLogPage, Ng2SearchPipe]
})
export class LoginLogPageModule {}
