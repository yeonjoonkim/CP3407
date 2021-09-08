import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //check is Authenticated
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private storage: Storage, private firestore: AngularFirestore, private router: Router) {
    this.loadToken()
  }

  async loadToken(){
    // create a storage
    await this.storage.create();
    // check TOKEN_KEY is true or false
    await this.storage.get("TOKEN_KEY").then(
      value => {
        if (value){
          this.isAuthenticated.next(true);
        }else{
          this.isAuthenticated.next(false);
        }
      }
      
    )
  }
  userList(){
    //Get userProfile from firestore
    let userList = []
    this.firestore.collection('user').get().subscribe((user) => {user.forEach((doc =>{
      let id = doc.get('id')
      let password = doc.get('password')
      let rate =  doc.get('rate')
      userList.push({id: id, password: password, rate: rate})
        })
      )}
    )
    // return userProfile
    return userList;
  }

  login(userList: any, inputId: string, inputPwd: string){
    // temp_access grant is false;
    let accessGrant = false;
    for (let i = 0; i < userList.length; i++){
      // Check ID matched with Input ID
      if(userList[i].id === inputId){
        // Check password matched with Input password
        if(userList[i].password === inputPwd){
          //If it matched, set id, token_key, rate and authentication is ture
          this.storage.set("ID", userList[i].id);
          this.storage.set("TOKEN_KEY", 'true');
          this.storage.set("RATE", userList[i].rate);
          this.isAuthenticated.next(true);
          accessGrant = true
        }
      }
    }
    // return boolean
    return accessGrant
  }

  logout(){
    //empty storage and isAuthentication = false
    this.isAuthenticated.next(false);
    this.storage.remove("TOKEN_KEY");
    this.storage.remove("RATE");
    this.storage.remove("ID");
  }

}
