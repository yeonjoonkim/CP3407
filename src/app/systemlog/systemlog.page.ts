import { Component, OnInit } from '@angular/core';
import { SyslogService } from '../services/syslog.service';


@Component({
  selector: 'app-systemlog',
  templateUrl: './systemlog.page.html',
  styleUrls: ['./systemlog.page.scss'],
})
export class SystemlogPage implements OnInit {
  private SystemLog: any = []
  query = ''
  constructor(private systemLog: SyslogService ) {
    //get system log from firestore
    this.SystemLog = this.systemLog.getSystemLog();
  }

  ngOnInit() {
  }

}
