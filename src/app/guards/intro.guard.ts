import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router, private storage: Storage){
  }

  /// TODO: NEW SET UP THE STORAGE
  async ngOnInit() {
    //create a storage
    await this.storage.create();
  }

  async canLoad(): Promise<boolean>{
    //If the intro page need to change, please activate the 'a-1'
    //set a tem_key
    let hasSeenIntro: any;
    //get START_KEY
    await this.storage.get('START_KEY').then(val =>{
      hasSeenIntro = val;
    })
    //if key is true return true
    if (hasSeenIntro === 'true'){
      //'a-1' this.router.navigateByUrl('/intro', {replaceUrl: true})
      return true;
    }
    // if key is null direct to intro page 
    else{
      this.router.navigateByUrl('/intro', {replaceUrl: true})
      return true;
    }
  }
}
