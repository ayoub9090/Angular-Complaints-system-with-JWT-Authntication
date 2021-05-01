import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'admin/signup', component: AdminRegisterComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'complaints', component: ComplaintsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
