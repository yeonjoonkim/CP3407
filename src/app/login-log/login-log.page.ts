import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'


@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.page.html',
  styleUrls: ['./login-log.page.scss'],
})
export class LoginLogPage implements OnInit {
  accessList: any = []
  query = ''
  constructor(private data: UserService) {
    //get list from firestore
    this.accessList = this.data.getLogInSheet();
  }

  ngOnInit() {
  }

  
}
