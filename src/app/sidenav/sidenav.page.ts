import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {

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

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url
    })
  }

  ngOnInit() { }

}