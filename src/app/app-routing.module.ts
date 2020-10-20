import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'signup', component: SignupComponent,
  },
  {
    path: 'home', component: HomeComponent,
  },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/signup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
