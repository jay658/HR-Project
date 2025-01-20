import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Environment
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HouseManagementComponent } from './components/house-management/house-management.component';
import { LoginComponent } from './components/login/login.component';
import { AddHouseDialogComponent } from './components/add-house-dialog/add-house-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { HouseDetailComponent } from './components/house-component/house-detail.component';

// Reducers and Effects
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { counterReducer } from './store/counter/counter.reducer';
import { userReducer } from './store/user/users.reducers';
import { UserEffects } from './store/user/users.effects';
import { housingReducer } from './store/housing/housing.reducer';
import { HousingEffects } from './store/housing/housing.effects';
import { employeeReducer } from './store/employee/employees.reducers';
import { EmployeeEffects } from './store/employee/employees.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MyCounterComponent,
    HomeComponent,
    EmployeeManagementComponent,
    VisaStatusManagementComponent,
    HiringManagementComponent,
    HouseManagementComponent,
    LoginComponent,
    AddHouseDialogComponent,
    ConfirmDialogComponent,
    EmployeeProfileComponent,
    HouseDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Material Modules
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatListModule,

    // NgRx Store Configuration
    StoreModule.forRoot(
      {
        auth: authReducer,
        count: counterReducer,
        users: userReducer,
        housing: housingReducer,
        employee: employeeReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }
    ),
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      HousingEffects,
      EmployeeEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
