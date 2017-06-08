import { Action } from '@ngrx/store';

export const ADD_TWITTER_USER = 'ADD_TWITTER_USER';
export const ADD_CURRENT_TWITTER_USER = 'ADD_CURRENT_TWITTER_USER';

export const addTwitterUser = (user): Action => ({
    type: ADD_TWITTER_USER,
    payload: { user }
});

export const addCurrentTwitterUser = (user): Action => ({
    type: ADD_CURRENT_TWITTER_USER,
    payload: { user }
});