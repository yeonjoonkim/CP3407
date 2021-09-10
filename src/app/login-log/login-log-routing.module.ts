import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginLogPage } from './login-log.page';

const routes: Routes = [
  {
    path: '',
    component: LoginLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginLogPageRoutingModule {}
