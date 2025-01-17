import { createAction, props } from '@ngrx/store'

export type User = {
  _id: string,
  username: string,
  password: string,
  email: string,
  onboardingId?: string,
  personalInfoId?: string,
  visaApplicationId?: string
}

export const loadUsers = createAction('[User API] Load Users')
export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: any }>()
);