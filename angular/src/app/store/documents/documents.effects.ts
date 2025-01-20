import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { loadDocuments, loadDocumentsFailure, loadDocumentsSuccess } from './documents.actions';

import { DocumentService } from './documents.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DocumentEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDocuments),
      mergeMap(() =>
        this.documentService.getDocuments().pipe(
          map((documents) => loadDocumentsSuccess({ documents })),
          catchError((error) => of(loadDocumentsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private documentService: DocumentService) {}
}
