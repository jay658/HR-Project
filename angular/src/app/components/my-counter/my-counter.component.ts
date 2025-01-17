import { Component, OnInit } from '@angular/core';
import { decrement, increment, reset } from '../../store/counter/counter.actions';
import { selectAllUsers, selectError, selectLoading } from 'src/app/store/user/users.selectors';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/store/user/users.actions';
import { loadUsers } from 'src/app/store/user/users.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html'
})

export class MyCounterComponent implements OnInit{
  count$: Observable<number>;
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
    this.users$ = store.select(selectAllUsers);
    this.loading$ = store.select(selectLoading);
    this.error$ = store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
