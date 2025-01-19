import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as AuthActions from '../../store/auth/auth.actions'; // adjust path as needed

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<{ auth: { isLoggedIn: boolean } }>,
    private router: Router
  ) {
    this.isLoggedIn$ = this.store.select((state) => state.auth.isLoggedIn);
  }

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
