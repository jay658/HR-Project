import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DocumentState } from './documents.reducers';

export const selectDocumentState = createFeatureSelector<DocumentState>('documents');

export const selectAllDocuments = createSelector(selectDocumentState, (state) => state.documents);
export const selectLoading = createSelector(selectDocumentState, (state) => state.loading);
export const selectError = createSelector(selectDocumentState, (state) => state.error);

export const selectAllDocumentsForUser = (id: string | undefined) => createSelector(selectDocumentState, (state) => state.documents.filter(document => document.userId === id && document.type !== 'profilePicture'))