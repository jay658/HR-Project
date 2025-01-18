import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { selectAuthState } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  authState$ = this.store.select(selectAuthState);

  constructor(
    private store: Store,
    private router: Router
  ) {}

  handleLogin(): void {
    this.store.dispatch(login({ username: this.username, password: this.password }));
    
    // Subscribe to auth state changes
    this.authState$.subscribe(state => {
      if (state.isLoggedIn) {
        const onboardingPath = state.user?.onboardingId ? '/dashboard' : '/onboarding';
        this.router.navigate([onboardingPath]);
      }
    });
  }
}