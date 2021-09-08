import { Injectable } from '@angular/core';
import { CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {map, filter, take} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router){

  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), //Filter out intial Behaviour subject value
      take(1), // Otherwise the Observalble doesn't complete.
      map(isAuthenticated => {
        if(isAuthenticated){
          // Directly open inside area
          this.router.navigateByUrl('/nav/home', {replaceUrl: true})
        } else{
          // Simply allow access to the login
          return true;
        }
      })
    )
  }
  
}
