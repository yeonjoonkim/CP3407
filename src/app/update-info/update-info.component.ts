import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {UserService} from '../services/user.service'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss'],
})
export class UpdateInfoComponent implements OnInit {
  private userInfo: any = [];
  private currentPassword: string;
  private confirmNewPassword1: string;
  private confirmNewPassword2: string;


  constructor(private modalCtrl: ModalController, private storage: Storage, private userService: UserService, private firestore: AngularFirestore) {
  }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('ID').then(val =>{
      let list = this.userService.getUserInfo(val)
      this.userInfo = list
    });
  }

  updateInfo(){
    //check the password
    for (let i = 0; i < this.userInfo.length; i++){
    if(this.currentPassword == undefined || this.confirmNewPassword1 == undefined || this.confirmNewPassword2 === undefined){
      console.log(this.currentPassword)
      alert("Please enter the current or new password")
    } else if(this.currentPassword != this.userInfo[i].password){
      alert("Current Password is incorrect.")
    } else if(this.confirmNewPassword1.length < 4){
      alert("New Password Length should greater 4")
      this.emptyNewPassword()
    }else if(this.confirmNewPassword1.length > 10){
      alert("New Password Length should smaller 10")
      this.emptyNewPassword()
    }   else if(this.confirmNewPassword1 != this.confirmNewPassword2){
      alert("Please re-enter the new password.")
      this.emptyNewPassword()
    } else if (this.currentPassword == this.confirmNewPassword2){
      alert("Current Password and New password is equal")
      this.emptyNewPassword()
    } else{
      this.firestore.collection('user').ref.where("id", "==", this.userInfo[i].id).get().then((snapshot) => {snapshot.forEach(doc =>
        doc.ref.update({password: this.confirmNewPassword2})
         )})
      alert("New Password: " + this.confirmNewPassword2)
      this.modalCtrl.dismiss();
    }
  }
  }

  emptyNewPassword(){
    this.confirmNewPassword1 = ''
    this.confirmNewPassword2 = ''
  }

  cancel() {
    this.modalCtrl.dismiss();
  }


  

}
