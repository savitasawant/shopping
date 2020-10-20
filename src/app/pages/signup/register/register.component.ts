import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { SignupService } from '../signup.service';

export interface UserData {
  username: string;
  email : string
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  registerError : string = '';
  showPassword : boolean = false;
  responseData : any;
  registerApiCall : boolean;

  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute, private router : Router, private fb : FormBuilder, private _signupService:SignupService) { }

  ngOnInit() {
    // build register form
    this.registerForm = this.formBuilder.group({
      username: ['',  Validators.required],
      email : ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required],
    },{
      validator: this.MustMatch('password', 'confirmPassword')
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  // remove error message after input touched
  onRegisterFormValuesChanged() {
    this.registerError = '';
  }

  // password show/hide function
  togglePassword() {
    if (this.showPassword === false) {
        this.showPassword = true;
    } else {
        this.showPassword = false;
    }
  }

  // register form submit
  submitForm() {

    if(!this.registerForm.valid) {
      // this.registerError = 'Please enter data.';
      return true;
    }

    const postData: UserData = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
    }

    postData.email.trim().toLowerCase()

    // check in db if same user
    this.isUserAvailable(postData);
  }

  // check user available in db
  isUserAvailable(postData){
    this._signupService.isUserAvailable(postData.email).subscribe(data => {

      this.responseData = data;

      if(this.responseData.length){
        this.registerError = 'This account is already created. Please login.';
        return true;
      }
      // add new user
      this.registerUser(postData);

  }, err => {
      console.error(err);
      this.registerApiCall = false;
      this.registerError = 'Something went wrong. Please try again';
  });
  }

  // enter new user in db
  registerUser(postData){

    // deleting confirm password and post
    delete postData.confirmPassword;
    this._signupService.register(postData).subscribe(data => {

      this.responseData = data;
      this.registerApiCall = false;

      const tokenData = {
        value: {"username":this.responseData.username, "email":this.responseData.email},
          time: new Date().getTime()
      };

      localStorage.clear();
      this._signupService.storeUserData(JSON.stringify(tokenData));
      this.router.navigate(['/home']);
    }, err => {
        console.error(err);
        this.registerApiCall = false;
        this.registerError = 'Something went wrong. Please try again';
    });
  }

  // password and confirm password match function
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }

}
