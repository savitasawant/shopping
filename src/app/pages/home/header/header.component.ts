import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userData;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/signup']);
  }

}
