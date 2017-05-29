import { Action } from '@ngrx/store';

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_AUTH_CREDENTIAL = 'SET_AUTH_CREDENTIAL';
export const LOGOUT = 'LOGOUT';

export const setAuthUser = (user): Action => ({
    type: SET_AUTH_USER,
    payload: {
        user
    }
});

export const setAuthCredential = (credential): Action => ({
    type: SET_AUTH_CREDENTIAL,
    payload: {
        credential
    }
});

export const logout = (): Action => ({
    type: LOGOUT
});