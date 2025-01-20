import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { HiringManagementComponent } from './components/hiring-management/hiring-management.component';
import { HomeComponent } from './components/home/home.component';
import { HouseManagementComponent } from './components/house-management/house-management.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './store/user/users.effects';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { counterReducer } from './store/counter/counter.reducer';
import { environment } from '../environments/environment';
import { userReducer } from './store/user/users.reducers';
import { FormsModule } from '@angular/forms';
import { SearchAllStatusComponent } from './components/search-all-status/search-all-status.component';

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
    SearchAllStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({count: counterReducer, users: userReducer}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      }
    }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
