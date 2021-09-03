import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemlogPage } from './systemlog.page';

const routes: Routes = [
  {
    path: '',
    component: SystemlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemlogPageRoutingModule {}
