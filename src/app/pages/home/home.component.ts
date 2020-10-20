import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _homeService:HomeService) { }

  userData: any = null;
  displayProductList: boolean = true;


  ngOnInit() {

    if(JSON.parse(localStorage.getItem('authToken'))){
      this.userData = JSON.parse(localStorage.getItem('authToken')).value;
    }

  }

  fnDisplayProduct(action){
    this.displayProductList = action;
  }

}
