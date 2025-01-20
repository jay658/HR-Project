import { createReducer, on } from '@ngrx/store';
import * as HousingActions from './housing.actions';
import { House } from '../../models/housing.model';

export interface HousingState {
  houses: House[];
  error: string | null;
  selectedHouse: House | null;
  loading: boolean;
}

export const initialState: HousingState = {
  houses: [],
  selectedHouse: null,
  loading: false,
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
  })),
  on(HousingActions.loadHouseById, (state) => ({
    ...state,
    loading: true,
  })),
  on(HousingActions.loadHouseByIdSuccess, (state, { house }) => ({
    ...state,
    selectedHouse: house,
    loading: false,
  })),
  on(HousingActions.loadHouseByIdFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
