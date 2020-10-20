import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class HomeService {

  apiUrl = 'https://5f8f3f97693e730016d7aec6.mockapi.io';

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
