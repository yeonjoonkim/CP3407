import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http'


//TODO
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = ''

  constructor(private storage: Storage, private http: HttpClient) {
    //create a storage 
    this.loadToken();
  }

  async loadToken() {
    await this.storage.create();
  }

  login(){
  }

  logout(){

  }

}
