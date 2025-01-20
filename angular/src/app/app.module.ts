import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AddHouseDialogComponent } from './components/add-house-dialog/add-house-dialog.component';
// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common'
import { DocumentEffects } from './store/documents/documents.effects';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/employee/employees.effects';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HomeComponent } from './components/home/home.component';
import { HouseManagementComponent } from './components/house-management/house-management.component';
import { HousingEffects } from './store/housing/housing.effects';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { OnboardingEffects } from './store/onboardings/onboardings.effects';
import { OnboardingFormComponent } from './components/hiring-management/onboarding-form/onboarding-form.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// NgRx
import { StoreModule } from '@ngrx/store';
import {TextFieldModule} from '@angular/cdk/text-field';
import { UserEffects } from './store/user/users.effects';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
// Reducers and Effects
import { authReducer } from './store/auth/auth.reducer';
import { counterReducer } from './store/counter/counter.reducer';
import { documentReducer } from './store/documents/documents.reducers';
import { employeeReducer } from './store/employee/employees.reducers';
// Environment
import { environment } from '../environments/environment';
import { housingReducer } from './store/housing/housing.reducer';
import { onboardingReducer } from './store/onboardings/onboardings.reducers';
import { userReducer } from './store/user/users.reducers';

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
    OnboardingFormComponent
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
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    TextFieldModule,
    MatSelectModule,

    // NgRx Store Configuration
    StoreModule.forRoot(
      {
        auth: authReducer,
        count: counterReducer,
        users: userReducer,
        housing: housingReducer,
        employee: employeeReducer,
        onboardings: onboardingReducer, 
        documents: documentReducer
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
      OnboardingEffects,
      DocumentEffects
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
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
