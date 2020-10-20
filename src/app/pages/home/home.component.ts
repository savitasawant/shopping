import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  userData: any;

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('authToken')).value;
    // console.log(this.userData);
  }

}
