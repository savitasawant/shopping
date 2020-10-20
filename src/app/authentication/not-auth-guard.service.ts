import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class NotAuthGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate(): boolean {
    if (JSON.parse(localStorage.getItem('authToken'))) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
