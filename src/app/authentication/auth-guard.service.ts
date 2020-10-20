
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) {
  }

  canActivate(): boolean {
    if (!JSON.parse(localStorage.getItem('authToken'))) {
      this._router.navigate(['/signup']);
      return false;
    }
    return true;
  }

}
