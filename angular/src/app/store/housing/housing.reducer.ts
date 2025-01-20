import { createReducer, on } from '@ngrx/store';
import * as HousingActions from './housing.actions';
import { House } from '../../models/housing.model';

export interface HousingState {
  houses: House[];
  error: string | null;
}

export const initialState: HousingState = {
  houses: [],
  error: null,
};

export const housingReducer = createReducer(
  initialState,
  on(HousingActions.loadHousesSuccess, (state, { houses }) => ({
    ...state,
    houses,
    error: null,
  })),
  on(HousingActions.loadHousesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(HousingActions.addHouseSuccess, (state, { house }) => ({
    ...state,
    houses: [...state.houses, house],
    error: null,
  })),
  on(HousingActions.addHouseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(HousingActions.deleteHouseSuccess, (state, { houseId }) => ({
    ...state,
    houses: state.houses.filter((house) => house._id !== houseId),
  })),
  on(HousingActions.loadHousesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
