import { createAction, props } from '@ngrx/store'

import type { User } from 'src/app/interfaces/Types';

export const loadUsers = createAction('[User API] Load Users')
export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: any }>()
);