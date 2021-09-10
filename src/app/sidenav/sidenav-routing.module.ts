import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavPage } from './sidenav.page';

const routes: Routes = [
  {
    path: 'nav',
    component: SidenavPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'device',
        loadChildren: () => import('../device/device.module').then(m => m.DevicePageModule)
      },
      {
        path: 'weatherlog',
        loadChildren: () => import('../weatherlog/weatherlog.module').then(m => m.WeatherlogPageModule)
      },
      {
        path: 'systemlog',
        loadChildren: () => import('../systemlog/systemlog.module').then(m => m.SystemlogPageModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingPageModule)
      },
      {
        path: 'loginlog',
        loadChildren: () => import('../login-log/login-log.module').then(m => m.LoginLogPageModule)
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
    
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SidenavPageRoutingModule {}
