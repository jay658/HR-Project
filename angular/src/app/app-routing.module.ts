import { RouterModule, Routes } from '@angular/router';

import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HomeComponent } from './components/home/home.component';
import { HouseManagementComponent } from './components/house-management/house-management.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profiles', component: EmployeeManagementComponent},
  { path: 'visa', component: VisaStatusManagementComponent},
  { path: 'hiring', component: HiringManagementComponent},
  { path: 'housing', component: HouseManagementComponent},
  { path: 'hr/employees/:id', component: EmployeeProfileComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
