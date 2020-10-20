import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showLogin: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  fnSwitchCard(action){

  }

}
