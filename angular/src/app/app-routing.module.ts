import { RouterModule, Routes } from '@angular/router';

// Guard
import { AuthGuard } from './guards/auth.guard';
// Components
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HomeComponent } from './components/home/home.component';
import { HouseManagementComponent } from './components/house-management/house-management.component';
import { LoginComponent } from './components/login/login.component';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { HouseDetailComponent } from './components/house-component/house-detail.component';
import { NgModule } from '@angular/core';
import { OnboardingFormComponent } from './components/hiring-management/onboarding-form/onboarding-form.component';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';


const routes: Routes = [
  // Public routes
  {
    path: 'login',
    component: LoginComponent,
  },

  // Protected routes
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profiles',
    component: EmployeeManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/:id',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visa',
    component: VisaStatusManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hiring',
    component: HiringManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'housing',
    component: HouseManagementComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'profiles', 
    component: EmployeeManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'housing/:id',
    component: HouseDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'counter',
    component: MyCounterComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'hr/employees/:id', 
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'onboarding/:id', 
    component: OnboardingFormComponent,
    canActivate: [AuthGuard],
  },

  // Default routes
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Optional: Add router configuration here
      // useHash: true, // Enables hash-based routing
      // enableTracing: true, // For debugging
      // scrollPositionRestoration: 'enabled',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
