import { Action } from '@ngrx/store';

export const ADD_FEED = 'ADD_FEED';
export const RESET_FEED = 'RESET_FEED';

export const addFeed = (feed): Action => ({
    type: ADD_FEED,
    payload: { feed }
});

export const resetFeed = (feed): Action => ({
    type: RESET_FEED,
    payload: { feed }
});

