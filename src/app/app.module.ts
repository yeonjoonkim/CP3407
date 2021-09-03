import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherlogPipe } from './weatherlog.pipe';
import { SystemlogPipe } from './systemlog.pipe';
import { SettingPipe } from './setting.pipe';
import { SidenavPipe } from './sidenav.pipe';

@NgModule({
  declarations: [AppComponent, WeatherlogPipe, SystemlogPipe, SettingPipe, SidenavPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
