import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HouseManagementComponent } from './components/house-management/house-management.component';
import { MyCounterComponent } from './components/my-counter/my-counter.component';

// Guard
import { AuthGuard } from './guards/auth.guard';
import { HouseDetailComponent } from './components/house-component/house-detail.component';

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
    path: 'employee-management',
    component: EmployeeManagementComponent,
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
    path: 'housing/:id',
    component: HouseDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'counter',
    component: MyCounterComponent,
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
