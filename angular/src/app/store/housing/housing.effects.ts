import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as HousingActions from './housing.actions';
import { HousingService } from '../../services/housing.service';
import { Store } from '@ngrx/store';

@Injectable()
export class HousingEffects {
  loadHouses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HousingActions.loadHouses),
      mergeMap(() =>
        this.housingService.getHouses().pipe(
          map((houses) => HousingActions.loadHousesSuccess({ houses })),
          catchError((error) =>
            of(HousingActions.loadHousesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addHouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HousingActions.addHouse),
      mergeMap((action) =>
        this.housingService.addHouse(action.house).pipe(
          map((house) => HousingActions.addHouseSuccess({ house })),
          catchError((error) => {
            console.error('Error adding house:', error);
            return of(HousingActions.addHouseFailure({ error: error.message }));
          })
        )
      )
    )
  );
  deleteHouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HousingActions.deleteHouse),
      mergeMap((action) =>
        this.housingService.deleteHouse(action.houseId).pipe(
          map(() => {
            // After deletion, reload the houses to update the list
            this.store.dispatch(HousingActions.loadHouses());
            return HousingActions.deleteHouseSuccess({
              houseId: action.houseId,
            });
          }),
          catchError((error) =>
            of(HousingActions.deleteHouseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadHouseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HousingActions.loadHouseById),
      mergeMap(({ houseId }) =>
        this.housingService.getHouseById(houseId).pipe(
          map((house) => HousingActions.loadHouseByIdSuccess({ house })),
          catchError((error) =>
            of(HousingActions.loadHouseByIdFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private housingService: HousingService,
    private store: Store
  ) {}
}
