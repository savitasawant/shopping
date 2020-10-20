import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService as AuthGuard } from './authentication/auth-guard.service';
import { NotAuthGuardService as NoAuthGuard } from './authentication/not-auth-guard.service';

const routes: Routes = [
  {
    path: 'signup', component: SignupComponent,
    canActivate:[NoAuthGuard]
  },
  {
    path: 'home', component: HomeComponent,
    canActivate:[AuthGuard]
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
