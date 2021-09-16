import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {AuthenticationService} from "../services/authentication.service"
import {UserService} from "../services/user.service"
import { Storage } from '@ionic/storage';
import { UpdateInfoComponent } from '../update-info/update-info.component';
import { OpenWeatherService } from '../services/open-weather.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {
  private city: string;
  rate: number;
  userName: string;
  active = '';
  NAV = [
    {
      name: 'Home',
      link: '/nav/home',
      icon: 'partly-sunny'
    },
    {
      name: 'Device Management',
      link: '/nav/device',
      icon: 'hardware-chip'
    },
    {
      name: 'Weather Log',
      link: '/nav/weatherlog',
      icon: 'document'
    }
    ,
    {
      name: 'System Log',
      link: '/nav/systemlog',
      icon: 'document-text'
    }
    ,
    {
      name: 'Setting',
      link: '/nav/setting',
      icon: 'settings'
    }

  ]
  ADMIN_NAV= [
    {
      name: 'Login Log',
      link: '/nav/loginlog',
      icon: 'settings'
    }
  ]

  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService, private storage: Storage, private modalCtrl:ModalController
    , private openWeather: OpenWeatherService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url
    })
  }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get("ID").then(val => {
      this.userName = val
    })
    this.storage.get("RATE").then(val => {
      this.rate = val
    })
    this.storage.get("CITY").then(val => {
      this.openWeather.getWeatherData(val)
    })
  }

  async logout(){
    //empty local storage
    this.authService.logout();
    //navigate to login page
    this.router.navigateByUrl('login', {replaceUrl: true});
  }

  async update(){
    const modal = await this.modalCtrl.create({
      component: UpdateInfoComponent
    })
    modal.present();
  }

}