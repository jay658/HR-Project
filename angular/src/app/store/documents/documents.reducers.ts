import { createReducer, on } from '@ngrx/store';
import { loadDocuments, loadDocumentsFailure, loadDocumentsSuccess } from './documents.actions';

import type { Document } from 'src/app/interfaces/Types';

export interface DocumentState {
  documents: Document[];
  loading: boolean;
  error: any;
}

export const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};

export const documentReducer = createReducer(
  initialState,
  on(loadDocuments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadDocumentsSuccess, (state, { documents }) => ({
    ...state,
    loading: false,
    documents,
  })),
  on(loadDocumentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);