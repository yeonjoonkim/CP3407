import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-systemlog',
  templateUrl: './systemlog.page.html',
  styleUrls: ['./systemlog.page.scss'],
})
export class SystemlogPage implements OnInit {
  private SystemLog: any = []
  query = ''
  constructor(private deviceService: DeviceService) {
    this.SystemLog = this.deviceService.getSystemLog();
  }

  ngOnInit() {
  }

  check(){
    console.log(this.SystemLog)
  }

}
