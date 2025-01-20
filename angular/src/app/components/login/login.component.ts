import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.loading$ = this.store.select((state) => state.auth.loading);
    this.error$ = this.store.select((state) => state.auth.error);
  }

  handleLogin(): void {
    this.store.dispatch(
      AuthActions.login({ username: this.username, password: this.password })
    );
  }
}
