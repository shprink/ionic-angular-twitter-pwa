import { Action } from '@ngrx/store';

export const SET_TWITTER_USER = 'SET_TWITTER_USER';

export const setTwitterUser = (user): Action => ({
    type: SET_TWITTER_USER,
    payload: {
        user
    }
});