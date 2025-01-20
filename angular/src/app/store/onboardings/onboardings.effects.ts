import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadOnboardings, loadOnboardingsFailure, loadOnboardingsSuccess, updateOnboardingStatus, updateOnboardingStatusFailure, updateOnboardingStatusSuccess } from './onboardings.actions';

import { Injectable } from '@angular/core';
import { OnboardingService } from './onboardings.service';

@Injectable()
export class OnboardingEffects {
  loadOnboardings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOnboardings),
      mergeMap(() =>
        this.onboardingService.getOnboardings().pipe(
          map((onboardings) => loadOnboardingsSuccess({ onboardings })),
          catchError((error) => of(loadOnboardingsFailure({ error })))
        )
      )
    )
  );
  
  updateOnboardingStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOnboardingStatus),
      mergeMap((action) =>
        this.onboardingService.updateStatus(action.status, action.onboardingId).pipe(
          map(({ message, updatedOnboarding }) => updateOnboardingStatusSuccess({ message, updatedOnboarding })),
          catchError((error) => of(updateOnboardingStatusFailure({ error })))
        )
      )
    )
  )

  constructor(private actions$: Actions, private onboardingService: OnboardingService) {}
}