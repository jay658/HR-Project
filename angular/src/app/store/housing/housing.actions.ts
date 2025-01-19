// housing.actions.ts
import { createAction, props } from '@ngrx/store';
import { House } from '../../models/housing.model';

export const loadHouses = createAction('[Housing] Load Houses');
export const loadHousesSuccess = createAction(
  '[Housing] Load Houses Success',
  props<{ houses: House[] }>()
);
export const loadHousesFailure = createAction(
  '[Housing] Load Houses Failure',
  props<{ error: string }>()
);

export const addHouse = createAction(
  '[Housing] Add House',
  props<{ house: Partial<House> }>()
);
export const addHouseSuccess = createAction(
  '[Housing] Add House Success',
  props<{ house: House }>()
);
export const addHouseFailure = createAction(
  '[Housing] Add House Failure',
  props<{ error: string }>()
);

export const deleteHouse = createAction(
  '[Housing] Delete House',
  props<{ houseId: string }>()
);

export const deleteHouseSuccess = createAction(
  '[Housing] Delete House Success',
  props<{ houseId: string }>()
);

export const deleteHouseFailure = createAction(
  '[Housing] Delete House Failure',
  props<{ error: any }>()
);
