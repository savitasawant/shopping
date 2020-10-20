import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class SignupService {

  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient) {
  }

  // add new user in db
  register(data){
    return this.http.post(this.apiUrl+ '/user', data);
  }

  // login user api
  login(data){
    return this.http.get(this.apiUrl+ '/user?username='+data.username+'&password='+data.password);
  }

  // check user available in db
  isUserAvailable(email){
    return this.http.get(this.apiUrl+ '/user?email='+email);
  }

  // Function to store user's data in client local storage
  storeUserData(tokenData) {
    localStorage.setItem('authToken', tokenData);
  }


}
