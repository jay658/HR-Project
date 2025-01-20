import { createAction, props } from '@ngrx/store'

import type { Document } from 'src/app/interfaces/Types';

export const loadDocuments = createAction('[Document API] Load Documents')
export const loadDocumentsSuccess = createAction(
  '[Document API] Load Documents Success',
  props<{ documents: Document[] }>()
);
export const loadDocumentsFailure = createAction(
  '[Document API] Load Documents Failure',
  props<{ error: any }>()
);