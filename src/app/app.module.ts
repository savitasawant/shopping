import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/signup/login/login.component';
import { RegisterComponent } from './pages/signup/register/register.component';
import { HomeComponent } from './pages/home/home.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';


import { SignupService } from './pages/signup/signup.service';
import { HeaderComponent } from './pages/home/header/header.component';
import { ProductListComponent } from './pages/home/product-list/product-list.component';
import { CartListComponent } from './pages/home/cart-list/cart-list.component';
import { HomeService } from './pages/home/home.service';
import { NotAuthGuardService as NoAuthGuard  } from './authentication/not-auth-guard.service';
import { AuthGuardService as AuthGuard } from './authentication/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ProductListComponent,
    CartListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    OverlayModule
  ],
  providers: [SignupService, HomeService, NoAuthGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
