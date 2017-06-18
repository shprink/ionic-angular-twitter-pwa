import { Action } from '@ngrx/store';

export const TRENDS_FETCH = 'TRENDS_FETCH';
export const TRENDS_FETCHED = 'TRENDS_FETCHED';
export const TRENDS_ERROR = 'TRENDS_ERROR';

export const fetchTrends = (): Action => ({
    type: TRENDS_FETCH,
});

export const fetchedTrends = (payload): Action => ({
    type: TRENDS_FETCHED,
    payload
});

export const errorTrends = (): Action => ({
    type: TRENDS_ERROR,
});
