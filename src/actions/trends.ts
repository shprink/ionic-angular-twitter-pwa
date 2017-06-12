import { Action } from '@ngrx/store';

export const ADD_TRENDS = 'ADD_TRENDS';

export const addTrends = (payload): Action => ({
    type: ADD_TRENDS,
    payload
});

