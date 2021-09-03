import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherlogPage } from './weatherlog.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherlogPageRoutingModule {}
