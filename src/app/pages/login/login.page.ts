import { Component, OnInit } from '@angular/core';
import { FormBuilder,} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {AlertController, LoadingController} from '@ionic/angular'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private id: string;
  private password: string;
  private user: any =[];

  constructor(private fb: FormBuilder, private authService: AuthenticationService, 
    private alertController: AlertController, private loadingController: LoadingController,
    private storage: Storage, private router: Router
    ) 
    { 
      //bring the list of the user
      this.user = this.authService.userList();
    } 

  async ngOnInit() {
    //create storage
    await this.storage.create();
  }

  async login(){
    //init loading signal
    const loading = await this.loadingController.create();
    //boolean
    let accessGrant = this.authService.login(this.user ,this.id, this.password)
    await loading.present();

   if(accessGrant === true){
     //finish the loading
    await loading.dismiss();
    // navigate to the home page
    this.router.navigateByUrl('nav/home', {replaceUrl: true})
          setTimeout(() => {
        window.location.reload();
      }, 500);

   } else{
     //finish the loading
     await loading.dismiss();
     //alert the user
     const alert = await this.alertController.create({
       header: 'Login failed',
       buttons: ['OK'],
     });
     await alert.present();
   }
   
  }

}
