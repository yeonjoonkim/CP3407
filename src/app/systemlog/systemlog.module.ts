import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SystemlogPageRoutingModule } from './systemlog-routing.module';

import { SystemlogPage } from './systemlog.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SystemlogPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SystemlogPage]
})
export class SystemlogPageModule {}
