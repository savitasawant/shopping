import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class HomeService {

  apiUrl = 'http://localhost:3000';

  subject = new Subject();

  constructor(public http: HttpClient) { }

  sendItem(product){
    this.subject.next(product);
  }

  getItem(){
    return this.subject.asObservable();
  }

  // add new user in db
  getProductList(){
    return this.http.get(this.apiUrl+ '/products');
  }


}
