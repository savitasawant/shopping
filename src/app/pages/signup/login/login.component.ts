import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

export interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loginError : string = '';
  showPassword : boolean = false;
  responseData : any;
  loginApiCall : boolean;

  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private _signupService:SignupService) { }

  ngOnInit() {
    // build login form
    this.loginForm = this.formBuilder.group({
      username: ['',  Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  // remove error message after input touched
  onLoginFormValuesChanged() {
    this.loginError = '';
  }

  // password show/hide function
  togglePassword() {
    if (this.showPassword === false) {
        this.showPassword = true;
    } else {
        this.showPassword = false;
    }
  }

  // login form submission
  submitForm() {

    if(!this.loginForm.valid) {
      // this.loginError = 'Please enter credentials.';
      return true;
    }

    const postData: LoginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
    }

    this.loginApiCall = true;
    this._signupService.login(postData).subscribe(data => {

      this.responseData = data;
      this.loginApiCall = false;

      if(!this.responseData.length){
        this.loginError = 'Invalid credentials.';
        return;
      }

      // create localStorage and set new data
      const tokenData = {
          value: this.responseData,
          time: new Date().getTime()
      };

      localStorage.clear();
      this._signupService.storeUserData(JSON.stringify(tokenData));
      this.router.navigate(['/home']);
    }, err => {
        console.error(err);
        this.loginApiCall = false;
        this.loginError = err.error.message;
    });

  }

}
