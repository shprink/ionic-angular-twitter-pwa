import { Action } from '@ngrx/store';

export const SEARCH_FETCH = 'SEARCH_FETCH';
export const SEARCH_FETCHED = 'SEARCH_FETCHED';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const fetchSearch = (term): Action => ({
  type: SEARCH_FETCH,
  payload: { term },
});

export const fetchedSearch = (term, feed, reset = false): Action => ({
  type: SEARCH_FETCHED,
  payload: { term, feed, reset },
});

export const errorSearch = (term): Action => ({
  type: SEARCH_ERROR,
  payload: { term },
});
